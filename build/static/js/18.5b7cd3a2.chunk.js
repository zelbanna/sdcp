(this.webpackJsonprims=this.webpackJsonprims||[]).push([[18],{42:function(e,t,n){"use strict";n.r(t),n.d(t,"Main",(function(){return p}));var a=n(12),c=n(3),r=n(4),i=n(6),o=n(5),u=n(7),s=n(0),l=n.n(s),m=n(8),b=n(2),f=n(1),p=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).changeContent=function(e){return n.setState(e)},n.state={},n}return Object(u.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(m.b)("api/portal/resources",{type:"tool"}).then((function(t){for(var n=[],c=function(){var t=Object(a.a)(i[r],2),c=t[0],o=t[1];"module"===o.type?n.push(l.a.createElement(b.MenuButton,Object.assign({key:"mb_"+c,title:c},o,{onClick:function(){return e.context.changeMain(o)}}))):"tab"===o.type?n.push(l.a.createElement(b.MenuButton,Object.assign({key:"mb_"+c,title:c},o,{onClick:function(){return window.open(o.tab,"_blank")}}))):"frame"===o.type&&n.push(l.a.createElement(b.MenuButton,Object.assign({key:"mb_"+c,title:c},o,{onClick:function(){return e.context.changeMain(l.a.createElement("iframe",{id:"resource_frame",name:"resource_frame",title:c,src:o.frame}))}})))},r=0,i=Object.entries(t.data);r<i.length;r++)c();e.setState({content:n})}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"flexdiv centered"},this.state.content)}}]),t}(s.Component);p.contextType=f.RimsContext}}]);
//# sourceMappingURL=18.5b7cd3a2.chunk.js.map