"""Module docstring.

EX Module

"""
__author__ = "Zacharias El Banna"
__version__ = "17.10.4"
__status__ = "Production"

import sdcp.PackageContainer as PC
from junos import Junos

################################ EX Object #####################################

class Device(Junos):

 @classmethod
 def get_widgets(cls):
  widgets = ['widget_switch_table']
  widgets.extend(Junos.get_widgets())
  return widgets

 def __init__(self,aIP,aID=None):
  Junos.__init__(self, aIP,aID)
  self._style  = None
  self._interfacenames = {}

 def get_type(self):
  return 'ex'

 def __str__(self):
  return Junos.__str__(self) + " Style:" + str(self._style)

 #
 # should prep for ELS only and send "instance = 'default-instance'" - then id could be retrieved too
 # since grouping is different
 #
 def get_switch_table(self):
  fdblist = []
  try:
   swdata = self._router.rpc.get_ethernet_switching_table_information()
   if swdata.tag == "l2ng-l2ald-rtb-macdb":
    self._style = "ELS"
    for entry in swdata[0].iter("l2ng-mac-entry"):
     vlan = entry.find("l2ng-l2-mac-vlan-name").text
     mac  = entry.find("l2ng-l2-mac-address").text     
     interface = entry.find("l2ng-l2-mac-logical-interface").text
     fdblist.append([ vlan, mac, interface, self.get_interface_name(interface) ])
   elif swdata.tag == "ethernet-switching-table-information":
    self._style = "Legacy"
    for entry in swdata[0].iter("mac-table-entry"):
     vlan = entry.find("mac-vlan").text
     mac  = entry.find("mac-address").text
     interface = entry.find(".//mac-interfaces").text
     if not mac == "*" and not interface == "Router":
      fdblist.append([ vlan, mac, interface, self.get_interface_name(interface) ]) 
  except Exception as err:
   self.log_msg("System Error - fetching FDB: " + str(err))
  return fdblist

 #
 # Widgets should be self contained - connect, load names etc
 #
 def widget_switch_table(self):
  try:
   if self.connect():
    self.load_interfaces_name()
    print "<DIV CLASS=z-frame><DIV CLASS=z-table>"
    print "<DIV CLASS=thead><DIV CLASS=th>VLAN</DIV><DIV CLASS=th>MAC</DIV><DIV CLASS=th>Interface</DIV><DIV CLASS=th>Description</DIV></DIV>"
    print "<DIV CLASS=tbody>"
    fdb = self.get_switch_table()
    for entry in fdb:
     print "<DIV CLASS=tr><DIV CLASS=td>" + "&nbsp;</DIV><DIV CLASS=td>".join(entry) + "</DIV></DIV>\n"
    print "</DIV></DIV></DIV>"
    self.close()
   else:
    print "Could not connect"
  except Exception as err:
   self.log_msg("EX widget switch table: Error [{}]".format(str(err)))
   print "<B>Error - issue loading widget: {}</B>".format(str(err))
