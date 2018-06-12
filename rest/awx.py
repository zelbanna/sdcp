"""AWX REST module."""
__author__ = "Zacharias El Banna"
__version__ = "18.05.31GA"
__status__ = "Production"
__add_globals__ = lambda x: globals().update(x)

from sdcp.devices.awx import Device
from sdcp.SettingsContainer import SC

#
#
def inventories_list(aDict):
 """Function docstring for inventory_list TBD

 Args:
  - node (required)

 Output:
 """
 controller = Device(SC['node'][aDict['node']])
 controller.auth({'username':SC['awx']['username'],'password':SC['awx']['password'],'mode':'basic'})
 return controller.inventories()

#
#
def hosts_list(aDict):
 """Function retrieves all hosts from AWX node

 Args:
  - node (required)

 Output:
 """
 controller = Device(SC['node'][aDict['node']])
 controller.auth({'username':SC['awx']['username'],'password':SC['awx']['password'],'mode':'basic'})
 return controller.hosts()
 