"""HTML5 Ajax Device module"""
__author__= "Zacharias El Banna"
__icon__ = 'icon-network.png'
__type__ = 'menuitem'

########################################## Device Operations ##########################################
#
#
def main(aWeb):
 aWeb.wr("<NAV><UL>")
 aWeb.wr("<LI CLASS='dropdown'><A>Devices</A><DIV CLASS='dropdown-content'>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='device_list?{0}'>List</A>".format(aWeb.get_args()))
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='device_search'>Search</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='device_type_list'>Types</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='device_model_list'>Models</A>")
 aWeb.wr("</DIV></LI>")
 aWeb.wr("<LI><A CLASS=z-op DIV=div_content_left URL='visualize_list'>Maps</A></LI>")
 if aWeb['rack']:
  data = aWeb.rest_call("rack/inventory",{'id':aWeb['rack']})
  for type in ['pdu','console']:
   if len(data[type]) > 0:
    aWeb.wr("<LI CLASS='dropdown'><A>%s</A><DIV CLASS='dropdown-content'>"%(type.title()))
    for row in data[type]:
     aWeb.wr("<A CLASS=z-op DIV=div_content_left SPIN=true URL='%s_inventory?ip=%s'>%s</A>"%(row['type'],row['ip'],row['hostname']))
    aWeb.wr("</DIV></LI>")
  if data.get('name'):
   aWeb.wr("<LI><A CLASS='z-op' DIV=div_content_right  URL='racks_inventory?rack=%s'>'%s'</A></LI>"%(aWeb['rack'],data['name']))
 aWeb.wr("<LI CLASS='dropdown'><A>OUI</A><DIV CLASS='dropdown-content'>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_right URL='device_oui_search'>Search</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_right URL='device_oui_list' SPIN=true>List</A>")
 aWeb.wr("</DIV></LI>")
 aWeb.wr("<LI><A CLASS='z-op reload' DIV=main URL='device_main?{}'></A></LI>".format(aWeb.get_args()))
 aWeb.wr("<LI CLASS='right'><A CLASS=z-op DIV=div_content URL='reservations_list'>Reservations</A></LI>")
 aWeb.wr("<LI CLASS='right dropdown'><A>IPAM</A><DIV CLASS='dropdown-content'>")
 aWeb.wr("<A CLASS=z-op DIV=div_content      URL='servers_list?type=DHCP'>Servers</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='ipam_network_list'>Networks</A>")
 aWeb.wr("</DIV></LI>")
 aWeb.wr("<LI CLASS='right dropdown'><A>DNS</A><DIV CLASS='dropdown-content'>")
 aWeb.wr("<A CLASS=z-op DIV=div_content      URL='servers_list?type=DNS'>Servers</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='dns_domain_list'>Domains</A>")
 aWeb.wr("</DIV></LI>")
 aWeb.wr("<LI CLASS='right dropdown'><A>Rack</A><DIV CLASS='dropdown-content'>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='racks_list'>Racks</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='racks_list_infra?type=pdu'>PDUs</A>")
 aWeb.wr("<A CLASS=z-op DIV=div_content_left URL='racks_list_infra?type=console'>Consoles</A>")
 aWeb.wr("</DIV></LI>")
 aWeb.wr("</UL></NAV>")
 aWeb.wr("<SECTION CLASS=content       ID=div_content>")
 aWeb.wr("<SECTION CLASS=content-left  ID=div_content_left></SECTION>")
 aWeb.wr("<SECTION CLASS=content-right ID=div_content_right></SECTION>")
 aWeb.wr("</SECTION>")

#
#
def list(aWeb):
 args = aWeb.args()
 args['sort'] = aWeb.get('sort','hostname')
 translate = {0:'grey',1:'green',2:'red',3:'orange'}
 res = aWeb.rest_call("device/list",args)
 aWeb.wr("<ARTICLE><P>Device List</P>")
 aWeb.wr(aWeb.button('reload', DIV='div_content_left',  URL='device_list?%s'%aWeb.get_args(), TITLE='Reload'))
 aWeb.wr(aWeb.button('items',  DIV='div_content_left',  URL='device_list?sort=%s'%args['sort'], TITLE='List All'))
 aWeb.wr(aWeb.button('search', DIV='div_content_left',  URL='device_search', TITLE='Search'))
 aWeb.wr(aWeb.button('add',    DIV='div_content_right', URL='device_new?%s'%aWeb.get_args(), TITLE='Add device'))
 aWeb.wr(aWeb.button('devices',DIV='div_content_right', URL='device_discover', TITLE='Discover'))
 aWeb.wr("<DIV CLASS=table><DIV CLASS=thead>")
 for sort in ['IP','Hostname']:
  aWeb.wr("<DIV CLASS=th><A CLASS=z-op DIV=div_content_left URL='device_list?sort=%s&%s'>%s<SPAN STYLE='font-size:14px; color:%s;'>&darr;</SPAN></A></DIV>"%(sort.lower(),aWeb.get_args(['sort']),sort,"black" if not sort.lower() == args['sort'] else "red"))
 aWeb.wr("<DIV CLASS=th STYLE='width:30px;'>&nbsp;</DIV></DIV><DIV CLASS=tbody>")
 for row in res['data']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s</DIV><DIV CLASS=td STYLE='max-width:180px; overflow-x:hidden'><A CLASS=z-op DIV=div_content_right URL='device_info?id=%i' TITLE='%s'>%s</A></DIV><DIV CLASS=td><DIV CLASS='state %s' /></DIV></DIV>"%(row['ip'],row['id'],row['id'], row['hostname'], translate.get(row['state'],'orange')))
 aWeb.wr("</DIV></DIV></ARTICLE>")

#
#
def oui_search(aWeb):
 args = aWeb.args()
 aWeb.wr("<ARTICLE>")
 aWeb.wr("<FORM ID=oui_form>Type OUI or MAC address to find OUI/company name: <INPUT CLASS='background' TYPE=TEXT REQUIRED TYPE=TEXT NAME='oui' STYLE='width:100px' VALUE='%s'></FORM>"%args.get('oui','00:00:00'))
 aWeb.wr(aWeb.button('search',  DIV='div_content_right', URL='device_oui_search?op=find',   FRM='oui_form', TITLE='Find OUI'))
 aWeb.wr("</ARTICLE>")
 if args.get('op') == 'find':
  res = aWeb.rest_call("system/oui_info",{'oui':args['oui']})
  aWeb.wr("<ARTICLE CLASS='info'><DIV CLASS=table><DIV CLASS=tbody><DIV CLASS=tr><DIV CLASS=td>OUI:</DIV><DIV CLASS=td>%s</DIV></DIV><DIV CLASS=tr><DIV CLASS=td>Company:</DIV><DIV CLASS=td>%s</DIV></DIV></DIV></DIV></ARTICLE>"%(res['oui'],res['company']))

