(this.webpackJsonprims=this.webpackJsonprims||[]).push([[8],{43:function(t,e,n){"use strict";n.r(e),n.d(e,"Main",(function(){return v})),n.d(e,"Report",(function(){return k}));var a=n(18),i=n(15),c=n(4),r=n(5),o=n(6),u=n(7),l=n(0),s=n.n(l),d=n(12),y=n(13),m=n(14),h=n(19),p=n(16),v=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).compileNavItems=function(){return a.context.loadNavigation(s.a.createElement(p.NavBar,{key:"activity_navbar"},s.a.createElement(p.NavDropDown,{key:"act_nav",title:"Activities"},s.a.createElement(p.NavDropButton,{key:"act_nav_new",title:"New",onClick:function(){return a.changeContent(s.a.createElement(_,{key:"activity_info",id:"new"}))}}),s.a.createElement(p.NavDropButton,{key:"act_nav_list",title:"List",onClick:function(){return a.changeContent(s.a.createElement(f,{key:"activity_list"}))}})),s.a.createElement(p.NavButton,{key:"act_nav_types",title:"Types",onClick:function(){return a.changeContent(s.a.createElement(C,{key:"activity_type_list"}))}}),s.a.createElement(p.NavButton,{key:"act_nav_report",title:"Report",onClick:function(){return a.changeContent(s.a.createElement(k,{key:"activity_report"}))}})))},a.changeContent=function(t){return a.setState(t)},a.state=s.a.createElement(_,{key:"activity_new",id:"new"}),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.compileNavItems()}},{key:"componentDidUpdate",value:function(t){t!==this.props&&this.compileNavItems()}},{key:"render",value:function(){return s.a.createElement(l.Fragment,{key:"main_base"},this.state)}}]),n}(l.Component);v.contextType=y.RimsContext;var f=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[t.date+" - "+t.time,s.a.createElement(h.HrefButton,{key:"act_hinfo_"+t.id,onClick:function(){return a.changeContent(s.a.createElement(_,{key:"activity_"+t.id,id:t.id}))},text:t.type}),s.a.createElement(l.Fragment,{key:"activity_buttons_"+t.id},s.a.createElement(h.InfoButton,{key:"act_info_"+t.id,onClick:function(){return a.changeContent(s.a.createElement(_,{key:"activity_"+t.id,id:t.id}))},title:"Activity information"}),s.a.createElement(h.DeleteButton,{key:"act_delete_"+t.id,onClick:function(){return a.deleteList(t.id)},title:"Delete activity"}))]},a.searchHandler=function(t){a.setState({searchfield:t.target.value})},a.changeContent=function(t){return a.setState({content:t})},a.deleteList=function(t){return window.confirm("Delete activity")&&Object(d.c)("api/master/activity_delete",{id:t}).then((function(e){return e.deleted&&a.setState({data:a.state.data.filter((function(e){return e.id!==t})),content:null})}))},a.state={searchfield:""},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/master/activity_list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;if(this.state.data){var e=this.state.data.filter((function(e){return e.type.includes(t.state.searchfield)}));return s.a.createElement(l.Fragment,{key:"act_fragment"},s.a.createElement(y.ContentList,{key:"act_cl",header:"Activities",thead:["Date","Type",""],trows:e,listItem:this.listItem},s.a.createElement(h.ReloadButton,{key:"act_btn_reload",onClick:function(){return t.componentDidMount()}}),s.a.createElement(h.AddButton,{key:"act_btn_add",onClick:function(){return t.changeContent(s.a.createElement(_,{key:"activity_new_"+Object(d.d)(),id:"new"}))},title:"Add activity"}),s.a.createElement(m.SearchInput,{key:"act_search",searchHandler:this.searchHandler,value:this.state.searchfield,placeholder:"Search activities"})),s.a.createElement(y.ContentData,{key:"act_cd"},this.state.content))}return s.a.createElement(y.Spinner,null)}}]),n}(l.Component),_=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).onChange=function(t){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},t.target.name,t.target.value))})},r.updateInfo=function(){return Object(d.c)("api/master/activity_info",Object(i.a)({op:"update"},r.state.data)).then((function(t){return r.setState(t)}))},r.state={data:null,found:!0},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/master/activity_info",{id:this.props.id}).then((function(e){null===e.data.user_id&&(e.data.user_id=t.context.settings.id),t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?s.a.createElement(y.InfoArticle,{key:"act_art",header:"Activity"},s.a.createElement(y.InfoColumns,{key:"act_content"},s.a.createElement(m.SelectInput,{key:"act_user_id",id:"user_id",label:"User",value:this.state.data.user_id,onChange:this.onChange},this.state.users.map((function(t,e){return s.a.createElement("option",{key:"ai_u_"+e,value:t.id},t.alias)}))),s.a.createElement(m.SelectInput,{key:"act_type_id",id:"type_id",label:"Type",value:this.state.data.type_id,onChange:this.onChange},this.state.types.map((function(t,e){return s.a.createElement("option",{key:"ai_t_"+e,value:t.id},t.type)}))),s.a.createElement(m.DateInput,{key:"act_date",id:"date",value:this.state.data.date,onChange:this.onChange}),s.a.createElement(m.TimeInput,{key:"act_time",id:"time",value:this.state.data.time,onChange:this.onChange})),s.a.createElement(m.TextAreaInput,{key:"act_event",id:"event",value:this.state.data.event,onChange:this.onChange}),s.a.createElement(h.SaveButton,{key:"act_btn_save",onClick:function(){return t.updateInfo()},title:"Save"})):s.a.createElement(y.Spinner,null)}}]),n}(l.Component);_.contextType=y.RimsContext;var k=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[t.date+" - "+t.time,t.user,t.type,t.event]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/master/activity_list",{group:"month",mode:"full"}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){return s.a.createElement(y.ContentReport,{key:"act_cr",header:"Activities",thead:["Time","User","Type","Event"],trows:this.state.data,listItem:this.listItem})}}]),n}(l.Component),C=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[t.id,t.type,s.a.createElement(l.Fragment,{key:"activity_buttons"},s.a.createElement(h.ConfigureButton,{key:"act_tp_info",onClick:function(){return a.changeContent(s.a.createElement(E,{key:"activity_type_"+t.id,id:t.id}))},title:"Edit type information"}),s.a.createElement(h.DeleteButton,{key:"act_tp_delete",onClick:function(){return a.deleteList(t.id)},title:"Delete type"}))]},a.changeContent=function(t){return a.setState({content:t})},a.deleteList=function(t){return window.confirm("Really delete type?")&&Object(d.c)("api/master/activity_type_delete",{id:t}).then((function(e){return e.deleted&&a.setState({data:a.state.data.filter((function(e){return e.id!==t})),content:null})}))},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/master/activity_type_list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return s.a.createElement(l.Fragment,{key:"act_tp_fragment"},s.a.createElement(y.ContentList,{key:"act_tp_cl",header:"Activity Types",thead:["ID","Type",""],trows:this.state.data,listItem:this.listItem},s.a.createElement(h.ReloadButton,{key:"act_tp_btn_reload",onClick:function(){return t.componentDidMount()}}),s.a.createElement(h.AddButton,{key:"act_tp_btn_add",onClick:function(){return t.changeContent(s.a.createElement(E,{key:"act_tp_new_"+Object(d.d)(),id:"new"}))},title:"Add activity type"})),s.a.createElement(y.ContentData,{key:"act_tp_cd"},this.state.content))}}]),n}(l.Component),E=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).onChange=function(t){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},t.target.name,t.target.value))})},r.changeContent=function(t){return r.setState({content:t})},r.updateInfo=function(){return Object(d.c)("api/master/activity_type_info",Object(i.a)({op:"update"},r.state.data)).then((function(t){return r.setState(t)}))},r.state={data:null,found:!0,content:null},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/master/activity_type_info",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?s.a.createElement(y.InfoArticle,{key:"activity_type_art",header:"Activity Type"},s.a.createElement(y.InfoColumns,{key:"activity_type_content"},s.a.createElement(m.TextInput,{key:"type",id:"type",value:this.state.data.type,onChange:this.onChange,placeholder:"name"})),s.a.createElement(h.SaveButton,{key:"activity_type_save",onClick:function(){return t.updateInfo()},title:"Save"})):s.a.createElement(y.Spinner,null)}}]),n}(l.Component)}}]);
//# sourceMappingURL=8.a0735d00.chunk.js.map