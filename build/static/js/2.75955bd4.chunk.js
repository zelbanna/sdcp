(this.webpackJsonprims=this.webpackJsonprims||[]).push([[2],{43:function(e,t,n){"use strict";n.r(t),n.d(t,"Main",(function(){return p})),n.d(t,"NetworkList",(function(){return _})),n.d(t,"AddressInfo",(function(){return w}));var a=n(19),r=n(16),i=n(4),o=n(5),s=n(7),c=n(6),u=n(8),d=n(0),l=n.n(d),h=n(13),m=n(14),k=n(15),f=n(20),p=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).changeContent=function(e){return n.setState(e)},n.state=l.a.createElement(_,{key:"network_list"}),n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement(d.Fragment,{key:"main_base"},this.state)}}]),t}(d.Component),_=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).listItem=function(e){return[e.id,e.netasc,e.description,e.service,l.a.createElement(d.Fragment,{key:"network_buttons_"+e.id},l.a.createElement(f.ConfigureButton,{key:"net_btn_info_"+e.id,onClick:function(){return n.changeContent(l.a.createElement(b,{key:"network_"+e.id,id:e.id}))},title:"Edit network properties"}),l.a.createElement(f.ItemsButton,{key:"net_btn_items_"+e.id,onClick:function(){return n.changeContent(l.a.createElement(C,{changeSelf:n.changeContent,key:"address_list_"+e.id,network_id:e.id}))},title:"View addresses"}),l.a.createElement(f.ViewButton,{key:"net_btn_layout_"+e.id,onClick:function(){return n.changeContent(l.a.createElement(y,{changeSelf:n.changeContent,key:"address_layout_"+e.id,network_id:e.id}))},title:"View usage map"}),l.a.createElement(f.DeleteButton,{key:"net_btn_delete_"+e.id,onClick:function(){return n.deleteList(e.id)},title:"Delete network"}),l.a.createElement(f.ReloadButton,{key:"net_btn_rset_"+e.id,onClick:function(){return n.resetStatus(e.id)},title:"Reset state for network addresses"}))]},n.changeContent=function(e){return n.setState({content:e})},n.deleteList=function(e){return window.confirm("Really delete network")&&Object(h.c)("api/ipam/network_delete",{id:e}).then((function(t){return t.deleted&&n.setState({data:n.state.data.filter((function(t){return t.id!==e})),content:null})}))},n.resetStatus=function(e){return Object(h.c)("api/ipam/clear",{network_id:e}).then((function(e){return n.setState({result:e.count})}))},n.state={},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/network_list").then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return l.a.createElement(d.Fragment,{key:"nl_fragment"},l.a.createElement(m.ContentList,{key:"nl_cl",header:"Networks",thead:["ID","Network","Description","DHCP",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},l.a.createElement(f.ReloadButton,{key:"nl_btn_reload",onClick:function(){return e.componentDidMount()}}),l.a.createElement(f.AddButton,{key:"nl_btn_add",onClick:function(){return e.changeContent(l.a.createElement(b,{key:"network_new_"+Object(h.d)(),id:"new"}))},title:"Add network"}),l.a.createElement(f.LogButton,{key:"nl_btn_doc",onClick:function(){return e.changeContent(l.a.createElement(v,{key:"network_leases"}))},title:"View IPAM/DHCP leases"})),l.a.createElement(m.ContentData,{key:"nl_cd"},this.state.content))}}]),t}(d.Component),b=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).onChange=function(e){return n.setState({data:Object(r.a)({},n.state.data,Object(a.a)({},e.target.name,e.target.value))})},n.changeContent=function(e){return n.setState({content:e})},n.updateInfo=function(){return Object(h.c)("api/ipam/network_info",Object(r.a)({op:"update"},n.state.data)).then((function(e){return n.setState(e)}))},n.state={data:null,found:!0},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/network_info",{id:this.props.id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.data?l.a.createElement(m.InfoArticle,{key:"net_article",header:"Network"},l.a.createElement(m.InfoColumns,{key:"network_content"},l.a.createElement(k.TextLine,{key:"id",id:"id",label:"ID",text:this.state.data.id}),l.a.createElement(k.TextInput,{key:"description",id:"description",value:this.state.data.description,onChange:this.onChange}),l.a.createElement(k.TextInput,{key:"network",id:"network",value:this.state.data.network,onChange:this.onChange}),l.a.createElement(k.TextInput,{key:"mask",id:"mask",value:this.state.data.mask,onChange:this.onChange}),l.a.createElement(k.TextInput,{key:"gateway",id:"gateway",value:this.state.data.gateway,onChange:this.onChange}),l.a.createElement(k.SelectInput,{key:"server_id",id:"server_id",label:"Server",value:this.state.data.server_id,onChange:this.onChange},this.state.servers.map((function(e,t){return l.a.createElement("option",{key:"ni_srv_"+t,value:e.id},"".concat(e.service,"@").concat(e.node))}))),l.a.createElement(k.SelectInput,{key:"reverse_zone_id",id:"reverse_zone_id",label:"Reverse Zone",value:this.state.data.reverse_zone_id,onChange:this.onChange},this.state.domains.map((function(e,t){return l.a.createElement("option",{key:"ni_rzone_"+t,value:e.id},"".concat(e.server," (").concat(e.name,")"))})))),l.a.createElement(f.SaveButton,{key:"network_btn_save",onClick:function(){return e.updateInfo()},title:"Save"})):l.a.createElement(m.Spinner,null)}}]),t}(d.Component),y=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).changeContent=function(e){return a.props.changeSelf(e)},a.changeDevice=function(e){return n.e(0).then(n.bind(null,39)).then((function(t){return a.changeContent(l.a.createElement(t.Info,{key:"di_"+e,id:e}))}))},a.createDevice=function(e,t){return n.e(0).then(n.bind(null,39)).then((function(n){return a.changeContent(l.a.createElement(n.New,{key:"dn_new",ipam_network_id:e,ip:t}))}))},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/address_list",{network_id:this.props.network_id,dict:"ip_integer",extra:["device_id"]}).then((function(t){return e.setState(Object(r.a)({},t,{start_address:parseInt(t.network.split(".")[3])}))}))}},{key:"render",value:function(){var e=this;if(this.state){for(var t=[],n=function(n){e.state.data.hasOwnProperty(e.state.start+n)?t.push(l.a.createElement(f.IpamRedButton,{key:"btn_"+e.state.start+n,onClick:function(){return e.changeDevice(e.state.data[e.state.start+n].device_id)},text:n%256})):t.push(l.a.createElement(f.IpamGreenButton,{key:"btn_"+e.state.start+n,onClick:function(){return e.createDevice(e.props.network_id,Object(h.b)(e.state.start+n))},text:n%256}))},a=0;a<this.state.size;a++)n(a);return l.a.createElement(m.Article,{key:"il_art",header:this.state.network+"/"+this.state.mask},t)}return l.a.createElement(m.Spinner,null)}}]),t}(d.Component),v=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).listItem=function(e){return[e.ip,e.mac,e.hostname,e.oui,e.starts,e.ends]},n.state={},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/server_leases",{type:"active"}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){return l.a.createElement(m.ContentReport,{key:"lease_cr",header:"Leases",thead:["IP","Mac","Hostname","OUI","Starts","End"],trows:this.state.data,listItem:this.listItem})}}]),t}(d.Component),C=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).changeContent=function(e){return n.props.changeSelf(e)},n.listItem=function(e){return[e.id,e.ip,e.hostname,e.domain,l.a.createElement(m.StateLeds,{state:e.state}),l.a.createElement(d.Fragment,{key:"ip_button_"+e.id},l.a.createElement(f.ConfigureButton,{key:"al_btn_info"+e.id,onClick:function(){return n.changeContent(l.a.createElement(w,{key:"address_info_"+e.id,id:e.id}))},title:"Edit address entry"}),l.a.createElement(f.DeleteButton,{key:"al_btn_delete"+e.id,onClick:function(){return n.deleteList(e.id)},title:"Delete address entry"}))]},n.deleteList=function(e){return window.confirm("Delete address?")&&Object(h.c)("api/ipam/address_delete",{id:e}).then((function(t){return t.deleted&&n.setState({data:n.state.data.filter((function(t){return t.id!==e}))})}))},n.state={data:null,result:null},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/address_list",{network_id:this.props.network_id,extra:["hostname","a_domain_id","device_id"]}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return l.a.createElement(m.ContentReport,{key:"al_cr",header:"Allocated IP Addresses",thead:["ID","IP","Hostname","Domain","",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},l.a.createElement(f.ReloadButton,{key:"al_btn_reload",onClick:function(){return e.componentDidMount()}}),l.a.createElement(f.AddButton,{key:"al_btn_add",onClick:function(){return e.changeContent(l.a.createElement(w,{key:"address_new_"+Object(h.d)(),network_id:e.props.network_id,id:"new"}))},title:"Add address entry"}))}}]),t}(d.Component),w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).onChange=function(e){return n.setState({data:Object(r.a)({},n.state.data,Object(a.a)({},e.target.name,e.target.value))})},n.updateInfo=function(){return Object(h.c)("api/ipam/address_info",Object(r.a)({op:"update"},n.state.data)).then((function(e){return n.setState(e)}))},n.state={data:null,found:!0},n}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/ipam/address_info",{id:this.props.id,network_id:this.props.network_id}).then((function(t){return e.setState(t)})),Object(h.c)("api/dns/domain_list",{filter:"forward"}).then((function(t){return e.setState({domains:t.data})}))}},{key:"render",value:function(){var e=this;return this.state&&this.state.data&&this.state.domains?l.a.createElement(m.InfoArticle,{key:"ip_article",header:"IP Address"},l.a.createElement(m.InfoColumns,{key:"ip_content"},l.a.createElement(k.TextLine,{key:"id",id:"id",label:"ID",text:this.state.data.id}),l.a.createElement(k.TextLine,{key:"network",id:"network",text:this.state.extra.network}),l.a.createElement(k.TextInput,{key:"ip",id:"ip",label:"IP",value:this.state.data.ip,onChange:this.onChange}),l.a.createElement(k.TextInput,{key:"hostname",id:"hostname",value:this.state.data.hostname,onChange:this.onChange}),l.a.createElement(k.SelectInput,{key:"a_domain_id",id:"a_domain_id",label:"Domain",value:this.state.data.a_domain_id,onChange:this.onChange},this.state.domains.map((function(e,t){return l.a.createElement("option",{key:"ai_dom_"+t,value:e.id},e.name)})))),l.a.createElement(f.SaveButton,{key:"ip_save",onClick:function(){return e.updateInfo()},title:"Save"}),l.a.createElement(m.Result,{key:"ip_operation",result:"OK"!==this.state.status?this.state.info:"OK"})):l.a.createElement(m.Spinner,null)}}]),t}(d.Component)}}]);
//# sourceMappingURL=2.75955bd4.chunk.js.map