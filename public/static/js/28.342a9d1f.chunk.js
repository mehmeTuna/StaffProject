(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[28],{1083:function(e,t,a){"use strict";a.r(t);var n=a(15),c=a(0),o=a.n(c),s=a(884),r=a(26),i=a(16),u=a(9),l=a(2),m=a(65),p=Object(s.a)((function(){return{root:{}}})),d=function(e){var t=e.className,a=Object(u.a)(e,["className"]),n=p();return o.a.createElement("div",Object.assign({},a,{className:Object(l.a)(n.root,t)}),o.a.createElement(m.a,{component:"h2",gutterBottom:!0,variant:"overline"},"Social Feed"),o.a.createElement(m.a,{component:"h1",variant:"h3"},"Here's what your connections posted"))},f=Object(s.a)((function(e){return{root:{width:e.breakpoints.values.lg,maxWidth:"100%",margin:"0 auto",padding:e.spacing(3)},newPost:{marginTop:e.spacing(3)},posts:{marginTop:e.spacing(3)},post:{marginBottom:e.spacing(3)}}})),g=function(){var e=f(),t=Object(c.useState)([]),a=Object(n.a)(t,2),s=a[0],u=a[1];return Object(c.useEffect)((function(){var e=!0;return r.a.get("/api/social-feed").then((function(t){e&&u(t.data.posts)})),function(){e=!1}}),[]),o.a.createElement(i.j,{className:e.root,title:"Social Feed"},o.a.createElement(d,null),o.a.createElement(i.a,{className:e.newPost}),o.a.createElement("div",{className:e.posts},s.map((function(t){return o.a.createElement(i.l,{className:e.post,key:t.id,post:t})}))))};a.d(t,"default",(function(){return g}))}}]);
//# sourceMappingURL=28.342a9d1f.chunk.js.map