import React, { Component, Fragment } from 'react'
import { rest_call, rnd } from './infra/Functions.js';
import { Spinner, StateMap, SearchField, InfoCol2, RimsContext, Result, ContentList, ContentData, ContentReport } from './infra/Generic.js';
import { NavBar } from './infra/Navigation.js'
import { TextInput, TextLine, StateLine, SelectInput, UrlInput } from './infra/Inputs.jsx';
import { AddButton, ConnectionButton, DeleteButton, DevicesButton, DocButton, EditButton, InfoButton, ItemsButton, LogButton, NetworkButton, ReloadButton, SaveButton, SearchButton, StartButton, SyncButton, TextButton, TermButton, UiButton } from './infra/Buttons.jsx';

import { List as ReservationList } from './Reservation.jsx';
import { List as LocationList } from './Location.jsx';
import { List as ServerList } from './Server.jsx';
import { NetworkList as IPAMNetworkList } from './IPAM.jsx';
import { DomainList as DNSDomainList } from './DNS.jsx';
import { List as VisualizeList, Edit as VisualizeEdit } from './Visualize.jsx';
import { List as RackList, Inventory as RackInventory, Infra as RackInfra } from './Rack.jsx';
import { List as InterfaceList } from './Interface.jsx';

// **************** Main ****************
//
// TODO - proper PDU and Console action for rack devices
//
export class Main extends Component {
 constructor(props){
  super(props)
  this.state = {content:null}
 }

 componentDidMount(){
  if (this.props.rack_id)
   rest_call("api/rack/inventory",{id:this.props.rack_id}).then(result => this.compileNavItems({rack_id:this.props.rack_id, ...result}))
  else
   this.compileNavItems({pdu:[], console:[], name:'N/A', rack_id:undefined});
 }

 compileNavItems = (state) => {
  const navitems = [
   {title:'Devices', type:'dropdown', items:[
    {title:'List', onClick:() => this.changeContent(<List key='dl' changeSelf={this.changeContent} rack_id={state.rack_id} />)},
    {title:'Search', onClick:() => this.changeContent(<Search key='ds' changeSelf={this.changeContent} />)},
    {title:'Types', onClick:() => this.changeContent(<TypeList key='dtl' changeSelf={this.changeContent} />)},
    {title:'Models', onClick:() => this.changeContent(<ModelList key='dml' />)}
   ]},
   {title:'Reservations', className:'right', onClick:() => this.changeContent(<ReservationList key='reservation_list' />)},
   {title:'Locations', className:'right', onClick:() => this.changeContent(<LocationList key='location_list' />)},
   {title:'IPAM', type:'dropdown',  className:'right', items:[
    {title:'Servers', onClick:() => this.changeContent(<ServerList key='ipam_server_list' type='DHCP' />)},
    {title:'Networks', onClick:() => this.changeContent(<IPAMNetworkList key='ipam_network_list' />)}
   ]},
   {title:'DNS', type:'dropdown',  className:'right', items:[
    {title:'Servers', onClick:() => this.changeContent(<ServerList key='dns_server_list' type='DNS' />)},
    {title:'Domains', onClick:() => this.changeContent(<DNSDomainList key='dns_domain_list' />)}
   ]},
   {title:'Rack', type:'dropdown', className:'right', items:[
    {title:'Racks',    onClick:() => this.changeContent(<RackList key='rack_list' />)},
    {title:'PDUs',     onClick:() => this.changeContent(<RackInfra key='pdu_list' type='pdu' />)},
    {title:'Consoles', onClick:() => this.changeContent(<RackInfra key='console_list' type='console' />)}
   ]},
   {title:'Maps',  onClick:() => this.changeContent(<VisualizeList key='visualize_list' />)},
   {title:'OUI', type:'dropdown', items:[
    {title:'Search',  onClick:() => this.changeContent(<OUISearch key='oui_search' />)},
    {title:'List',  onClick:() => this.changeContent(<OUIList key='oui_list' />)}
   ]}
  ]
  if (state.pdu.length > 0)
   navitems.push({title:'PDUs', type:'dropdown', items:state.pdu.map(row => ({title:row.hostname, onClick:() =>alert('implement PDU')}))})
  if (state.console.length > 0)
   navitems.push({title:'Consoles', type:'dropdown', items:state.console.map(row => ({title:row.hostname, onClick:() => alert('implement Console')}))})
  if (state.rack_id)
   navitems.push({title:state.name, onClick:() => this.changeContent(<RackInventory key='rack_inventory' id={state.rack_id} />)})
  navitems.push({ onClick:() => this.changeContent(null), className:'reload' })
  this.context.loadNavigation(navitems)
 }

