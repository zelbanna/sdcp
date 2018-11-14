"""System engine"""
__author__ = "Zacharias El Banna"
__version__ = "5.5"
__build__ = 149
__all__ = ['Context','WorkerPool']

from os import path as ospath, getpid, walk
from json import loads, load, dumps
from importlib import import_module, reload as reload_module
from threading import Thread, Event, BoundedSemaphore, enumerate as thread_enumerate
from time import localtime, strftime, time, sleep
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import unquote, parse_qs
from functools import lru_cache, partial

#######################################Decorator Tools ####################################
#

def debug_decorator(func_name):
 def decorator(func):
  def decorated(*args,**kwargs):
   res = func(*args,**kwargs)
   print("DEBUGGER: %s(%s,%s) => %s"%(func_name, args, kwargs, res))
   return res
  return decorated
 return decorator

@lru_cache(maxsize = 256)
def cached_file_open(aFile):
 with open(aFile, 'rb') as file:
  return file.read()

########################################### Context ########################################
#
# Main state object, contains settings, workers, modules and calls etc..
#
# TODO: make multiprocessing - preforking - and multithreaded
#
# - http://stupidpythonideas.blogspot.com/2014/09/sockets-and-multiprocessing.html
# - https://stackoverflow.com/questions/1293652/accept-with-sockets-shared-between-multiple-processes-based-on-apache-prefork
# - Manager.dict for settings
#

