(this.webpackJsonprims=this.webpackJsonprims||[]).push([[14],{46:function(e,t,n){"use strict";n.r(t),n.d(t,"Servers",(function(){return h}));var r=n(4),a=n(5),c=n(6),i=n(7),s=n(0),o=n.n(s),u=n(12),l=n(13),d=n(19),h=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).changeServer=function(e){return a.setState({content:o.a.createElement(v,{key:"dhcp_list_"+e,server_id:e})})},a.listItem=function(e){return[e.node,e.service,o.a.createElement(d.InfoButton,{key:"dhcp_btn_info_"+e.id,onClick:function(){return a.changeServer(e.id)},title:"DHCP server allocated addresses"})]},a.state={content:null},a}return Object(a.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(u.c)("api/master/server_list",{type:"DHCP"}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){return o.a.createElement(s.Fragment,{key:"dhcp_fragment"},o.a.createElement(l.ContentList,{key:"dhcp_cl",header:"Servers",thead:["Node","Service","Type",""],trows:this.state.data,listItem:this.listItem}),o.a.createElement(l.ContentData,{key:"dhcp_cd"},this.state.content))}}]),n}(s.Component),v=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={},a}return Object(a.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,"TBD")}}]),n}(s.Component)}}]);
//# sourceMappingURL=14.bec29dab.chunk.js.map