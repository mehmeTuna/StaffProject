(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[5],{1062:function(e,a,t){"use strict";var n=t(12);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),c=(0,n(t(13)).default)(r.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"}),"PersonAddOutlined");a.default=c},1063:function(e,a,t){"use strict";var n=t(12);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),c=(0,n(t(13)).default)(r.default.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"}),"InsertDriveFileOutlined");a.default=c},1067:function(e,a,t){"use strict";t.r(a);var n=t(15),r=t(0),c=t.n(r),l=t(37),i=t(884),s=t(6),o=t(1082),m=t(1066),u=t(915),d=t(26),p=t(16),v=t(9),b=t(5),g=t.n(b),E=t(2),f=t(65),h=t(17),j=t(955),N=t(911),y=t(917),O=t(254),k=t.n(O),w=t(1062),x=t.n(w),C=t(176),T=t.n(C),I=t(399),B=t.n(I),M=t(49),_=Object(i.a)((function(e){return{root:{display:"flex",alignItems:"center"},card:{marginLeft:e.spacing(2),flexGrow:1,display:"flex",padding:e.spacing(2),alignItems:"center"},date:{marginLeft:"auto",flexShrink:0},avatarBlue:{backgroundImage:M.a.blue},avatarGreen:{backgroundImage:M.a.green},avatarOrange:{backgroundImage:M.a.orange},avatarIndigo:{backgroundImage:M.a.indigo}}})),z=function(e){var a=e.activity,t=e.className,n=Object(v.a)(e,["activity","className"]),r=_(),l={upload_file:c.a.createElement(j.a,{className:r.avatarBlue},c.a.createElement(k.a,null)),join_team:c.a.createElement(j.a,{className:r.avatarOrange},c.a.createElement(x.a,null)),price_change:c.a.createElement(j.a,{className:r.avatarGreen},c.a.createElement(T.a,null)),contest_created:c.a.createElement(j.a,{className:r.avatarIndigo},c.a.createElement(B.a,null))},i="user"===a.subject_type?"/profile/1/timeline":"/projects/1/overview";return c.a.createElement("div",Object.assign({},n,{className:Object(E.a)(r.root,t)}),l[a.action_type],c.a.createElement(N.a,{className:r.card},c.a.createElement(f.a,{variant:"body1"},c.a.createElement(y.a,{color:"textPrimary",component:h.a,to:i,variant:"h6"},a.subject)," ",a.action_desc),c.a.createElement(f.a,{className:r.date,variant:"body2"},g()(a.created_at).fromNow())))},A=Object(i.a)((function(e){return{root:{},title:{marginBottom:e.spacing(3)},group:{"& + &":{marginTop:e.spacing(4)}},activity:{position:"relative","& + &":{marginTop:e.spacing(3),"&:before":{position:"absolute",content:'" "',height:20,width:1,top:-20,left:20,backgroundColor:e.palette.divider}}}}})),P=function(e){var a=e.activities,t=e.className,n=Object(v.a)(e,["activities","className"]),r=A(),l=[],i=[],s=!0,o=!1,m=void 0;try{for(var u,d=a[Symbol.iterator]();!(s=(u=d.next()).done);s=!0){var p=u.value;g()(p.created_at).isSame(g()(),"day")?l.push(p):i.push(p)}}catch(b){o=!0,m=b}finally{try{s||null==d.return||d.return()}finally{if(o)throw m}}return c.a.createElement("div",Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(f.a,{className:r.title,variant:"h3"},"Today"),c.a.createElement("div",{className:r.group},l.map((function(e){return c.a.createElement(z,{activity:e,className:r.activity,key:e.id})}))),c.a.createElement("div",{className:r.group},c.a.createElement(f.a,{className:r.title,variant:"h3"},"Last week"),i.map((function(e){return c.a.createElement(z,{activity:e,className:r.activity,key:e.id})}))))},S=t(912),D=t(928),G=t(926),W=t(913),Y=t(870),H=t(924),F=t(871),L=t(440),R=t(920),V=t(918),q=t(919),J=t(1063),U=t.n(J),K=t(138),Q=t.n(K),X=t(253),Z=t.n(X),$=t(157),ee=t.n($),ae=t(964),te=t.n(ae),ne=t(335),re=Object(i.a)((function(e){return{root:{},media:{height:240},placeholder:{height:240,backgroundColor:s.a.blueGrey[50],display:"flex",alignItems:"center",justifyContent:"center"},insertDriveFileIcon:{height:e.spacing(6),width:e.spacing(6),fontSize:e.spacing(6)},content:{display:"flex",justifyContent:"space-between"},actions:{justifyContent:"center"},getAppIcon:{marignRight:e.spacing(1)},menu:{width:250,maxWidth:"100%"}}})),ce=function(e){var a=e.file,t=e.className,l=Object(v.a)(e,["file","className"]),i=re(),s=Object(r.useRef)(null),o=Object(r.useState)(!1),m=Object(n.a)(o,2),d=m[0],p=m[1];return c.a.createElement(N.a,Object.assign({},l,{className:Object(E.a)(i.root,t)}),a.mimeType.includes("image/")?c.a.createElement(G.a,{className:i.media,image:a.url}):c.a.createElement("div",{className:i.placeholder},c.a.createElement(U.a,{className:i.insertDriveFileIcon})),c.a.createElement(S.a,{className:i.content},c.a.createElement("div",null,c.a.createElement(f.a,{variant:"h5"},a.name),c.a.createElement(f.a,{variant:"subtitle2"},Object(ne.a)(a.size))),c.a.createElement("div",null,c.a.createElement(W.a,{title:"More options"},c.a.createElement(Y.a,{edge:"end",onClick:function(){p(!0)},ref:s,size:"small"},c.a.createElement(Q.a,null))))),c.a.createElement(u.a,null),c.a.createElement(H.a,{className:i.actions},c.a.createElement(F.a,null,c.a.createElement(k.a,{className:i.getAppIcon}),"Download")),c.a.createElement(L.a,{anchorEl:s.current,anchorOrigin:{vertical:"top",horizontal:"left"},classes:{paper:i.menu},onClose:function(){p(!1)},open:d,transformOrigin:{vertical:"top",horizontal:"left"}},c.a.createElement(R.a,{divider:!0},c.a.createElement(V.a,null,c.a.createElement(te.a,null)),c.a.createElement(q.a,{primary:"Rename"})),c.a.createElement(R.a,{divider:!0},c.a.createElement(V.a,null,c.a.createElement(Z.a,null)),c.a.createElement(q.a,{primary:"Delete"})),c.a.createElement(R.a,null,c.a.createElement(V.a,null,c.a.createElement(ee.a,null)),c.a.createElement(q.a,{primary:"Archive"}))))},le=Object(i.a)((function(e){return{root:{},files:{marginTop:e.spacing(3)}}})),ie=function(e){var a=e.files,t=e.className,n=Object(v.a)(e,["files","className"]),r=le();return c.a.createElement("div",Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(N.a,null,c.a.createElement(S.a,null,c.a.createElement(p.d,null))),c.a.createElement(D.a,{className:r.files,container:!0,spacing:3},a.map((function(e){return c.a.createElement(D.a,{item:!0,key:e.id,lg:4,md:4,sm:6,xs:12},c.a.createElement(ce,{file:e}))}))))},se=t(177),oe=t.n(se),me=t(927),ue=t(930),de=t(99),pe=Object(i.a)((function(e){return{root:{width:960},header:{padding:e.spacing(3),maxWidth:720,margin:"0 auto"},content:{padding:e.spacing(0,2),maxWidth:720,margin:"0 auto"},helperText:{textAlign:"right",marginRight:0},author:{margin:e.spacing(4,0),display:"flex"},avatar:{marginRight:e.spacing(2)},actions:{backgroundColor:s.a.grey[100],padding:e.spacing(2),display:"flex",justifyContent:"center"},applyButton:{color:e.palette.white,backgroundColor:s.a.green[600],"&:hover":{backgroundColor:s.a.green[900]}}}})),ve=function(e){var a=e.author,t=e.open,l=e.onClose,i=e.onApply,s=e.className,o=Object(v.a)(e,["author","open","onClose","onApply","className"]),m=Object(r.useState)(""),u=Object(n.a)(m,2),d=u[0],p=u[1],b=pe();return c.a.createElement(me.a,{maxWidth:"lg",onClose:l,open:t},c.a.createElement("div",Object.assign({},o,{className:Object(E.a)(b.root,s)}),c.a.createElement("div",{className:b.header},c.a.createElement(f.a,{align:"center",className:b.title,gutterBottom:!0,variant:"h3"},"The project owner requires an introduction"),c.a.createElement(f.a,{align:"center",className:b.subtitle,variant:"subtitle2"},"Write down a short note with your application regarding why you think you'd be a good fit for this position.")),c.a.createElement("div",{className:b.content},c.a.createElement(ue.a,{autoFocus:!0,className:b.textField,FormHelperTextProps:{classes:{root:b.helperText}},fullWidth:!0,helperText:"".concat(200-d.length," characters left"),label:"Short Note",multiline:!0,onChange:function(e){e.persist(),p(e.target.value)},placeholder:"What excites you about this project?",rows:5,value:d,variant:"outlined"}),c.a.createElement("div",{className:b.author},c.a.createElement(j.a,{alt:"Author",className:b.avatar,src:a.avatar},Object(de.a)(a.name)),c.a.createElement("div",null,c.a.createElement(f.a,{variant:"h3"},a.name),c.a.createElement(f.a,{variant:"subtitle2"},a.bio)))),c.a.createElement("div",{className:b.actions},c.a.createElement(F.a,{className:b.applyButton,onClick:i,variant:"contained"},"Apply for a role"))))},be=Object(i.a)((function(e){return{root:{},label:{marginTop:e.spacing(1)},shareButton:{marginRight:e.spacing(2)},shareIcon:{marginRight:e.spacing(1)},applyButton:{color:e.palette.white,backgroundColor:s.a.green[600],"&:hover":{backgroundColor:s.a.green[900]}}}})),ge=function(e){var a=e.project,t=e.className,l=Object(v.a)(e,["project","className"]),i=be(),o=Object(r.useState)(!1),m=Object(n.a)(o,2),u=m[0],d=m[1],b=function(){d(!1)};return c.a.createElement("div",Object.assign({},l,{className:Object(E.a)(i.root,t)}),c.a.createElement(D.a,{alignItems:"flex-end",container:!0,justify:"space-between",spacing:3},c.a.createElement(D.a,{item:!0},c.a.createElement(f.a,{component:"h2",gutterBottom:!0,variant:"overline"},"Browse projects"),c.a.createElement(f.a,{component:"h1",gutterBottom:!0,variant:"h3"},a.title),c.a.createElement(p.f,{className:i.label,color:s.a.green[600],variant:"outlined"},"Active project")),c.a.createElement(D.a,{item:!0},c.a.createElement(F.a,{className:i.shareButton,variant:"contained"},c.a.createElement(oe.a,{className:i.shareIcon}),"Share"),c.a.createElement(F.a,{className:i.applyButton,onClick:function(){d(!0)},variant:"contained"},"Apply for a role"))),c.a.createElement(ve,{author:a.author,onApply:b,onClose:b,open:u}))};ge.defaultProps={};var Ee=ge,fe=Object(i.a)((function(){return{root:{}}})),he=function(e){var a=e.brief,t=e.className,n=Object(v.a)(e,["brief","className"]),r=fe();return c.a.createElement(N.a,Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(S.a,null,c.a.createElement(p.g,{source:a})))},je=Object(i.a)((function(){return{root:{}}})),Ne=function(e){var a=e.className,t=Object(v.a)(e,["className"]),n=je();return c.a.createElement(N.a,Object.assign({},t,{className:Object(E.a)(n.root,a)}),c.a.createElement(S.a,null,c.a.createElement(f.a,{variant:"h4"},"Deliverables:"),c.a.createElement(f.a,{variant:"body1"},"You will be required to provide a zip file. Please check with the client to see if they have a preference.")))},ye=t(923),Oe=t(872),ke=t(873),we=Object(i.a)((function(e){return{root:{},header:{paddingBottom:0},content:{paddingTop:0},listItem:{padding:e.spacing(2,0),justifyContent:"space-between"}}})),xe=function(e){var a=e.project,t=e.className,n=Object(v.a)(e,["project","className"]),r=we();return c.a.createElement(N.a,Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(ye.a,{avatar:c.a.createElement(j.a,{alt:"Author",className:r.avatar,component:h.a,src:a.author.avatar,to:"/profile/1/timeline"},Object(de.a)(a.author.name)),className:r.header,disableTypography:!0,subheader:c.a.createElement(f.a,{component:h.a,to:"/profile/1/timeline",variant:"h5"},a.author.name),title:c.a.createElement(f.a,{display:"block",variant:"overline"},"Contest holder")}),c.a.createElement(S.a,{className:r.content},c.a.createElement(Oe.a,null,c.a.createElement(ke.a,{className:r.listItem,disableGutters:!0,divider:!0},c.a.createElement(f.a,{variant:"subtitle2"},"Deadline"),c.a.createElement(f.a,{variant:"h6"},g()(a.deadline).format("DD MMM YYYY"))),c.a.createElement(ke.a,{className:r.listItem,disableGutters:!0,divider:!0},c.a.createElement(f.a,{variant:"subtitle2"},"Per Project"),c.a.createElement(f.a,{variant:"h6"},a.price," ",a.currency)),c.a.createElement(ke.a,{className:r.listItem,disableGutters:!0,divider:!0},c.a.createElement(f.a,{variant:"subtitle2"},"Main Technology"),c.a.createElement(p.f,{color:a.tags[0].color},a.tags[0].text)),c.a.createElement(ke.a,{className:r.listItem,disableGutters:!0,divider:!0},c.a.createElement(f.a,{variant:"subtitle2"},"Last Update"),c.a.createElement(f.a,{variant:"h6"},g()(a.updated_at).format("DD MMM YYYY"))))))},Ce=t(922),Te=Object(i.a)((function(){return{root:{},header:{paddingBottom:0},content:{paddingTop:0},actions:{backgroundColor:s.a.grey[50]},manageButton:{width:"100%"}}})),Ie=function(e){var a=e.members,t=e.className,n=Object(v.a)(e,["members","className"]),r=Te();return c.a.createElement(N.a,Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(ye.a,{className:r.header,title:"Project members",titleTypographyProps:{variant:"overline"}}),c.a.createElement(S.a,{className:r.content},c.a.createElement(Oe.a,null,a.map((function(e){return c.a.createElement(ke.a,{disableGutters:!0,key:e.id},c.a.createElement(Ce.a,null,c.a.createElement(j.a,{alt:"Author",className:r.avatar,src:e.avatar},Object(de.a)(e.name))),c.a.createElement(q.a,{primary:e.name,primaryTypographyProps:{variant:"h6"},secondary:e.bio}))})))),c.a.createElement(H.a,{className:r.actions},c.a.createElement(F.a,{className:r.manageButton},"Manage users")))},Be=Object(i.a)((function(e){return{root:{},deliverables:{marginTop:e.spacing(3)},members:{marginTop:e.spacing(3)}}})),Me=function(e){var a=e.project,t=e.className,n=Object(v.a)(e,["project","className"]),r=Be();return c.a.createElement(D.a,Object.assign({},n,{className:Object(E.a)(r.root,t),container:!0,spacing:3}),c.a.createElement(D.a,{item:!0,lg:8,xl:9,xs:12},c.a.createElement(he,{brief:a.brief}),c.a.createElement(Ne,{className:r.deliverables})),c.a.createElement(D.a,{item:!0,lg:4,xl:3,xs:12},c.a.createElement(xe,{project:a}),c.a.createElement(Ie,{className:r.members,members:a.members})))},_e=Object(i.a)((function(e){return{root:{},media:{height:125},content:{paddingTop:0},avatarContainer:{marginTop:-32,display:"flex",justifyContent:"center"},avatar:{height:64,width:64,borderWidth:4,borderStyle:"solid",borderColor:e.palette.white},divider:{margin:e.spacing(2,0)}}})),ze=function(e){var a=e.subscriber,t=e.className,n=Object(v.a)(e,["subscriber","className"]),r=_e();return c.a.createElement(N.a,Object.assign({},n,{className:Object(E.a)(r.root,t)}),c.a.createElement(G.a,{className:r.media,image:a.cover}),c.a.createElement(S.a,{className:r.content},c.a.createElement("div",{className:r.avatarContainer},c.a.createElement(j.a,{alt:"Subscriber",className:r.avatar,component:h.a,src:a.avatar,to:"/profile/1/timeline"})),c.a.createElement(f.a,{align:"center",component:h.a,display:"block",to:"/profile/1/timeline",variant:"h6"},a.name),c.a.createElement(f.a,{align:"center",variant:"body2"},a.common_connections," connections in common"),c.a.createElement(u.a,{className:r.divider}),c.a.createElement(D.a,{container:!0,spacing:1},a.labels.map((function(e){return c.a.createElement(D.a,{item:!0,key:e},c.a.createElement(p.f,{variant:"outlined"},e))})))))},Ae=Object(i.a)((function(){return{root:{}}})),Pe=function(e){var a=e.subscribers,t=e.className,n=Object(v.a)(e,["subscribers","className"]),r=Ae();return c.a.createElement(D.a,Object.assign({},n,{className:Object(E.a)(r.root,t),container:!0,spacing:3}),a.map((function(e){return c.a.createElement(D.a,{item:!0,key:e.id,lg:4,xs:12},c.a.createElement(ze,{subscriber:e}))})))},Se=Object(i.a)((function(e){return{root:{width:e.breakpoints.values.lg,maxWidth:"100%",margin:"0 auto",padding:e.spacing(3)},tabs:{marginTop:e.spacing(3)},divider:{backgroundColor:s.a.grey[300]},alert:{marginTop:e.spacing(3)},content:{marginTop:e.spacing(3)}}})),De=function(e){var a=e.match,t=e.history,i=Se(),s=a.params,v=s.id,b=s.tab,g=Object(r.useState)(!0),E=Object(n.a)(g,2),f=E[0],h=E[1],j=Object(r.useState)(null),N=Object(n.a)(j,2),y=N[0],O=N[1];Object(r.useEffect)((function(){var e=!0;return d.a.get("/api/projects/1").then((function(a){e&&O(a.data.project)})),function(){e=!1}}),[]);var k=[{value:"overview",label:"Overview"},{value:"files",label:"Files"},{value:"activity",label:"Activity"},{value:"subscribers",label:"Subscribers"}];return b?k.find((function(e){return e.value===b}))?y?c.a.createElement(p.j,{className:i.root,title:"Project Details"},c.a.createElement(Ee,{project:y}),c.a.createElement(o.a,{className:i.tabs,onChange:function(e,a){t.push(a)},scrollButtons:"auto",value:b,variant:"scrollable"},k.map((function(e){return c.a.createElement(m.a,{key:e.value,label:e.label,value:e.value})}))),c.a.createElement(u.a,{className:i.divider}),f&&c.a.createElement(p.b,{className:i.alert,message:"The content holder has extended the deadline! Good luck",onClose:function(){h(!1)}}),c.a.createElement("div",{className:i.content},"overview"===b&&c.a.createElement(Me,{project:y}),"files"===b&&c.a.createElement(ie,{files:y.files}),"activity"===b&&c.a.createElement(P,{activities:y.activities}),"subscribers"===b&&c.a.createElement(Pe,{subscribers:y.subscribers}))):null:c.a.createElement(l.a,{to:"/errors/error-404"}):c.a.createElement(l.a,{to:"/projects/".concat(v,"/overview")})};t.d(a,"default",(function(){return De}))},964:function(e,a,t){"use strict";var n=t(12);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),c=(0,n(t(13)).default)(r.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");a.default=c}}]);
//# sourceMappingURL=5.538a6b96.chunk.js.map