class Context(object):

 def __init__(self,aConfig):
  """ Context init - create the infrastructure but populate later
  - Set node ID
  - Prepare database and workers
  - Load config, i.e. base settings
  - initiate the 'kill' switch
  - create datastore (i.e. dict) for settings, nodes, servers and external modules
  """
  from rims.core.common import DB, rest_call
  if isinstance(aConfig, dict):
   self.config = aConfig
  else:
   with open(aConfig,'r') as config_file:
    self.config = load(config_file)
    self.config['config_file'] = aConfig
  self.config['mode'] = 'api'
  self.node     = self.config['id']
  self.db       = DB(self.config['db_name'],self.config['db_host'],self.config['db_user'],self.config['db_pass']) if self.node == 'master' else None
  self.workers  = WorkerPool(self.config.get('workers',20),self)
  self.path     = ospath.abspath(ospath.join(ospath.dirname(__file__), '..'))
  self.settings = {}
  self.nodes    = {}
  self.external = {}
  self.servers  = {}
  self._kill    = Event()
  self._analytics= {'files':{},'modules':{}}
  self.rest_call = rest_call

 def __str__(self):
  return "Context(node=%s)"%(self.node)

 #
 def __clone__(self):
  """ Clone itself and non thread-safe components """
  from copy import copy
  from rims.core.common import DB
  ctx_new = copy(self)
  ctx_new.db = DB(self.config['db_name'],self.config['db_host'],self.config['db_user'],self.config['db_pass']) if self.node == 'master' else None
  return ctx_new

 #
 def wait(self):
  self._kill.wait()

 #
 def load_system(self):
  """ Load settings from DB or master node and do same with tasks. Add tasks to queue """
  system = self.system_info('master') if self.node == 'master' else self.rest_call("%s/system/environment/%s"%(self.config['master'],self.node), aDataOnly = True)
  self.settings.update(system['settings'])
  self.nodes.update(system['nodes'])
  self.servers.update(system['servers'])
  for task in system['tasks']:
   task.update({'args':loads(task['args']),'output':(task['output'] == 1 or task['output'] == True)})
   frequency = task.pop('frequency',300)
   self.workers.add_periodic(task,frequency)

 #
 def start(self):
  """ Start "moving" parts of context, set up socket and start processing incoming requests and scheduled tasks """
  from sys import setcheckinterval
  from signal import signal, SIGINT, SIGUSR1, SIGUSR2
  from socket import socket, AF_INET, SOCK_STREAM, SOL_SOCKET, SO_REUSEADDR
  addr = ("", int(self.config['port']))
  sock = socket(AF_INET, SOCK_STREAM)
  sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
  sock.bind(addr)
  sock.listen(5)
  self.workers.start(addr,sock)
  for sig in [SIGINT, SIGUSR1, SIGUSR2]:
   signal(sig, self.signal_handler)
  setcheckinterval(200)

 #
 def close(self):
  """ TODO clean up and close all DB connections and close socket """
  self.workers.close()
  self._kill.set()

 # 
 def node_function(self, aNode, aModule, aFunction):
  """ Node function freezes the REST call or the function with enough info so that they can be used multiple times AND interchangably """
  if self.node != aNode:
   ret = partial(self.rest_call,"%s/api/%s/%s"%(self.nodes[aNode]['url'],aModule,aFunction), aDataOnly = True)
  else:
   module = import_module("rims.rest.%s"%aModule)
   fun = getattr(module,aFunction,None)
   ret = partial(fun,self)
  return ret

 #
 def module_register(self, aName):
  """ Register "external" modules """
  ret = {'import':'error'}
  try:   module = import_module(aName)
  except Exception as e: ret['error'] = str(e)
  else:
   self.external[aName] = module
   ret['import'] = repr(module)
  return ret

 #
 def module_reload(self):
  """ Reload modules and return which ones were reloaded """
  from sys import modules as sys_modules
  from types import ModuleType
  modules = {x:sys_modules[x] for x in sys_modules.keys() if x.startswith('rims.')}
  modules.update(self.external)
  ret = []
  for k,v in modules.items():
   if isinstance(v,ModuleType):
    try: reload_module(v)
    except: pass
    else:   ret.append(k)
  ret.sort()
  return ret

 #
 def signal_handler(self, sig, frame):
  from signal import SIGINT, SIGUSR1, SIGUSR2
  if   sig == SIGINT:
   self.close()
  elif sig == SIGUSR1:
   print("\n".join(self.module_reload()))
   cached_file_open.cache_clear()
  elif sig == SIGUSR2:
   data = self.report()
   print("System Info:\n_____________________________\n%s\n_____________________________"%(dumps(data,indent=2, sort_keys=True)))

 #
 def analytics(self, aType, aGroup, aItem):
  tmp = self._analytics[aType].get(aGroup,{})
  tmp[aItem] = tmp.get(aItem,0) + 1
  self._analytics[aType][aGroup] = tmp

 #
 # @debug_decorator('log')
 def log(self,aMsg):
  try:
   with open(self.config['logs']['system'], 'a') as f:
    f.write(str("%s: %s\n"%(strftime('%Y-%m-%d %H:%M:%S', localtime()), aMsg)))
  except: pass

 #
 def report(self):
  from sys import version, modules as sys_modules, path as syspath
  from types import ModuleType
  node_url = self.nodes[self.node]['url']
  db_counter = {}
  for t in thread_enumerate():
   try:
    for k,v in t._ctx.db.count.items():
     db_counter[k] = db_counter.get(k,0) + v
   except:pass
  output = {
  'Node URL':node_url,
  'Package path':self.path,
  'Python version':version.replace('\n',''),
  'Scheduled tasks':self.workers.scheduler_size(),
  'Workers pool':self.workers.alive(),
  'Workers idle':self.workers.idles(),
  'Workers queue':self.workers.queue_size(),
  'Database':', '.join("%s:%s"%(k.lower(),v) for k,v in db_counter.items()),
  'OS path':',' .join(syspath),
  'OS pid':getpid()}
  try: output['File cache'] = repr(cached_file_open.cache_info())
  except:pass
  if self.node == 'master':
   with self.db as db:
    oids = {}
    for type in ['devices','device_types']:
     db.do("SELECT DISTINCT oid FROM %s"%type)
     oids[type] = [x['oid'] for x in db.get_rows()]
   output['Unhandled detected OIDs']= ",".join(str(x) for x in oids['devices'] if x not in oids['device_types'])
   output.update({'Mounted directory: %s'%k:"%s => %s/files/%s/"%(v,node_url,k) for k,v in self.settings.get('files',{}).items()})
   output.update({'Config: %s'%k:v for k,v in self.config.items()})
   output.update({'Modules (%s)'%i:x for i,x in enumerate(sys_modules.keys()) if x.startswith('rims')})
  output['analytics'] = {}
  for type in ['modules','files']:
   for g,i in self._analytics[type].items():
    output['analytics'][type] = {'%s/%s'%(g,f):c for f,c in i.items()}
  return output

 #
 def system_info(self,aNode):
  nodes, servers, settings = {}, {}, {}
  with self.db as db:
   db.do("SELECT section,parameter,value FROM settings WHERE node = '%s'"%aNode)
   data = db.get_rows()
   db.do("SELECT id, node, url,system FROM nodes")
   node_list = db.get_rows()
   db.do("SELECT id, node, service, type FROM servers")
   server_list = db.get_rows()
   db.do("SELECT tasks.id, user_id, module, func, args, frequency, output FROM tasks LEFT JOIN nodes ON nodes.id = tasks.node_id WHERE node = '%s'"%aNode)
   tasks = db.get_rows()
  for node in node_list:
   name = node.pop('node',None)
   nodes[name] = node
  for svc in server_list:
   id = svc.pop('id',None)
   servers[id] = svc
  for task in tasks:
   task['output'] = (task['output']== 1)
  for param in data:
   section = param.pop('section',None)
   if not settings.get(section):
    settings[section] = {}
   settings[section][param['parameter']] = param['value']
  return {'settings':settings,'tasks':tasks,'servers':servers,'nodes':nodes}