#
#
def oui_list(aWeb):
 args = aWeb.args()
 res = aWeb.rest_call("system/oui_list",args)
 aWeb.wr("<ARTICLE><P>OUI</P>")
 aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Id</DIV><DIV CLASS=th>Company</DIV></DIV><DIV CLASS=tbody>")
 for oui in res['data']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV></DIV>"%(":".join(oui['oui'][i:i+2] for i in [0,2,4]),oui['company']))
 aWeb.wr("</DIV></DIV></ARTICLE>")

#
#
def tasks(aWeb):
 aWeb.wr("<ARTICLE><P>Device Tasks</P>")
 aWeb.wr("To be defined")
 aWeb.wr("</ARTICLE>")
 
#
#
def report(aWeb):
 args = aWeb.args()
 res = aWeb.rest_call("device/list",{'extra': ['system', 'type', 'mac','oui']})
 aWeb.wr("<ARTICLE><P>Devices</P>")
 aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Id</DIV><DIV CLASS=th>Device</DIV><DIV CLASS=th>Domain</DIV><DIV CLASS=th>IP</DIV><DIV CLASS=th>MAC</DIV><DIV CLASS=th>OUI</DIV><DIV CLASS=th>Model</DIV><DIV CLASS=th>OID</DIV><DIV CLASS=th>Serial</DIV><DIV CLASS=th>State</DIV></DIV><DIV CLASS=tbody>")
 for dev in res['data']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%(id)s</DIV><DIV CLASS=td>%(hostname)s</DIV><DIV CLASS=td>%(domain)s</DIV><DIV CLASS=td>%(ip)s</DIV><DIV CLASS=td>%(mac)s</DIV><DIV CLASS=td>%(oui)s</DIV><DIV CLASS=td>%(model)s</DIV><DIV CLASS=td>%(oid)s</DIV><DIV CLASS=td>%(serial)s</DIV>"%dev)
  aWeb.wr("<DIV CLASS=td><DIV CLASS='state %s' /></DIV></DIV>"%{0:'grey',1:'green',2:'red'}.get(dev['state'],0))
 aWeb.wr("</DIV></DIV></ARTICLE>")

#
#
def search(aWeb):
 aWeb.wr("<ARTICLE><P>Device Search</P>")
 aWeb.wr("<FORM ID='device_search'>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=sort VALUE='hostname'>")
 aWeb.wr("<SPAN>Field:</SPAN><SELECT CLASS='background' ID='field' NAME='field'><OPTION VALUE='hostname'>Hostname</OPTION><OPTION VALUE='type'>Type</OPTION><OPTION VALUE='ip'>IP</OPTION><OPTION VALUE='mac'>MAC</OPTION><OPTION VALUE='id'>ID</OPTION><OPTION VALUE='mac'>MAC</OPTION><OPTION VALUE='ipam_id'>IPAM ID</OPTION></SELECT>")
 aWeb.wr("<INPUT CLASS='background' TYPE=TEXT ID='search' NAME='search' STYLE='width:200px' REQUIRED>")
 aWeb.wr("</FORM><DIV CLASS=inline>")
 aWeb.wr(aWeb.button('search', DIV='div_content_left', URL='device_list', FRM='device_search'))
 aWeb.wr(aWeb.button('items',  DIV='div_content_left', URL='device_list', TITLE='List All items'))
 aWeb.wr("</DIV>")
 aWeb.wr("</ARTICLE>")

