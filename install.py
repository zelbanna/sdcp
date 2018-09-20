#!/usr/bin/python
# -*- coding: utf-8 -*-
"""Program docstring.

Installs System

"""
__author__ = "Zacharias El Banna"
__version__ = "4.0GA"
__status__ = "Production"

from sys import argv, stdout, path as syspath
from json import load,dump,dumps
from os import remove, chmod, listdir, path as ospath
pkgdir = ospath.abspath(ospath.dirname(__file__))
basedir = ospath.abspath(ospath.join(pkgdir,'..'))
syspath.insert(1, basedir)
res = {}

if len(argv) < 2:
 try:
  from zdcp.Settings import Settings as Old
 except:
  stdout.write("Usage: {} </path/json file>\n\n!!! Import DB structure from schema.db before installing !!!\n\n".format(argv[0]))
  exit(0)
 else:
  settingsfilename = Old['system']['config_file']
else:
 settingsfilename = argv[1]
 
############################################### ALL #################################################
#
# load settings
#
settings = {}
settingsfile = ospath.abspath(settingsfilename)
with open(settingsfile,'r') as sfile:
 temp = load(sfile)
for section,content in temp.iteritems():
 for key,params in content.iteritems():
  if not settings.get(section):
   settings[section] = {}
  settings[section][key] = params['value']
settings['system']['config_file'] = settingsfile

try:
 from zdcp import Settings as _
except:
 with open(ospath.join(pkgdir,'Settings.py'),'w') as f:
  f.write("Settings=%s\n"%dumps(settings))
 res['bootstrap'] = 'container'

############################################### ALL #################################################
#
# Write engine operations files
#
with open(ospath.abspath(ospath.join(pkgdir,'templates',settings['system']['template'])),'r') as f:
 template = f.read()
template = template.replace("%PKGDIR%",pkgdir)
with open(ospath.abspath(ospath.join(pkgdir,settings['system']['template'])),'w+') as f:
 f.write(template)
chmod(ospath.abspath(ospath.join(pkgdir,settings['system']['template'])),0755)
res['engine']= settings['system']['template']

############################################### ALL #################################################
#
# Modules
#
try:
 from pip import main as pipmain
except:
 from pip._internal import main as pipmain
try: import dns
except ImportError:
 res['dns'] = 'install'
 pipmain(["install", "-q","dns"])
try: import git
except ImportError:
 res['gitpython'] = 'install'
 pipmain(["install","-q","gitpython"])

