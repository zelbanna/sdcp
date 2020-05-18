(this.webpackJsonprims=this.webpackJsonprims||[]).push([[9,2,4,23],{39:function(t,e,n){"use strict";n.r(e),n.d(e,"Main",(function(){return v})),n.d(e,"List",(function(){return _})),n.d(e,"Show",(function(){return y})),n.d(e,"Edit",(function(){return g}));var a=n(18),i=n(14),o=n(4),r=n(5),c=n(6),s=n(7),l=n(0),u=n.n(l),d=n(12),k=n(13),h=n(19),m=n(15),f=n(1),p=n.n(f),v=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).changeContent=function(t){return a.setState(t)},a.state=u.a.createElement(_,{key:"viz_list"}),a}return Object(r.a)(n,[{key:"render",value:function(){return u.a.createElement(l.Fragment,{key:"main_base"},this.state)}}]),n}(l.Component),_=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[t.id,t.name,u.a.createElement(l.Fragment,{key:"vl_buttons"},u.a.createElement(h.EditButton,{key:"vl_btn_edt_"+t.id,onClick:function(){return a.changeContent(u.a.createElement(g,{key:"viz_edit_"+t.id,id:t.id,changeSelf:a.changeContent,type:"map"}))},title:"Show and edit map"}),u.a.createElement(h.NetworkButton,{key:"vl_btn_net_"+t.id,onClick:function(){return window.open("viz.html?id=".concat(t.id),"_blank")},title:"Show resulting map"}),u.a.createElement(h.DeleteButton,{key:"vl_btn_del_"+t.id,onClick:function(){return a.deleteList(t.id)}}))]},a.changeContent=function(t){return a.setState({content:t})},a.deleteList=function(t){return window.confirm("Delete map?")&&Object(d.c)("api/visualize/delete",{id:t}).then((function(e){return e.deleted&&a.setState({data:a.state.data.filter((function(e){return e.id!==t})),content:null})}))},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/visualize/list").then((function(e){t.setState(e)}))}},{key:"render",value:function(){var t=this;return u.a.createElement(l.Fragment,{key:"vl_fragment"},u.a.createElement(k.ContentList,{key:"vl_cl",header:"Maps",thead:["ID","Name",""],trows:this.state.data,listItem:this.listItem},u.a.createElement(h.ReloadButton,{key:"vl_btn_reload",onClick:function(){return t.componentDidMount()}})),u.a.createElement(k.ContentData,{key:"vl_cd"},this.state.content))}}]),n}(l.Component),y=function(t){Object(s.a)(a,t);var e=Object(c.a)(a);function a(){var t;Object(o.a)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))).doubleClick=function(t){console.log("DoubleClick",t.nodes),t.nodes[0]&&Object(d.c)("api/device/management",{id:t.nodes[0]}).then((function(t){t&&"OK"===t.status?t.data.url&&t.data.url.length>0?window.open(t.data.url):window.open("ssh://"+t.data.username+"@"+t.data.ip,"_self"):console.log("Data not ok:"+t)}))},t}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var t=this,e=this.props.hasOwnProperty("id")?{id:this.props.id}:{name:this.props.name};n.e(5).then(n.bind(null,57)).then((function(n){Object(d.c)("api/visualize/show",e).then((function(e){var a=new n.DataSet(e.data.nodes),i=new n.DataSet(e.data.edges),o=new n.Network(t.refs.show_canvas,{nodes:a,edges:i},e.data.options);o.on("stabilizationIterationsDone",(function(){return o.setOptions({physics:!1})})),o.on("doubleClick",(function(e){return t.doubleClick(e)}))}))}))}},{key:"render",value:function(){return u.a.createElement(k.Article,{key:"viz_show"},u.a.createElement("div",{className:p.a.network,id:"div_network",ref:"show_canvas"}))}}]),a}(l.Component),g=function(t){Object(s.a)(l,t);var e=Object(c.a)(l);function l(t){var r;return Object(o.a)(this,l),(r=e.call(this,t)).changeImport=function(t){return n.e(0).then(n.bind(null,38)).then((function(e){return r.props.changeSelf(u.a.createElement(e.Info,{key:"di_"+t,id:t}))}))},r.onChange=function(t){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},t.target.name,t.target.value))})},r.jsonHandler=function(t){var e=Object(i.a)({},r.state.data);try{e[t.target.name]=JSON.parse(t.target.value),r.setState({data:e})}catch(n){console.log("Error converting string to JSON")}},r.updateInfo=function(){return Object(d.c)("api/visualize/network",Object(i.a)({op:"update"},r.state.data)).then((function(t){return r.setState(t)}))},r.doubleClick=function(t){console.log("DoubleClick",t.nodes[0]),r.props.changeSelf&&r.changeImport(t.nodes[0])},r.toggleEdit=function(){r.edit=!r.edit,r.viz.network.setOptions({manipulation:{enabled:r.edit}}),r.setState({result:"Edit:"+r.edit})},r.toggleFix=function(){r.viz.nodes.forEach((function(t,e){return r.viz.nodes.update({id:e,fixed:!t.fixed})})),r.setState({data:Object(i.a)({},r.state.data,{nodes:r.viz.nodes.get()}),result:"Fix/Unfix positions"})},r.togglePhysics=function(){var t=r.state.data;t.options.physics.enabled=!t.options.physics.enabled,r.viz.network.setOptions({physics:t.options.physics.enabled}),r.setState({data:t,physics_button:t.options.physics.enabled?h.StopButton:h.StartButton,result:"Physics:"+t.options.physics.enabled})},r.networkSync=function(t){r.viz.network.storePositions(),r.setState({data:Object(i.a)({},r.state.data,{nodes:r.viz.nodes.get(),edges:r.viz.edges.get()}),result:"Moved "+r.viz.nodes.get(t.nodes[0]).label})},r.showDiv=function(t){return t===r.state.content?{display:"block"}:{display:"none"}},r.state={content:"network",physics_button:h.StartButton,found:!0,data:{name:"N/A"},result:""},r.viz={network:null,nodes:null,edges:null},r.results=u.a.createRef(),r.edit=!1,r}return Object(r.a)(l,[{key:"componentDidMount",value:function(){var t=this;n.e(5).then(n.bind(null,57)).then((function(e){Object(d.c)("api/visualize/network",{id:t.props.id,type:t.props.type}).then((function(n){t.viz.nodes=new e.DataSet(n.data.nodes),t.viz.edges=new e.DataSet(n.data.edges),n.data.options.physics.enabled=!0,t.viz.network=new e.Network(t.refs.edit_canvas,{nodes:t.viz.nodes,edges:t.viz.edges},n.data.options),t.viz.network.on("stabilizationIterationsDone",(function(){return t.viz.network.setOptions({physics:!1})})),t.viz.network.on("doubleClick",(function(e){return t.doubleClick(e)})),t.viz.network.on("dragEnd",(function(e){return t.networkSync(e)})),n.data.options.physics.enabled=!1,t.setState(n)}))}))}},{key:"render",value:function(){var t=this,e=this.state.physics_button;return u.a.createElement(k.Article,{key:"viz_art",header:"Network Map"},"device"===this.props.type&&this.props.changeSelf&&u.a.createElement(h.BackButton,{key:"viz_back",onClick:function(){return t.changeImport(t.props.id)}}),u.a.createElement(h.ReloadButton,{key:"viz_reload",onClick:function(){return t.componentDidMount()}}),u.a.createElement(h.EditButton,{key:"viz_edit",onClick:function(){return t.toggleEdit()}}),u.a.createElement(e,{key:"viz_physics",onClick:function(){return t.togglePhysics()}}),u.a.createElement(h.FixButton,{key:"viz_fix",onClick:function(){return t.toggleFix()}}),u.a.createElement(h.SaveButton,{key:"viz_save",onClick:function(){return t.updateInfo()}}),u.a.createElement(h.NetworkButton,{key:"viz_net",onClick:function(){return t.setState({content:"network"})}}),u.a.createElement(h.TextButton,{key:"viz_opt",text:"Options",onClick:function(){return t.setState({content:"options"})}}),u.a.createElement(h.TextButton,{key:"viz_nodes",text:"Nodes",onClick:function(){return t.setState({content:"nodes"})}}),u.a.createElement(h.TextButton,{key:"viz_edges",text:"Edges",onClick:function(){return t.setState({content:"edges"})}}),u.a.createElement(m.TextInput,{key:"viz_name",id:"name",value:this.state.data.name,onChange:this.onChange}),u.a.createElement(k.Result,{key:"viz_result",result:this.state.result}),u.a.createElement("div",{className:p.a.network,style:this.showDiv("network"),ref:"edit_canvas"}),u.a.createElement("div",{className:p.a.network,style:this.showDiv("options")},u.a.createElement("textarea",{id:"options",name:"options",value:JSON.stringify(this.state.data.options,void 0,2),onChange:this.jsonHandler})),u.a.createElement("div",{className:p.a.network,style:this.showDiv("nodes")},u.a.createElement("textarea",{id:"nodes",name:"nodes",value:JSON.stringify(this.state.data.nodes,void 0,2),onChange:this.jsonHandler})),u.a.createElement("div",{className:p.a.network,style:this.showDiv("edges")},u.a.createElement("textarea",{id:"edges",name:"edges",value:JSON.stringify(this.state.data.edges,void 0,2),onChange:this.jsonHandler})))}}]),l}(l.Component)},40:function(t,e,n){"use strict";n.r(e),n.d(e,"List",(function(){return f})),n.d(e,"Info",(function(){return p}));var a=n(18),i=n(14),o=n(4),r=n(5),c=n(6),s=n(7),l=n(0),u=n.n(l),d=n(12),k=n(13),h=n(19),m=n(15),f=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).changeContent=function(t){return a.setState({content:t})},a.deleteList=function(t){return window.confirm("Really delete location?")&&Object(d.c)("api/location/delete",{id:t}).then((function(e){return e.deleted&&a.setState({data:a.state.data.filter((function(e){return e.id!==t})),content:null})}))},a.listItem=function(t){return[t.id,t.name,u.a.createElement(l.Fragment,{key:"location_buttons_"+t.id},u.a.createElement(h.ConfigureButton,{key:"loc_btn_info_"+t.id,onClick:function(){return a.changeContent(u.a.createElement(p,{key:"location_"+t.id,id:t.id}))},title:"Edit location"}),u.a.createElement(h.DeleteButton,{key:"loc_btn_delete_"+t.id,onClick:function(){return a.deleteList(t.id)},title:"Delete location"}))]},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/location/list").then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return u.a.createElement(l.Fragment,{key:"loc_fragment"},u.a.createElement(k.ContentList,{key:"loc_cl",header:"Locations",thead:["ID","Name",""],trows:this.state.data,listItem:this.listItem},u.a.createElement(h.ReloadButton,{key:"loc_btn_reload",onClick:function(){return t.componentDidMount()}}),u.a.createElement(h.AddButton,{key:"loc_btn_add",onClick:function(){return t.changeContent(u.a.createElement(p,{key:"location_new_"+Object(d.d)(),id:"new"}))},title:"Add location"})),u.a.createElement(k.ContentData,{key:"loc_cd"},this.state.content))}}]),n}(l.Component),p=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).onChange=function(t){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},t.target.name,t.target.value))})},r.changeContent=function(t){return r.setState({content:t})},r.updateInfo=function(){return Object(d.c)("api/location/info",Object(i.a)({op:"update"},r.state.data)).then((function(t){return r.setState(t)}))},r.state={data:null,found:!0},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/location/info",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.found?this.state.data?u.a.createElement(k.InfoArticle,{key:"loc_article",header:"Location"},u.a.createElement(k.InfoColumns,{key:"loc_content"},u.a.createElement(m.TextInput,{key:"name",id:"name",value:this.state.data.name,onChange:this.onChange})),u.a.createElement(h.SaveButton,{key:"loc_btn_save",onClick:function(){return t.updateInfo()},title:"Save"})):u.a.createElement(k.Spinner,null):u.a.createElement(k.InfoArticle,{key:"loc_removed"},"Location id: ",this.props.id," removed")}}]),n}(l.Component)},51:function(t,e,n){"use strict";n.r(e),n.d(e,"Main",(function(){return g})),n.d(e,"List",(function(){return b})),n.d(e,"Layout",(function(){return C})),n.d(e,"Infra",(function(){return O}));var a=n(18),i=n(14),o=n(4),r=n(5),c=n(6),s=n(7),l=n(0),u=n.n(l),d=n(12),k=n(13),h=n(15),m=n(19),f=n(16),p=n(58),v=n.n(p),_=n(38),y=n(40),g=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).compileNavItems=function(){return a.context.loadNavigation(u.a.createElement(f.NavBar,{key:"rack_navbar"},u.a.createElement(f.NavDropDown,{key:"dev_nav_racks",title:"Rack"},u.a.createElement(f.NavDropButton,{key:"dev_nav_all_rack",title:"Racks",onClick:function(){return a.changeContent(u.a.createElement(b,{key:"rack_list"}))}}),u.a.createElement(f.NavDropButton,{key:"dev_nav_all_pdu",title:"PDUs",onClick:function(){return a.changeContent(u.a.createElement(O,{key:"pdu_list",type:"pdu"}))}}),u.a.createElement(f.NavDropButton,{key:"dev_nav_all_con",title:"Consoles",onClick:function(){return a.changeContent(u.a.createElement(O,{key:"console_list",type:"console"}))}})),u.a.createElement(f.NavButton,{key:"dev_nav_loc",title:"Locations",onClick:function(){return a.changeContent(u.a.createElement(y.List,{key:"location_list"}))}})))},a.changeContent=function(t){return a.setState(t)},a.state=u.a.createElement(b,{key:"rack_list"}),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.compileNavItems()}},{key:"componentDidUpdate",value:function(t){t!==this.props&&this.compileNavItems()}},{key:"render",value:function(){return u.a.createElement(l.Fragment,{key:"main_base"},this.state)}}]),n}(l.Component);g.contextType=k.RimsContext;var b=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[u.a.createElement(m.HrefButton,{key:"rl_btn_loc_"+t.id,text:t.location,onClick:function(){return a.changeContent(u.a.createElement(y.Info,{key:"li_"+t.location_id,id:t.location_id}))}}),t.name,u.a.createElement(l.Fragment,{key:"rack_list_buttons"},u.a.createElement(m.InfoButton,{key:"rl_btn_info_"+t.id,onClick:function(){return a.changeContent(u.a.createElement(E,{key:"rack_info_"+t.id,id:t.id}))},title:"Rack information"}),u.a.createElement(m.GoButton,{key:"rl_btn_go_"+t.id,onClick:function(){return a.context.changeMain(u.a.createElement(_.Main,{key:"rack_device_"+t.id,rack_id:t.id}))},title:"Rack inventory"}),u.a.createElement(m.ItemsButton,{key:"rl_btn_list_"+t.id,onClick:function(){return a.changeContent(u.a.createElement(C,{key:"rack_layout_"+t.id,id:t.id,changeSelf:a.changeContent}))},title:"Rack layout"}),u.a.createElement(m.DeleteButton,{key:"rl_btn_del_"+t.id,onClick:function(){return a.deleteList(t.id)},title:"Delete rack"}))]},a.changeContent=function(t){return a.setState({content:t})},a.deleteList=function(t){return window.confirm("Really delete rack?")&&Object(d.c)("api/rack/delete",{id:t}).then((function(e){return e.deleted&&a.setState({data:a.state.data.filter((function(e){return e.id!==t})),content:null})}))},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/rack/list",{sort:"name"}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return u.a.createElement(l.Fragment,{key:"rack_fragment"},u.a.createElement(k.ContentList,{key:"rack_cl",header:"Racks",thead:["Location","Name",""],trows:this.state.data,listItem:this.listItem},u.a.createElement(m.ReloadButton,{key:"rl_btn_reload",onClick:function(){return t.componentDidMount()}}),u.a.createElement(m.AddButton,{key:"rl_btn_add",onClick:function(){return t.changeContent(u.a.createElement(E,{key:"rack_new_"+Object(d.d)(),id:"new"}))},title:"Add rack"})),u.a.createElement(k.ContentData,{key:"rack_cd"},this.state.content))}}]),n}(l.Component);b.contextType=k.RimsContext;var E=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).onChange=function(t){return r.setState({data:Object(i.a)({},r.state.data,Object(a.a)({},t.target.name,t.target.value))})},r.updateInfo=function(){return Object(d.c)("api/rack/info",Object(i.a)({op:"update"},r.state.data)).then((function(t){return r.setState(t)}))},r.state={data:null,found:!0},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/rack/info",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?u.a.createElement(k.InfoArticle,{key:"rack_article",header:"Rack"},u.a.createElement(k.InfoColumns,{key:"rack_content"},u.a.createElement(h.TextInput,{key:"name",id:"name",value:this.state.data.name,onChange:this.onChange}),u.a.createElement(h.TextInput,{key:"size",id:"size",value:this.state.data.size,onChange:this.onChange}),u.a.createElement(h.SelectInput,{key:"console",id:"console",value:this.state.data.console,onChange:this.onChange},this.state.consoles.map((function(t){return u.a.createElement("option",{key:"ri_con_"+t.id,value:t.id},t.hostname)}))),u.a.createElement(h.SelectInput,{key:"location_id",id:"location_id",label:"Location",value:this.state.data.location_id,onChange:this.onChange},this.state.locations.map((function(t){return u.a.createElement("option",{key:"ri_loc_"+t.id,value:t.id},t.name)}))),u.a.createElement(h.SelectInput,{key:"pdu_1",id:"pdu_1",label:"PDU1",value:this.state.data.pdu_1,onChange:this.onChange},this.state.pdus.map((function(t){return u.a.createElement("option",{key:"ri_pdu1_"+t.id,value:t.id},t.hostname)}))),u.a.createElement(h.SelectInput,{key:"pdu_2",id:"pdu_2",label:"PDU2",value:this.state.data.pdu_2,onChange:this.onChange},this.state.pdus.map((function(t){return u.a.createElement("option",{key:"ri_pdu2_"+t.id,value:t.id},t.hostname)})))),u.a.createElement(m.SaveButton,{key:"ri_btn_save",onClick:function(){return t.updateInfo()},title:"Save"})):u.a.createElement(k.Spinner,null)}}]),n}(l.Component),C=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).changeContent=function(t){a.props.changeSelf&&a.props.changeSelf(t)},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/rack/devices",{id:this.props.id}).then((function(e){return t.setState(e)}))}},{key:"createRack",value:function(t,e,n){for(var a=this,i=[],o=1;o<this.state.size+1;o++)i.push(u.a.createElement("div",{key:t+"_left_"+o,className:v.a.rackLeft,style:{gridRow:-o}},o),u.a.createElement("div",{key:t+"_right_"+o,className:v.a.rackRight,style:{gridRow:-o}},o));return e.forEach((function(t){return i.push(u.a.createElement("div",{key:"rd_"+t.id,className:v.a.rackItem,style:{gridRowStart:a.state.size+2-n*t.rack_unit,gridRowEnd:a.state.size+2-(n*t.rack_unit+t.rack_size)}},u.a.createElement(m.HrefButton,{key:"rd_btn_"+t.id,style:{color:"var(--ui-txt-color)"},onClick:function(){return a.changeContent(u.a.createElement(_.Info,{key:"device_info",id:t.id}))},text:t.hostname})))})),u.a.createElement("div",{className:v.a.rack,style:{grid:"repeat(".concat(this.state.size-1,", 2vw)/2vw 25vw 2vw")}},i)}},{key:"render",value:function(){return this.state.size?u.a.createElement(l.Fragment,{key:"rt_frag"},u.a.createElement(k.InfoArticle,{key:"rl_front",header:"Front"},this.createRack("front",this.state.front,1)),u.a.createElement(k.InfoArticle,{key:"rl_back",header:"Back"},this.createRack("back",this.state.back,-1))):u.a.createElement(k.Spinner,null)}}]),n}(l.Component),O=function(t){Object(s.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).listItem=function(t){return[u.a.createElement(m.HrefButton,{key:"rinfra_dev_"+t.id,text:t.id,onClick:function(){return a.changeContent(u.a.createElement(_.Info,{key:"device_"+t.id,id:t.id}))},title:"Device info"}),t.hostname,u.a.createElement(l.Fragment,{key:"rinfra_buttons"},u.a.createElement(m.InfoButton,{key:"rinfra_btn_"+t.id,onClick:function(){return a.context.changeMain({module:t.type_base,function:"Manage",args:{device_id:t.id,type:t.type_name}})},title:"Manage device"}))]},a.changeContent=function(t){return a.setState({content:t})},a.state={},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;Object(d.c)("api/device/list",{field:"base",search:this.props.type,extra:["type"]}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return u.a.createElement(l.Fragment,{key:"rinfra_fragment"},u.a.createElement(k.ContentList,{key:"rinfra_cl",header:this.props.type,thead:["ID","Name",""],trows:this.state.data,listItem:this.listItem},u.a.createElement(m.ReloadButton,{key:"rinfra_btn_reload",onClick:function(){return t.componentDidMount()}})),u.a.createElement(k.ContentData,{key:"rinfra_cd"},this.state.content))}}]),n}(l.Component);O.contextType=k.RimsContext},58:function(t,e,n){t.exports={rack:"rack_rack__2xnnq",rackLeft:"rack_rackLeft__1E8o9",rackRight:"rack_rackRight__1Jn29",rackItem:"rack_rackItem__2yVLG"}}}]);
//# sourceMappingURL=9.912106e8.chunk.js.map