 changeContent = (elem) => this.setState({content:elem})

 render(){
  return  <Fragment key='main_base'>{this.state.content}</Fragment>
 }
}
Main.contextType = RimsContext;


// ************** Search **************
//
class Search extends Component {
  constructor(props){
  super(props)
  this.state = {field:'ip',search:''}
 }

 onChange = (e) => {
  this.setState({[e.target.name]:e.target.value})
 }

 render() {
  return (
   <article className='lineinput'>
    <h1>Device Search</h1>
    <div>
     <span>
      <SelectInput key='field' id='field' onChange={this.onChange} value={this.state.field} options={[{value:'hostname',text:'Hostname'},{value:'type',text:'Type'},{value:'id',text:'ID'},{value:'ip',text:'IP'},{value:'mac',text:'MAC'},{value:'ipam_id',text:'IPAM ID'}]} />
      <TextInput key='search' id='search' onChange={this.onChange} value={this.state.search} placeholder='search' />
     </span>
     <SearchButton key='ds_btn_search' title='Search' onClick={() => this.props.changeSelf(<List key='dl' {...this.state} changeSelf={this.props.changeSelf} />)} />
    </div>
   </article>
  )
 }
}
// ************** List **************
//
class List extends Component {
 constructor(props){
  super(props);
  this.state = {data:null, content:null, sort:(props.hasOwnProperty('sort')) ? props.sort : 'hostname', rack_id:this.props.rack_id, searchfield:'', field:this.props.field, search:this.props.search}
 }

 componentDidMount(){
  rest_call('api/device/list', {sort:this.state.sort, rack_id:this.state.rack_id, field:this.state.field, search:this.state.search}).then(result => this.setState(result))
 }

 changeContent = (elem) => this.setState({content:elem})

 searchHandler = (e) => { this.setState({searchfield:e.target.value}) }

 sortList = (method) => {
  if (method === 'hostname')
   this.state.data.sort((a,b) => a.hostname.localeCompare(b.hostname));
  else
   this.state.data.sort((a,b) => {
    const num1 = Number(a.ip.split(".").map(num => (`000${num}`).slice(-3) ).join(""));
    const num2 = Number(b.ip.split(".").map(num => (`000${num}`).slice(-3) ).join(""));
    return num1-num2;
   });
  this.setState({sort:method})
 }

 listItem = (row) => [
  row.ip,
  <TextButton key={'dl_btn_info_'+row.id} text={row.hostname} onClick={() => this.changeContent(<Info key={'di_'+row.id} id={row.id} changeSelf={this.changeContent} />)} />,
  StateMap({state:row.state}),
  <DeleteButton key={'dl_btn_del_'+row.id} onClick={() => { this.deleteList('api/device/delete',row.id,'Really delete device?'); }} />
 ]

 deleteList = (api,id,msg) => {
  if (window.confirm(msg))
   rest_call(api, {id:id}).then(result => result.deleted && this.setState({data:this.state.data.filter(row => (row.id !== id)),content:null}))
 }

 render(){
  if (!this.state.data)
   return <Spinner />
  else {
   let device_list = this.state.data.filter(row => row.hostname.includes(this.state.searchfield));
   const thead = [<TextButton key='dl_btn_ip' text='IP' className={(this.state.sort === 'ip') ? 'highlight':''} onClick={() => { this.sortList('ip') }} />,<TextButton key='dl_btn_hostname' text='Hostname' className={(this.state.sort === 'hostname') ? 'highlight':''} onClick={() => { this.sortList('hostname') }} />,'',''];
   return <Fragment key={'dl_fragment'}>
    <ContentList key='dl_list' header='Device List' thead={thead}listItem={this.listItem} trows={device_list}>
     <ReloadButton key='dl_btn_reload' onClick={() => this.componentDidMount() } />
     <ItemsButton key='dl_btn_items' onClick={() => { Object.assign(this.state,{rack_id:undefined,field:undefined,search:undefined}); this.componentDidMount(); }} title='All items' />
     <AddButton key='dl_btn_add' onClick={() => this.changeContent(<New key={'dn_' + rnd()} id='new' />) } />
     <DevicesButton key='dl_btn_devices' onClick={() => this.changeContent(<Discover key='dd' />) } title='Discovery' />
     <SearchField key='dl_searchfield' searchHandler={this.searchHandler} value={this.state.searchfield} placeholder='Search devices' />
    </ContentList>
    <ContentData key='dl_content'>{this.state.content}</ContentData>
   </Fragment>
  }
 }
}