########################################## WorkerPool ########################################
#
#
class WorkerPool(object):

 def __init__(self, aWorkers, aContext):
  from queue import Queue
  self._queue     = Queue(0)
  self._count     = aWorkers
  self._ctx       = aContext
  self._abort     = Event()
  self._sock      = None
  self._idles     = []
  self._workers   = []
  self._servers   = []
  self._scheduler = []

 def __str__(self):
  return "WorkerPool(count = %s, queue = %s, schedulers = %s, alive = %s)"%(self._count,self._queue.qsize(),len(self._scheduler),self.alive())

 def start(self, aAddr, aSock):
  self._sock    = aSock
  self._servers = [ServerWorker(n,aAddr,aSock,self._ctx) for n in range(4)]
  self._workers = [QueueWorker(n, self._abort, self._queue, self._ctx) for n in range(self._count)]
  self._idles   = [w._idle for w in self._workers]

 def close(self):
  """ Abort set abort state and inject dummy tasks to kill off workers. There might be running tasks so don't add more than enough """
  def dummy(): pass
  self._abort.set()
  self._abort = Event()
  try: self._sock.close()
  except: pass
  finally: self._sock = None
  active = self.alive()
  while active > 0:
   for x in range(0,active - self._queue.qsize()):
    self._queue.put((dummy,'FUNCTION',None,False,[],{}))
   while not self._queue.empty() and self.alive() > 0:
    sleep(0.1)
    self._workers = [x for x in self._workers if x.is_alive()]
   active = self.alive()

 def add_function(self, aFunction, *args, **kwargs):
  self._queue.put((aFunction,'FUNCTION',None,False,args,kwargs))

 def add_semaphore(self, aFunction, aSema, *args, **kwargs):
  aSema.acquire()
  self._queue.put((aFunction,'FUNCTION',aSema,False,args,kwargs))

 def add_transient(self, aTask, aSema = None):
  try:
   mod = import_module("rims.rest.%s"%aTask['module'])
   func = getattr(mod,aTask['func'],None)
  except: pass
  else:
   if aSema:
    aSema.acquire()
   self._queue.put((func,'TASK',aSema,aTask['output'],aTask['args'],None))

 def add_periodic(self, aTask, aFrequency):
  try:
   mod = import_module("rims.rest.%s"%aTask['module'])
   func = getattr(mod,aTask['func'],None)
  except: pass
  else:   self._scheduler.append(ScheduleWorker(aFrequency, func, aTask, self._queue, self._abort))

 def alive(self):
  return len([x for x in self._workers if x.is_alive()])

 def idles(self):
  return len([x for x in self._idles if x.is_set()])

 def queue_size(self):
  return self._queue.qsize()

 def scheduler_size(self):
  return len([x for x in self._scheduler if x.is_alive()])

 def scheduled_tasks(self):
  return [(x._task,x._freq) for x in self._scheduler]

 def semaphore(self,aSize):
  return BoundedSemaphore(aSize)

 def block(self,aSema,aSize):
  for i in range(aSize):
   aSema.acquire()

###################################### Workers ########################################
#

class ScheduleWorker(Thread):

 def __init__(self, aFrequency, aFunc, aTask, aQueue, aAbort):
  Thread.__init__(self)
  self._freq  = aFrequency
  self._queue = aQueue
  self._func  = aFunc
  self._task  = aTask
  self._abort = aAbort
  self.daemon = True
  self.name   = "ScheduleWorker(%s,%s)"%(aTask['id'],self._freq)
  self.start()

 def run(self):
  sleep(self._freq - int(time())%self._freq)
  while not self._abort.is_set():
   self._queue.put((self._func,'TASK',None,self._task['output'],self._task['args'],None))
   sleep(self._freq)
  return False