#
#
def info(aWeb):
 cookie = aWeb.cookie('rims')
 args = aWeb.args()
 args['extra'] = ['types']
 dev = aWeb.rest_call("device/info",args)
 if not dev['found']:
  aWeb.wr("<ARTICLE>Warning - device with either id:[{}]/ip[{}]: does not exist</ARTICLE>".format(aWeb['id'],aWeb['ip']))
  return
 """ 3 parallell tables """
 width = 700 if (dev.get('rack') and not dev['info']['type_base'] == 'pdu') or dev.get('vm') else 480
 aWeb.wr("<ARTICLE CLASS='info' STYLE='position:relative; height:268px; width:%spx;'><P TITLE='%s'>Device Info</P>"%(width,dev['id']))
 aWeb.wr("<FORM ID=info_form>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id VALUE={}>".format(dev['id']))
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=ip VALUE={}>".format(dev['ip']))
 aWeb.wr("<!-- Reachability Info -->")
 aWeb.wr("<DIV STYLE='margin:3px; float:left;'><DIV CLASS=table STYLE='width:210px;'><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Name:  </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['hostname'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Domain:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['domain'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>IP:    </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['ip'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>ID:    </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['id'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>SNMP:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['snmp'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Version:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['version'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>State:</DIV><DIV CLASS=td><DIV CLASS='state %s' /></DIV></DIV>"%dev['state'])
 aWeb.wr("</DIV></DIV></DIV>")
 aWeb.wr("<!-- Additional info -->")
 aWeb.wr("<DIV STYLE='margin:3px; float:left;'><DIV CLASS=table STYLE='width:227px;'><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr ID=div_reservation_info><DIV CLASS=td>Reserve:</DIV>")
 if dev['info']['type_name'] == 'controlplane':
  aWeb.wr("<DIV CLASS=td>N/A</DIV>")
 elif dev.get('reservation'):
  aWeb.wr("<DIV CLASS='td %s'>"%("red" if dev['reservation']['valid'] else "orange"))
  aWeb.wr(dev['reservation']['alias'] if dev['reservation']['user_id'] != int(cookie['id']) else "<A CLASS=z-op DIV=div_reservation_info URL='reservations_update?op=drop&id=%s'>%s</A>"%(dev['id'],dev['reservation']['alias']))
  aWeb.wr("</DIV>")
 else:
  aWeb.wr("<DIV CLASS='td green'><A CLASS=z-op DIV=div_reservation_info URL='reservations_update?op=reserve&id=%s'>Available</A></DIV>"%dev['id'])
 aWeb.wr("</DIV>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>MAC:   </DIV><DIV CLASS=td><INPUT TYPE=TEXT NAME=mac VALUE='%s'></DIV></DIV>"%dev['info']['mac'].upper())
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>VM:    </DIV><DIV CLASS=td><INPUT NAME=vm TYPE=checkbox VALUE=1 {0}></DIV></DIV>".format("checked=checked" if dev['info']['vm'] else ""))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Type:</DIV>")
 if dev.get('types'):
  aWeb.wr("<DIV CLASS=td><SELECT NAME=type_id>")
  for type in dev['types']:
   extra = " selected" if dev['info']['type_id'] == type['id'] else ""
   aWeb.wr("<OPTION VALUE={0} {1}>{2}</OPTION>".format(type['id'],extra,type['name']))
  aWeb.wr("</SELECT></DIV>")
 else:
  aWeb.wr("<DIV CLASS=td>%s</DIV>"%dev['info']['type_name'])
 aWeb.wr("</DIV>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Model: </DIV><DIV CLASS=td STYLE='max-width:150px;'><INPUT TYPE=TEXT NAME=model VALUE='%s'></DIV></DIV>"%(dev['info']['model']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>S/N: </DIV><DIV CLASS=td><INPUT TYPE=TEXT NAME=serial VALUE='%s'></DIV></DIV>"%(dev['info']['serial']))
 aWeb.wr("</DIV></DIV></DIV>")
 if dev.get('rack') and not dev['info']['type_base'] == 'pdu':
  aWeb.wr("<!-- Rack Info -->")
  aWeb.wr("<DIV STYLE='margin:3px; float:left;'><DIV CLASS=table STYLE='width:230px;'><DIV CLASS=tbody>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Rack/Pos: </DIV><DIV CLASS=td>%s (%s)</DIV></DIV>"%(dev['rack']['rack_name'],dev['rack']['rack_unit']))
  if not dev['info']['type_base'] == 'controlplane':
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Size:    </DIV><DIV CLASS=td>%s U</DIV></DIV>"%(dev['rack']['rack_size']))
  if not dev['info']['type_base'] == 'console':
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>TS/Port: </DIV><DIV CLASS=td>%s (%s)</DIV></DIV>"%(dev['rack']['console_name'],dev['rack']['console_port']))
  for count,pem in enumerate(dev['pems'],0):
   if count < 4:
    aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s PDU: </DIV><DIV CLASS=td>%s (%s)</DIV></DIV>"%(pem['name'],pem['pdu_name'], pem['pdu_unit']))
  aWeb.wr("</DIV></DIV></DIV>")
 elif dev.get('vm'):
  aWeb.wr("<!-- VM Info -->")
  aWeb.wr("<DIV STYLE='margin:3px; float:left;'><DIV CLASS=table STYLE='max-width:230px;'><DIV CLASS=tbody>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>VM Name:</DIV><DIV CLASS='td readonly small-text' STYLE='max-width:170px;'>%s</DIV></DIV>"%dev['vm']['name'])
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>VM Host:</DIV><DIV CLASS='td readonly small-text' STYLE='max-width:170px;'>%s</DIV></DIV>"%dev['vm']['host'])
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td TITLE='Device UUID'>UUID:</DIV><DIV CLASS='td readonly small-text' STYLE='max-width:170px;'>%s</DIV></DIV>"%dev['vm']['device_uuid'])
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td TITLE='Management UUID'>MGMT:</DIV><DIV CLASS='td readonly small-text' STYLE='max-width:170px;'>%s</DIV></DIV>"%dev['vm']['server_uuid'])
  aWeb.wr("<!-- Config: %s -->"%dev['vm']['config'])
  aWeb.wr("</DIV></DIV></DIV>")
 aWeb.wr("<!-- Text fields -->")
 aWeb.wr("<DIV STYLE='display:block; clear:both; margin-bottom:3px; margin-top:1px; width:99%;'><DIV CLASS=table><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS='tr even'><DIV CLASS=td>Comments:</DIV><DIV CLASS=td><INPUT CLASS=odd TYPE=TEXT NAME=comment VALUE='{}'></DIV></DIV>".format("" if not dev['info']['comment'] else dev['info']['comment']))
 aWeb.wr("<DIV CLASS='tr even'><DIV CLASS=td>Web UI:</DIV><DIV CLASS=td><INPUT CLASS=odd TYPE=TEXT NAME=url VALUE='{}'></DIV></DIV>".format("" if not dev['info']['url'] else dev['info']['url']))
 aWeb.wr("</DIV></DIV></DIV>")
 aWeb.wr("</FORM>")
 aWeb.wr(aWeb.button('reload',     DIV='div_content_right',URL='device_info?id=%i'%dev['id']))
 aWeb.wr(aWeb.button('save',       DIV='div_content_right',URL='device_info?op=update', FRM='info_form', TITLE='Save Basic Device Information'))
 aWeb.wr(aWeb.button('trash',      DIV='div_content_right',URL='device_delete?id=%i'%dev['id'], MSG='Are you sure you want to delete device?', TITLE='Delete device',SPIN='true'))
 aWeb.wr(aWeb.button('edit',       DIV='div_content_right',URL='device_extended?id=%i'%dev['id'], TITLE='Extended Device Information'))
 aWeb.wr(aWeb.button('start',      DIV='div_dev_data',     URL='device_control?id=%s'%dev['id'], TITLE='Device Control'))
 aWeb.wr(aWeb.button('search',     DIV='div_content_right',URL='device_info?op=lookup', FRM='info_form', TITLE='Lookup and Detect Device information', SPIN='true'))
 aWeb.wr(aWeb.button('document',   DIV='div_dev_data',     URL='device_conf_gen?id=%i'%(dev['id']),TITLE='Generate System Conf'))
 aWeb.wr(aWeb.button('logs',       DIV='div_dev_data',     URL='device_events?id=%i'%(dev['id']),TITLE='Device events'))
 aWeb.wr(aWeb.button('connections',DIV='div_dev_data',     URL='device_interface_list?device=%i'%(dev['id']),TITLE='Device interfaces'))
 aWeb.wr(aWeb.button('network',    DIV='div_content_right',URL='visualize_network?type=device&id=%s'%(dev['id']), SPIN='true', TITLE='Network map'))
 aWeb.wr(aWeb.button('term',TITLE='SSH',HREF='ssh://%s@%s'%(dev['username'],dev['ip'])))
 if dev.get('rack') and dev['rack'].get('console_ip') and dev['rack'].get('console_port'):
  # Hardcoded port to 60xx
  aWeb.wr(aWeb.button('term',TITLE='Console', HREF='telnet://%s:%i'%(dev['rack']['console_ip'],6000+dev['rack']['console_port'])))
 if dev['info'].get('url'):
  aWeb.wr(aWeb.button('ui',TITLE='WWW', TARGET='_blank', HREF=dev['info'].get('url')))
 aWeb.wr("<SPAN CLASS='results' ID=update_results>%s</SPAN>"%str(dev.get('update','')))
 aWeb.wr("</ARTICLE>")
 aWeb.wr("<!-- Function navbar and content -->")
 aWeb.wr("<NAV><UL>")
 for fun in dev['info']['functions'].split(','):
  if fun == 'manage':
   aWeb.wr("<LI><A CLASS=z-op DIV=main URL='%s_manage?id=%i'>Manage</A></LI>"%(dev['info']['type_name'],dev['id']))
  else:
   aWeb.wr("<LI><A CLASS=z-op DIV=div_dev_data SPIN=true URL='device_function?ip={0}&type={1}&op={2}'>{3}</A></LI>".format(dev['ip'], dev['info']['type_name'], fun, fun.title()))
 aWeb.wr("</UL></NAV>")
 aWeb.wr("<SECTION CLASS='content' ID=div_dev_data STYLE='top:308px; overflow-x:hidden; overflow-y:auto;'></SECTION>")

####################################### UPDATE INFO ###################################
#
#
def extended(aWeb):
 args = aWeb.args()
 dev = aWeb.rest_call("device/extended",args)
 domains = aWeb.rest_call("dns/domain_list",{'filter':'forward'})['domains']

 aWeb.wr("<ARTICLE CLASS='info'><P>Extended Info</P>")
 aWeb.wr("<FORM ID=info_form>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id VALUE={}>".format(dev['id']))
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=ip VALUE={}>".format(dev['ip']))
 aWeb.wr("<!-- Reachability Info -->")
 aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Name:</DIV><DIV CLASS=td><INPUT NAME=hostname TYPE=TEXT VALUE='%s'></DIV></DIV>"%(dev['info']['hostname']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Domain:</DIV><DIV CLASS=td><SELECT NAME=a_dom_id>")
 for dom in domains:
  extra = " selected" if dev['info']['a_dom_id'] == dom['id'] else ""
  aWeb.wr("<OPTION VALUE='%s' %s>%s</OPTION>"%(dom['id'],extra,dom['name']))
 aWeb.wr("</SELECT></DIV></DIV>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td TITLE='IP of primary interface'>IP:</DIV><DIV CLASS=td><INPUT NAME=ip TYPE=TEXT VALUE='%s'></DIV><DIV CLASS=td>"%(dev['ip']))
 aWeb.wr(aWeb.button('sync',DIV='div_content_right', FRM='info_form', URL='device_update_ip?id=%s'%dev['id'], TITLE='Modify IP'))
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>IP OUI:  </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['oui'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Priv OID:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['oid'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>IPAM ID: </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['ipam_id'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>LLDP MAC:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['mac'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>A ID:    </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['a_id'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>PTR ID:  </DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%dev['info']['ptr_id'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Notifications:</DIV><DIV CLASS=td><INPUT NAME=notify TYPE=checkbox VALUE=1 {0}></DIV></DIV>".format("checked=checked" if dev['info']['notify'] == 1 else ""))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>&nbsp;</DIV><DIV CLASS=td>&nbsp;</DIV></DIV>")
 aWeb.wr("<!-- Rack Info -->")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Rack:</DIV><DIV CLASS=td><SELECT NAME=rack_info_rack_id>")
 for rack in dev['infra']['racks']:
  extra = " selected" if ((not dev.get('rack') and rack['id'] == 'NULL') or (dev.get('rack') and dev['rack']['rack_id'] == rack['id'])) else ""
  aWeb.wr("<OPTION VALUE={0} {1}>{2}</OPTION>".format(rack['id'],extra,rack['name']))
 aWeb.wr("</SELECT></DIV></DIV>")
 if dev.get('rack') and not dev['info']['type_base'] == 'pdu':
  if not dev['info']['type_base'] == 'controlplane':
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Rack Size:</DIV><DIV CLASS=td><INPUT NAME=rack_info_rack_size TYPE=TEXT VALUE='{}'></DIV></DIV>".format(dev['rack']['rack_size']))
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td TITLE='Top rack unit of device placement'>Rack Unit:</DIV><DIV CLASS=td><INPUT NAME=rack_info_rack_unit TYPE=TEXT VALUE='{}'></DIV></DIV>".format(dev['rack']['rack_unit']))
  if not dev['info']['type_base'] == 'console':
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>TS:</DIV><DIV CLASS=td><SELECT NAME=rack_info_console_id>")
   for console in dev['infra']['consoles']:
    extra = " selected='selected'" if (dev['rack']['console_id'] == console['id']) or (not dev['rack']['console_id'] and console['id'] == 'NULL') else ""
    aWeb.wr("<OPTION VALUE={0} {1}>{2}</OPTION>".format(console['id'],extra,console['hostname']))
   aWeb.wr("</SELECT></DIV></DIV>")
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td TITLE='Console port in rack TS'>TS Port:</DIV><DIV CLASS=td><INPUT NAME=rack_info_console_port TYPE=TEXT VALUE='{}'></DIV></DIV>".format(dev['rack']['console_port']))
  if not dev['info']['type_base'] == 'controlplane':
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>&nbsp;</DIV><DIV CLASS=td><CENTER>Add PEM<CENTER></DIV><DIV CLASS=td>")
   aWeb.wr(aWeb.button('add',DIV='div_content_right',URL='device_extended?op=add_pem&id=%s'%(dev['id']), TITLE='Add PEM'))
   aWeb.wr("</DIV></DIV>")
   for pem in dev['pems']:
    aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>PEM:</DIV><DIV CLASS=td><INPUT TYPE=TEXT NAME=pems_%(id)s_name VALUE='%(name)s'></DIV><DIV CLASS=td>"%(pem))
    aWeb.wr(aWeb.button('delete',DIV='div_content_right',URL='device_extended?op=remove_pem&id=%s&pem_id=%s'%(dev['id'],pem['id']), TITLE='Remove PEM'))
    aWeb.wr("</DIV></DIV>")
    aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>PDU:</DIV><DIV CLASS=td><SELECT NAME=pems_%(id)s_pdu_slot>"%pem)
    for pdu in dev['infra']['pdus']:
     pdu_info = dev['infra']['pdu_info'].get(str(pdu['id']))
     if pdu_info:
      for slotid in range(0,pdu_info['slots']):
       pdu_slot_id   = pdu_info[str(slotid)+"_slot_id"]
       pdu_slot_name = pdu_info[str(slotid)+"_slot_name"]
       extra = "selected" if ((pem['pdu_id'] == pdu['id']) and (pem['pdu_slot'] == slotid)) or (not pem['pdu_id'] and pdu['id'] == 'NULL') else ""
       aWeb.wr("<OPTION VALUE=%s.%s %s>%s</OPTION>"%(pdu['id'],slotid, extra, pdu['hostname']+":"+pdu_slot_name))
    aWeb.wr("</SELECT></DIV></DIV>")
    aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Unit:</DIV><DIV CLASS=td><INPUT NAME=pems_%s_pdu_unit TYPE=TEXT VALUE='%s'></DIV></DIV>"%(pem['id'],pem['pdu_unit']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>&nbsp;</DIV><DIV CLASS=td>&nbsp;</DIV></DIV>")
 aWeb.wr("</DIV></DIV></FORM>")
 aWeb.wr(aWeb.button('reload',DIV='div_content_right',URL='device_extended?id=%s'%dev['id']))
 aWeb.wr(aWeb.button('back',  DIV='div_content_right',URL='device_info?id=%s'%dev['id']))
 aWeb.wr(aWeb.button('trash', DIV='div_content_right',URL='device_delete?id=%s'%dev['id'], MSG='Are you sure you want to delete device?', TITLE='Delete device',SPIN='true'))
 aWeb.wr(aWeb.button('save',  DIV='div_content_right',URL='device_extended?op=update', FRM='info_form', TITLE='Save Device Information'))
 aWeb.wr("<SPAN CLASS='results' ID=update_results>%s</SPAN>"%str(dev.get('status','')))
 aWeb.wr("</ARTICLE>")

#
#
def control(aWeb):
 args = aWeb.args()
 res = aWeb.rest_call("device/control",args)
 aWeb.wr("<ARTICLE CLASS='info'><P>Device Controls</P>")
 aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Reset:</DIV><DIV CLASS=td>&nbsp;")
 aWeb.wr(aWeb.button('revert', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&dev_op=reset'%res['id'], MSG='Really reset device?', TITLE='Reset device'))
 aWeb.wr("</DIV><DIV CLASS=td>%s</DIV></DIV>"%(res.get('dev_op') if args.get('dev_op') == 'reset' else '&nbsp;'))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Shutdown:</DIV><DIV CLASS=td>&nbsp;")
 aWeb.wr(aWeb.button('off', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&dev_op=shutdown'%res['id'], MSG='Really shutdown device?', TITLE='Shutdown device'))
 aWeb.wr("</DIV><DIV CLASS=td>%s</DIV></DIV>"%(res.get('dev_op') if args.get('dev_op') == 'shutdown' else '&nbsp;'))
 for pem in res['pems']:
  aWeb.wr("<!-- %(pdu_type)s@%(pdu_ip)s:%(pdu_slot)s/%(pdu_unit)s -->"%pem)
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>PEM: %s</DIV><DIV CLASS=td>&nbsp;"%pem['name'])
  if   pem['state'] == 'off':
   aWeb.wr(aWeb.button('start', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&pem_id=%s&pem_op=on'%(res['id'],pem['id'])))
  elif pem['state'] == 'on':
   aWeb.wr(aWeb.button('stop',  DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&pem_id=%s&pem_op=off'%(res['id'],pem['id'])))
  else:
   aWeb.wr(aWeb.button('help', TITLE='Unknown state'))
  aWeb.wr("</DIV><DIV CLASS=td>%s</DIV></DIV>"%(pem.get('op',{'status':'&nbsp;'})['status']))
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("</ARTICLE>")

#
#
def update_ip(aWeb):
 args = aWeb.args()
 op = args.pop('op',None)
 if   op == 'update':
  aWeb.wr(str(aWeb.rest_call("device/update_ip", args)))
 elif op == 'find':
  aWeb.wr(aWeb.rest_call("ipam/address_find",args)['ip'])
 else:
  ipam = aWeb.rest_call("ipam/network_list")
  info = aWeb.rest_call("device/info",{'id':args['id'],'op':'basics'})
  aWeb.wr("<ARTICLE CLASS=info><P>Change IP</P>")
  aWeb.wr("<FORM ID=device_new_form>")
  aWeb.wr("<INPUT TYPE=HIDDEN NAME=id VALUE=%s>"%args['id'])
  aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Original IP:</DIV><DIV CLASS=td>%s</DIV></DIV>"%info['ip'])
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Network:</DIV><DIV CLASS=td><SELECT NAME=network_id>")
  for s in ipam['networks']:
   aWeb.wr("<OPTION VALUE={} {}>{} ({})</OPTION>".format(s['id'],"selected" if s['id'] == info['info']['network_id'] else "", s['netasc'],s['description']))
  aWeb.wr("</SELECT></DIV></DIV>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>New IP:</DIV><DIV CLASS=td><INPUT NAME=ip ID=device_ip TYPE=TEXT VALUE='%s'></DIV></DIV>"%info['ip'])
  aWeb.wr("</DIV></DIV>")
  aWeb.wr("</FORM>")
  aWeb.wr(aWeb.button('back',    DIV='div_content_right', URL='device_extended?id=%s'%args['id']))
  aWeb.wr(aWeb.button('search',  DIV='device_ip',         URL='device_update_ip?op=find',   FRM='device_new_form', TITLE='Find IP',INPUT='True'))
  aWeb.wr(aWeb.button('forward', DIV='update_results',    URL='device_update_ip?op=update', FRM='device_new_form', TITLE='Update IP'))
  aWeb.wr("<SPAN CLASS='results' ID=update_results></SPAN>")
  aWeb.wr("</ARTICLE>")

#
#
def delete(aWeb):
 res = aWeb.rest_call("device/delete",{ 'id':aWeb['id'] })
 aWeb.wr("<ARTICLE>Unit {} deleted, op:{}</ARTICLE>".format(aWeb['id'],res))

#
#
def type_list(aWeb):
 res = aWeb.rest_call("device/type_list")
 aWeb.wr("<ARTICLE><P>Device Types<P>")
 aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Class</DIV><DIV CLASS=th>Name</DIV><DIV CLASS=th>Icon</DIV></DIV><DIV CLASS=tbody>")
 for tp in res['types']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s</DIV><DIV CLASS=td><A CLASS=z-op DIV=div_content_left URL='device_list?field=type&search=%s'>%s</A></DIV><DIV CLASS=td>%s</DIV></DIV>"%(tp['base'],tp['name'],tp['name'],tp['icon'].rpartition('/')[2]))
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("</ARTICLE>")

#
#
def model_list(aWeb):
 args = aWeb.args()
 res = aWeb.rest_call("device/model_list",args)
 aWeb.wr("<ARTICLE><P>Device Models<P>")
 aWeb.wr(aWeb.button('reload',DIV='div_content_left',  URL='device_model_list'))
 aWeb.wr(aWeb.button('sync',  DIV='div_content_left',  URL='device_model_list?op=sync', TITLE='ReSync models'))
 aWeb.wr("<SPAN CLASS='results' ID=device_span STYLE='max-width:400px;'>%s</SPAN>"%res.get('status',""))
 aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Id</DIV><DIV CLASS=th>Model</DIV><DIV CLASS=th>Type</DIV><DIV CLASS=th>&nbsp;</DIV></DIV><DIV CLASS=tbody>")
 for row in res['models']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%(id)s</DIV><DIV CLASS=td>%(name)s</DIV><DIV CLASS=td>%(type)s</DIV><DIV CLASS=td>"%row)
  aWeb.wr(aWeb.button('info', DIV='div_content_right', URL='device_model_info?id=%s'%row['id']))
  aWeb.wr("</DIV></DIV>")
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("</ARTICLE>")

#
#
def model_info(aWeb):
 args = aWeb.args()
 res = aWeb.rest_call("device/model_info",args)
 aWeb.wr("<ARTICLE CLASS='info'><P>Device Model<P>")
 aWeb.wr("<FORM ID='device_model_info_form'>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id VALUE='%s'>"%res['id'])
 aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Name:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%res['info']['name'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Type:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%res['info']['type'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Defaults File:</DIV><DIV CLASS=td><INPUT NAME=defaults_file TYPE=TEXT VALUE='%s' STYLE='min-width:400px'></DIV></DIV>"%res['info']['defaults_file'])
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Image File:</DIV><DIV CLASS=td><INPUT NAME=image_file    TYPE=TEXT VALUE='%s'></DIV></DIV>"%res['info']['image_file'])
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("<LABEL FOR=parameters>Parameters:</LABEL><TEXTAREA CLASS='maxed' ID=parameters NAME=parameters STYLE='height:400px'>%s</TEXTAREA>"%res['info']['parameters'])
 aWeb.wr("</FORM>")
 aWeb.wr(aWeb.button('save',    DIV='div_content_right', URL='device_model_info?op=update', FRM='device_model_info_form', TITLE='Save'))
 aWeb.wr("</ARTICLE>")


#
#
def events(aWeb):
 res = aWeb.rest_call("device/events",{'id':aWeb['id']})
 translate = {0:'grey',1:'green',2:'red',3:'orange'}
 aWeb.wr("<ARTICLE><DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Time</DIV><DIV CLASS=th>Event</DIV></DIV><DIV CLASS=tbody>")
 for event in res['events']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s</DIV><DIV CLASS='td maxed'><DIV CLASS='state %s' /></DIV></DIV>"%(event['time'],translate[event['state']]))
 aWeb.wr("</DIV></DIV></ARTICLE>")

####################################################### Functions #######################################################
#
#
def to_console(aWeb):
 res = aWeb.rest_call("device/info",{'id':aWeb['id'],'op':'basics'})
 aWeb.wr("<SCRIPT> window.location.replace('%s&title=%s'); </SCRIPT>"%(res['url'],aWeb['name']))

#
#
def conf_gen(aWeb):
 aWeb.wr("<ARTICLE>")
 res = aWeb.rest_call("device/configuration_template",{'id':aWeb['id']})
 if res['status'] == 'OK':
  aWeb.wr("<BR>".join(res['data']))
 else:
  aWeb.wr("<B>%s</B>"%res['info'])
 aWeb.wr("</ARTICLE>")

#
#
def function(aWeb):
 aWeb.wr("<ARTICLE>")
 res = aWeb.rest_call("device/function",{'ip':aWeb['ip'],'op':aWeb['op'],'type':aWeb['type']})
 if res['status'] == 'OK':
  if len(res['data']) > 0:
   aWeb.wr("<DIV CLASS=table><DIV CLASS=thead>")
   head = res['data'][0].keys()
   for th in head:
    aWeb.wr("<DIV CLASS=th>%s</DIV>"%(th.title()))
   aWeb.wr("</DIV><DIV CLASS=tbody>")
   for row in res['data']:
    aWeb.wr("<DIV CLASS=tr>")
    for td in head:
     aWeb.wr("<DIV CLASS=td>%s</DIV>"%(row.get(td,'&nbsp;')))
    aWeb.wr("</DIV>")
   aWeb.wr("</DIV></DIV>")
  else:
   aWeb.wr("No data")
 else:
  aWeb.wr("<B>Error in devdata: %s</B>"%res['info'])
 aWeb.wr("</ARTICLE>")

#
#
def new(aWeb):
 cookie = aWeb.cookie('rims') 
 ip   = aWeb.get('ip')
 name = aWeb.get('hostname','unknown')
 mac  = aWeb.get('mac',"00:00:00:00:00:00")
 op   = aWeb['op']
 network = aWeb['ipam_network_id']
 if not ip:
  def int2ip(addr):
   from struct import pack
   from socket import inet_ntoa
   return inet_ntoa(pack("!I", addr))
  ip = "127.0.0.1" if not aWeb['ipint'] else int2ip(int(aWeb['ipint']))

 if op == 'new':
  args = { 'ip':ip, 'mac':mac, 'hostname':name, 'a_dom_id':aWeb['a_dom_id'], 'ipam_network_id':network }
  if aWeb['vm']:
   args['vm'] = 1
  else:
   args['rack'] = aWeb['rack']
   args['vm'] = 0
  res = aWeb.rest_call("device/new",args)
  aWeb.wr("Operation:%s"%str(res))
 elif op == 'find':
  aWeb.wr(aWeb.rest_call("ipam/address_find",{'network_id':network})['ip'])
 else:
  networks = aWeb.rest_call("ipam/network_list")['networks']
  domains  = aWeb.rest_call("dns/domain_list",{'filter':'forward'})['domains']
  aWeb.wr("<ARTICLE CLASS=info><P>Device Add</P>")
  aWeb.wr("<FORM ID=device_new_form>")
  aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Hostname:</DIV><DIV CLASS=td><INPUT NAME=hostname TYPE=TEXT VALUE={}></DIV></DIV>".format(name))
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Domain:</DIV><DIV CLASS=td><SELECT  NAME=a_dom_id>")
  for d in domains:
   aWeb.wr("<OPTION VALUE={0} {1}>{2}</OPTION>".format(d['id'],"selected" if d['name'] == aWeb['domain'] else "",d['name']))
  aWeb.wr("</SELECT></DIV></DIV>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Network:</DIV><DIV CLASS=td><SELECT NAME=ipam_network_id>")
  for s in networks:
   aWeb.wr("<OPTION VALUE={} {}>{} ({})</OPTION>".format(s['id'],"selected" if str(s['id']) == network else "", s['netasc'],s['description']))
  aWeb.wr("</SELECT></DIV></DIV>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>IP:</DIV><DIV CLASS=td><INPUT  NAME=ip ID=device_ip TYPE=TEXT VALUE='{}'></DIV></DIV>".format(ip))
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>MAC:</DIV><DIV CLASS=td><INPUT NAME=mac TYPE=TEXT PLACEHOLDER='{0}'></DIV></DIV>".format(mac))
  if aWeb['rack']:
   aWeb.wr("<INPUT TYPE=HIDDEN NAME=rack VALUE={}>".format(aWeb['rack']))
  else:
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>VM:</DIV><DIV  CLASS=td><INPUT NAME=vm  TYPE=CHECKBOX VALUE=1  {0} ></DIV></DIV>".format("checked" if aWeb['target'] == 'vm' else ''))
  aWeb.wr("</DIV></DIV>")
  aWeb.wr("</FORM>")
  aWeb.wr(aWeb.button('start', DIV='device_span', URL='device_new?op=new',  FRM='device_new_form', TITLE='Create'))
  aWeb.wr(aWeb.button('search',DIV='device_ip',   URL='device_new?op=find', FRM='device_new_form', TITLE='Find IP',INPUT='True'))
  aWeb.wr("<SPAN CLASS='results' ID=device_span STYLE='max-width:400px;'></SPAN>")
  aWeb.wr("</ARTICLE>")

#
#
def discover(aWeb):
 if aWeb['op']:
  res = aWeb.rest_call("device/discover",{ 'network_id':aWeb['network_id'], 'a_dom_id':aWeb['a_dom_id']}, 200)
  aWeb.wr("<ARTICLE>%s</ARTICLE>"%(res))
 else:
  networks = aWeb.rest_call("ipam/network_list")['networks']
  domains = aWeb.rest_call("dns/domain_list",{'filter':'forward'})['domains']
  dom_name = aWeb['domain']
  aWeb.wr("<ARTICLE CLASS=info><P>Device Discovery</P>")
  aWeb.wr("<FORM ID=device_discover_form>")
  aWeb.wr("<INPUT TYPE=HIDDEN NAME=op VALUE=json>")
  aWeb.wr("<DIV CLASS=table><DIV CLASS=tbody>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Domain:</DIV><DIV CLASS=td><SELECT NAME=a_dom_id>")
  for d in domains:
   extra = "" if not dom_name == d.get('name') else "selected=selected"
   aWeb.wr("<OPTION VALUE=%s %s>%s</OPTION>"%(d.get('id'),extra,d.get('name')))
  aWeb.wr("</SELECT></DIV></DIV>")
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Network:</DIV><DIV CLASS=td><SELECT NAME=network_id>")
  for s in networks:
   aWeb.wr("<OPTION VALUE=%s>%s (%s)</OPTION>"%(s['id'],s['netasc'],s['description']))
  aWeb.wr("</SELECT></DIV></DIV>")
  aWeb.wr("</DIV></DIV>")
  aWeb.wr("</FORM>")
  aWeb.wr(aWeb.button('start', DIV='div_content_right', SPIN='true', URL='device_discover', FRM='device_discover_form'))
  aWeb.wr("</ARTICLE>")

################################################## interfaces #################################################
#
#
def interface_list(aWeb):
 args = aWeb.args()
 device = args['device']
 op = args.get('op')
 if   op == 'delete':
  opres = aWeb.rest_call("device/interface_delete",args)
 elif op == 'discover':
  opres = aWeb.rest_call("device/interface_discover_snmp",{'device':device,'cleanup':False})
 elif op == 'link':
  opres = aWeb.rest_call("device/interface_link",{'a_id':aWeb['id'],'b_id':aWeb['peer_interface']})
 elif op == 'unlink':
  opres = aWeb.rest_call("device/interface_unlink",{'a_id':device,'b_id':aWeb['peer_interface']})
 elif op == 'lldp':
  connections = aWeb.rest_call("device/interface_discover_lldp",{'device':device})
 else:
  opres = ""
 aWeb.wr("<ARTICLE><P>Interfaces</P>")
 aWeb.wr(aWeb.button('reload', DIV='div_dev_data',URL='device_interface_list?device=%s'%device))
 aWeb.wr(aWeb.button('add',    DIV='div_dev_data',URL='device_interface_info?device=%s&id=new'%device))
 aWeb.wr(aWeb.button('trash',  DIV='div_dev_data',URL='device_interface_list?device=%s&op=delete'%device, MSG='Delete interfaces?', FRM='interface_list', TITLE='Delete selected interfaces'))
 aWeb.wr("<A CLASS='z-op btn small text' DIV=div_dev_data URL='device_interface_list?device=%s&op=discover' SPIN='true' MSG='Rediscover interfaces?' TITLE='Discover interfaces'>Discover</A>"%device)
 aWeb.wr("<A CLASS='z-op btn small text' DIV=div_dev_data URL='device_interface_list?device=%s&op=lldp' TITLE='LLDP Sync' SPIN=true>LLDP</A>"%device)
 aWeb.wr("<A CLASS='z-op btn small text' DIV=div_dev_data URL='device_interface_list?device=%s&op=delete&device_id=%s' TITLE='Clean up empty interfaces' SPIN=true>Cleanup</A>"%(device,device))
 if op == 'lldp':
  tmpl = "<DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>"
  aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Type</DIV><DIV CLASS=th>SNMP Name</DIV><DIV CLASS=th>SNMP Index</DIV><DIV CLASS=th>Chassis Type</DIV><DIV CLASS=th>Chassis ID</DIV><DIV CLASS=th>Port Type</DIV><DIV CLASS=th>Port ID</DIV><DIV CLASS=th>Port Desc</DIV><DIV CLASS=th>Sys Name</DIV><DIV CLASS=th>Local ID</DIV><DIV CLASS=th>Peer ID</DIV><DIV CLASS=th>&nbsp;</DIV></DIV><DIV CLASS=tbody>")
  for i in connections.values():
   aWeb.wr("<DIV CLASS=tr>")
   aWeb.wr(tmpl%(i['status'], i['snmp_name'],i['snmp_index'],i['chassis_type'],i['chassis_id'],i['port_type'],i['port_id'],i['port_desc'],i['sys_name'],i['local_id'],i.get('peer_id','-')))
   if i.get('peer_id'):
    aWeb.wr(aWeb.button('trash', DIV='div_dev_data', URL='device_interface_list?device=%s&op=unlink&id=%s&peer_interface=%s'%(device,i['local_id'],i['peer_id'])))
   aWeb.wr("</DIV></DIV>")
 else:
  res = aWeb.rest_call("device/interface_list",{'device':device})
  aWeb.wr("<SPAN CLASS=results>%s</SPAN><FORM ID=interface_list>"%(opres))
  aWeb.wr("<DIV CLASS=table><DIV CLASS=thead><DIV CLASS=th>Id</DIV><DIV CLASS=th>Name</DIV><DIV CLASS=th>Description</DIV><DIV CLASS=th>SNMP Index</DIV><DIV CLASS=th>MAC</DIV><DIV CLASS='th title' TITLE='Peer ID of connecting interface'>Peer interface</DIV><DIV CLASS='th title' TITLE='State as per last invoked check'>State</DIV><DIV CLASS=th>&nbsp;</DIV></DIV><DIV CLASS=tbody>")
  for row in res['data']:
   aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td>%s</DIV><DIV CLASS=td><DIV CLASS='state %s' /></DIV><DIV CLASS=td>"%(row['id'],row['name'],row['description'],row['snmp_index'],row['mac'],row['peer_interface'] if not row['multipoint'] else 'multipoint',row['state_ascii']))
   aWeb.wr("<INPUT TYPE=CHECKBOX VALUE=%(id)s ID='interface_%(id)s' NAME='interface_%(id)s'>"%row)
   aWeb.wr(aWeb.button('info',  DIV='div_dev_data',URL='device_interface_info?device=%s&id=%s'%(device,row['id'])))
   aWeb.wr(aWeb.button('sync',  DIV='div_dev_data',URL='device_interface_link_device?device=%s&id=%s&name=%s'%(device,row['id'],row['name']), TITLE='Connect'))
   aWeb.wr("</DIV></DIV>")
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("</FORM></ARTICLE>")

#
#
def interface_info(aWeb):
 args = aWeb.args()
 data = aWeb.rest_call("device/interface_info",args)['data']
 aWeb.wr("<ARTICLE CLASS=info STYLE='width:100%;'><P>Interface</P>")
 aWeb.wr("<FORM ID=interface_info_form>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id VALUE='%s'>"%(data['id']))
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=device VALUE='%s'>"%(data['device']))
 aWeb.wr("<DIV CLASS=table STYLE='float:left; width:auto;'><DIV CLASS=tbody>")
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Name:</DIV><DIV CLASS=td><INPUT        NAME=name        VALUE='%s' TYPE=TEXT REQUIRED STYLE='min-width:400px'></DIV></DIV>"%(data['name']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Description:</DIV><DIV CLASS=td><INPUT NAME=description VALUE='%s' TYPE=TEXT REQUIRED STYLE='min-width:400px'></DIV></DIV>"%(data['description']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>SNMP Index:</DIV><DIV CLASS=td><INPUT  NAME=snmp_index  VALUE='%s' TYPE=TEXT REQUIRED STYLE='min-width:400px'></DIV></DIV>"%(data['snmp_index']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>MAC:</DIV><DIV CLASS='td readonly'>%s</DIV></DIV>"%(data['mac']))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Multipoint:</DIV><DIV CLASS=td><INPUT  NAME=multipoint  VALUE=1    TYPE=CHECKBOX %s></DIV></DIV>"%("checked" if data['multipoint'] else ""))
 aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Peer interface:</DIV><DIV CLASS=td>%s</DIV></DIV>"%data['peer_interface'])
 if data['peer_device']:
  aWeb.wr("<DIV CLASS=tr><DIV CLASS=td>Peer Device</DIV><DIV CLASS=td><A CLASS=z-op DIV=div_content_right URL='device_info?id=%s'>%s</A></DIV></DIV>"%(data['peer_device'],data['peer_device']))
 aWeb.wr("</DIV></DIV>")
 aWeb.wr("</FORM>")
 aWeb.wr(aWeb.button('back', DIV='div_dev_data', URL='device_interface_list?device=%s'%data['device']))
 aWeb.wr(aWeb.button('save', DIV='div_dev_data', URL='device_interface_info?op=update', FRM='interface_info_form'))
 if data['id'] != 'new':
  aWeb.wr(aWeb.button('trash', DIV='div_dev_data', URL='device_interface_list?op=delete&device=%s&id=%s'%(data['device'],data['id']), MSG='Delete interface?'))
 aWeb.wr("</ARTICLE>")

#
#
def interface_link_device(aWeb):
 aWeb.wr("<ARTICLE>")
 aWeb.wr("<FORM ID=interface_link>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=device VALUE=%s>"%aWeb['device'])
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id   VALUE=%s>"%aWeb['id'])
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=name VALUE=%s>"%aWeb['name'])
 aWeb.wr("Connect '%s' to device (Id or IP): <INPUT CLASS='background' REQUIRED TYPE=TEXT NAME='peer' STYLE='width:100px' VALUE='%s'>"%(aWeb['name'],aWeb.get('peer','0')))
 aWeb.wr("</FORM><DIV CLASS=inline>")
 aWeb.wr(aWeb.button('back',    DIV='div_dev_data', URL='device_interface_list?device=%s'%aWeb['device']))
 aWeb.wr(aWeb.button('forward', DIV='div_dev_data', URL='device_interface_link_interface', FRM='interface_link'))
 aWeb.wr("</DIV></ARTICLE>")

#
#
def interface_link_interface(aWeb):
 res = aWeb.rest_call("device/interface_list",{'device':aWeb['peer'],'sort':'name'})
 aWeb.wr("<ARTICLE>")
 aWeb.wr("<FORM ID=interface_link>")
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=device VALUE=%s>"%aWeb['device'])
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=id   VALUE=%s>"%aWeb['id'])
 aWeb.wr("<INPUT TYPE=HIDDEN NAME=name VALUE=%s>"%aWeb['name'])
 aWeb.wr("Connect '%s' to device id: <INPUT CLASS='background' READONLY TYPE=TEXT NAME='peer' STYLE='width:100px' VALUE=%s> on"%(aWeb['name'],res['id']))
 aWeb.wr("<SELECT NAME=peer_interface REQUIRED>")
 for intf in res.get('data',[]):
  aWeb.wr("<OPTION VALUE=%s>%s (%s)</OPTION>"%(intf['id'],intf['name'],intf['description']))
 aWeb.wr("</SELECT>")
 aWeb.wr("</FORM>")
 aWeb.wr(aWeb.button('back',    DIV='div_dev_data', URL='device_interface_link_device', FRM='interface_link'))
 aWeb.wr(aWeb.button('forward', DIV='div_dev_data', URL='device_interface_list?op=link', FRM='interface_link'))
 aWeb.wr("</ARTICLE>")