// ************** Info **************
//
export class Info extends Component {
 constructor(props){
  super(props)
  this.state = {data:undefined, found:true, content:null}
 }

 onChange = (e) => {
  var data = {...this.state.data}
  data[e.target.name] = e.target[(e.target.type !== "checkbox") ? "value" : "checked"];
  this.setState({data:data})
 }

 changeContent = (elem) => this.setState({content:elem})

 updateInfo = (api) => {
  rest_call(api,{op:'update', ...this.state.data}).then(result => this.setState(result))
 }

 componentDidMount(){
  rest_call("api/device/info",{id:this.props.id, extra:["types","classes"]}).then(result => this.setState(result))
 }

 lookupInfo = () => {
  this.setState({content:<Spinner />,result:''})
  rest_call("api/device/info",{id:this.props.id, op:'lookup'}).then(result => this.setState({...result,content:null}))
 }

 render() {
  if(this.state.data){
   const vm = (this.state.data.class === 'vm' && this.state.vm) ? this.state.vm : false;
   const rack = (this.state.rack && this.state.data.class !== 'vm') ? this.state.rack : false;
   const change_self = (this.props.changeSelf);
   const has_ip = (this.state.extra.interface_ip);
   const functions = (this.state.extra.functions.length >0) ? this.state.extra.functions.split(',').map(row => ({title:row, onClick:() => this.changeContent(<Function key={'dev_func'+row} id={this.props.id} op={row} />)})) : null

   return (
    <Fragment key='di_fragment'>
     <article className='info'>
     <h1>Device Info</h1>
     <InfoCol2 key='di_info' className='left'>
      <TextLine key='hostname' id='hostname' text={this.state.data.hostname} />
      <TextInput key='mac' id='mac' label='Sys Mac' value={this.state.data.mac} title='System MAC' onChange={this.onChange} />
      <TextLine key='if_mac' id='if_mac' label='Mgmt MAC' text={this.state.extra.interface_mac} title='Management Interface MAC' />
      <TextLine key='if_ip' id='if_ip' label='Mgmt IP' text={this.state.extra.interface_ip} />
      <TextLine key='snmp' id='snmp' label='SNMP' text={this.state.data.snmp} />
      <StateLine key='state' id='state' state={[this.state.extra.if_state,this.state.extra.ip_state]} />
     </InfoCol2>
     <InfoCol2 key='di_extra' className='left'>
      <TextLine key='id' id='id' text={this.props.id} />
      <SelectInput key='class' id='class' value={this.state.data.class} options={this.state.classes.map(row => ({value:row, text:row}))} onChange={this.onChange} />
      <SelectInput key='type_id' id='type_id' label='Type' value={this.state.data.type_id} options={this.state.types.map(row => ({value:row.id, text:row.name}))} onChange={this.onChange} />
      <TextInput key='model' id='model' value={this.state.data.model} onChange={this.onChange} extra={this.state.data.model} />
      <TextLine key='version' id='version' text={this.state.data.version} onChange={this.onChange} />
      <TextInput key='serial' id='serial' label='S/N' value={this.state.data.serial} onChange={this.onChange} />
     </InfoCol2>
     <InfoCol2 key='di_rack' className='left'>
      {rack && <TextLine key='rack_pos' id='rack_pos' label='Rack/Pos' text={`${rack.rack_name} (${rack.rack_unit})`} />}
      {rack && <TextLine key='rack_size' id='rack_size' label='Size (U)' text={rack.rack_size} />}
      {rack && <TextLine key='rack_con' id='rack_con' label='TS/Port' text={`${rack.console_name} (${rack.console_port})`} />}
      {rack && this.state.pems.map(pem => <TextLine key={'pem_'+pem.id} id={'pem_'+pem.id} label={pem.name+' PDU'} text={`${pem.pdu_name} (${pem.pdu_unit})`} />)}
     </InfoCol2>
     <InfoCol2 key='di_vm' className='left'>
      {vm && <TextLine key='vm_name' id ='vm_name' label='VM Name' text={vm.name} />}
      {vm && <TextLine key='vm_host' id ='vm_host' label='VM Host' text={vm.host} />}
      {vm && <TextLine key='vm_uuid' id ='vm_uuid' label='VM UUID' text={vm.device_uuid} style={{maxWidth:170}} extra={vm.device_uuid} />}
      {vm && <TextLine key='vm_uuhost' id ='vm_uuhost' label='Host UUID' text={vm.server_uuid} style={{maxWidth:170}} extra={vm.server_uuid} />}
     </InfoCol2>
     <br />
     <InfoCol2 key='di_text'>
      <TextInput key='comment' id='comment' value={this.state.data.comment} onChange={this.onChange} />
      <UrlInput key='url' id='url' label='URL' value={this.state.data.url} onChange={this.onChange} />
     </InfoCol2>
     <br />
     <SaveButton key='di_btn_save' onClick={() => this.updateInfo('api/device/info')} />
     <ConnectionButton key='di_btn_conn' onClick={() => this.changeContent(<InterfaceList key='interface_list' device_id={this.props.id} />)} />
     <StartButton key='di_btn_cont' onClick={() => this.changeContent(<Control key='device_control' id={this.props.id} />)} />
     <DocButton key='di_btn_conf' onClick={() => this.changeContent(<Configuration key='device_configure' device_id={this.props.id} />)} />
     {change_self && <EditButton key='di_btn_edit' onClick={() => this.props.changeSelf(<Extended key={'de_'+this.props.id} id={this.props.id} />)} />}
     {change_self && <NetworkButton key='di_btn_netw' onClick={() => this.props.changeSelf(<VisualizeEdit key={'ve_'+this.props.id} type='device' id={this.props.id} changeSelf={this.props.changeSelf} />)} />}
     {has_ip && <SearchButton key='di_btn_srch' onClick={() => this.lookupInfo()} />}
     {has_ip && <LogButton key='di_btn_logs' onClick={() => this.changeContent(<Logs key='device_logs' id={this.props.id} />)} />}
     {has_ip && <TermButton key='di_btn_ssh' onClick={() => { const sshWin = window.open(`ssh://${this.state.extra.username}@${this.state.extra.interface_ip}`,'_blank'); sshWin.close(); }} title='SSH connection' />}
     {rack && rack.console_ip && rack.console_port && <TermButton key='di_btn_console' onClick={() => { const termWin = window.open(`telnet://${rack.console_ip}:${6000 +rack.console_port}`,'_blank'); termWin.close();}} title='Serial Connection' /> }
     {this.state.data.url && <UiButton key='di_btn_ui' onClick={() => window.open(this.state.data.url,'_blank')} />}
     <Result key='dev_result' result={JSON.stringify(this.state.update)} />
    </article>
    <NavBar key='di_navigation' id='di_navigation'>{functions}</NavBar>
    {this.state.content}
    </Fragment>
   )
  } else
   return <Spinner />
 }
}