#
#
class QueueWorker(Thread):

 def __init__(self, aNumber, aAbort, aQueue, aContext):
  Thread.__init__(self)
  self._n      = aNumber
  self.name    = "QueueWorker(%02d)"%aNumber
  self._abort  = aAbort
  self._idle   = Event()
  self._queue  = aQueue
  self._ctx    = aContext.__clone__()
  self.daemon  = True
  self.start()

 def run(self):
  while not self._abort.is_set():
   try:
    self._idle.set()
    (func, mode, sema, output, args, kwargs) =  self._queue.get(True)
    self._idle.clear()
    result = func(*args,**kwargs) if mode == 'FUNCTION' else func(self._ctx, args)
    if output:
     self._ctx.log("%s - %s => %s"%(self.name,repr(func),dumps(result)))
   except Exception as e:
    self._ctx.log("%s - ERROR => %s"%(self.name,str(e)))
   finally:
    if sema:
     sema.release()
    self._queue.task_done()
  return False
 
#
#
class ServerWorker(Thread):

 def __init__(self, aNumber, aAddress, aSocket, aContext):
  Thread.__init__(self)
  self.name    = "ServerWorker(%02d)"%aNumber
  self.daemon  = True
  httpd        = HTTPServer(aAddress, SessionHandler, False)
  self._httpd  = httpd
  httpd.socket = aSocket
  httpd._ctx = self._ctx = aContext.__clone__()
  httpd.server_bind = httpd.server_close = lambda self: None
  self.start()

 def run(self):
  try: self._httpd.serve_forever()
  except: pass

 def shutdown(self):
  self._httpd.shutdown()

