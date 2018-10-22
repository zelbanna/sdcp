"""OpenGear Console server"""
__author__  = "Zacharias El Banna"
__type__    = "console"

from .generic import Device as GenericDevice
from rims.core.common import VarList, Varbind, Session

######################################## Console ########################################
#
# Opengear :-)
#

class Device(GenericDevice):

 @classmethod
 def get_functions(cls):
  return ['manage']

 def __init__(self, aIP, aCTX):
  GenericDevice.__init__(self,aIP, aCTX)

 def __str__(self):
  return "OpenGear - {}".format(GenericDevice.__str__(self))

 def get_inventory(self):
  result = []
  try:
   portobjs = VarList(Varbind('.1.3.6.1.4.1.25049.17.2.1.2'))
   session = Session(Version = 2, DestHost = self._ip, Community = self._ctx.settings['snmp']['read_community'], UseNumeric = 1, Timeout = 100000, Retries = 2)
   session.walk(portobjs)
   for obj in portobjs:
    result.append({'interface':obj.iid,'name':obj.val.decode(),'port':str(6000+int(obj.iid))})
  except Exception as exception_error:
   self.log_msg("OpenGear : error loading conf " + str(exception_error))
  return result