// TODO: NAvBar from functions

// ************** Control **************
//
class Control extends Component {
 render() {
  return (<div>Device Control (TODO)</div>);
 }
}
 /*
 args = aWeb.args()
 res = aWeb.rest_call("device/control",args)
 aWeb.wr("<ARTICLE CLASS='info'><P>Device Controls</P>")
 aWeb.wr("<DIV CLASS='info col3'>")
 aWeb.wr("<label for='reboot'>Reboot:</label><span id='reboot'>&nbsp;")
 aWeb.wr(aWeb.button('revert', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&dev_op=reboot'%res['id'], MSG='Really reboot device?', TITLE='reboot device'))
 aWeb.wr("</span><DIV>%s</DIV>"%(res.get('dev_op') if args.get('dev_op') == 'reboot' else '&nbsp;'))
 aWeb.wr("<label for='shutdown'>Shutdown:</label><span id='shutdown'>&nbsp;")
 aWeb.wr(aWeb.button('off', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&dev_op=shutdown'%res['id'], MSG='Really shutdown device?', TITLE='Shutdown device'))
 aWeb.wr("</span><DIV>%s</DIV>"%(res.get('dev_op') if args.get('dev_op') == 'shutdown' else '&nbsp;'))
 for pem in res.get('pems',[]):
  aWeb.wr("<!-- %(pdu_type)s@%(pdu_ip)s:%(pdu_slot)s/%(pdu_unit)s -->"%pem)
  aWeb.wr("<label for='pem_%(name)s'>PEM: %(name)s</label><span id='pem_%(name)s'>&nbsp;"%pem)
  if   pem['state'] == 'off':
   aWeb.wr(aWeb.button('start', DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&pem_id=%s&pem_op=on'%(res['id'],pem['id'])))
  elif pem['state'] == 'on':
   aWeb.wr(aWeb.button('stop',  DIV='div_dev_data', SPIN='true', URL='device_control?id=%s&pem_id=%s&pem_op=off'%(res['id'],pem['id'])))
  else:
   aWeb.wr(aWeb.button('help', TITLE='Unknown state'))
  aWeb.wr("</span><DIV>%s</DIV>"%(pem.get('op',{'status':'&nbsp;'})['status']))
 aWeb.wr("</DIV>")
 aWeb.wr("</ARTICLE>")
*/
// ************** Logs **************
//
export class Logs extends Component {
 constructor(props){
  super(props)
  this.state = {}
 }