###################################### Session Handler ######################################
#
class SessionHandler(BaseHTTPRequestHandler):

 def __init__(self, *args, **kwargs):
  self._headers = {}
  self._body    = b'null'
  self._ctx     = args[2]._ctx
  BaseHTTPRequestHandler.__init__(self,*args, **kwargs)

 def header(self):
  # Sends X-Code as response
  self._headers.update({'X-Method':self.command,'Server':'RIMS Engine %s.%s'%(__version__,__build__),'Date':self.date_time_string()})
  code = self._headers.pop('X-Code',200)
  self.wfile.write(('HTTP/1.1 %s %s\r\n'%(code,self.responses.get(code,('Other','Server specialized return code'))[0])).encode('utf-8'))
  self._headers.update({'Content-Length':len(self._body),'Connection':'close'})
  for k,v in self._headers.items():
   try: self.send_header(k,v)
   except: self.send_header('X-Header-Error',k)
  self.end_headers()

 def do_GET(self):
  self.route()
  self.header()
  self.wfile.write(self._body)

 def do_POST(self):
  self.route()
  self.header()
  self.wfile.write(self._body)

 def route(self):
  """ Route request to the right function """
  path,_,query = (self.path.lstrip('/')).partition('/')
  if path in ['api','debug','external']:
   self.api(path,query)
  elif path in ['infra','images','files']:
   self.files(path,query)
  elif path == 'site' and len(query) > 0:
   self.site(query)
  elif path == 'auth':
   self.auth()
  elif path == 'system':
   self.system(query)
  else:
   self._headers.update({'X-Process':'no route','Location':'%s/site/system_portal'%(self._ctx.nodes[self._ctx.node]['url']),'X-Code':301})

 #
 #
 def api(self,path,query):
  """ API serves the REST functions x.y.z.a:<port>/api|debug|external/module/function
   - extra arguments can be sent as GET or using headers (using X-prefix in the latter case): log, node
   - default log is turned on: log=true
  """
  extras = {}
  (api,_,get) = query.partition('?')
  (mod,_,fun) = api.partition('/')
  self._ctx.analytics('modules',mod,fun)
  for part in get.split("&"):
   (k,_,v) = part.partition('=')
   extras[k] = v
  self._headers.update({'X-Module':mod, 'X-Function': fun,'Content-Type':"application/json; charset=utf-8",'Access-Control-Allow-Origin':"*",'X-Process':'API','X-Route':self.headers.get('X-Node',extras.get('node',self._ctx.node if not mod == 'system' else 'master'))})
  try:
   length = int(self.headers.get('Content-Length',0))
   args = loads(self.rfile.read(length).decode()) if length > 0 else {}
  except: args = {}
  if self.headers.get('X-Log',extras.get('log','true')) == 'true':
   try:
    with open(self._ctx.config['logs']['rest'], 'a') as f:
     f.write(str("%s: %s '%s' @%s(%s)\n"%(strftime('%Y-%m-%d %H:%M:%S', localtime()), api, dumps(args) if api != "system/task_worker" else "N/A", self._ctx.node, get.strip())))
   except: pass
  try:
   if self._headers['X-Route'] == self._ctx.node:
    module = import_module("rims.rest.%s"%mod) if not path == 'external' else self._ctx.external.get(mod)
    self._body = dumps(getattr(module,fun, lambda x,y: None)(self._ctx, args)).encode('utf-8')
   else:
    self._body = self._ctx.rest_call("%s/%s/%s"%(self._ctx.nodes[self._headers['X-Route']]['url'],path,query), aArgs = args, aDecode = False, aDataOnly = True)
  except Exception as e:
   if isinstance(e.args[0],dict) and e.args[0].get('code'):
    error = {'X-Args':args, 'X-Exception':e.args[0].get('exception'), 'X-Code':e.args[0]['code'], 'X-Info':e.args[0].get('info')}
   else:
    error = {'X-Args':args, 'X-Exception':type(e).__name__, 'X-Code':500, 'X-Info':','.join(map(str,e.args))}
   self._headers.update(error)
   mode = self.headers.get('X-Debug',extras.get('debug'))
   if mode  or path == 'debug':
    from traceback import format_exc
    tb = format_exc()
    if mode == 'print':
     print(tb)
    else:
     for n,v in enumerate(tb.split('\n')):
      self._headers["X-Debug-%02d"%n] = v

 #
 #
 def site(self,query):
  """ Site - serve AJAX information """
  api,_,get = query.partition('?')
  (mod,_,fun)    = api.partition('_')
  stream = Stream(self,get)
  self._headers.update({'Content-Type':'text/html; charset=utf-8','X-Code':200,'X-Process':'site'})
  try:
   module = import_module("rims.site.%s"%mod)
   getattr(module,fun,lambda x,y:None)(stream)
  except Exception as e:
   stream.wr("<DETAILS CLASS='web'><SUMMARY CLASS='red'>ERROR</SUMMARY>API:&nbsp; rims.site.%s<BR>"%(api))
   try:
    stream.wr("Type: %s<BR>Code: %s<BR><DETAILS open='open'><SUMMARY>Info</SUMMARY>"%(e.args[0]['exception'],e.args[0]['code']))
    try:
     keys = sorted(e.args[0]['info'].keys())
     for k in keys:
      stream.wr("%s: %s<BR>"%(k,e.args[0]['info'][k]))
    except: stream.wr(e.args[0]['info'])
    stream.wr("</DETAILS>")
   except:
    stream.wr("Type: %s<BR><DETAILS open='open'><SUMMARY>Info</SUMMARY><PRE>%s</PRE></DETAILS>"%(type(e).__name__,str(e)))
   stream.wr("<DETAILS><SUMMARY>Args</SUMMARY><CODE>%s</CODE></DETAILS>"%(",".join(stream._form.keys())))
   stream.wr("<DETAILS><SUMMARY>Cookie</SUMMARY><CODE>%s</CODE></DETAILS></DETAILS>"%(stream._cookies))
  self._body = stream.output().encode('utf-8')

 #
 #
 def files(self,path,query):
  """ Serve "common" system files and also route 'files' """
  query = unquote(query)
  self._ctx.analytics('files', path, query)
  self._headers['X-Process'] = 'files'
  if query.endswith(".js"):
   self._headers['Content-type']='application/javascript; charset=utf-8'
  elif query.endswith(".css"):
   self._headers['Content-type']='text/css; charset=utf-8'
  try:
   if not path == 'files':
    fullpath = ospath.join(self._ctx.path,path,query)
   else:
    param,_,file = query.partition('/')
    fullpath = ospath.join(self._ctx.settings['files'][param],file)
   if not fullpath.endswith("/"):
    if not path == 'files':
     self._body = cached_file_open(fullpath)
    else:
     with open(fullpath, 'rb') as file:
      self._body = file.read()
   else:
    self._headers['Content-type']='text/html; charset=utf-8'
    _, _, filelist = next(walk(fullpath), (None, None, []))
    self._body = ("<BR>".join("<A HREF='{0}'>{0}</A>".format(file) for file in filelist)).encode('utf-8')
  except Exception as e:
   self._headers.update({'X-Exception':str(e),'X-Query':query,'X-Path':path,'Content-type':'text/html; charset=utf-8','X-Code':404})
   self._body = b''

 #
 #
 def auth(self):
  """ Authenticate using node function instead of API """
  self._headers.update({'Content-type':'application/json; charset=utf-8','X-Process':'auth','X-Code':401})
  output = {}
  try:
   length = int(self.headers.get('Content-Length',0))
   args   = loads(self.rfile.read(length).decode()) if length > 0 else {}
   username, password = args['username'], args['password']
  except Exception as e:  output['error'] = {'argument':str(e)}
  else:
   if self._ctx.node == 'master':
    from rims.core.genlib import random_string
    from hashlib import md5
    from datetime import datetime,timedelta
    try:
     hash = md5()
     hash.update(password.encode('utf-8'))
     passcode = hash.hexdigest()
    except Exception as e: output['error'] = {'hash':str(e)}
    else:
     with self._ctx.db as db:
      if (db.do("SELECT id, theme FROM users WHERE alias = '%s' and password = '%s'"%(username,passcode)) == 1):
       output.update(db.get_row())
       output['token']   = random_string(16)
       output['expires'] = (datetime.utcnow() + timedelta(days=30)).strftime("%a, %d %b %Y %H:%M:%S GMT")
       self._headers['X-Code'] = 200
      else:
       output['error'] = {'authentication':'username and password combination not found','username':username,'passcode':passcode}
   else:
    try:
     output = self._ctx.rest_call("%s/auth"%(self._ctx.config['master']), aArgs = args, aDataOnly = True)
     self._headers['X-Code'] = 200
    except Exception as e:
     output = {'error':e.args[0]}
     self._headers['X-Code'] = output['code']
  output['node'] = self._ctx.node
  self._body = dumps(output).encode('utf-8')

 #
 #
 def system(self,query):
  """ /system/<op>/<args> """
  self._headers.update({'Content-type':'application/json; charset=utf-8','X-Process':'system'})
  op,_,arg = query.partition('/')
  if op == 'environment' and (len(arg) == 0 or self._ctx.node == 'master'):
   output = self._ctx.system_info(arg) if len(arg) > 0 else {'settings':self._ctx.settings,'nodes':self._ctx.nodes,'servers':self._ctx.servers,'config':self._ctx.config}
  elif op == 'sync' and arg != 'master' and arg in self._ctx.nodes.keys():
   try:    output = self._ctx.rest_call("%s/system/update"%(self._ctx.nodes[arg]['url']), aArgs = self._ctx.system_info(arg), aDataOnly = True)
   except: output = {'node':arg,'status':'SYNC_NOT_OK'}
  elif op == 'update':
   length = int(self.headers.get('Content-Length',0))
   if length > 0:
    args = loads(self.rfile.read(length).decode())
    self._ctx.settings.clear()
    self._ctx.settings.update(args.get('settings',{}))
    output = {'node':self._ctx.node,'status':'UPDATE_OK'}
   else:
    output = {'node':self._ctx.node,'status':'UPDATE_NOT_OK'}
  elif op == 'reload':
   res = self._ctx.module_reload()
   cached_file_open.cache_clear()
   output = {'modules':res}
  elif op == 'report':
   output = self._ctx.report()
  elif op == 'register':
   length = int(self.headers.get('Content-Length',0))
   args = loads(self.rfile.read(length).decode()) if length > 0 else {}
   params = {'node':arg,'url':"http://%s:%s"%(self.client_address[0],args['port']),'system':args.get('system','0')}
   with self._ctx.db as db:
    update = db.insert_dict('nodes',params,"ON DUPLICATE KEY UPDATE system = %(system)s, url = '%(url)s'"%params)
   output = {'update':update,'success':True}
  elif op == 'import':
   output = self._ctx.module_register(arg)
  elif op == 'shutdown':
   self._ctx.close()
   output = {'status':'OK','info':'shutdown in progress'}
  elif op == 'mode':
   self._ctx.config['mode'] = arg
   output = {'status':'OK'}
  else:
   output = {'status':'NOT_OK','info':'system/<import|register|environment|sync|reload>/<args: node|module_to_import> where import, environment without args and reload runs on any node'}
  self._body = dumps(output).encode('utf-8')

