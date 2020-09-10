(this.webpackJsonprims=this.webpackJsonprims||[]).push([[20],{49:function(e,t,n){"use strict";n.r(t),n.d(t,"List",(function(){return f})),n.d(t,"Report",(function(){return p}));var a=n(18),i=n(14),r=n(4),c=n(5),o=n(6),d=n(7),s=n(0),u=n.n(s),l=n(12),v=n(13),h=n(20),m=n(15),f=function(e){Object(d.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).extendItem=function(e,t,n){Object(l.d)("api/reservation/extend",{device_id:e,user_id:t,days:n}).then((function(e){return a.componentDidMount()}))},a.deleteItem=function(e,t){return window.confirm("Remove reservation?")&&Object(l.d)("api/reservation/delete",{device_id:e,user_id:t}).then((function(t){t.deleted&&(a.setState({data:a.state.data.filter((function(t){return t.device_id!==e}))}),a.changeContent(null))}))},a.listItem=function(e){var t=a.context.settings.id===e.user_id||!e.valid;return[e.alias,e.hostname,e.end,u.a.createElement(u.a.Fragment,null,t&&u.a.createElement(h.InfoButton,{key:"info",onClick:function(){a.changeContent(u.a.createElement(_,{key:"rsv_device_"+e.device_id,device_id:e.device_id,user_id:e.user_id}))},title:"Info"}),t&&u.a.createElement(h.AddButton,{key:"ext",onClick:function(){a.extendItem(e.device_id,e.user_id,14)},title:"Extend reservation"}),t&&u.a.createElement(h.DeleteButton,{key:"del",onClick:function(){a.deleteItem(e.device_id,e.user_id)},title:"Remove reservation"}))]},a.state={},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(l.d)("api/reservation/list").then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return u.a.createElement(u.a.Fragment,null,u.a.createElement(v.ContentList,{key:"cl",header:"Reservations",thead:["User","Device","Until",""],trows:this.state.data,listItem:this.listItem},u.a.createElement(h.ReloadButton,{key:"reload",onClick:function(){return e.componentDidMount()}}),u.a.createElement(h.AddButton,{key:"add",onClick:function(){return e.changeContent(u.a.createElement(k,{key:"rsv_new"}))}})),u.a.createElement(v.ContentData,{key:"cda",mountUpdate:function(t){return e.changeContent=t}}))}}]),n}(s.Component);f.contextType=v.RimsContext;var _=function(e){Object(d.a)(n,e);var t=Object(o.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).onChange=function(e){return c.setState({data:Object(i.a)({},c.state.data,Object(a.a)({},e.target.name,e.target.value))})},c.updateInfo=function(){return Object(l.d)("api/reservation/info",Object(i.a)({op:"update"},c.state.data)).then((function(e){return c.setState(e)}))},c.extendItem=function(e){Object(l.d)("api/reservation/extend",{device_id:c.state.data.device_id,user_id:c.state.data.user_id,days:e}).then((function(e){return"OK"===e.status&&c.componentDidMount()}))},c.state={data:null,found:!0},c}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(l.d)("api/reservation/info",{device_id:this.props.device_id}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){var e=this;return this.state.data?u.a.createElement(v.InfoArticle,{key:"rsv_article",header:"Reservation"},u.a.createElement(v.InfoColumns,{key:"reservation_content"},u.a.createElement(m.TextLine,{key:"alias",id:"alias",text:this.state.data.alias}),u.a.createElement(m.TextLine,{key:"time_start",id:"Start",text:this.state.data.time_start}),u.a.createElement(m.TextLine,{key:"time_end",id:"End",text:this.state.data.time_end}),u.a.createElement(m.RadioInput,{key:"shutdown",id:"shutdown",value:this.state.data.shutdown,options:[{text:"no",value:"no"},{text:"yes",value:"yes"},{text:"reset",value:"reset"}],onChange:this.onChange}),u.a.createElement(m.TextInput,{key:"info",id:"info",value:this.state.data.info,onChange:this.onChange})),this.state.data.user_id===this.context.settings.id&&u.a.createElement(h.SaveButton,{key:"rsv_btn_save",onClick:function(){return e.updateInfo()},title:"Save"}),this.state.data.user_id===this.context.settings.id&&u.a.createElement(h.AddButton,{key:"rsv_btn_extend",onClick:function(){return e.extendItem(14)},title:"Extend"})):u.a.createElement(v.Spinner,null)}}]),n}(s.Component);_.contextType=v.RimsContext;var k=function(e){Object(d.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).onChange=function(e){a.setState({device:e.target.value})},a.findDevice=function(){return Object(l.d)("api/device/search",{hostname:a.state.device}).then((function(e){return e.found&&a.setState({device_id:e.data.id,matching:e.data.hostname})}))},a.reserveDevice=function(){return Object(l.d)("api/reservation/new",{device_id:a.state.device_id,user_id:a.context.settings.id}).then((function(e){return"OK"===e.status&&a.setState({device:"",device_id:void 0,matching:""})}))},a.state={device:"",device_id:void 0,matching:""},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return u.a.createElement(v.LineArticle,{key:"rsv_art",header:"New reservation"},u.a.createElement(m.TextInput,{key:"device",id:"device",label:"Search device",onChange:this.onChange,value:this.state.device,placeholder:"search"})," found ",u.a.createElement(m.TextLine,{key:"matching",id:"matching device",text:this.state.matching}),this.state.device&&u.a.createElement(h.SearchButton,{key:"rsv_btn_search",onClick:function(){return e.findDevice()},title:"Find device"}),this.state.device_id&&u.a.createElement(h.AddButton,{key:"rsv_btn_new",onClick:function(){return e.reserveDevice()},title:"Reserve device"}))}}]),n}(s.Component);k.contextType=v.RimsContext;var p=function(e){Object(d.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).listItem=function(e){return[e.alias,e.hostname,e.start,e.end,e.info]},a.state={},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(l.d)("api/reservation/list",{extended:!0}).then((function(t){return e.setState(t)}))}},{key:"render",value:function(){return u.a.createElement(v.ContentReport,{key:"rsv_cr",header:"Reservations",thead:["User","Device","Start","End","Info"],trows:this.state.data,listItem:this.listItem})}}]),n}(s.Component)}}]);
//# sourceMappingURL=20.43586ddd.chunk.js.map