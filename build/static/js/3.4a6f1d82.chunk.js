(this.webpackJsonprims=this.webpackJsonprims||[]).push([[3],{28:function(t,e,n){"use strict";n.r(e),n.d(e,"List",(function(){return k})),n.d(e,"Info",(function(){return p}));var a=n(9),o=n(13),i=n(3),c=n(4),r=n(6),l=n(5),u=n(7),s=n(0),d=n.n(s),f=n(8),m=n(1),h=n(2),b=n(10),k=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(r.a)(this,Object(l.a)(e).call(this,t))).changeContent=function(t){return n.setState({content:t})},n.deleteList=function(t){return window.confirm("Really delete location?")&&Object(f.b)("api/location/delete",{id:t}).then((function(e){return e.deleted&&n.setState({data:n.state.data.filter((function(e){return e.id!==t})),content:null})}))},n.listItem=function(t){return[t.id,t.name,d.a.createElement(s.Fragment,{key:"location_buttons_"+t.id},d.a.createElement(h.ConfigureButton,{key:"loc_btn_info_"+t.id,onClick:function(){return n.changeContent(d.a.createElement(p,{key:"location_"+t.id,id:t.id}))},title:"Edit location"}),d.a.createElement(h.DeleteButton,{key:"loc_btn_delete_"+t.id,onClick:function(){return n.deleteList(t.id)},title:"Delete location"}))]},n.state={},n}return Object(u.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(f.b)("api/location/list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return d.a.createElement(s.Fragment,{key:"loc_fragment"},d.a.createElement(m.ContentList,{key:"loc_cl",header:"Locations",thead:["ID","Name",""],trows:this.state.data,listItem:this.listItem},d.a.createElement(h.ReloadButton,{key:"loc_btn_reload",onClick:function(){return t.componentDidMount()}}),d.a.createElement(h.AddButton,{key:"loc_btn_add",onClick:function(){return t.changeContent(d.a.createElement(p,{key:"location_new_"+Object(f.c)(),id:"new"}))},title:"Add location"})),d.a.createElement(m.ContentData,{key:"loc_cd"},this.state.content))}}]),e}(s.Component),p=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(r.a)(this,Object(l.a)(e).call(this,t))).onChange=function(t){return n.setState({data:Object(o.a)({},n.state.data,Object(a.a)({},t.target.name,t.target.value))})},n.changeContent=function(t){return n.setState({content:t})},n.updateInfo=function(){return Object(f.b)("api/location/info",Object(o.a)({op:"update"},n.state.data)).then((function(t){return n.setState(t)}))},n.state={data:null,found:!0},n}return Object(u.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(f.b)("api/location/info",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.found?this.state.data?d.a.createElement("article",{className:"info"},d.a.createElement("h1",null,"Location"),d.a.createElement(m.InfoColumns,{key:"loc_content"},d.a.createElement(b.TextInput,{key:"name",id:"name",value:this.state.data.name,onChange:this.onChange})),d.a.createElement(h.SaveButton,{key:"loc_btn_save",onClick:function(){return t.updateInfo()},title:"Save"})):d.a.createElement(m.Spinner,null):d.a.createElement("article",null,"Location id: ",this.props.id," removed")}}]),e}(s.Component)}}]);
//# sourceMappingURL=3.4a6f1d82.chunk.js.map