########################################### Web stream ########################################
#

class Stream(object):

 def __init__(self,aHandler, aGet):
  self._form = {}
  self._node = aHandler._ctx.node
  self._ctx  = aHandler._ctx
  self._body = []
  self._cookies = {}
  try: cookie_str = aHandler.headers['Cookie'].split('; ')
  except: pass
  else:
   for cookie in cookie_str:
    k,_,v = cookie.partition('=')
    try:    self._cookies[k] = dict(x.split('=') for x in v.split(','))
    except Exception as e:
     self._cookies[k] = v
  try:    body_len = int(aHandler.headers.get('Content-Length',0))
  except: body_len = 0
  if body_len > 0 or len(aGet) > 0:
   if body_len > 0:
    self._form.update({ k: l[0] for k,l in parse_qs(aHandler.rfile.read(body_len).decode(), keep_blank_values=1).items() })
   if len(aGet) > 0:
    self._form.update({ k: l[0] for k,l in parse_qs(aGet, keep_blank_values=1).items() })

 def __str__(self):
  return "<DETAILS CLASS='web blue'><SUMMARY>Web</SUMMARY>Web object<DETAILS><SUMMARY>Cookies</SUMMARY><CODE>%s</CODE></DETAILS><DETAILS><SUMMARY>Form</SUMMARY><CODE>%s</CODE></DETAILS></DETAILS>"%(str(self._cookies),self._form)

 def output(self):
  return ("".join(self._body))

 def wr(self,aHTML):
  self._body.append(aHTML)

 def url(self):
  return self._ctx.nodes[self._node]['url']

 def node(self):
  return self._node

 def cookie(self,aName):
  return self._cookies.get(aName,{})

 def args(self):
  return self._form

 def __getitem__(self,aKey):
  return self._form.get(aKey,None)

 def get(self,aKey,aDefault = None):
  return self._form.get(aKey,aDefault)

 def get_args(self,aExcept = []):
  return "&".join("%s=%s"%(k,v) for k,v in self._form.items() if not k in aExcept)

 def button(self,aImg,**kwargs):
  return "<A CLASS='btn btn-%s z-op small' %s></A>"%(aImg," ".join("%s='%s'"%i for i in kwargs.items()))

 def rest_call(self, aAPI, aArgs = None, aTimeout = 60):
  return self._ctx.rest_call("%s/%s/%s"%(self._ctx.nodes[self._node]['url'],self._ctx.config['mode'],aAPI), aArgs = aArgs, aTimeout = 60, aDataOnly = True)

 def rest_full(self, aURL, **kwargs):
  return self._ctx.rest_call(aURL, **kwargs)

 def put_html(self, aTitle = None, aIcon = 'rims.ico', aTheme = None):
  theme = self._ctx.config.get('theme','blue') if not aTheme else aTheme
  self._body.append("<!DOCTYPE html><HEAD><META CHARSET='UTF-8'><LINK REL='stylesheet' TYPE='text/css' HREF='../infra/4.21.0.vis.min.css' /><LINK REL='stylesheet' TYPE='text/css' HREF='../infra/system.css'><LINK REL='stylesheet' TYPE='text/css' HREF='../infra/theme.%s.css'>"%theme)
  if aTitle:
   self._body.append("<TITLE>%s</TITLE>"%aTitle)
  self._body.append("<LINK REL='shortcut icon' TYPE='image/png' HREF='../images/%s'/>"%(aIcon))
  self._body.append("<SCRIPT SRC='../infra/3.1.1.jquery.min.js'></SCRIPT><SCRIPT SRC='../infra/4.21.0.vis.min.js'></SCRIPT><SCRIPT SRC='../infra/system.js'></SCRIPT>")
  self._body.append("<SCRIPT>$(function() { $(document.body).on('click','.z-op',btn ) .on('focusin focusout','input, select',focus ) .on('input','.slider',slide_monitor); });</SCRIPT>")
  self._body.append("</HEAD>")

