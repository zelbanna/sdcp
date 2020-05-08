(this.webpackJsonprims=this.webpackJsonprims||[]).push([[10],{46:function(e,t,n){"use strict";n.r(t),n.d(t,"Main",(function(){return _})),n.d(t,"DomainList",(function(){return k}));var a=n(22),r=n(19),i=n(16),o=n(4),c=n(5),s=n(7),d=n(6),l=n(8),u=n(0),m=n.n(u),h=n(13),p=n(14),f=n(15),y=n(20),_=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).changeContent=function(e){return n.setState(e)},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState(m.a.createElement(k,{key:"domain_list"}))}},{key:"render",value:function(){return m.a.createElement(u.Fragment,{key:"main_base"},this.state)}}]),t}(u.Component),k=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).listItem=function(e){return[e.id,e.name,e.service,m.a.createElement(u.Fragment,{key:"domain_buttons_"+e.id},m.a.createElement(y.ConfigureButton,{key:"net_info_"+e.id,onClick:function(){return n.changeContent(m.a.createElement(b,{key:"domain_"+e.id,id:e.id}))},title:"Edit domain information"}),m.a.createElement(y.ItemsButton,{key:"net_items_"+e.id,onClick:function(){return n.changeContent(m.a.createElement(C,{changeSelf:n.changeContent,key:"items_"+e.id,domain_id:e.id}))},title:"View domain records"}),m.a.createElement(y.DeleteButton,{key:"net_delete_"+e.id,onClick:function(){return n.deleteList(e.id)},title:"Delete domain"}))]},n.changeContent=function(e){return n.setState({content:e})},n.deleteList=function(e){return window.confirm("Really delete domain")&&Object(h.c)("api/dns/domain_delete",{id:e}).then((function(t){return t.deleted&&n.setState({data:n.state.data.filter((function(t){return t.id!==e})),content:null})}))},n.state={},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/dns/domain_list").then((function(t){t.result="OK",e.setState(t)}))}},{key:"syncDomains",value:function(){var e=this;Object(h.c)("api/dns/domain_list",{sync:!0}).then((function(t){t.result=JSON.stringify(t.result),e.setState(t)}))}},{key:"render",value:function(){var e=this;return m.a.createElement(u.Fragment,{key:"dl_fragment"},m.a.createElement(p.ContentList,{key:"dl_cl",header:"Domains",thead:["ID","Domain","Server",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},m.a.createElement(y.ReloadButton,{key:"dl_btn_reload",onClick:function(){return e.componentDidMount()}}),m.a.createElement(y.AddButton,{key:"dl_btn_add",onClick:function(){return e.changeContent(m.a.createElement(b,{key:"domain_new_"+Object(h.d)(),id:"new"}))},title:"Add domain"}),m.a.createElement(y.SyncButton,{key:"dl_btn_sync",onClick:function(){return e.syncDomains()},title:"Sync external DNS servers with cache"}),m.a.createElement(y.LogButton,{key:"dl_btn_document",onClick:function(){return e.changeContent(m.a.createElement(v,{key:"recursor_statistics"}))},title:"View DNS statistics"})),m.a.createElement(p.ContentData,{key:"dl_cd"},this.state.content))}}]),t}(u.Component),b=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).onChange=function(e){return n.setState({data:Object(i.a)({},n.state.data,Object(r.a)({},e.target.name,e.target.value))})},n.changeContent=function(e){return n.setState({content:e})},n.updateInfo=function(){return Object(h.c)("api/dns/domain_info",Object(i.a)({op:"update"},n.state.data)).then((function(e){return n.setState(e)}))},n.state={data:null},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/dns/domain_info",{id:this.props.id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;if(this.state.data){var t="new"!==this.state.data.id;return m.a.createElement(p.InfoArticle,{key:"dom_art",header:"Domain"},m.a.createElement(p.InfoColumns,{key:"domain_content"},t&&m.a.createElement(f.TextLine,{key:"node",id:"node",text:this.state.infra.node}),t&&m.a.createElement(f.TextLine,{key:"service",id:"service",text:this.state.infra.service}),t&&m.a.createElement(f.TextLine,{key:"foreign_id",id:"foreign_id",label:"Foreign ID",text:this.state.infra.foreign_id}),!t&&m.a.createElement(f.SelectInput,{key:"server_id",id:"server_id",label:"Server",value:this.state.data.server_id,onChange:this.onChange},this.state.servers.map((function(e,t){return m.a.createElement("option",{key:"srv_"+t,value:e.id},"".concat(e.service,"@").concat(e.node))}))),m.a.createElement(f.TextInput,{key:"name",id:"name",value:this.state.data.name,onChange:this.onChange}),m.a.createElement(f.TextInput,{key:"master",id:"master",value:this.state.data.master,onChange:this.onChange}),m.a.createElement(f.TextInput,{key:"type",id:"type",value:this.state.data.type,onChange:this.onChange}),m.a.createElement(f.TextLine,{key:"serial",id:"serial",text:this.state.data.serial})),m.a.createElement(y.SaveButton,{key:"domain_save",onClick:function(){return e.updateInfo()},title:"Save domain information"}))}return m.a.createElement(p.Spinner,null)}}]),t}(u.Component),v=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/dns/statistics").then((function(t){for(var n=[],r=function(){var e=Object(a.a)(o[i],2),t=e[0],r=e[1],c=t.split("_");r.forEach((function(e){return n.push([c[0],c[1],e[0],e[1],e[2]])}))},i=0,o=Object.entries(t.queries);i<o.length;i++)r();for(var c=[],s=function(){var e=Object(a.a)(l[d],2),t=e[0],n=e[1],r=t.split("_");n.forEach((function(e){return c.push([r[0],r[1],e[0],e[1]])}))},d=0,l=Object.entries(t.remotes);d<l.length;d++)s();e.setState({queries:n,remotes:c})}))}},{key:"render",value:function(){return this.state.queries&&this.state.remotes?m.a.createElement(p.Flex,{key:"statistics_flex"},m.a.createElement(p.ContentReport,{key:"queries_cr",header:"Looked up FQDN",thead:["Node","Service","Hits","FQDN","Type"],trows:this.state.queries,listItem:function(e){return e}}),m.a.createElement(p.ContentReport,{key:"remotes_cr",header:"Queriers",thead:["Node","Service","Hits","Who"],trows:this.state.remotes,listItem:function(e){return e}})):m.a.createElement(p.Spinner,null)}}]),t}(u.Component),C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).changeContent=function(e){return n.props.changeSelf(e)},n.listItem=function(e,t){return[e.name,e.content,e.type,e.ttl,m.a.createElement(u.Fragment,{key:"rl_buttons_"+t},m.a.createElement(y.ConfigureButton,{key:"record_info_btn_"+t,onClick:function(){return n.changeContent(m.a.createElement(E,Object.assign({key:"record_info_"+t,domain_id:n.props.domain_id,op:"info"},e)))},title:"Configure record"}),["A","CNAME","PTR"].includes(e.type)&&m.a.createElement(y.DeleteButton,{key:"record_del_btn_"+t,onClick:function(){return n.deleteList(e.name,e.type)},title:"Delete record"}))]},n.deleteList=function(e,t){return window.confirm("Delete record?")&&Object(h.c)("api/dns/record_delete",{domain_id:n.props.domain_id,name:e,type:t}).then((function(a){return a.deleted&&n.setState({data:n.state.data.filter((function(n){return!(n.name===e&&n.type===t)}))})}))},n.state={},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(h.c)("api/dns/record_list",{domain_id:this.props.domain_id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return m.a.createElement(p.ContentReport,{key:"rl_cr",header:"Records",thead:["Name","Content","Type","TTL",""],trows:this.state.data,listItem:this.listItem,result:this.state.result},m.a.createElement(y.ReloadButton,{key:"rl_btn_reload",onClick:function(){return e.componentDidMount()}}),m.a.createElement(y.AddButton,{key:"rl_btn_add",onClick:function(){return e.changeContent(m.a.createElement(E,{key:"record_new_"+Object(h.d)(),domain_id:e.props.domain_id,name:"new",op:"new"}))},title:"Add DNS record"}))}}]),t}(u.Component),E=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).onChange=function(e){return n.setState({data:Object(i.a)({},n.state.data,Object(r.a)({},e.target.name,e.target.value))})},n.updateInfo=function(){return Object(h.c)("api/dns/record_info",Object(i.a)({op:n.state.op},n.state.data)).then((function(e){n.setState(Object(i.a)({op:"OK"===e.status?"update":n.state.op},e))}))},n.state={data:null,info:void 0},"info"===n.props.op?(n.state.data={domain_id:n.props.domain_id,name:n.props.name,type:n.props.type,ttl:n.props.ttl,content:n.props.content},n.state.op="update"):(n.state.data={domain_id:n.props.domain_id,name:"",type:"A",ttl:3600,content:""},n.state.op="insert"),n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return this.state.data?m.a.createElement(p.InfoArticle,{key:"rec_art",header:"Record"},m.a.createElement(p.InfoColumns,{key:"record_content"},m.a.createElement(f.TextInput,{key:"name",id:"name",value:this.state.data.name,title:"E.g. A:FQDN, PTR:x.y.z.in-addr.arpa",onChange:this.onChange,placeholder:"name"}),m.a.createElement(f.TextInput,{key:"type",id:"type",value:this.state.data.type,onChange:this.onChange,placeholder:"A, PTR or CNAME typically"}),m.a.createElement(f.TextInput,{key:"ttl",id:"ttl",label:"TTL",value:this.state.data.ttl,onChange:this.onChange}),m.a.createElement(f.TextInput,{key:"content",id:"content",value:this.state.data.content,title:"E.g. A:IP, PTR:x.y.x-inaddr.arpa, CNAME:A - remember dot on PTR/CNAME",onChange:this.onChange,placeholder:"content"}),this.props.serial&&m.a.createElement(f.TextLine,{key:"serial",id:"serial",text:this.props.serial})),m.a.createElement(y.SaveButton,{key:"record_save",onClick:function(){return e.updateInfo()},title:"Save record information"}),m.a.createElement(p.Result,{key:"record_result",result:"OK"!==this.state.status?JSON.stringify(this.state.info):"OK"})):m.a.createElement(p.Spinner,null)}}]),t}(u.Component)}}]);
//# sourceMappingURL=10.91032a3b.chunk.js.map