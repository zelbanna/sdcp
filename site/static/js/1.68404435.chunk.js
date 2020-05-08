(this.webpackJsonprims=this.webpackJsonprims||[]).push([[1],{40:function(e,t,n){"use strict";n.r(t),n.d(t,"List",(function(){return _})),n.d(t,"Info",(function(){return h}));var a=n(18),i=n(15),c=n(4),r=n(5),o=n(6),s=n(7),l=n(0),u=n.n(l),d=n(12),p=n(13),f=n(14),m=n(19),_=function(e){Object(s.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).changeContent=function(e){return a.props.changeSelf(e)},a.deleteList=function(e,t){return window.confirm("Really delete interface "+t)&&Object(d.c)("api/interface/delete",{interfaces:[e]}).then((function(t){return t.deleted>0&&a.setState({data:a.state.data.filter((function(t){return t.interface_id!==e})),result:JSON.stringify(t.interfaces)})}))},a.cleanUp=function(){return window.confirm("Clean up empty interfaces?")&&Object(d.c)("api/interface/delete",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.resetStatus=function(){return Object(d.c)("api/interface/clear",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.discoverInterfaces=function(){return window.confirm("Rediscover interfaces?")&&Object(d.c)("api/interface/snmp",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.listItem=function(e){return[e.mac,e.ip?e.ip:"-",e.snmp_index,e.name,e.description,e.class,e.connection_id?u.a.createElement(m.HrefButton,{key:"conn_btn_"+e.interface_id,text:e.connection_id,onClick:function(){return a.changeContent(u.a.createElement(k,{key:"connection_info_"+e.connection_id,id:e.connection_id,device_id:a.props.device_id,changeSelf:a.changeContent}))},title:"Connection information"}):"-",u.a.createElement(p.StateLeds,{key:"il_if_state_"+e.interface_id,state:[e.if_state,e.ip_state]}),u.a.createElement(l.Fragment,{key:"il_btns_"+e.interface_id},u.a.createElement(m.InfoButton,{key:"il_btn_info_"+e.interface_id,onClick:function(){return a.changeContent(u.a.createElement(h,{key:"interface_info_"+e.interface_id,interface_id:e.interface_id,changeSelf:a.props.changeSelf}))},title:"Interface information"}),u.a.createElement(m.DeleteButton,{key:"il_btn_del_"+e.interface_id,onClick:function(){return a.deleteList(e.interface_id,e.name)},title:"Delete interface"}),!e.connection_id&&["wired","optical"].includes(e.class)&&u.a.createElement(m.LinkButton,{key:"il_btn_sync_"+e.interface_id,onClick:function(){return a.changeContent(u.a.createElement(h,{key:"interface_info_"+e.interface_id,op:"device",interface_id:e.interface_id,name:e.name,changeSelf:a.props.changeSelf}))},title:"Connect interface"}))]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.c)("api/interface/list",{device_id:this.props.device_id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.data?u.a.createElement(p.ContentReport,{key:"il_cl",header:"Interfaces",thead:["MAC","IP","SNMP","Name","Description","Class","Link","",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},u.a.createElement(m.ReloadButton,{key:"il_btn_reload",onClick:function(){return e.componentDidMount()}}),u.a.createElement(m.AddButton,{key:"il_btn_add",onClick:function(){return e.changeContent(u.a.createElement(h,{key:"interface_info_"+Object(d.d)(),device_id:e.props.device_id,interface_id:"new",changeSelf:e.props.changeSelf}))},title:"Add interface"}),u.a.createElement(m.TextButton,{key:"il_btn_rset",onClick:function(){return e.resetStatus()},title:"Reset interface state manually",text:"Reset"}),u.a.createElement(m.TextButton,{key:"il_btn_disc",onClick:function(){return e.discoverInterfaces()},title:"Discover device interfaces",text:"Discover"}),u.a.createElement(m.TextButton,{key:"il_btn_lldp",onClick:function(){return e.changeContent(u.a.createElement(v,{key:"interface_lldp",device_id:e.props.device_id,changeSelf:e.props.changeSelf}))},title:"Map interface connections",text:"LLDP"}),u.a.createElement(m.TextButton,{key:"il_btn_clean",onClick:function(){return e.cleanUp()},title:"Clean up empty interfaces",text:"Cleanup"}),this.state.loader):u.a.createElement(p.Spinner,null)}}]),n}(l.Component),h=function(e){Object(s.a)(h,e);var t=Object(o.a)(h);function h(e){var r;return Object(c.a)(this,h),(r=t.call(this,e)).changeContent=function(e){return r.props.changeSelf(e)},r.onChange=function(e){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},e.target.name,e.target.value))})},r.changeIpam=function(e){return n.e(2).then(n.bind(null,42)).then((function(t){return r.changeContent(u.a.createElement(t.AddressInfo,{key:"address_info_"+e,id:e}))}))},r.deleteIpam=function(){return window.confirm("Delete IP mapping?")&&Object(d.c)("api/ipam/address_delete",{id:r.state.data.ipam_id}).then((function(e){return"OK"===e.status&&r.setState({data:Object(i.a)({},r.state.data,{ipam_id:null})})}))},r.updateInfo=function(){return Object(d.c)("api/interface/info",Object(i.a)({op:"update"},r.state.data)).then((function(e){return r.setState(e)}))},r.updateDNS=function(){return window.confirm("Update DNS with device-interface-name")&&Object(d.c)("api/ipam/address_info",{op:"update",hostname:r.state.data.name,id:r.state.data.ipam_id}).then((function(e){return r.setState({result:JSON.stringify(e)})}))},r.deviceChange=function(e){r.setState({connect:Object(i.a)({},r.state.connect,Object(a.a)({},e.target.name,e.target.value))}),"id"===e.target.name&&e.target.value.length>0&&Object(d.c)("api/device/hostname",{id:e.target.value}).then((function(e){return e&&r.setState({connect:Object(i.a)({},r.state.connect,{found:"OK"===e.status,name:"OK"===e.status?e.data:"<N/A>"})})}))},r.stateInterface=function(){return r.state.connect.found&&Object(d.c)("api/interface/list",{device_id:r.state.connect.id,sort:"name",filter:["connected"]}).then((function(e){return r.setState({interfaces:e.data,op:"interface"})}))},r.interfaceChange=function(e){return r.setState({connect:Object(i.a)({},r.state.connect,Object(a.a)({},e.target.name,e.target["checkbox"!==e.target.type?"value":"checked"]))})},r.connectInterface=function(){return r.state.connect.interface_id&&Object(d.c)("api/interface/connect",{a_id:r.state.data.interface_id,b_id:r.state.connect.interface_id,map:r.state.connect.map}).then((function(e){return r.setState({connect:{},op:null})}))},r.disconnectInterface=function(){return r.state.peer&&Object(d.c)("api/interface/connect",{a_id:r.state.data.interface_id,b_id:r.state.peer.interface_id,disconnect:!0}).then((function(e){return r.setState({peer:null})}))},r.stateIpam=function(){r.state.domains&&r.state.networks?r.setState({op:"ipam"}):r.setState({op:"wait",ipam:{ip:""}}),r.state.domains||Object(d.c)("api/dns/domain_list",{filter:"forward"}).then((function(e){return r.setState({domains:e.data})})),r.state.networks||Object(d.c)("api/ipam/network_list").then((function(e){return r.setState({networks:e.data,op:"ipam"})}))},r.ipamChange=function(e){return r.setState({ipam:Object(i.a)({},r.state.ipam,Object(a.a)({},e.target.name,e.target.value))})},r.searchIP=function(){r.state.ipam.network_id&&Object(d.c)("api/ipam/address_find",{network_id:r.state.ipam.network_id}).then((function(e){return r.setState({ipam:Object(i.a)({},r.state.ipam,{ip:e.ip})})}))},r.createIpam=function(){Object(d.c)("api/interface/info",{interface_id:r.props.interface_id,op:"update",ipam_record:r.state.ipam}).then((function(e){return r.setState(Object(i.a)({},e,{op:null}))}))},r.state={op:r.props.op,connect:{name:"<N/A>",map:!1}},r}return Object(r.a)(h,[{key:"componentDidMount",value:function(){var e=this;Object(d.c)("api/interface/info",{interface_id:this.props.interface_id,mac:this.props.mac,name:this.props.name,device_id:this.props.device_id,class:this.props.class,extra:["classes"]}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;if(this.state.data){if(this.state.op)return"device"===this.state.op?u.a.createElement(p.LineArticle,{key:"ii_cnct_art"},"Connect ",this.state.data.name," to ",u.a.createElement(f.TextInput,{key:"ii_cnct_dev",id:"id",label:"Device ID",onChange:this.deviceChange})," with name '",this.state.connect.name,"'",u.a.createElement(m.BackButton,{key:"ii_cnct_btn_back",onClick:function(){return e.setState({op:null})},title:"Back"}),u.a.createElement(m.ForwardButton,{key:"ii_cnct_btn_fwd",onClick:function(){return e.stateInterface()},title:"Connect interface on "+this.state.connect.name})):"interface"===this.state.op?u.a.createElement(p.LineArticle,{key:"ii_cnct_art"},"Connect ",this.state.data.name," to ",this.state.connect.name," on",u.a.createElement(f.SelectInput,{key:"ii_cnct_int",id:"interface_id",label:"Interface",value:this.state.connect.interface_id,onChange:this.interfaceChange},this.state.interfaces.map((function(e){return u.a.createElement("option",{key:"ii_cnct_int_"+e.interface_id,value:e.interface_id},"".concat(e.interface_id," (").concat(e.name," - ").concat(e.description,")"))}))),u.a.createElement(f.CheckboxInput,{key:"ii_cnct_map",id:"map",value:this.state.connect.map,onChange:this.interfaceChange}),u.a.createElement(m.BackButton,{key:"ii_cnct_btn_back",onClick:function(){return e.setState({op:"device"})},title:"Back"}),u.a.createElement(m.ForwardButton,{key:"ii_cnct_btn_fwd",onClick:function(){return e.connectInterface()},title:"Complete connection"})):"ipam"===this.state.op?u.a.createElement(p.InfoArticle,{key:"ii_ipam_article",header:"Create IPAM record"},u.a.createElement(p.InfoColumns,{key:"ii_ipam_create"},u.a.createElement(f.SelectInput,{key:"ii_ipam_net",id:"network_id",label:"Network",value:this.state.ipam.network_id,onChange:this.ipamChange},this.state.networks.map((function(e,t){return u.a.createElement("option",{key:"ii_net_"+t,value:e.id},"".concat(e.netasc," (").concat(e.description,")"))}))),u.a.createElement(f.TextInput,{key:"ii_ipam_ip",id:"ip",value:this.state.ipam.ip,label:"IP",onChange:this.ipamChange}),u.a.createElement(f.SelectInput,{key:"ii_ipam_dom",id:"a_domain_id",label:"Domain",value:this.state.ipam.a_domain_id,onChange:this.ipamChange},this.state.domains.map((function(e,t){return u.a.createElement("option",{key:"ii_dom_"+t,value:e.id},e.name)})))),u.a.createElement(m.BackButton,{key:"ii_ipam_btn_back",onClick:function(){return e.setState({op:null})},title:"Back"}),u.a.createElement(m.SearchButton,{key:"ii_ipam_btn_find",onClick:function(){return e.searchIP()},title:"Search IP within network"}),u.a.createElement(m.ForwardButton,{key:"ii_ipam_btn_fwd",onClick:function(){return e.createIpam()},title:"Create IPAM entry"})):"wait"===this.state.op?u.a.createElement(p.Spinner,null):u.a.createElement("div",null,"Intermediate interface operation state");var t=this.state.data.ipam_id,n=this.state.peer;return u.a.createElement(p.InfoArticle,{key:"ii_article",header:"Interface"},u.a.createElement(p.InfoColumns,{key:"ii_columns",columns:3},u.a.createElement(f.TextInput,{key:"ii_name",id:"name",value:this.state.data.name,onChange:this.onChange}),u.a.createElement("div",null,t&&u.a.createElement(m.SyncButton,{key:"ii_btn_dns",onClick:function(){return e.updateDNS()},title:"Sync DNS information using name"})),u.a.createElement(f.SelectInput,{key:"ii_class",id:"class",value:this.state.data.class,onChange:this.onChange},this.state.classes.map((function(e){return u.a.createElement("option",{key:"ii_class_"+e,value:e},e)}))),u.a.createElement("div",null),u.a.createElement(f.TextInput,{key:"ii_description",id:"description",value:this.state.data.description,onChange:this.onChange}),u.a.createElement("div",null),u.a.createElement(f.TextInput,{key:"ii_snmp_index",id:"snmp_index",value:this.state.data.snmp_index,onChange:this.onChange}),u.a.createElement("div",null),u.a.createElement(f.TextInput,{key:"ii_mac",id:"mac",value:this.state.data.mac,onChange:this.onChange}),u.a.createElement("div",null),u.a.createElement(f.TextInput,{key:"ii_ipam_id",id:"ipam_id",value:this.state.data.ipam_id,onChange:this.onChange}),u.a.createElement("div",null,t&&u.a.createElement(m.GoButton,{key:"ii_ipam",onClick:function(){return e.changeIpam(e.state.data.ipam_id)},title:"View IPAM information"}),t&&u.a.createElement(m.DeleteButton,{key:"ii_delete",onClick:function(){return e.deleteIpam()},title:"Delete IPAM entry"}),!t&&"new"!==this.state.data.interface_id&&u.a.createElement(m.AddButton,{key:"ii_btn_ipam",onClick:function(){return e.stateIpam()},title:"Create IPAM entry"})),n&&u.a.createElement(l.Fragment,{key:"ii_frag_peer_int"},u.a.createElement(f.TextLine,{key:"ii_peer_int_id",id:"peer_interface",label:"Peer interface",text:this.state.peer.interface_id}),u.a.createElement(m.UnlinkButton,{key:"ii_peer_unlink",onClick:function(){return e.disconnectInterface()},title:"Disconnect from peer"})),n&&u.a.createElement(l.Fragment,{key:"ii_frag_peer_dev"},u.a.createElement(f.TextLine,{key:"ii_peer_dev_id",id:"peer_device",text:this.state.peer.device_id}),u.a.createElement("div",null))),"changeSelf"in this.props&&u.a.createElement(m.BackButton,{key:"ii_btn_back",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.state.data.device_id,changeSelf:e.props.changeSelf}))},title:"Back"}),u.a.createElement(m.ReloadButton,{key:"ii_btn_reload",onClick:function(){return e.componentDidMount()}}),u.a.createElement(m.SaveButton,{key:"ii_btn_save",onClick:function(){return e.updateInfo()},title:"Save interface information"}),!n&&"new"!==this.state.data.interface_id&&["wired","optical"].includes(this.state.data.class)&&u.a.createElement(m.NetworkButton,{key:"ii_btn_connect",onClick:function(){return e.setState({op:"device"})},title:"Connect peer interface"}),u.a.createElement(p.Result,{key:"ii_result",result:"OK"!==this.state.status?this.state.info:this.state.result}))}return u.a.createElement(p.Spinner,null)}}]),h}(l.Component),k=function(e){Object(s.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).onChange=function(e){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},e.target.name,e.target["checkbox"!==e.target.type?"value":"checked"]))})},r.updateInfo=function(){return Object(d.c)("api/interface/connection_info",Object(i.a)({op:"update"},r.state.data)).then((function(e){return r.setState(e)}))},r.state={},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.c)("api/interface/connection_info",{connection_id:this.props.id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.interfaces?u.a.createElement(p.InfoArticle,{key:"ci_article",header:"Connection "+this.props.id},u.a.createElement(p.InfoColumns,{key:"ci_columns"},u.a.createElement(f.CheckboxInput,{key:"map",id:"map",value:this.state.data.map,onChange:this.onChange}),this.state.interfaces.map((function(e,t){return u.a.createElement(f.TextLine,{key:"conn_int_"+t,id:"interface_"+t,text:"".concat(e.device_name," - ").concat(e.interface_name," (").concat(e.interface_id,")")})}))),u.a.createElement(m.BackButton,{key:"ci_btn_back",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.props.device_id,changeSelf:e.props.changeSelf}))},title:"Back"}),u.a.createElement(m.SaveButton,{key:"ci_btn_save",onClick:function(){return e.updateInfo()},title:"Save connection information"})):u.a.createElement(p.Spinner,null)}}]),n}(l.Component),v=function(e){Object(s.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).listItem=function(e){return[e.chassis_id,e.chassis_type,e.sys_name,e.port_id,e.port_type,e.port_desc,e.snmp_index,e.snmp_name,e.connection_id,e.status]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.c)("api/interface/lldp_mapping",{device_id:this.props.device_id}).then((function(t){return e.setState({data:Object.values(t.data)})}))}},{key:"render",value:function(){var e=this;return this.state.data?u.a.createElement(p.ContentReport,{key:"il_cr",header:"Interface",thead:["Chassis","Type","Name","Port ID","Type","Description","SNMP Index","SNMP Name","Conn","Status"],trows:this.state.data,listItem:this.listItem},u.a.createElement(m.BackButton,{key:"il_btn_back",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.props.device_id}))},title:"Back"})):u.a.createElement(p.Spinner,null)}}]),n}(l.Component)}}]);
//# sourceMappingURL=1.68404435.chunk.js.map