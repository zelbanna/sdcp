(this.webpackJsonprims=this.webpackJsonprims||[]).push([[13],{42:function(e,t,n){"use strict";n.r(t),n.d(t,"Search",(function(){return m})),n.d(t,"Device",(function(){return v})),n.d(t,"List",(function(){return k}));var a=n(14),r=n(18),i=n(4),c=n(5),s=n(6),o=n(7),u=n(0),l=n.n(u),h=n(12),d=n(13),f=n(15),p=n(20),m=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).changeContent=function(e){return a.props.changeSelf(e)},a.onChange=function(e){return a.setState(Object(r.a)({},e.target.name,e.target.value))},a.state={field:"mac",search:""},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return l.a.createElement(d.LineArticle,{key:"fs_art",header:"FDB Search"},l.a.createElement(f.SelectInput,{key:"field",id:"field",onChange:this.onChange,value:this.state.field},l.a.createElement("option",{value:"mac"},"MAC"),l.a.createElement("option",{value:"device_id"},"Device ID")),l.a.createElement(f.TextInput,{key:"search",id:"search",onChange:this.onChange,value:this.state.search,placeholder:"search"}),l.a.createElement(p.SearchButton,{key:"fs_btn_search",onClick:function(){return e.changeContent(l.a.createElement(k,Object.assign({key:"fdb_list"},e.state,{changeSelf:e.props.changeSelf})))},title:"Search FDB"}))}}]),n}(u.Component),v=function(e){Object(o.a)(r,e);var t=Object(s.a)(r);function r(e){var a;return Object(i.a)(this,r),(a=t.call(this,e)).changeContent=function(e){return a.props.changeSelf(e)},a.changeInterface=function(e){return n.e(1).then(n.bind(null,39)).then((function(t){return a.changeContent(l.a.createElement(t.Info,{key:"interface_info",device_id:a.props.id,interface_id:e,changeSelf:a.changeContent}))}))},a.listItem=function(e,t){return[e.vlan,e.snmp_index,l.a.createElement(p.HrefButton,{key:"fd_intf_"+e.interface_id,text:e.name,onClick:function(){return a.changeInterface(e.interface_id)}}),e.mac,e.oui]},a.state={wait:null,searchfield:""},a}return Object(c.a)(r,[{key:"componentDidMount",value:function(){var e=this;Object(h.d)("api/fdb/list",{field:"device_id",search:this.props.id,extra:["oui"]}).then((function(t){return e.setState(t)}))}},{key:"syncFDB",value:function(){var e=this;this.setState({wait:l.a.createElement(d.Spinner,null)}),Object(h.d)("api/fdb/sync",{id:this.props.id,ip:this.props.ip,type:this.props.type}).then((function(t){return"OK"===t.status&&Object(h.d)("api/fdb/list",{field:"device_id",search:e.props.id,extra:["oui"]}).then((function(t){return e.setState(Object(a.a)({},t,{wait:null}))}))}))}},{key:"render",value:function(){var e=this;if(this.state.data){var t=this.state.searchfield.toUpperCase(),n=0===t.length?this.state.data:this.state.data.filter((function(e){return e.mac.includes(t)}));return l.a.createElement(d.ContentReport,{key:"fd_cr",header:"FDB",thead:["VLAN","SNMP","Interface","MAC","OUI"],trows:n,listItem:this.listItem},l.a.createElement(p.ReloadButton,{key:"fd_btn_reload",onClick:function(){return e.componentDidMount()}}),l.a.createElement(p.SyncButton,{key:"fd_btn_sync",onClick:function(){return e.syncFDB()},title:"Resync FDB"}),l.a.createElement(f.SearchInput,{key:"fd_search",searchFire:function(t){return e.setState({searchfield:t})},placeholder:"Search MAC"}),this.state.wait)}return l.a.createElement(d.Spinner,null)}}]),r}(u.Component),k=function(e){Object(o.a)(a,e);var t=Object(s.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).changeSearch=function(e,t){return r.changeContent(l.a.createElement(y,{key:"fdb_info",mac:e}))},r.changeVisualize=function(e){return"changeSelf"in r.props&&n.e(3).then(n.bind(null,41)).then((function(t){return r.changeContent(l.a.createElement(t.Edit,{key:"viz_id_"+e,type:"device",changeSelf:r.props.changeSelf,id:e}))}))},r.listItem=function(e,t){return[e.device_id,e.hostname,e.vlan,e.snmp_index,e.name,l.a.createElement(p.HrefButton,{key:"intf_"+t,text:e.mac,onClick:function(){return r.setState({searchfield:e.mac})}}),l.a.createElement(l.a.Fragment,null,l.a.createElement(p.InfoButton,{key:"info",onClick:function(){return r.changeSearch(e.mac,t)},title:"Find interface(s)"}),l.a.createElement(p.NetworkButton,{key:"map",onClick:function(){return r.changeVisualize(e.device_id)}}))]},r.state={searchfield:""},r}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(e){e!==this.props&&this.componentDidMount()}},{key:"componentDidMount",value:function(){var e=this;Object(h.d)("api/fdb/list",{search:this.props.search,field:this.props.field,extra:["device_id","hostname"]}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;if(this.state.data){var t=this.state.searchfield.toUpperCase(),n=0===t.length?this.state.data:this.state.data.filter((function(e){return e.mac.includes(t)}));return l.a.createElement(l.a.Fragment,null,l.a.createElement(d.ContentList,{key:"cl",header:"FDB",thead:["ID","Hostname","VLAN","SNMP","Interface","MAC",""],trows:n,listItem:this.listItem},l.a.createElement(p.ReloadButton,{key:"reload",onClick:function(){return e.componentDidMount()}}),l.a.createElement(f.SearchInput,{key:"search",searchFire:function(t){return e.setState({searchfield:t})},placeholder:"Search MAC",text:this.state.searchfield})),l.a.createElement(d.ContentData,{key:"cda",mountUpdate:function(t){return e.changeContent=t}}))}return l.a.createElement(d.Spinner,null)}}]),a}(u.Component),y=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={},a}return Object(c.a)(n,[{key:"componentDidUpdate",value:function(e){e!==this.props&&this.componentDidMount()}},{key:"componentDidMount",value:function(){var e=this;Object(h.d)("api/fdb/search",{mac:this.props.mac}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){return this.state.device?l.a.createElement(d.ContentReport,{key:"fd_cr",header:"".concat(this.state.device.hostname," (").concat(this.state.device.id,")"),thead:["ID","Interface","Description","OUI"],trows:this.state.interfaces,listItem:function(e){return[e.interface_id,e.name,e.description,e.oui]}}):this.state.oui?l.a.createElement(d.LineArticle,{key:"fd_oui_la",header:"Search result"},"OUI: ",this.state.oui):this.state.status?l.a.createElement(d.LineArticle,{key:"fd_oui_la",header:"Search result"},"Search result: ",this.state.info):l.a.createElement(d.Spinner,null)}}]),n}(u.Component)}}]);
//# sourceMappingURL=13.3d91d2d9.chunk.js.map