 componentDidMount(){
  rest_call("api/device/log_get",{id:this.props.id}).then(result => this.setState(result));
 }

 listItem = (row) => [row.time,row.message];

 render() {
  return <ContentReport key='dev_log_cr' header='Devices' thead={['Time','Message']} trows={this.state.data} listItem={this.listItem} />
 }
}

// ************** New **************
//
export class New extends Component {
 constructor(props){
  super(props)
  this.state = {data:{ip:this.props.ip,mac:'00:00:00:00:00:00',class:'device',ipam_network_id:this.props.ipam_network_id,hostname:''}, found:true, content:null}
 }

 onChange = (e) => {
  var data = {...this.state.data};
  data[e.target.name] = e.target[(e.target.type !== "checkbox") ? "value" : "checked"];
  this.setState({data:data});
 }

 componentDidMount(){
  rest_call('api/dns/domain_list',{filter:'forward'}).then(result => this.setState({domains:result.data}))
  rest_call('api/ipam/network_list').then(result => this.setState({networks:result.data}))
  rest_call('api/device/class_list').then(result => this.setState({classes:result.data}))
 }

 addDevice = () => {
  if (this.state.data.hostname)
   rest_call("api/device/new",this.state.data).then(result => this.setState({result:JSON.stringify(result)}))
 }

 searchIP = () => {
  if (this.state.data.ipam_network_id)
   rest_call("api/ipam/address_find",{network_id:this.state.data.ipam_network_id}).then(result => this.setState({data:{...this.state.data, ip:result.ip}}))
 }

 render() {
  if (!this.state.domains || !this.state.classes || !this.state.networks)
   return <Spinner />
  else
   return (
    <article className='info'>
     <h1>Device Add</h1>
     <InfoCol2 key='dn_content'>
      <TextInput key='hostname' id='hostname' value={this.state.data.hostname} placeholder='Device hostname' onChange={this.onChange} />
      <SelectInput key='class' id='class' value={this.state.data.class} options={this.state.classes.map(row => ({value:row, text:row}))} onChange={this.onChange} />
      <SelectInput key='ipam_network_id' id='ipam_network_id' label='Network' value={this.state.data.ipam_network_id} options={this.state.networks.map(row => ({value:row.id, text:`${row.netasc} (${row.description})`}))} onChange={this.onChange} />
      <SelectInput key='a_domain_id' id='a_domain_id' label='Domain' value={this.state.data.a_domain_id} options={this.state.domains.map(row => ({value:row.id, text:row.name}))} onChange={this.onChange} />
      <TextInput key='ip' id='ip' label='IP' value={this.state.data.ip} onChange={this.onChange} />
      <TextInput key='mac' id='mac' label='MAC' value={this.state.data.mac} onChange={this.onChange} />
     </InfoCol2>
     <StartButton key='dn_btn_start' onClick={() => this.addDevice()} />
     <SearchButton key='dn_btn_search' onClick={() => this.searchIP()} />
     <Result key='dn_result' result={this.state.result} />
    </article>
   )
 }
}

// ************** Discover **************
//
class Discover extends Component {
 constructor(props){
  super(props)
  this.state = {ipam_network_id:undefined,a_domain_id:undefined,content:null}
 }

