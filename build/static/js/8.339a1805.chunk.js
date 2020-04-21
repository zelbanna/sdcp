(this.webpackJsonprims=this.webpackJsonprims||[]).push([[8],{38:function(t,e,n){"use strict";n.r(e),n.d(e,"Main",(function(){return v})),n.d(e,"Report",(function(){return b}));var a=n(19),i=n(16),c=n(4),r=n(5),o=n(7),u=n(6),l=n(8),s=n(0),d=n.n(s),y=n(13),m=n(14),h=n(15),p=n(20),f=n(17),v=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).compileNavItems=function(){return n.context.loadNavigation(d.a.createElement(f.NavBar,{key:"activity_navbar"},d.a.createElement(f.NavDropDown,{key:"act_nav",title:"Activities"},d.a.createElement(f.NavDropButton,{key:"act_nav_new",title:"New",onClick:function(){return n.changeContent(d.a.createElement(k,{key:"activity_info",id:"new"}))}}),d.a.createElement(f.NavDropButton,{key:"act_nav_list",title:"List",onClick:function(){return n.changeContent(d.a.createElement(_,{key:"activity_list"}))}})),d.a.createElement(f.NavButton,{key:"act_nav_types",title:"Types",onClick:function(){return n.changeContent(d.a.createElement(C,{key:"activity_type_list"}))}}),d.a.createElement(f.NavButton,{key:"act_nav_report",title:"Report",onClick:function(){return n.changeContent(d.a.createElement(b,{key:"activity_report"}))}})))},n.changeContent=function(t){return n.setState(t)},n.state=d.a.createElement(k,{key:"activity_new",id:"new"}),n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){this.compileNavItems()}},{key:"componentDidUpdate",value:function(t){t!==this.props&&this.compileNavItems()}},{key:"render",value:function(){return d.a.createElement(s.Fragment,{key:"main_base"},this.state)}}]),e}(s.Component);v.contextType=m.RimsContext;var _=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).listItem=function(t){return[t.date+" - "+t.time,d.a.createElement(p.HrefButton,{key:"act_hinfo_"+t.id,onClick:function(){return n.changeContent(d.a.createElement(k,{key:"activity_"+t.id,id:t.id}))},text:t.type}),d.a.createElement(s.Fragment,{key:"activity_buttons_"+t.id},d.a.createElement(p.InfoButton,{key:"act_info_"+t.id,onClick:function(){return n.changeContent(d.a.createElement(k,{key:"activity_"+t.id,id:t.id}))},title:"Activity information"}),d.a.createElement(p.DeleteButton,{key:"act_delete_"+t.id,onClick:function(){return n.deleteList(t.id)},title:"Delete activity"}))]},n.searchHandler=function(t){n.setState({searchfield:t.target.value})},n.changeContent=function(t){return n.setState({content:t})},n.deleteList=function(t){return window.confirm("Delete activity")&&Object(y.c)("api/master/activity_delete",{id:t}).then((function(e){return e.deleted&&n.setState({data:n.state.data.filter((function(e){return e.id!==t})),content:null})}))},n.state={searchfield:""},n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(y.c)("api/master/activity_list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;if(this.state.data){var e=this.state.data.filter((function(e){return e.type.includes(t.state.searchfield)}));return d.a.createElement(s.Fragment,{key:"act_fragment"},d.a.createElement(m.ContentList,{key:"act_cl",header:"Activities",thead:["Date","Type",""],trows:e,listItem:this.listItem},d.a.createElement(p.ReloadButton,{key:"act_btn_reload",onClick:function(){return t.componentDidMount()}}),d.a.createElement(p.AddButton,{key:"act_btn_add",onClick:function(){return t.changeContent(d.a.createElement(k,{key:"activity_new_"+Object(y.d)(),id:"new"}))},title:"Add activity"}),d.a.createElement(h.SearchInput,{key:"act_search",searchHandler:this.searchHandler,value:this.state.searchfield,placeholder:"Search activities"})),d.a.createElement(m.ContentData,{key:"act_cd"},this.state.content))}return d.a.createElement(m.Spinner,null)}}]),e}(s.Component),k=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).onChange=function(t){return n.setState({data:Object(i.a)({},n.state.data,Object(a.a)({},t.target.name,t.target.value))})},n.updateInfo=function(){return Object(y.c)("api/master/activity_info",Object(i.a)({op:"update"},n.state.data)).then((function(t){return n.setState(t)}))},n.state={data:null,found:!0},n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(y.c)("api/master/activity_info",{id:this.props.id}).then((function(e){null===e.data.user_id&&(e.data.user_id=t.context.settings.id),t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?d.a.createElement(m.InfoArticle,{key:"act_art",header:"Activity"},d.a.createElement(m.InfoColumns,{key:"act_content"},d.a.createElement(h.SelectInput,{key:"act_user_id",id:"user_id",label:"User",value:this.state.data.user_id,onChange:this.onChange},this.state.users.map((function(t,e){return d.a.createElement("option",{key:"ai_u_"+e,value:t.id},t.alias)}))),d.a.createElement(h.SelectInput,{key:"act_type_id",id:"type_id",label:"Type",value:this.state.data.type_id,onChange:this.onChange},this.state.types.map((function(t,e){return d.a.createElement("option",{key:"ai_t_"+e,value:t.id},t.type)}))),d.a.createElement(h.DateInput,{key:"act_date",id:"date",value:this.state.data.date,onChange:this.onChange}),d.a.createElement(h.TimeInput,{key:"act_time",id:"time",value:this.state.data.time,onChange:this.onChange})),d.a.createElement(h.TextAreaInput,{key:"act_event",id:"event",value:this.state.data.event,onChange:this.onChange}),d.a.createElement(p.SaveButton,{key:"act_btn_save",onClick:function(){return t.updateInfo()},title:"Save"})):d.a.createElement(m.Spinner,null)}}]),e}(s.Component);k.contextType=m.RimsContext;var b=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).listItem=function(t){return[t.date+" - "+t.time,t.user,t.type,t.event]},n.state={},n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(y.c)("api/master/activity_list",{group:"month",mode:"full"}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){return d.a.createElement(m.ContentReport,{key:"act_cr",header:"Activities",thead:["Time","User","Type","Event"],trows:this.state.data,listItem:this.listItem})}}]),e}(s.Component),C=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).listItem=function(t){return[t.id,t.type,d.a.createElement(s.Fragment,{key:"activity_buttons"},d.a.createElement(p.ConfigureButton,{key:"act_tp_info",onClick:function(){return n.changeContent(d.a.createElement(E,{key:"activity_type_"+t.id,id:t.id}))},title:"Edit type information"}),d.a.createElement(p.DeleteButton,{key:"act_tp_delete",onClick:function(){return n.deleteList(t.id)},title:"Delete type"}))]},n.changeContent=function(t){return n.setState({content:t})},n.deleteList=function(t){return window.confirm("Really delete type?")&&Object(y.c)("api/master/activity_type_delete",{id:t}).then((function(e){return e.deleted&&n.setState({data:n.state.data.filter((function(e){return e.id!==t})),content:null})}))},n.state={},n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(y.c)("api/master/activity_type_list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return d.a.createElement(s.Fragment,{key:"act_tp_fragment"},d.a.createElement(m.ContentList,{key:"act_tp_cl",header:"Activity Types",thead:["ID","Type",""],trows:this.state.data,listItem:this.listItem},d.a.createElement(p.ReloadButton,{key:"act_tp_btn_reload",onClick:function(){return t.componentDidMount()}}),d.a.createElement(p.AddButton,{key:"act_tp_btn_add",onClick:function(){return t.changeContent(d.a.createElement(E,{key:"act_tp_new_"+Object(y.d)(),id:"new"}))},title:"Add activity type"})),d.a.createElement(m.ContentData,{key:"act_tp_cd"},this.state.content))}}]),e}(s.Component),E=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(o.a)(this,Object(u.a)(e).call(this,t))).onChange=function(t){return n.setState({data:Object(i.a)({},n.state.data,Object(a.a)({},t.target.name,t.target.value))})},n.changeContent=function(t){return n.setState({content:t})},n.updateInfo=function(){return Object(y.c)("api/master/activity_type_info",Object(i.a)({op:"update"},n.state.data)).then((function(t){return n.setState(t)}))},n.state={data:null,found:!0,content:null},n}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(y.c)("api/master/activity_type_info",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?d.a.createElement(m.InfoArticle,{key:"activity_type_art",header:"Activity Type"},d.a.createElement(m.InfoColumns,{key:"activity_type_content"},d.a.createElement(h.TextInput,{key:"type",id:"type",value:this.state.data.type,onChange:this.onChange,placeholder:"name"})),d.a.createElement(p.SaveButton,{key:"activity_type_save",onClick:function(){return t.updateInfo()},title:"Save"})):d.a.createElement(m.Spinner,null)}}]),e}(s.Component)}}]);
//# sourceMappingURL=8.339a1805.chunk.js.map