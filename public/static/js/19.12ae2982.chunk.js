(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[19],{1078:function(e,t,a){"use strict";a.r(t);var n=a(89),l=a(15),r=a(19),c=a(0),o=a.n(c),i=a(5),d=a.n(i),u=a(992),m=a(974),s=a(994),f=a(995),p=a(996),b=a(997),v=a(884),g=a(6),h=a(28),y=a(883),E=a(911),j=a(912),O=a(251),D=(a(998),a(999),a(1e3),a(1001),a(26)),C=a(16),k=a(23),w=a(9),N=a(2),A=a(3),x=a.n(A),M=a(65),Y=a(930),W=a(932),T=a(975),S=a(915),V=a(924),B=a(870),G=a(871),P=a(253),R=a.n(P),H=Object(v.a)((function(e){return{root:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",outline:"none",boxShadow:e.shadows[20],width:700,maxHeight:"100%",overflowY:"auto",maxWidth:"100%"},field:{marginTop:e.spacing(3)},cancelButton:{marginLeft:"auto"},confirmButton:{color:e.palette.white,backgroundColor:g.a.green[600],"&:hover":{backgroundColor:g.a.green[900]}}}})),I=Object(c.forwardRef)((function(e,t){var a=e.event,n=e.onDelete,i=e.onCancel,u=e.onAdd,m=e.onEdit,s=e.className,f=Object(w.a)(e,["event","onDelete","onCancel","onAdd","onEdit","className"]),p=H(),b={title:"Event title",desc:"Event description",allDay:!1,start:d()().toDate(),end:d()().toDate()},v=Object(c.useState)(a||b),g=Object(l.a)(v,2),h=g[0],y=g[1],O=a?"edit":"add",D=function(e){e.persist(),y((function(t){return Object(r.a)({},t,Object(k.a)({},e.target.name,"checkbox"===e.target.type?e.target.checked:e.target.value))}))};return o.a.createElement(E.a,Object.assign({},f,{className:Object(N.a)(p.root,s),ref:t}),o.a.createElement("form",null,o.a.createElement(j.a,null,o.a.createElement(M.a,{align:"center",gutterBottom:!0,variant:"h3"},"add"===O?"Add Event":"Edit Event"),o.a.createElement(Y.a,{className:p.field,fullWidth:!0,label:"Title",name:"title",onChange:D,value:h.title,variant:"outlined"}),o.a.createElement(Y.a,{className:p.field,fullWidth:!0,label:"Description",name:"desc",onChange:D,value:h.desc,variant:"outlined"}),o.a.createElement(W.a,{className:p.field,control:o.a.createElement(T.a,{checked:h.allDay,name:"allDay",onChange:D}),label:"All day"}),o.a.createElement(Y.a,{className:p.field,defaultValue:d()(h.start).format("YYYY-MM-DDThh:mm:ss"),fullWidth:!0,label:"Start date",name:"start",onChange:D,type:"datetime-local",variant:"outlined"}),o.a.createElement(Y.a,{className:p.field,defaultValue:d()(h.end).format("YYYY-MM-DDThh:mm:ss"),disabled:h.allDay,fullWidth:!0,label:"End date",name:"end",onChange:D,type:"datetime-local",variant:"outlined"})),o.a.createElement(S.a,null),o.a.createElement(V.a,null,o.a.createElement(B.a,{edge:"start",onClick:function(){n&&n(a)}},o.a.createElement(R.a,null)),o.a.createElement(G.a,{className:p.cancelButton,onClick:i,variant:"contained"},"Cancel"),"add"===O?o.a.createElement(G.a,{className:p.confirmButton,onClick:function(){h.title&&h.desc&&u(Object(r.a)({},h,{id:x()()}))},variant:"contained"},"Add"):o.a.createElement(G.a,{className:p.confirmButton,onClick:function(){h.title&&h.desc&&m(h)},variant:"contained"},"Save"))))})),J=a(928),z=a(939),F=a(953),L=a(913),q=a(1002),K=a.n(q),Q=a(1003),U=a.n(Q),X=a(1004),Z=a.n(X),$=a(1005),_=a.n($),ee=Object(v.a)((function(){return{root:{}}})),te=function(e){var t=e.date,a=e.view,n=e.onDatePrev,l=e.onDateNext,r=e.onEventAdd,c=e.onViewChange,i=e.onDateToday,u=e.className,m=Object(w.a)(e,["date","view","onDatePrev","onDateNext","onEventAdd","onViewChange","onDateToday","className"]),s=ee(),f=[{label:"Month",value:"dayGridMonth",icon:K.a},{label:"Week",value:"timeGridWeek",icon:U.a},{label:"Day",value:"timeGridDay",icon:Z.a},{label:"Agenda",value:"listWeek",icon:_.a}];return o.a.createElement("div",Object.assign({},m,{className:Object(N.a)(s.root,u)}),o.a.createElement(J.a,{alignItems:"flex-end",container:!0,justify:"space-between",spacing:3},o.a.createElement(J.a,{item:!0},o.a.createElement(M.a,{component:"h2",gutterBottom:!0,variant:"overline"},"Calendar"),o.a.createElement(M.a,{component:"h1",variant:"h3"},"Here's what you planned")),o.a.createElement(J.a,{item:!0},o.a.createElement(G.a,{color:"primary",onClick:r,variant:"contained"},"Add event"))),o.a.createElement(J.a,{alignItems:"center",container:!0,justify:"space-between",spacing:3},o.a.createElement(J.a,{item:!0},o.a.createElement(z.a,null,o.a.createElement(G.a,{onClick:n},"Prev"),o.a.createElement(G.a,{onClick:i},"Today"),o.a.createElement(G.a,{onClick:l},"Next"))),o.a.createElement(F.a,{smDown:!0},o.a.createElement(J.a,{item:!0},o.a.createElement(M.a,{variant:"h3"},d()(t).format("MMMM YYYY"))),o.a.createElement(J.a,{item:!0},f.map((function(e){var t=e.icon;return o.a.createElement(L.a,{key:e.value,title:e.label},o.a.createElement(B.a,{color:e.value===a?"primary":"default",onClick:function(){return c(e.value)}},o.a.createElement(t,null)))}))))))},ae=Object(v.a)((function(e){return{root:{height:"100%",padding:e.spacing(3),"& .fc-unthemed td":{borderColor:e.palette.divider},"& .fc-widget-header":{backgroundColor:g.a.grey[50]},"& .fc-axis":Object(r.a)({},e.typography.body2),"& .fc-list-item-time":Object(r.a)({},e.typography.body2),"& .fc-list-item-title":Object(r.a)({},e.typography.body1),"& .fc-list-heading-main":Object(r.a)({},e.typography.h6),"& .fc-list-heading-alt":Object(r.a)({},e.typography.h6),"& .fc th":{borderColor:e.palette.divider},"& .fc-day-header":Object(r.a)({},e.typography.subtitle2,{fontWeight:500,color:e.palette.text.secondary,padding:e.spacing(1),backgroundColor:g.a.grey[50]}),"& .fc-day-top":Object(r.a)({},e.typography.body2),"& .fc-highlight":{backgroundColor:g.a.blueGrey[50]},"& .fc-event":{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText,borderWidth:2,opacity:.9,"& .fc-time":Object(r.a)({},e.typography.h6,{color:"inherit"}),"& .fc-title":Object(r.a)({},e.typography.body1,{color:"inherit"})},"& .fc-list-empty":Object(r.a)({},e.typography.subtitle1)},card:{marginTop:e.spacing(3)}}})),ne=function(){var e=ae(),t=Object(c.useRef)(null),a=Object(h.a)(),r=Object(y.a)(a.breakpoints.down("sm")),i=Object(c.useState)(r?"listWeek":"dayGridMonth"),v=Object(l.a)(i,2),g=v[0],k=v[1],w=Object(c.useState)(d()("2019-07-30 08:00:00").toDate()),N=Object(l.a)(w,2),A=N[0],x=N[1],M=Object(c.useState)([]),Y=Object(l.a)(M,2),W=Y[0],T=Y[1],S=Object(c.useState)({open:!1,event:null}),V=Object(l.a)(S,2),B=V[0],G=V[1];Object(c.useEffect)((function(){var e=!0;return e&&D.a.get("/api/calendar").then((function(e){return T(e.data.events)})),function(){e=!1}}),[]),Object(c.useEffect)((function(){var e=t.current.getApi(),a=r?"listWeek":"dayGridMonth";e.changeView(a),k(a)}),[r]);var P=function(){G({open:!1,event:null})};return o.a.createElement(C.j,{className:e.root,title:"Calendar"},o.a.createElement(te,{date:A,onDateNext:function(){var e=t.current.getApi();e.next(),x(e.getDate())},onDatePrev:function(){var e=t.current.getApi();e.prev(),x(e.getDate())},onDateToday:function(){var e=t.current.getApi();e.today(),x(e.getDate())},onEventAdd:function(){G({open:!0,event:null})},onViewChange:function(e){t.current.getApi().changeView(e),k(e)},view:g}),o.a.createElement(E.a,{className:e.card},o.a.createElement(j.a,null,o.a.createElement(u.a,{allDayMaintainDuration:!0,defaultDate:A,defaultView:g,droppable:!0,editable:!0,eventClick:function(e){var t=W.find((function(t){return t.id===e.event.id}));G({open:!0,event:t})},eventResizableFromStart:!0,events:W,header:!1,height:800,plugins:[m.d,s.a,f.a,p.a,b.a],ref:t,rerenderDelay:10,selectable:!0,weekends:!0}))),o.a.createElement(O.a,{onClose:P,open:B.open},o.a.createElement(I,{event:B.event,onAdd:function(e){T((function(t){return[].concat(Object(n.a)(t),[e])})),G({open:!1,event:null})},onCancel:P,onDelete:function(e){T((function(t){return t.filter((function(t){return t.id!==e.id}))})),G({open:!1,event:null})},onEdit:function(e){T((function(t){return t.map((function(t){return t.id===e.id?e:t}))})),G({open:!1,event:null})}})))};a.d(t,"default",(function(){return ne}))}}]);
//# sourceMappingURL=19.12ae2982.chunk.js.map