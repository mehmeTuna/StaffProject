(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[15],{1065:function(e,a,t){"use strict";var n=t(1),c=t(4),o=t(0),r=t.n(o),l=(t(7),t(2)),i=t(8),s=t(484),m=t(920),d=t(886),u=t(947),p=t(909),g=t(66),h=t(966),b=t(965),f=t(28),E=t(870),v=r.a.createElement(b.a,null),O=r.a.createElement(h.a,null),P=r.a.createElement(h.a,null),j=r.a.createElement(b.a,null),k=r.a.forwardRef((function(e,a){var t=e.backIconButtonProps,o=e.count,l=e.nextIconButtonProps,i=e.onChangePage,s=e.page,m=e.rowsPerPage,d=Object(c.a)(e,["backIconButtonProps","count","nextIconButtonProps","onChangePage","page","rowsPerPage"]),u=Object(f.a)();return r.a.createElement("div",Object(n.a)({ref:a},d),r.a.createElement(E.a,Object(n.a)({onClick:function(e){i(e,s-1)},disabled:0===s,color:"inherit"},t),"rtl"===u.direction?v:O),r.a.createElement(E.a,Object(n.a)({onClick:function(e){i(e,s+1)},disabled:s>=Math.ceil(o/m)-1,color:"inherit"},l),"rtl"===u.direction?P:j))})),y=function(e){var a=e.from,t=e.to,n=e.count;return"".concat(a,"-").concat(-1===t?n:t," of ").concat(n)},x=[10,25,50,100],w=r.a.forwardRef((function(e,a){var t,o=e.ActionsComponent,i=void 0===o?k:o,h=e.backIconButtonProps,b=e.backIconButtonText,f=void 0===b?"Previous page":b,E=e.classes,v=e.className,O=e.colSpan,P=e.component,j=void 0===P?u.a:P,w=e.count,C=e.labelDisplayedRows,I=void 0===C?y:C,N=e.labelRowsPerPage,B=void 0===N?"Rows per page:":N,R=e.nextIconButtonProps,S=e.nextIconButtonText,M=void 0===S?"Next page":S,z=e.onChangePage,L=e.onChangeRowsPerPage,A=e.page,T=e.rowsPerPage,H=e.rowsPerPageOptions,V=void 0===H?x:H,D=e.SelectProps,Y=void 0===D?{}:D,$=Object(c.a)(e,["ActionsComponent","backIconButtonProps","backIconButtonText","classes","className","colSpan","component","count","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","nextIconButtonText","onChangePage","onChangeRowsPerPage","page","rowsPerPage","rowsPerPageOptions","SelectProps"]);j!==u.a&&"td"!==j||(t=O||1e3);var J=Y.native?"option":m.a;return r.a.createElement(j,Object(n.a)({className:Object(l.a)(E.root,v),colSpan:t,ref:a},$),r.a.createElement(p.a,{className:E.toolbar},r.a.createElement("div",{className:E.spacer}),V.length>1&&r.a.createElement(g.a,{color:"inherit",variant:"body2",className:E.caption},B),V.length>1&&r.a.createElement(d.a,Object(n.a)({classes:{select:E.select,icon:E.selectIcon},input:r.a.createElement(s.a,{className:Object(l.a)(E.input,E.selectRoot)}),value:T,onChange:L},Y),V.map((function(e){return r.a.createElement(J,{className:E.menuItem,key:e,value:e.value?e.value:e},e.label?e.label:e)}))),r.a.createElement(g.a,{color:"inherit",variant:"body2",className:E.caption},I({from:0===w?0:A*T+1,to:Math.min(w,(A+1)*T),count:w,page:A})),r.a.createElement(i,{className:E.actions,backIconButtonProps:Object(n.a)({title:f,"aria-label":f},h),count:w,nextIconButtonProps:Object(n.a)({title:M,"aria-label":M},R),onChangePage:z,page:A,rowsPerPage:T})))}));a.a=Object(i.a)((function(e){return{root:{color:e.palette.text.primary,fontSize:e.typography.pxToRem(14),overflow:"auto","&:last-child":{padding:0}},toolbar:{minHeight:52,paddingRight:2},spacer:{flex:"1 1 100%"},caption:{flexShrink:0},selectRoot:{marginRight:32,marginLeft:8},select:{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"},selectIcon:{top:1},input:{color:"inherit",fontSize:"inherit",flexShrink:0},menuItem:{},actions:{flexShrink:0,marginLeft:20}}}),{name:"MuiTablePagination"})(w)},1081:function(e,a,t){"use strict";t.r(a);var n=t(15),c=t(0),o=t.n(c),r=t(884),l=t(26),i=t(16),s=t(9),m=t(2),d=t(928),u=t(66),p=t(871),g=Object(r.a)((function(){return{root:{}}})),h=function(e){var a=e.className,t=Object(s.a)(e,["className"]),n=g();return o.a.createElement("div",Object.assign({},t,{className:Object(m.a)(n.root,a)}),o.a.createElement(d.a,{alignItems:"flex-end",container:!0,justify:"space-between",spacing:3},o.a.createElement(d.a,{item:!0},o.a.createElement(u.a,{component:"h2",gutterBottom:!0,variant:"overline"},"Management"),o.a.createElement(u.a,{component:"h1",variant:"h3"},"Orders")),o.a.createElement(d.a,{item:!0},o.a.createElement(p.a,{color:"primary",variant:"contained"},"Add order"))))},b=t(17),f=t(5),E=t.n(f),v=t(34),O=t.n(v),P=t(6),j=t(911),k=t(923),y=t(915),x=t(912),w=t(944),C=t(948),I=t(946),N=t(947),B=t(967),R=t(945),S=t(924),M=t(1065),z=Object(r.a)((function(e){return{root:{},filterButton:{marginRight:e.spacing(2)},content:{padding:0},inner:{minWidth:1150},actions:{padding:e.spacing(0,1),justifyContent:"flex-end"}}})),L=function(e){var a=e.className,t=e.orders,r=Object(s.a)(e,["className","orders"]),l=z(),d=Object(c.useState)([]),g=Object(n.a)(d,2),h=g[0],f=g[1],v=Object(c.useState)(0),L=Object(n.a)(v,2),A=L[0],T=L[1],H=Object(c.useState)(10),V=Object(n.a)(H,2),D=V[0],Y=V[1],$={canceled:P.a.grey[600],pending:P.a.orange[600],completed:P.a.green[600],rejected:P.a.red[600]};return o.a.createElement("div",Object.assign({},r,{className:Object(m.a)(l.root,a)}),o.a.createElement(u.a,{color:"textSecondary",gutterBottom:!0,variant:"body2"},t.length," Records found. Page ",A+1," of"," ",Math.ceil(t.length/D)),o.a.createElement(j.a,null,o.a.createElement(k.a,{action:o.a.createElement(i.e,null),title:"Orders"}),o.a.createElement(y.a,null),o.a.createElement(x.a,{className:l.content},o.a.createElement(O.a,null,o.a.createElement("div",{className:l.inner},o.a.createElement(w.a,null,o.a.createElement(C.a,null,o.a.createElement(I.a,null,o.a.createElement(N.a,{padding:"checkbox"},o.a.createElement(B.a,{checked:h.length===t.length,color:"primary",indeterminate:h.length>0&&h.length<t.length,onChange:function(e){var a=e.target.checked?t.map((function(e){return e.id})):[];f(a)}})),o.a.createElement(N.a,null,"Ref"),o.a.createElement(N.a,null,"Customer"),o.a.createElement(N.a,null,"Method"),o.a.createElement(N.a,null,"Total"),o.a.createElement(N.a,null,"Status"),o.a.createElement(N.a,{align:"right"},"Actions"))),o.a.createElement(R.a,null,t.slice(0,D).map((function(e){return o.a.createElement(I.a,{key:e.id,selected:-1!==h.indexOf(e.id)},o.a.createElement(N.a,{padding:"checkbox"},o.a.createElement(B.a,{checked:-1!==h.indexOf(e.id),color:"primary",onChange:function(a){return function(e,a){var t=h.indexOf(a),n=[];-1===t?n=n.concat(h,a):0===t?n=n.concat(h.slice(1)):t===h.length-1?n=n.concat(h.slice(0,-1)):t>0&&(n=n.concat(h.slice(0,t),h.slice(t+1))),f(n)}(0,e.id)},value:-1!==h.indexOf(e.id)})),o.a.createElement(N.a,null,e.payment.ref,o.a.createElement(u.a,{variant:"body2"},E()(e.created_at).format("DD MMM YYYY | hh:mm"))),o.a.createElement(N.a,null,e.customer.name),o.a.createElement(N.a,null,e.payment.method),o.a.createElement(N.a,null,e.payment.currency,e.payment.total),o.a.createElement(N.a,null,o.a.createElement(i.g,{color:$[e.payment.status],variant:"outlined"},e.payment.status)),o.a.createElement(N.a,{align:"right"},o.a.createElement(p.a,{color:"primary",component:b.a,size:"small",to:"/management/orders/1",variant:"outlined"},"View")))}))))))),o.a.createElement(S.a,{className:l.actions},o.a.createElement(M.a,{component:"div",count:t.length,onChangePage:function(e,a){T(a)},onChangeRowsPerPage:function(e){Y(e.target.value)},page:A,rowsPerPage:D,rowsPerPageOptions:[5,10,25]}))),o.a.createElement(i.u,{selected:h}))};L.defaultProps={orders:[]};var A=L,T=Object(r.a)((function(e){return{root:{padding:e.spacing(3)},results:{marginTop:e.spacing(3)}}})),H=function(){var e=T(),a=Object(c.useState)([]),t=Object(n.a)(a,2),r=t[0],s=t[1];return Object(c.useEffect)((function(){var e=!0;return l.a.get("/api/orders").then((function(a){e&&s(a.data.orders)})),function(){e=!1}}),[]),o.a.createElement(i.k,{className:e.root,title:"Orders Management List"},o.a.createElement(h,null),o.a.createElement(i.r,null),o.a.createElement(A,{className:e.results,orders:r}))};t.d(a,"default",(function(){return H}))},965:function(e,a,t){"use strict";var n=t(0),c=t.n(n),o=t(52);a.a=Object(o.a)(c.a.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")},966:function(e,a,t){"use strict";var n=t(0),c=t.n(n),o=t(52);a.a=Object(o.a)(c.a.createElement("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},967:function(e,a,t){"use strict";var n=t(1),c=t(4),o=t(0),r=t.n(o),l=(t(7),t(2)),i=t(252),s=t(52),m=Object(s.a)(r.a.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),d=Object(s.a)(r.a.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),u=t(14),p=Object(s.a)(r.a.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),g=t(10),h=t(8),b=r.a.createElement(d,null),f=r.a.createElement(m,null),E=r.a.createElement(p,null),v=r.a.forwardRef((function(e,a){var t=e.checkedIcon,o=void 0===t?b:t,s=e.classes,m=e.color,d=void 0===m?"secondary":m,u=e.disabled,p=void 0!==u&&u,h=e.icon,v=void 0===h?f:h,O=e.indeterminate,P=void 0!==O&&O,j=e.indeterminateIcon,k=void 0===j?E:j,y=e.inputProps,x=e.size,w=void 0===x?"medium":x,C=Object(c.a)(e,["checkedIcon","classes","color","disabled","icon","indeterminate","indeterminateIcon","inputProps","size"]);return r.a.createElement(i.a,Object(n.a)({type:"checkbox",classes:{root:Object(l.a)(s.root,s["color".concat(Object(g.a)(d))],P&&s.indeterminate),checked:s.checked,disabled:s.disabled},color:d,inputProps:Object(n.a)({"data-indeterminate":P},y),icon:r.a.cloneElement(P?k:v,{fontSize:"small"===w?"small":"default"}),checkedIcon:r.a.cloneElement(P?k:o,{fontSize:"small"===w?"small":"default"}),ref:a,disabled:p},C))}));a.a=Object(h.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(u.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(u.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(v)}}]);
//# sourceMappingURL=15.9a0b1b92.chunk.js.map