 componentDidMount(){
  rest_call("api/ipam/network_list").then(result => this.setState({networks:result.data}))
  rest_call("api/dns/domain_list",{filter:'forward'}).then(result => this.setState({domains:result.data}))
 }

 onChange = (e) => this.setState({[e.target.name]:e.target.value});

 changeContent = (elem) => this.setState({content:elem})

 Result(props){
  return  <article className='code'><pre>{JSON.stringify(props.result,null,2)}</pre></article>
 }

 render() {
  if (this.state.networks && this.state.domains){
   return (
    <Fragment key='dd_fragment'>
     <article className="info">
      <h1>Device Discovery</h1>
      <InfoCol2 key='dd_content'>
       <SelectInput key='ipam_network_id' id='ipam_network_id' label='Network' value={this.state.ipam_network_id} options={this.state.networks.map(row => ({value:row.id, text:`${row.netasc} (${row.description})`}))} onChange={this.onChange} />
       <SelectInput key='a_domain_id' id='a_domain_id' label='Domain' value={this.state.a_domain_id} options={this.state.domains.map(row => ({value:row.id, text:row.name}))} onChange={this.onChange} />
      </InfoCol2>
      <StartButton key='dd_btn_start' onClick={() => this.changeContent(<DiscoverRun key={'dd_run_' + this.state.ipam_network_id} ipam_network_id={this.state.ipam_network_id} a_domain_id={this.state.a_domain_id} />)} />
     </article>
     <NavBar key='dd_navigation' id='dd_navigation' />
     {this.state.content}
    </Fragment>
   )
  } else
   return <Spinner />
 }
}

class DiscoverRun extends Component {
 componentDidMount(){
  rest_call("api/device/discover",{network_id:this.props.ipam_network_id, a_domain_id:this.props.a_domain_id}).then(result => this.setState(result))
 }

 render(){
  return (this.state) ? <article className='code'><pre>{JSON.stringify(this.state,null,2)}</pre></article> : <Spinner />
 }
}

// ************** Report **************
//
export class Report extends Component {
 constructor(props){
  super(props)
  this.state ={}
 }

 componentDidMount(){
  rest_call('api/device/list', { extra:['system','type','mac','oui','class']}).then(result => this.setState(result))
 }

 listItem = (row) => [row.id,row.hostname,row.class,row.ip,row.mac,row.oui,row.model,row.oid,row.serial,StateMap({state:row.state})]

 render(){
  return <ContentReport key='dev_cr' header='Devices' thead={['ID','Hostname','Class','IP','MAC','OUI','Model','OID','Serial','State']} trows={this.state.data} listItem={this.listItem} />
 }
}

// ************** Type List **************
//
class TypeList extends Component {
 constructor(props){
  super(props);
  this.state = {}
 }

 componentDidMount(){
  rest_call('api/device/type_list').then(result => this.setState(result))
 }

 changeContent = (elem) => this.setState({content:elem})

 listItem = (row) => [row.base,<TextButton text={row.name} onClick={() => this.props.changeSelf(<List key='device_list' field='type' search={row.name} />)} />,row.icon]

 render(){
  return <Fragment key='dev_tp_fragment'>
   <ContentList key='dev_tp_cl' header='Device Types' thead={['Class','Name','Icon']} trows={this.state.data} listItem={this.listItem} />
   <ContentData key='dev_tp_cd'>{this.state.content}</ContentData>
  </Fragment>
 }
}

// ************** Model List **************
//
class ModelList extends Component {
 constructor(props){
  super(props)
  this.state = {}
 }

 componentDidMount(){
  rest_call('api/device/model_list').then(result => this.setState({...result,result:'OK'}))
 }

 syncModels(){
  rest_call('api/device/model_list',{op:'sync'}).then(result => this.setState(result))
 }

 listItem = (row) => [row.id,row.name,row.type,<Fragment key={'ml_' + row.id}>
  <InfoButton key={'ml_btn_info_' + row.id} onClick={() => this.changeContent(<ModelInfo key={'model_info_'+row.id} id={row.id} />)} />
  <DeleteButton key={'ml_btn_delete_' + row.id}  onClick={() => this.deleteList('api/device/model_delete',row.id,'Really delete model?') } />
 </Fragment>]

 changeContent = (elem) => this.setState({content:elem})
 deleteList = (api,id,msg) => (window.confirm(msg) && rest_call(api, {id:id}).then(result => result.deleted && this.setState({data:this.state.data.filter(row => (row.id !== id)),content:null})))

