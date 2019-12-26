(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[25],{1079:function(e,a,t){"use strict";t.r(a);var n=t(15),r=t(0),l=t.n(r),c=t(884),i=t(915),m=t(26),o=t(16),s=t(9),u=t(2),E=t(928),g=t(66),p=t(871),d=t(254),v=t.n(d),b=Object(c.a)((function(e){return{root:{},getAppIcon:{marginRight:e.spacing(1)}}})),f=function(e){var a=e.invoice,t=e.className,n=Object(s.a)(e,["invoice","className"]),r=b();return l.a.createElement("div",Object.assign({},n,{className:Object(u.a)(r.root,t)}),l.a.createElement(E.a,{alignItems:"flex-end",container:!0,justify:"space-between",spacing:3},l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{component:"h2",gutterBottom:!0,variant:"overline"},"Back"),l.a.createElement(g.a,{component:"h1",variant:"h3"},"Invoice #",a.id.split("-").shift())),l.a.createElement(E.a,{item:!0},l.a.createElement(p.a,{color:"primary",variant:"contained"},l.a.createElement(v.a,{className:r.getAppIcon}),"Download PDF"))))},h=t(5),N=t.n(h),j=t(6),y=t(911),O=t(912),w=t(944),T=t(948),k=t(946),D=t(947),B=t(945),I=Object(c.a)((function(e){return{root:{},content:{padding:e.spacing(6)},marginTop:{marginTop:e.spacing(4)},dates:{padding:e.spacing(2),backgroundColor:j.a.grey[100]}}})),Y=function(e){var a=e.invoice,t=e.className,n=Object(s.a)(e,["invoice","className"]),r=I();return l.a.createElement(y.a,Object.assign({},n,{className:Object(u.a)(r.root,t)}),l.a.createElement(O.a,{className:r.content},l.a.createElement(E.a,{container:!0,justify:"space-between"},l.a.createElement(E.a,{item:!0},l.a.createElement("img",{alt:"Brand",src:"/images/logos/logo--dark.svg"})),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{align:"right",component:"h3",variant:"h1"},"PAID"))),l.a.createElement(E.a,{alignItems:"center",className:r.marginTop,container:!0,justify:"space-between"},l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{variant:"h5"},"www.devias.io")),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{align:"right"},"Invoice #",a.id.split("-").shift()))),l.a.createElement(E.a,{className:r.marginTop,container:!0,justify:"space-between"},l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,null,"Street King William, 123 ",l.a.createElement("br",null),"Level 2, C, 442456 ",l.a.createElement("br",null),"San Francisco, CA, USA")),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,null,"Company No. 4675933 ",l.a.createElement("br",null),"EU VAT No. 949 67545 45 ",l.a.createElement("br",null))),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{align:"right"},"Email: accounts@devias.io ",l.a.createElement("br",null),"Tel: (+40) 652 3456 23"))),l.a.createElement(E.a,{className:Object(u.a)(r.marginTop,r.dates),container:!0,justify:"space-between"},l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{component:"h4",gutterBottom:!0,variant:"overline"},"Due date"),l.a.createElement(g.a,null,N()(a.due_date).format("DD MMM YYYY"))),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{component:"h4",gutterBottom:!0,variant:"overline"},"Date of issue"),l.a.createElement(g.a,null,N()(a.issue_date).format("DD MMM YYYY"))),l.a.createElement(E.a,{item:!0},l.a.createElement(g.a,{component:"h4",gutterBottom:!0,variant:"overline"},"Reference"),l.a.createElement(g.a,null,a.ref))),l.a.createElement("div",{className:r.marginTop},l.a.createElement(g.a,{component:"h4",gutterBottom:!0,variant:"overline"},"Billed to"),l.a.createElement(g.a,null,a.customer.name," ",l.a.createElement("br",null),a.customer.company," ",l.a.createElement("br",null),a.customer.nzbn," ",l.a.createElement("br",null),a.customer.address," ",l.a.createElement("br",null))),l.a.createElement(w.a,{className:r.marginTop},l.a.createElement(T.a,null,l.a.createElement(k.a,null,l.a.createElement(D.a,null,"Description"),l.a.createElement(D.a,null),l.a.createElement(D.a,{align:"right"},"Price"))),l.a.createElement(B.a,null,a.products.map((function(e){return l.a.createElement(k.a,{key:e.id},l.a.createElement(D.a,null,e.desc),l.a.createElement(D.a,null),l.a.createElement(D.a,{align:"right"},a.currency,e.value))})),l.a.createElement(k.a,null,l.a.createElement(D.a,null),l.a.createElement(D.a,null,"Subtotal"),l.a.createElement(D.a,{align:"right"},a.currency,a.subtotal)),l.a.createElement(k.a,null,l.a.createElement(D.a,null),l.a.createElement(D.a,null,"Taxes"),l.a.createElement(D.a,{align:"right"},a.currency,a.taxes)),l.a.createElement(k.a,null,l.a.createElement(D.a,null),l.a.createElement(D.a,null,"Total"),l.a.createElement(D.a,{align:"right"},a.currency,a.total)))),l.a.createElement("div",{className:r.marginTop},l.a.createElement(g.a,{component:"h4",gutterBottom:!0,variant:"overline"},"Notes"),l.a.createElement(g.a,null,"Please make sure you have the right bank registration number as I had issues before and make sure you guys cover transfer expenses."))))},A=Object(c.a)((function(e){return{root:{width:e.breakpoints.values.lg,maxWidth:"100%",margin:"0 auto",padding:e.spacing(3)},divider:{margin:e.spacing(2,0)}}})),M=function(){var e=A(),a=Object(r.useState)(null),t=Object(n.a)(a,2),c=t[0],s=t[1];return Object(r.useEffect)((function(){var e=!0;return m.a.get("/api/invoices/1").then((function(a){e&&s(a.data.invoice)})),function(){e=!1}}),[]),c?l.a.createElement(o.k,{className:e.root,title:"Invoice Details"},l.a.createElement(f,{invoice:c}),l.a.createElement(i.a,{className:e.divider}),l.a.createElement(Y,{invoice:c})):null};t.d(a,"default",(function(){return M}))}}]);
//# sourceMappingURL=25.fb23cb94.chunk.js.map