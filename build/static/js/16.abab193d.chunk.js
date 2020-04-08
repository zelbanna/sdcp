(this.webpackJsonprims=this.webpackJsonprims||[]).push([[16],{39:function(t,e,n){"use strict";n.r(e),n.d(e,"Manage",(function(){return v})),n.d(e,"Inventory",(function(){return b}));var a=n(9),i=n(13),o=n(3),r=n(4),s=n(6),c=n(5),u=n(7),p=n(0),l=n.n(p),d=n(8),h=n(1),_=n(10),m=n(2),f=n(11),v=function(t){function e(){var t,n;Object(o.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(s.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(i)))).changeContent=function(t){return n.setState(t)},n}return Object(u.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(d.b)("api/device/hostname",{id:this.props.device_id}).then((function(e){t.context.loadNavigation(l.a.createElement(f.a,{key:"pdu_navbar"},l.a.createElement(f.d,{key:"pdu_nav_name",title:e.data}),l.a.createElement(f.b,{key:"pdu_nav_inv",title:"Inventory",onClick:function(){return t.changeContent(l.a.createElement(b,{key:"pdu_inventory",device_id:t.props.device_id,type:t.props.type}))}}),l.a.createElement(f.b,{key:"pdu_nav_info",title:"Info",onClick:function(){return t.changeContent(l.a.createElement(y,{key:"pdu_info",device_id:t.props.device_id,type:t.props.type}))}})))})),this.setState(l.a.createElement(b,{key:"pdu_inventory",device_id:this.props.device_id,type:this.props.type}))}},{key:"render",value:function(){return l.a.createElement(p.Fragment,{key:"manage_base"},this.state)}}]),e}(p.Component);v.contextType=h.RimsContext;var y=function(t){function e(){var t,n;Object(o.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(s.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(i)))).lookupSlots=function(){return Object(d.b)("api/"+n.props.type+"/info",{device_id:n.props.device_id,op:"lookup"}).then((function(t){return n.setState(t)}))},n}return Object(u.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(d.b)("api/"+this.props.type+"/info",{device_id:this.props.device_id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;if(this.state){for(var e=[],n=0;n<this.state.data.slots;n++)e.push(l.a.createElement(_.TextLine,{key:"pi_slot_name_"+n,id:"pi_slot_name_"+n,label:"Slot "+n+" Name",text:this.state.data[n+"_slot_name"]})),e.push(l.a.createElement(_.TextLine,{key:"pi_slot_id_"+n,id:"pi_slot_id_"+n,label:"Slot "+n+" ID",text:this.state.data[n+"_slot_id"]}));return l.a.createElement("div",{className:"flexdiv centered"},l.a.createElement("article",{className:"info"},l.a.createElement("h1",null,"PDU Device Info (",this.props.type,")"),l.a.createElement(h.InfoColumns,{key:"pi_info"},l.a.createElement(_.TextLine,{key:"pi_slots",id:"slots",label:"Right/Left slots",text:JSON.stringify(2===this.state.data.slots)}),e),l.a.createElement(m.ReloadButton,{key:"pi_btn_reload",onClick:function(){return t.componentDidMount()}}),l.a.createElement(m.SearchButton,{key:"pi_btn_search",onClick:function(){return t.lookupSlots()}})))}return l.a.createElement(h.Spinner,null)}}]),e}(p.Component),b=function(t){function e(t){var n;return Object(o.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).changeContent=function(t){return n.setState({content:t})},n.listItem=function(t,e){return["".concat(t.slotname,".").concat(t.unit),l.a.createElement(m.HrefButton,{key:"pdu_inv_btn_"+e,onClick:function(){return n.changeContent(l.a.createElement(E,Object.assign({key:"pdu_unit_"+e,device_id:n.props.device_id,type:n.props.type},t)))},text:t.name,title:"Edit port info"}),l.a.createElement(k,Object.assign({key:"pdu_state"+e,idx:e,device_id:n.props.device_id,type:n.props.type},t))]},n.state={},n}return Object(u.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=this;Object(d.b)("api/"+this.props.type+"/inventory",{device_id:this.props.device_id}).then((function(e){return t.setState(e)}))}},{key:"render",value:function(){var t=this;return this.state.data?l.a.createElement(p.Fragment,{key:"pdu_fragment"},l.a.createElement(h.ContentList,{key:"pdu_cl",header:"Inventory",thead:["Position","Device","State"],trows:this.state.data,listItem:this.listItem},l.a.createElement(m.ReloadButton,{key:"pdu_btn_reload",onClick:function(){t.setState({data:void 0}),t.componentDidMount()}})),l.a.createElement(h.ContentData,{key:"pdu_cd"},this.state.content)):l.a.createElement(h.Spinner,null)}}]),e}(p.Component),k=function(t){function e(t){var n;return Object(o.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).operation=function(t){n.setState({wait:l.a.createElement(h.Spinner,null)}),Object(d.b)("api/"+n.props.type+"/op",{device_id:n.props.device_id,slot:n.props.slot,unit:n.props.unit,state:t}).then((function(t){return n.setState(Object(i.a)({},t,{wait:null}))}))},n.state={state:n.props.state,status:"",wait:null},n}return Object(u.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this,e="off"===this.state.state;return l.a.createElement(p.Fragment,{key:"pdu_frag_"+this.props.idx},e&&l.a.createElement(m.StartButton,{key:"pdu_btn_start_"+this.props.idx,onClick:function(){return t.operation("on")},title:this.state.status}),!e&&l.a.createElement(m.StopButton,{key:"pdu_btn_stop_"+this.props.idx,onClick:function(){return t.operation("off")},title:this.state.status}),!e&&l.a.createElement(m.ReloadButton,{key:"pdu_btn_reload_"+this.props.idx,onClick:function(){return t.operation("reboot")},title:this.state.status}),this.state.wait)}}]),e}(p.Component),E=function(t){function e(t){var n;return Object(o.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).onChange=function(t){return n.setState(Object(a.a)({},t.target.name,t.target.value))},n.updatePDU=function(){n.setState({wait:l.a.createElement(h.Spinner,null),info:void 0}),Object(d.b)("api/"+n.props.type+"/update",{op:"update",device_id:n.props.device_id,slot:n.props.slot,unit:n.props.unit,text:n.state.text}).then((function(t){return n.setState(Object(i.a)({},t,{wait:null}))}))},n.state={text:n.props.name,wait:null},n}return Object(u.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this,e="";return this.state.status&&(e="OK"===this.state.status?"OK":this.state.info),l.a.createElement("article",{className:"info"},l.a.createElement(h.InfoColumns,{key:"pu_info"},l.a.createElement(_.TextLine,{key:"pu_slot_unit",id:"su",label:"Slot.Unit",text:"".concat(this.props.slotname,".").concat(this.props.unit)}),l.a.createElement(_.TextInput,{key:"pu_slot_text",id:"text",value:this.state.text,onChange:this.onChange})),l.a.createElement(h.Result,{key:"pu_result",result:e}),l.a.createElement(m.SaveButton,{key:"pu_btn_save",onClick:function(){return t.updatePDU()},title:"Update pdu"}),this.state.wait)}}]),e}(p.Component)}}]);
//# sourceMappingURL=16.abab193d.chunk.js.map