 render(){
  return <Fragment key='dev_ml_fragment'>
   <ContentList key='dev_ml_cl' header='Device Models' thead={['ID','Model','Type','']} trows={this.state.data} listItem={this.listItem} result={this.state.result}>
    <ReloadButton key='ml_btn_reload' onClick={() => this.componentDidMount() } />
    <SyncButton key='_ml_btn_sync' onClick={() => this.syncModels() } title='Resync models' />
   </ContentList>
   <ContentData key='dev_ml_cd'>{this.state.content}</ContentData>
  </Fragment>
 }
}

// ************** Model Info **************
//
export class ModelInfo extends Component {
 constructor(props){
  super(props);
  this.state = {data:null, found:true};
 }

 onChange = (e) => {
  var data = {...this.state.data};
  data[e.target.name] = e.target[(e.target.type !== "checkbox") ? "value" : "checked"];
  this.setState({data:data});
 }

 updateInfo = (api) =>  rest_call(api,{op:'update', ...this.state.data}).then(result => this.setState(result))

 componentDidMount(){
  rest_call('api/device/model_info',{id:this.props.id}).then(result => this.setState(result))
 }

 render() {
  if (this.state.data)
   return (
    <article className='info'>
     <h1>Device Model</h1>
     <InfoCol2 key='dm_content'>
      <TextLine key='name' id='name' text={this.state.data.name} />
      <TextLine key='type' id='type' text={this.state.extra.type} />
      <TextInput key='defaults_file' id='defaults_file' label='Default File' value={this.state.data.defaults_file} onChange={this.onChange} />
      <TextInput key='image_file' id='image_file' label='Image  File' value={this.state.data.image_file} onChange={this.onChange} />
     </InfoCol2>
     <label htmlFor='parameters'>Parameters:</label>
     <textarea id='parameters' name='parameters' onChange={this.onChange} value={this.state.data.parameters} />
     <SaveButton key='dm_btn_save' onClick={() => this.updateInfo('api/device/model_info')} />
    </article>
   );
  else
   return <Spinner />
 }
}

// ************** OUI Search **************
//
class OUISearch extends Component {
 constructor(props){
  super(props)
  this.state = {data:{oui:''},content:null}
 }

 onChange = (e) => {
  var data = {...this.state.data}
  data[e.target.name] = e.target.value
  this.setState({data:data})
 }

 ouiSearch = () => {
  rest_call('api/master/oui_info',{oui:this.state.data.oui}).then(result => this.setState({content:<article><div className='info col2'><label htmlFor='oui'>OUI:</label><span id='oui'>{result.oui}</span><label htmlFor='company'>Company:</label><span id='company'>{result.company}</span></div></article>}))
 }

 render() {
  return (<div className='flexdiv'>
   <article className='lineinput'>
    <h1>OUI Search</h1>
    <div>
     <span>Type OUI or MAC address to find OUI/company name:<input type='text' id='oui' name='oui' required='required' onChange={this.onChange} value={this.state.data.oui} placeholder='00:00:00' /></span>
     <SearchButton key='oui_btn_search' title='Search' onClick={() => this.ouiSearch()} />
    </div>
   </article>
   {this.state.content}
  </div>)
 }
}

// ************** OUI LIST **************
//
class OUIList extends Component {

 componentDidMount(){
  rest_call('api/master/oui_list').then(result => this.setState(result))
 }

 render(){
  if (this.state)
   return <article className='table'>
    <h1>OUI</h1>
    <div className='table'>
     <div className='thead'>
      <div>oui</div><div>company</div>
     </div>
     <div className='tbody'>
      {this.state.data.map((row,index) => <div key={'tr_'+index}><div>{`${row.oui.substring(0,2)}:${row.oui.substring(2,4)}:${row.oui.substring(4,6)}`}</div><div>{row.company}</div></div>)}
     </div>
    </div>
   </article>
  else
   return <Spinner />
 }
}

// ************** TODO **************
//

class Extended extends Component {
 render() {
  return (<div>Device Extended (TODO)</div>);
 }
}

class Function extends Component {
 render() {
  return (<div>Device Function (TODO)</div>);
 }
}

class Configuration extends Component {
 render() {
  return (<div>Device Configuration (TODO)</div>);
 }
}

class ToConsole extends Component {
 render() {
  return (<div>Device To Console (TODO)</div>);
 }
}