############################################ MASTER ###########################################
#
# Install necessary modules
#
if settings['system']['id'] == 'master':
 from importlib import import_module

 try: import pymysql
 except ImportError:
  res['pymysql'] = 'install'
  pipmain(["install", "-q","pymysql"])
 try: import eralchemy
 except ImportError:
  res['gitpython'] = 'install'
  pipmain(["install","-q","eralchemy"])

 #
 # Device types
 #
 devdir = ospath.abspath(ospath.join(pkgdir,'devices'))
 device_types = []
 for file in listdir(devdir):
  pyfile = file[:-3]
  if file[-3:] == ".py" and pyfile[:2] != "__":
   try:
    mod = import_module("zdcp.devices.%s"%(pyfile))
    type = getattr(mod,'__type__',None)
    icon = getattr(mod,'__icon__','../images/viz-generic.png')
    dev = getattr(mod,'Device',None)
    if type:
     device_types.append({'name':pyfile, 'base':type, 'functions':dev.get_functions(),'icon':icon })
   except: pass
 res['device_found'] = len(device_types)
 res['device_new'] = 0

 #
 # Menu items
 #
 sitedir= ospath.abspath(ospath.join(pkgdir,'site'))
 resources = []
 for file in listdir(sitedir):
  pyfile = file[:-3]
  if file[-3:] == ".py" and pyfile[:2] != "__":
   try:
    mod  = import_module("zdcp.site.%s"%(pyfile))
    type = getattr(mod,'__type__',None)
    icon = getattr(mod,'__icon__',None)
    if type:
     resources.append({'name':pyfile, 'icon':icon, 'type':type})
   except: pass
 res['resources_new'] = 0


 #
 # Common settings and user - for master...
 #
 from zdcp.core.common import DB
 from zdcp.rest import mysql
 mysql.__add_globals__({'gSettings':settings})
 try:
  database,host,username,password = settings['system']['db_name'],settings['system']['db_host'],settings['system']['db_user'],settings['system']['db_pass']
  database_args = {'host':host,'username':username,'password':password,'database':database,'schema_file':ospath.join(pkgdir,'schema.db')}
  res['database']= {}
  res['database']['diff'] = mysql.diff(database_args)
  if res['database']['diff']['diffs'] > 0:
   res['database']['patch'] = mysql.patch(database_args)
   if res['database']['patch']['result'] == 'NOT_OK':
    stdout.write("Database patching failed!")
    if res['database']['patch'].get('database_restore_result') == 'OK':
     stdout.write("Restore should be OK - please check schema.db schema file\n")
    else:
     stdout.write("Restore failed too! Restore manually\n")
     exit(1)

  # Install DB bootstrap settings
  db = DB(database,host,username,password)
  db.connect()

  res['admin_user'] = (db.do("INSERT users (id,name,alias) VALUES(1,'Administrator','admin') ON DUPLICATE KEY UPDATE id = id") > 0)
  res['node_add'] = (db.do("INSERT nodes (node,url,system) VALUES('{0}','{1}',1) ON DUPLICATE KEY UPDATE system = 1, id = LAST_INSERT_ID(id)".format(settings['system']['id'],settings['system']['master'])) > 0)
  res['node_id']  = db.get_last_id()
  res['dns_server_add'] = (db.do("INSERT servers (node,server,type) VALUES ('master','nodns','DNS') ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)") > 0)
  res['dns_server_id']  = db.get_last_id()
  res['dns_domain_add'] = (db.do("INSERT domains (id,foreign_id,name,server_id,type ) VALUES (0,0,'local',{},'forward') ON DUPLICATE KEY UPDATE id = 0".format(res['dns_server_id'])) > 0)
  res['generic_device'] = (db.do("INSERT device_types (id,name,base) VALUES (0,'generic','generic') ON DUPLICATE KEY UPDATE id = 0") > 0)
  sql ="INSERT device_types (name,base,icon,functions) VALUES ('{0}','{1}','{2}','{3}') ON DUPLICATE KEY UPDATE icon = '{2}', functions = '{3}'"
  for type in device_types:
   try:    res['device_new'] += db.do(sql.format(type['name'],type['base'],type['icon'],",".join(type['functions'])))
   except Exception as err: res['device_errors'] = str(err)

  sql = "INSERT resources (node,title,href,icon,type,user_id,view) VALUES ('%s','{}','{}','{}','{}',1,0) ON DUPLICATE KEY UPDATE id = id"%settings['system']['id']
  for item in resources:
   try:    res['resources_new'] += db.do(sql.format(item['name'].title(),"%s_main"%item['name'],item['icon'],item['type']))
   except Exception as err:
    res['resources_errors'] = str(err)

  db.do("SELECT section,parameter,value FROM settings WHERE node = 'master'")
  data = db.get_rows()
  db.do("SELECT 'nodes' AS section, node AS parameter, url AS value FROM nodes")
  data.extend(db.get_rows())

  for setting in data:
   section = setting.pop('section')
   if not settings.get(section):
    settings[section] = {}
   settings[section][setting['parameter']] = setting['value']

  db.close()

  #
  # Generate ERD and save
  #
  erd_input = "mysql+pymysql://%s:%s@%s/%s"%(username,password,host,database)
  erd_output= ospath.join(pkgdir,'infra','zdcp.pdf')
  try:
   from eralchemy import render_er
   render_er(erd_input,erd_output)
   res['ERD'] = 'OK'
  except Exception as e:
   res['ERD'] = str(e)

 except Exception as e:
  stdout.write("\nError in setting up database, make sure that configured user has access:\n\n")
  stdout.write("CREATE USER '%s'@'localhost' IDENTIFIED BY '%s';\n"%(settings['system']['db_user'],settings['system']['db_pass']))
  stdout.write("GRANT ALL PRIVILEGES ON %s.* TO '%s'@'localhost';\n"%(settings['system']['db_name'],settings['system']['db_user']))
  stdout.write("FLUSH PRIVILEGES;\n\n")
  stdout.flush()
  raise Exception("DB past error (%s)"%str(e))

else:
 ########################################## NON-MASTER REST ########################################
 #
 # Fetch and update settings from central repo
 #
 from zdcp.core.common import rest_call
 try: res['register'] = rest_call("%s/register"%settings['system']['master'],{'node':settings['system']['id'],'port':settings['system']['port'],'system':'1'})['data']
 except Exception as e: res['register'] = str(e)
 try: master   = rest_call("%s/api/system_settings_fetch"%settings['system']['master'],{'node':settings['system']['id']})['data']
 except Exception as e: ret['fetch'] = str(e)
 else:
  if master:
   for section,content in master.iteritems():
    if settings.get(section): settings[section].update(content)
    else: settings[section] = content


#
# Write complete settings containers
#
try:
 with open(ospath.join(pkgdir,'Settings.py'),'w') as f:
  f.write("Settings=%s\n"%dumps(settings))
  res['container'] = 'OK'
except Exception as e:
 res['container'] = str(e)

############################################### ALL #################################################
#
# End
#
stdout.write(dumps(res,indent=4,sort_keys=True))
stdout.write('\n')
exit(0 if res.get('res') == 'OK' else 1)
