import React, { Component } from 'react';
import { post_call } from './infra/Functions.js';
import { RimsContext, Flex, InfoArticle, InfoColumns, Spinner, ContentList, ContentData } from './infra/UI.jsx';
import { TextInput } from './infra/Inputs.jsx';
import { ReloadButton, SaveButton, TermButton } from './infra/Buttons.jsx';
import { NavBar, NavButton, NavInfo } from './infra/Navigation.jsx';

// ************** Manage **************
//
export class Manage extends Component {
 componentDidMount(){
  post_call('api/device/hostname',{id:this.props.device_id}).then(result => {
   this.context.loadNavigation(<NavBar key='cons_navbar'>
    <NavInfo key='cons_nav_name' title={result.data} />
    <NavButton key='cons_nav_inv' title='Inventory' onClick={() => this.changeContent(<Inventory key='cons_inventory' device_id={this.props.device_id} type={this.props.type} />)} />
    <NavButton key='con_nav_info' title='Info' onClick={() => this.changeContent(<Info key='con_info' device_id={this.props.device_id} type={this.props.type} />)} />
   </NavBar>)
  })
  this.setState(<Inventory key='cons_inventory' device_id={this.props.device_id} type={this.props.type} />);
 }

 changeContent = (elem) => this.setState(elem)

 render(){
  return <>{this.state}</>
 }
}
Manage.contextType = RimsContext;

// ************** Info **************
//
class Info extends Component{
 constructor(props){
  super(props)
  this.state = {}
 }

 componentDidMount(){
  post_call('api/devices/'+this.props.type+'/info',{device_id:this.props.device_id}).then(result => this.setState(result))
 }

 onChange = (e) => this.setState({data:{...this.state.data, [e.target.name]:e.target.value}});

 updateInfo = () => post_call('api/devices/'+this.props.type+'/info',{op:'update', ...this.state.data}).then(result => this.setState(result))

 render(){
  if (this.state.data){
   return <Flex key='ci_flex' style={{justifyContent:'space-evenly'}}>
    <InfoArticle key='ci_article' header={'Console Info - ' + this.props.type}>
     <InfoColumns key='ci_info'>
      <TextInput key='ci_access_url' id='access_url' label='Access URL' value={this.state.data.access_url} onChange={this.onChange} title='URL used as base together with port' />
      <TextInput key='ci_port' id='port' value={this.state.data.port} onChange={this.onChange} />
     </InfoColumns>
     <ReloadButton key='ci_btn_reload' onClick={() => this.componentDidMount() } />
     <SaveButton key='ci_btn_save' onClick={() => this.updateInfo() } />
    </InfoArticle>
   </Flex>
  } else
   return <Spinner />
 }
}
// ************** Inventory **************
//
export class Inventory extends Component{
 constructor(props){
  super(props)
  this.state = {}
 }

 componentDidMount(){
  post_call('api/devices/' + this.props.type + '/inventory',{device_id:this.props.device_id}).then(result => this.setState(result))
 }

 cnctFunction = (intf) => {
  const port = parseInt(intf) + parseInt(this.state.extra.port);
  window.open(`${this.state.extra.access_url}:${port}`,'_self');
 }

 listItem = (row) => [row.interface,row.name,<TermButton key={'con_inv_btn_cnct_' + row.interface} onClick={() => this.cnctFunction(row.interface)} title='Connect' />]

 render(){
  if (this.state.data){
   return <>
    <ContentList key='cl' header='Inventory' thead={['Port','Device','']} trows={this.state.data} listItem={this.listItem}>
     <ReloadButton key='reload' onClick={() => {this.setState({data:undefined}); this.componentDidMount()} } />
    </ContentList>
    <ContentData key='cda' mountUpdate={(fun) => this.changeContent = fun} />
   </>
  } else
   return <Spinner />
 }
}

