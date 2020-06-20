(this.webpackJsonprims=this.webpackJsonprims||[]).push([[1],{39:function(e,t,n){"use strict";n.r(t),n.d(t,"List",(function(){return _})),n.d(t,"Info",(function(){return v}));var a=n(18),i=n(14),c=n(4),r=n(5),o=n(6),l=n(7),s=n(0),u=n.n(s),d=n(12),p=n(13),m=n(15),f=n(19),h=n(1),k=n.n(h),_=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).changeContent=function(e){return a.props.changeSelf(e)},a.deleteList=function(e,t){return window.confirm("Really delete interface "+t)&&Object(d.d)("api/interface/delete",{interface_id:e}).then((function(t){return t.deleted&&a.setState({data:a.state.data.filter((function(t){return t.interface_id!==e})),result:JSON.stringify(t.interfaces)})}))},a.cleanUp=function(){return window.confirm("Clean up empty interfaces?")&&Object(d.d)("api/interface/cleanup",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.resetStatus=function(){return Object(d.d)("api/interface/clear",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.discoverInterfaces=function(){return window.confirm("Rediscover interfaces?")&&Object(d.d)("api/interface/snmp",{device_id:a.props.device_id}).then((function(e){return a.componentDidMount()}))},a.listItem=function(e){return[e.snmp_index,e.name,e.mac,e.ip?e.ip:"-",e.description,e.class,e.connection_id?u.a.createElement(f.HrefButton,{key:"conn_btn_"+e.interface_id,text:e.connection_id,onClick:function(){return a.changeContent(u.a.createElement(g,{key:"connection_info_"+e.connection_id,id:e.connection_id,device_id:a.props.device_id,changeSelf:a.changeContent}))},title:"Connection information"}):"-",u.a.createElement(u.a.Fragment,null,u.a.createElement(p.StateLeds,{key:"state",state:[e.if_state,e.ip_state]}),u.a.createElement(f.InfoButton,{key:"info",onClick:function(){return a.changeContent(u.a.createElement(v,{key:e.interface_id,interface_id:e.interface_id,changeSelf:a.props.changeSelf}))},title:"Interface information"}),e.snmp_index&&u.a.createElement(f.HealthButton,{key:"stats",onClick:function(){return a.changeContent(u.a.createElement(y,{key:e.interface_id,device_id:a.props.device_id,interface_id:e.interface_id,name:e.name}))},title:"Interface stats"}),u.a.createElement(f.DeleteButton,{key:"del",onClick:function(){return a.deleteList(e.interface_id,e.name)},title:"Delete interface"}),!e.connection_id&&["wired","optical"].includes(e.class)&&u.a.createElement(f.LinkButton,{key:"link",onClick:function(){return a.changeContent(u.a.createElement(v,{key:"interface_info_"+e.interface_id,op:"connect_device",interface_id:e.interface_id,name:e.name,changeSelf:a.props.changeSelf}))},title:"Connect interface"}))]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.d)("api/interface/list",{device_id:this.props.device_id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.data?u.a.createElement(p.ContentReport,{key:"il_cl",header:"Interfaces",thead:["SNMP","Name","MAC","IP Address","Description","Type","Link",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},u.a.createElement(f.ReloadButton,{key:"il_btn_reload",onClick:function(){return e.componentDidMount()}}),u.a.createElement(f.AddButton,{key:"il_btn_add",onClick:function(){return e.changeContent(u.a.createElement(v,{key:"interface_info",device_id:e.props.device_id,interface_id:"new",changeSelf:e.props.changeSelf}))},title:"Add interface"}),u.a.createElement(f.TextButton,{key:"il_btn_rset",onClick:function(){return e.resetStatus()},title:"Reset interface state manually",text:"Reset"}),u.a.createElement(f.TextButton,{key:"il_btn_disc",onClick:function(){return e.discoverInterfaces()},title:"Discover device interfaces",text:"Discover"}),u.a.createElement(f.TextButton,{key:"il_btn_lldp",onClick:function(){return e.changeContent(u.a.createElement(b,{key:"interface_lldp",device_id:e.props.device_id,changeSelf:e.props.changeSelf}))},title:"Map interface connections",text:"LLDP"}),u.a.createElement(f.TextButton,{key:"il_btn_clean",onClick:function(){return e.cleanUp()},title:"Clean up empty interfaces",text:"Cleanup"}),this.state.loader):u.a.createElement(p.Spinner,null)}}]),n}(s.Component),v=function(e){Object(l.a)(h,e);var t=Object(o.a)(h);function h(e){var r;return Object(c.a)(this,h),(r=t.call(this,e)).changeContent=function(e){return r.props.changeSelf(e)},r.onChange=function(e){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},e.target.name,e.target.value))})},r.updateInfo=function(){return Object(d.d)("api/interface/info",Object(i.a)({op:"update"},r.state.data)).then((function(e){return r.setState(e)}))},r.changeIpam=function(e){return n.e(2).then(n.bind(null,43)).then((function(t){return r.changeContent(u.a.createElement(t.AddressInfo,{key:"address_info_"+e,id:e}))}))},r.stateIpam=function(){r.setState({op:r.state.domains&&r.state.networks?"ipam":"wait",ipam:{ip:"<N/A>"}}),r.state.domains||Object(d.d)("api/dns/domain_list",{filter:"forward"}).then((function(e){return r.setState({domains:e.data})})),r.state.networks||Object(d.d)("api/ipam/network_list").then((function(e){return r.setState({networks:e.data,op:"ipam"})}))},r.ipamSearchIP=function(){r.state.ipam.network_id&&Object(d.d)("api/ipam/address_find",{network_id:r.state.ipam.network_id}).then((function(e){return r.setState({ipam:Object(i.a)({},r.state.ipam,{ip:e.ip})})}))},r.ipamOnChange=function(e){return r.setState({ipam:Object(i.a)({},r.state.ipam,Object(a.a)({},e.target.name,e.target.value))})},r.ipamCreate=function(){return Object(d.d)("api/interface/info",{op:"ipam_create",interface_id:r.state.data.interface_id,record:r.state.ipam}).then((function(e){return r.setState(Object(i.a)({},e,{op:null}))}))},r.ipamPrimary=function(e){return Object(d.d)("api/interface/info",{op:"ipam_primary",interface_id:r.state.data.interface_id,ipam_id:e}).then((function(e){return r.setState(e)}))},r.ipamDelete=function(e){return window.confirm("Delete IP Address?")&&Object(d.d)("api/ipam/address_delete",{id:e}).then((function(e){return r.componentDidMount()}))},r.ipamDnsSync=function(){return Object(d.d)("api/interface/info",{op:"dns_sync",interface_id:r.state.data.interface_id})},r.connectDeviceChange=function(e){r.setState({connect:Object(i.a)({},r.state.connect,Object(a.a)({},e.target.name,e.target.value))}),"id"===e.target.name&&e.target.value.length>0&&Object(d.d)("api/device/hostname",{id:e.target.value}).then((function(e){return e&&r.setState({connect:Object(i.a)({},r.state.connect,{found:"OK"===e.status,name:"OK"===e.status?e.data:"<N/A>"})})}))},r.connectInterfaceChange=function(e){return r.setState({connect:Object(i.a)({},r.state.connect,Object(a.a)({},e.target.name,e.target["checkbox"!==e.target.type?"value":"checked"]))})},r.disconnectInterface=function(){return r.state.peer&&Object(d.d)("api/interface/connect",{a_id:r.state.data.interface_id,b_id:r.state.peer.interface_id,disconnect:!0}).then((function(e){return r.setState({peer:null})}))},r.stateInterface=function(){return r.state.connect.found&&Object(d.d)("api/interface/list",{device_id:r.state.connect.id,sort:"name",filter:["connected"]}).then((function(e){return r.setState({interfaces:e.data,op:"connect_interface"})}))},r.connectInterfaceConnect=function(){return r.state.connect.interface_id&&Object(d.d)("api/interface/connect",{a_id:r.state.data.interface_id,b_id:r.state.connect.interface_id,map:r.state.connect.map}).then((function(e){return r.setState({connect:{},op:null})}))},r.state={op:r.props.op,connect:{name:"<N/A>",map:!1}},r}return Object(r.a)(h,[{key:"componentDidMount",value:function(){var e=this;Object(d.d)("api/interface/info",{interface_id:this.props.interface_id,mac:this.props.mac,name:this.props.name,device_id:this.props.device_id,class:this.props.class,extra:["classes","ip"]}).then((function(t){return e.setState(Object(i.a)({},t,{update:void 0}))}))}},{key:"componentDidUpdate",value:function(e){e!==this.props&&this.componentDidMount()}},{key:"render",value:function(){var e=this;if(this.state.data){if(this.state.op)return"connect_device"===this.state.op?u.a.createElement(p.LineArticle,{key:"ii_cnct_art"},"Connect ",this.state.data.name," to ",u.a.createElement(m.TextInput,{key:"ii_cnct_dev",id:"id",label:"Device ID",onChange:this.connectDeviceChange})," with name '",this.state.connect.name,"'",u.a.createElement(f.BackButton,{key:"back",onClick:function(){return e.setState({op:null})},title:"Back"}),u.a.createElement(f.ForwardButton,{key:"fwd",onClick:function(){return e.stateInterface()},title:"Connect interface on "+this.state.connect.name})):"connect_interface"===this.state.op?u.a.createElement(p.LineArticle,{key:"la_cnct"},"Connect ",this.state.data.name," to ",this.state.connect.name," on",u.a.createElement(m.SelectInput,{key:"interface",id:"interface_id",label:"Interface",value:this.state.connect.interface_id,onChange:this.connectInterfaceChange},this.state.interfaces.map((function(e){return u.a.createElement("option",{key:e.interface_id,value:e.interface_id},"".concat(e.interface_id," (").concat(e.name," - ").concat(e.description,")"))}))),u.a.createElement(m.CheckboxInput,{key:"map",id:"map",value:this.state.connect.map,onChange:this.connectInterfaceChange}),u.a.createElement(f.BackButton,{key:"back",onClick:function(){return e.setState({op:"connect_device"})},title:"Back"}),u.a.createElement(f.ForwardButton,{key:"fwd",onClick:function(){return e.connectInterfaceConnect()},title:"Complete connection"})):"ipam"===this.state.op?u.a.createElement(p.InfoArticle,{key:"ia_ipam",header:"Create IPAM record"},u.a.createElement(p.InfoColumns,{key:"ic"},u.a.createElement(m.SelectInput,{key:"network",id:"network_id",label:"Network",value:this.state.ipam.network_id,onChange:this.ipamOnChange},this.state.networks.map((function(e){return u.a.createElement("option",{key:e.id,value:e.id},"".concat(e.netasc," (").concat(e.description,")"))}))),u.a.createElement(m.TextInput,{key:"ip",id:"ip",value:this.state.ipam.ip,label:"IP",onChange:this.ipamOnChange}),u.a.createElement(m.SelectInput,{key:"domain",id:"a_domain_id",label:"Domain",value:this.state.ipam.a_domain_id,onChange:this.ipamOnChange},this.state.domains.map((function(e){return u.a.createElement("option",{key:e.id,value:e.id},e.name)})))),u.a.createElement(f.BackButton,{key:"back",onClick:function(){return e.setState({op:null})},title:"Back"}),u.a.createElement(f.SearchButton,{key:"find_ip",onClick:function(){return e.ipamSearchIP()},title:"Search IP within network"}),u.a.createElement(f.ForwardButton,{key:"fwd",onClick:function(){return e.ipamCreate()},title:"Create IPAM entry"})):"wait"===this.state.op?u.a.createElement(p.Spinner,null):u.a.createElement("div",null,"Intermediate interface operation state");var t=this.state.data.ipam_id,n="new"!==this.state.data.interface_id,a=this.state.peer,i=void 0===this.state.update?"":"Updated: "+JSON.stringify(this.state.update);return u.a.createElement(p.InfoArticle,{key:"ia_interface_info",header:"Interface"},u.a.createElement(p.InfoColumns,{key:"ic",columns:3},u.a.createElement(m.TextLine,{key:"id",id:"id",label:"Local ID",text:this.state.data.interface_id}),u.a.createElement("div",null),u.a.createElement(m.TextInput,{key:"name",id:"name",value:this.state.data.name,onChange:this.onChange}),t?u.a.createElement(f.SyncButton,{key:"sync",onClick:function(){return e.ipamDnsSync()},title:"sync interface name and IP hostname"}):u.a.createElement("div",null),u.a.createElement(m.SelectInput,{key:"class",id:"class",value:this.state.data.class,onChange:this.onChange},this.state.classes.map((function(e){return u.a.createElement("option",{key:e,value:e},e)}))),u.a.createElement("div",null),u.a.createElement(m.TextInput,{key:"description",id:"description",value:this.state.data.description,onChange:this.onChange}),u.a.createElement("div",null),u.a.createElement(m.TextInput,{key:"snmp_index",id:"snmp_index",label:"SNMP index",value:this.state.data.snmp_index,onChange:this.onChange}),u.a.createElement("div",null),u.a.createElement(m.TextInput,{key:"mac",id:"mac",value:this.state.data.mac,onChange:this.onChange}),u.a.createElement("div",null),t&&u.a.createElement(u.a.Fragment,null,u.a.createElement(m.TextLine,{key:"ip",id:"ip",label:"Primary IP",text:this.state.primary.ip}),u.a.createElement("div",null,u.a.createElement(f.GoButton,{key:"go",onClick:function(){return e.changeIpam(e.state.primary.id)},title:"Edit IPAM entry"}),u.a.createElement(f.DeleteButton,{key:"delete",onClick:function(){return e.ipamDelete(e.state.primary.id)},title:"Delete IPAM entry"}))),this.state.alternatives.map((function(t){return u.a.createElement(s.Fragment,{key:t.ip},u.a.createElement(m.TextLine,{key:"ip",id:t.ip,label:"Alternative IP",text:t.ip}),u.a.createElement("div",null,u.a.createElement(f.GoButton,{key:"go",onClick:function(){return e.changeIpam(t.id)},title:"Edit IPAM entry"}),u.a.createElement(f.SyncButton,{key:"primary",onClick:function(){return e.ipamPrimary(t.id)},title:"Make primary"}),u.a.createElement(f.DeleteButton,{key:"delete",onClick:function(){return e.ipamDelete(t.id)},title:"Delete IPAM entry"})))})),a&&u.a.createElement(u.a.Fragment,null,u.a.createElement(m.TextLine,{key:"peer_int_id",id:"peer_interface",label:"Peer Interface",text:a.interface_id}),u.a.createElement(f.UnlinkButton,{key:"unlink",onClick:function(){return e.disconnectInterface()},title:"Disconnect from peer"})),a&&u.a.createElement(u.a.Fragment,null,u.a.createElement(m.TextLine,{key:"peer_dev_id",id:"peer_device",label:"Peer Device",text:a.device_id}),u.a.createElement("div",null))),"changeSelf"in this.props&&u.a.createElement(f.ItemsButton,{key:"list",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.state.data.device_id,changeSelf:e.props.changeSelf}))},title:"Interfaces"}),"new"!==this.props.interface_id&&u.a.createElement(f.ReloadButton,{key:"reload",onClick:function(){return e.componentDidMount()}}),u.a.createElement(f.SaveButton,{key:"save",onClick:function(){return e.updateInfo()},title:"Save interface information"}),n&&!a&&["wired","optical"].includes(this.state.data.class)&&u.a.createElement(f.LinkButton,{key:"connect",onClick:function(){return e.setState({op:"connect_device"})},title:"Connect peer interface"}),n&&u.a.createElement(f.AddButton,{key:"add",onClick:function(){return e.stateIpam()},title:"Add IP"}),u.a.createElement(p.Result,{key:"result",result:i}))}return u.a.createElement(p.Spinner,null)}}]),h}(s.Component),y=function(e){Object(l.a)(s,e);var t=Object(o.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).updateItems=function(e){return Object(d.d)("api/statistics/query_interface",{device_id:n.props.device_id,interface_id:n.props.interface_id,range:e}).then((function(e){var t=new n.vis.DataSet(e.data.flatMap((function(e){var t=e.time,n=e.in8s,a=e.out8s,i=e.inUPs,c=e.outUPs;return[{x:new Date(1e3*t),y:n,group:"ib"},{x:new Date(1e3*t),y:a,group:"ob"},{x:new Date(1e3*t),y:i,group:"ip"},{x:new Date(1e3*t),y:c,group:"op"}]})));n.graph.setItems(t),n.graph.fit()}))},n.rangeChange=function(e){n.setState(Object(a.a)({},e.target.name,e.target.value)),n.updateItems(e.target.value)},n.checkChange=function(e){n.setState({visibility:Object(i.a)({},n.state.visibility,Object(a.a)({},e.target.name,e.target.checked))}),n.graph.setOptions({groups:{visibility:Object(a.a)({},e.target.name,e.target.checked)}})},n.gotoNow=function(){var e=new Date;n.graph.moveTo(e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes())},n.state={range:1,visibility:{ib:!0,ob:!0,ip:!0,op:!0}},n.canvas=u.a.createRef(),n.graph=null,n.vis=null,n}return Object(r.a)(s,[{key:"componentDidMount",value:function(){var e=this;n.e(5).then(n.bind(null,58)).then((function(t){e.vis=t;var n=new e.vis.DataSet([{id:"ib",content:"In"},{id:"ob",content:"Out"},{id:"ip",content:"In",options:{yAxisOrientation:"right"}},{id:"op",content:"Out",options:{yAxisOrientation:"right"}}]);e.graph=new e.vis.Graph2d(e.canvas.current,[],n,{locale:"en",width:"100%",height:"100%",zoomMin:6e4,zoomMax:12096e5,clickToUse:!0,drawPoints:!1,interpolation:!1,legend:!0,dataAxis:{alignZeros:!1,icons:!0,left:{title:{text:"kbps"}},right:{title:{text:"packets per second"}}}}),e.updateItems(e.state.range)}))}},{key:"render",value:function(){var e=this,t=this.state.visibility;return u.a.createElement(p.Article,{key:"is_art",header:"Statistics"},u.a.createElement(f.ReloadButton,{key:"reload",onClick:function(){return e.updateItems(e.state.range)},title:"Reload"}),u.a.createElement(f.RevertButton,{key:"reset",onClick:function(){return e.gotoNow()},title:"Go to now"}),u.a.createElement("br",null),u.a.createElement(m.TextLine,{key:"name",id:"name",label:"Interface name",text:this.props.name}),u.a.createElement("br",null),u.a.createElement(m.SelectInput,{key:"range",id:"range",label:"Time range",value:this.state.range,onChange:this.rangeChange},u.a.createElement("option",{value:"1"},"1h"),u.a.createElement("option",{value:"4"},"4h"),u.a.createElement("option",{value:"8"},"8h"),u.a.createElement("option",{value:"24"},"24h")),u.a.createElement(m.CheckboxInput,{key:"ib",id:"ib",label:"In bps",value:t.ib,onChange:this.checkChange}),u.a.createElement(m.CheckboxInput,{key:"ob",id:"ob",label:"Out bps",value:t.ob,onChange:this.checkChange}),u.a.createElement(m.CheckboxInput,{key:"ip",id:"ip",label:"In pps",value:t.ip,onChange:this.checkChange}),u.a.createElement(m.CheckboxInput,{key:"op",id:"op",label:"Out pps",value:t.op,onChange:this.checkChange}),u.a.createElement("div",{className:k.a.graphs,ref:this.canvas}))}}]),s}(s.Component),g=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).onChange=function(e){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},e.target.name,e.target["checkbox"!==e.target.type?"value":"checked"]))})},r.updateInfo=function(){return Object(d.d)("api/interface/connection_info",Object(i.a)({op:"update"},r.state.data)).then((function(e){return r.setState(e)}))},r.state={},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.d)("api/interface/connection_info",{connection_id:this.props.id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.interfaces?u.a.createElement(p.InfoArticle,{key:"ci_article",header:"Connection "+this.props.id},u.a.createElement(p.InfoColumns,{key:"ci_columns"},u.a.createElement(m.CheckboxInput,{key:"map",id:"map",value:this.state.data.map,onChange:this.onChange}),this.state.interfaces.map((function(e,t){return u.a.createElement(m.TextLine,{key:t,id:"interface_"+t,text:"".concat(e.device_name," - ").concat(e.interface_name," (").concat(e.interface_id,")")})}))),u.a.createElement(f.BackButton,{key:"ci_btn_back",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.props.device_id,changeSelf:e.props.changeSelf}))},title:"Back"}),u.a.createElement(f.SaveButton,{key:"ci_btn_save",onClick:function(){return e.updateInfo()},title:"Save connection information"})):u.a.createElement(p.Spinner,null)}}]),n}(s.Component),b=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).listItem=function(e){return[e.chassis_id,e.chassis_type,e.sys_name,e.port_id,e.port_type,e.port_desc,e.snmp_index,e.snmp_name,e.connection_id,e.status]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(d.d)("api/interface/lldp_mapping",{device_id:this.props.device_id}).then((function(t){return e.setState({data:Object.values(t.data)})}))}},{key:"render",value:function(){var e=this;return this.state.data?u.a.createElement(p.ContentReport,{key:"il_cr",header:"Interface",thead:["Chassis","Type","Name","Port ID","Type","Description","SNMP Index","SNMP Name","Conn","Status"],trows:this.state.data,listItem:this.listItem},u.a.createElement(f.BackButton,{key:"il_btn_back",onClick:function(){return e.props.changeSelf(u.a.createElement(_,{key:"interface_list",device_id:e.props.device_id}))},title:"Back"})):u.a.createElement(p.Spinner,null)}}]),n}(s.Component)}}]);
//# sourceMappingURL=1.c4a125bd.chunk.js.map