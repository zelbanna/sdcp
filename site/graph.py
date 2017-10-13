"""Module docstring.

Ajax Graph calls module

"""
__author__= "Zacharias El Banna"                     
__version__ = "17.10.4"
__status__= "Production"

############################################ GRAPHS ##########################################
#
def list(aWeb):
 from sdcp.core.dbase import DB
 id    = aWeb.get_value('id')
 state = aWeb.get_value('state')

 with DB() as db:
  if id and state:
   db.do("UPDATE devices SET graph_update = '{1}' WHERE id = '{0}'".format(id,1 if state == '0' else 0))
  db.do("SELECT devices.id, INET_NTOA(ip) as ip, hostname, INET_NTOA(graph_proxy) AS proxy ,graph_update, domains.name AS domain FROM devices INNER JOIN domains ON devices.a_dom_id = domains.id ORDER BY hostname")
  rows = db.get_rows()
 print "<DIV CLASS=z-frame>"
 print "<DIV CLASS=title>Graphing</DIV>"
 print "<A TITLE='Reload'   CLASS='z-btn z-small-btn z-op' DIV=div_content_left  URL='index.cgi?call=graph_list'><IMG SRC='images/btn-reboot.png'></A>"
 print "<A TITLE='Save'     CLASS='z-btn z-small-btn z-op' DIV=div_content_right URL='index.cgi?call=graph_save'><IMG SRC='images/btn-save.png'></A>"
 print "<A TITLE='Discover' CLASS='z-btn z-small-btn z-op' DIV=div_content_right SPIN=true URL='index.cgi?call=graph_discover'><IMG SRC='images/btn-search.png'></A>"
 print "<DIV CLASS=z-table style='width:99%'>"
 print "<DIV CLASS=thead><DIV CLASS=th>FQDN</DIV><DIV CLASS=th>Proxy</DIV><DIV CLASS=th TITLE='Include in graphing?'>Include</DIV></DIV>"
 print "<DIV CLASS=tbody>"
 for row in rows:
  print "<DIV CLASS=tr>"
  if row['graph_update']:
   print "<DIV CLASS=td><A CLASS=z-op TITLE='Show graphs for {1}' DIV=div_content_right URL='/munin-cgi/munin-cgi-html/{0}/{1}/index.html'>{1}.{0}</A></DIV>".format(row['domain'],row['hostname'])
   print "<DIV CLASS=td><A CLASS=z-op DIV=div_content_right URL=index.cgi?call=graph_set_proxy&id={0}&proxy={1}&ip={2}>{1}</A></DIV>".format(row['id'],row['proxy'],row['ip'])
  else:
   print "<DIV CLASS=td>{0}.{1}</DIV>".format(row['hostname'],row['domain'])
   print "<DIV CLASS=td>{0}</A></DIV>".format(row['proxy'])
  print "<DIV CLASS=td TITLE='Include in graphing?'><A CLASS='z-btn z-small-btn z-op' DIV=div_content_left URL=index.cgi?call=graph_list&id={}&state={}><IMG SRC=images/btn-{}.png></A>&nbsp;</DIV>".format(row['id'],row['graph_update'],"start" if row['graph_update'] else "shutdown")
  print "</DIV>"
 print "</DIV></DIV></DIV>"

#
# Modify proxy
#
def set_proxy(aWeb):
 id    = aWeb.get_value('id')
 proxy = aWeb.get_value('proxy')
 ip    = aWeb.get_value('ip')
 op = aWeb.get_value('op')
 if op == 'update':
  from sdcp.core.dbase import DB
  with DB() as db:
   db.do("UPDATE devices SET graph_proxy = INET_ATON('{0}') WHERE id = '{1}'".format(proxy,id))
   db.commit()
 print "<DIV CLASS=z-frame>"
 print "<DIV CLASS=title>Update Proxy ({})</DIV>".format(ip)
 print "<FORM ID=graph_proxy_form>"
 print "<INPUT TYPE=HIDDEN NAME=id VALUE={}>".format(id)
 print "<INPUT TYPE=HIDDEN NAME=ip VALUE={}>".format(ip)
 print "<DIV CLASS=z-table><DIV CLASS=tbody>"
 print "<DIV CLASS=tr><DIV CLASS=td>Proxy:</DIV><DIV CLASS=td><INPUT TYPE=TEXT NAME=proxy STYLE='border:1px solid grey; width:200px;' VALUE='{}'></DIV></DIV>".format(proxy)
 print "</DIV></DIV>"
 print "<A TITLE='Update proxy' CLASS='z-btn z-op z-small-btn' DIV=div_content_right URL=index.cgi?call=graph_set_proxy&op=update FRM=graph_proxy_form><IMG SRC='images/btn-save.png'></A>"
 print "</DIV>"

#
# Find graphs
#
def discover(aWeb):
 from sdcp.tools.munin import discover as graph_discover
 graph_discover()

#
# Generate output for munin, until we have other types
#
def save(aWeb):
 from sdcp.core.dbase import DB
 import sdcp.PackageContainer as PC
 with DB() as db:
  db.do("SELECT hostname, INET_NTOA(graph_proxy) AS proxy, domains.name AS domain FROM devices INNER JOIN domains ON domains.id = devices.a_dom_id WHERE graph_update = 1")
  rows = db.get_rows()
 with open(PC.sdcp['graph']['file'],'w') as output:
  for row in rows:
   output.write("[{}.{}]\n".format(row['hostname'],row['domain']))
   output.write("address {}\n".format(row['proxy']))
   output.write("update yes\n\n")
 print "<DIV CLASS=z-frame>Done updating devices' graphing to conf file</DIV>"

#
# Weathermap Link
#
def wm(aWeb):
 indx = aWeb.get_value('index')
 name = aWeb.get_value('hostname')
 snmpname = name.replace('-','_')
 dom  = aWeb.get_value('domain')
 desc = aWeb.get_value('desc',"LNK"+indx)
 gstr = "munin-cgi/munin-cgi-graph/{1}/{0}.{1}/snmp_{2}_{1}_if_{3}-day.png".format(name,dom,snmpname,indx)
 print "<DIV CLASS=z-frame><PRE style='font-size:10px;'>"
 print "LINK {}-{}".format(name,desc)
 print "\tINFOURL " +  gstr
 print "\tOVERLIBGRAPH " + gstr
 print "\tBWLABEL bits"
 print "\tTARGET {1}/{0}.{1}-snmp_{2}_{1}_if_{3}-recv-d.rrd {1}/{0}.{1}-snmp_{2}_{1}_if_{3}-send-d.rrd:-:42".format(name,dom,snmpname,indx)
 print "</PRE></DIV>"