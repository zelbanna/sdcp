#!/usr/bin/python3
"""BLE bluetooth server. Heavily depends on gattool so requires all of those files.
See: https://bitbucket.org/OscarAcena/pygattlib/src/default/README.md
"""
__author__  = "Zacharias El Banna"

from argparse import ArgumentParser
from json import load
from os   import path as ospath
from sys  import path as syspath, exit as sysexit
from time import sleep
from gattlib import DiscoveryService
syspath.insert(1,ospath.abspath(ospath.join(ospath.dirname(__file__), '..','..')))
from rims.core.common import rest_call, RestException
parser = ArgumentParser(prog='ble', description = 'BLE runtime program')
parser.add_argument('-c','--config', help = 'Config unless config.json', default='../config.json')
parser.add_argument('-d','--device', help = 'Device', required = False, default='hci0')
parser.add_argument('-r','--report', help = 'Continuous reporting', required = False, action='store_true')
parser.add_argument('-s','--sleep',  help = 'Sleeptime', required = False, default=40)
parser.add_argument('-t','--timeout', help = 'Timeout for discovery', required = False, default=20)
parser.add_argument('-u','--url',    help = 'RIMS URL', required = False, default='http://127.0.0.1:8080')
parser.add_argument('-x','--deadtime', help = 'Timeout before declaring dead', required = False, default=300)
args = parser.parse_args()
print(f"Starting BLE discovery with: device:{args.device}, report:{args.report}, sleep:{args.sleep}, timeout:{args.timeout}, deadtime: {args.deadtime}, URL:{args.url}")
try:
 with open(ospath.abspath(ospath.join(ospath.dirname(__file__), args.config))) as f:
  token = load(f).get('token',None)
except:
 token = None
service = DiscoveryService(args.device)
data = {}

while True:
 try:
  discovered = service.discover(int(args.timeout))
 except Exception as e:
  print(f"BLE Error: {e}")
  sysexit(1)
 else:
  up = []
  dn = []
  for k,v in data.items():
   if discovered.pop(k,False):
    v = 0
   elif v < (int(args.deadtime) / (int(args.timeout) + int(args.sleep))):
    v +=1
   else:
    dn.append(k)
  for k in discovered.keys():
   data[k] = 0
   up.append(k)
  for k in dn:
   data.pop(k,None)
  if dn or up or args.report:
   try:
    res = rest_call(f"{args.url}/internal/services/ble/report", aArgs = {'up':up,'down':dn}, aTimeout = 5, aHeader = {'X-Token':token, 'X-Log':False})
   except Exception as e:
    print(f"REST Error: {e}")
 sleep(int(args.sleep))
