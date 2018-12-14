"""Windows Device"""
__author__  = "Zacharias El Banna"
__type__    = "os"
__icon__    = "viz-generic.png"
__oid__     = 8072

from rims.devices.generic import Device as GenericDevice

class Device(GenericDevice):

 def __init__(self, aCTX, aID, aIP = None):
  GenericDevice.__init__(self, aCTX, aID, aIP)

 def __str__(self):
  return "Windows[%s,%s]"%(self._id,self._ip)

