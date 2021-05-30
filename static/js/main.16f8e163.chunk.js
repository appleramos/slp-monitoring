(this["webpackJsonpslp-monitoring"]=this["webpackJsonpslp-monitoring"]||[]).push([[0],{177:function(e,t,a){},178:function(e,t,a){},274:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(26),i=a.n(s),c=(a(177),a(178),a(179),a(131)),l=a.n(c),o=a(154),d=a(49),u=a(24),j=a(132),b=a.n(j),h=a(54),f=a.n(h),m=a(278),O=a(165),p=a(34),x=a(284),g=a(170),v=a(90),y=a(277),k=a(282),w=a(281),C=a(116),P=a(280),S=a(7),I=Object(n.createContext)(),L=function(e){var t=JSON.parse(window.localStorage.getItem("players"))||{value:[]},a=window.localStorage.getItem("slpRatePeso")||1,r=Object(n.useState)(t),s=Object(d.a)(r,2),i=s[0],c=s[1],l=Object(n.useState)([]),o=Object(d.a)(l,2),u=o[0],j=o[1],b=Object(n.useState)({}),h=Object(d.a)(b,2),f=h[0],m=h[1],O=Object(n.useState)(a),p=Object(d.a)(O,2),x=p[0],g=p[1];return Object(S.jsx)(I.Provider,{value:{players:i,setPlayers:c,playersData:u,setPlayersData:j,selectedPlayer:f,setSelectedPlayer:m,slpRatePeso:x,setSlpRatePeso:g},children:e.children})},D=function(e){var t,a=e.onSubmit,r=e.onCancel,s=e.visible,i=Object(n.useContext)(I).selectedPlayer,c=parseInt(Object(u.get)(i,"isko_share",0)),l=Object(n.useState)(100-c),o=Object(d.a)(l,2),j=o[0],b=o[1],h=Object(n.useState)("Isko"===Object(u.get)(i,"type","Manager")),f=Object(d.a)(h,2),m=f[0],p=f[1],x=y.a.useForm(),g=Object(d.a)(x,1)[0],L=function(e){var t=window.localStorage.getItem("players"),n=JSON.parse(t)||{value:[]},r=e.name,s=e.address,c=e.type,l=e.isko_share;if(!i.name&&Object(u.filter)(n.value,(function(t){return t.address===e.address})).length>0)return void O.b.warning("The address you entered is already in the list");var o=""===l?0:parseInt(l);a({key:Date.now(),name:r||"",address:s||"",type:c,isko_share:o}),g.resetFields()};return Object(S.jsx)(k.a,{title:i.name?"Edit Player":"Add a Player",visible:s,onOk:function(){L(g.getFieldsValue())},onCancel:function(){r()},closable:!1,children:Object(S.jsxs)(y.a,{onFinish:L,name:"axie-user-form",form:g,onFieldsChange:function(){var e=g.getFieldValue(),t=e.isko_share,a=e.type;p("Isko"===a);var n=""===t?0:parseInt(t),r=100-n;b(n>100?0:r)},children:[Object(S.jsx)(y.a.Item,{name:"name",rules:[{required:!0,message:"Please input player name"}],initialValue:i.name,children:Object(S.jsx)(w.a,{placeholder:"Name *"})}),Object(S.jsx)(y.a.Item,{name:"address",rules:[{required:!0,message:"Please input player address"}],initialValue:i.address,children:Object(S.jsx)(w.a,{placeholder:"Etherium address *"})}),Object(S.jsx)(y.a.Item,{label:"Type",name:"type",initialValue:Object(u.get)(i,"type","Manager"),children:Object(S.jsxs)(C.a.Group,{buttonStyle:"solid",children:[Object(S.jsx)(C.a.Button,{value:"Isko",children:"Isko"}),Object(S.jsx)(C.a.Button,{value:"Manager",children:"Manager"})]})}),m&&Object(S.jsx)(y.a.Item,(t={label:"Isko's share",name:"isko_share",rules:[{required:!0,message:"Please input isko's share"}],initialValue:Object(u.get)(i,"isko_share",60),help:"Manager's share is ".concat(j,"%")},Object(v.a)(t,"rules",[{required:m,message:"Isko's share is required"}]),Object(v.a)(t,"children",Object(S.jsx)(P.a,{placeholder:"Isko's share",min:0,max:100,formatter:function(e){return"".concat(e,"%")},parser:function(e){return e.replace("%","")},disabled:!m})),t))]})})},_=a(44),R=a.n(_),E=a(279),M=a(283),A=a(285),F=a(276),T=a(169),N=a(286),B=a(171),V=E.a.Paragraph,J=function(e){var t=e.loading,a=e.onDelete,r=e.onEdit,s=Object(n.useContext)(I),i=s.players,c=s.playersData,l=function(e,t,a){var n=Object(u.filter)(c,(function(t){return t.id.toLowerCase()===e.toLowerCase()}));if(n.length>0){var r=n[0][t];switch(a){case"number":return R()(r).format("0,0");case"date":return f()(new Date(1e3*r)).format("LLL");case"decimal":return R()(r).format("0,0.0");default:return r}}return"-"},o=function(e){var t=e.substring(0,6),a=e.substring(e.length-5,e.length);return Object(S.jsx)(V,{copyable:{text:e.toLowerCase()},children:"".concat(t,"...").concat(a)})},d=function(e){r(e)},j=function(e){a(e)},b=[{title:"",render:function(e,t){return Object(S.jsxs)("div",{children:[Object(S.jsx)(A.a,{title:"Are you sure you want to delete ".concat(t.name,"?"),icon:Object(S.jsx)(T.a,{style:{color:"red"}}),onConfirm:function(){return j(t)},children:Object(S.jsx)(p.a,{type:"link",danger:!0,icon:Object(S.jsx)(N.a,{})})}),Object(S.jsx)(p.a,{type:"link",icon:Object(S.jsx)(B.a,{}),onClick:function(){return d(t)}})]})},width:5},{title:"Name",dataIndex:"name",key:"name",width:10,render:function(e,t){var a=t.type,n=t.isko_share,r=a||"Manager",s="Manager"===r?"gold":"cyan";return Object(S.jsxs)("div",{children:[Object(S.jsxs)("div",{children:[Object(S.jsx)("span",{style:{fontWeight:"bold",marginRight:"10px"},children:e}),Object(S.jsx)(M.a,{color:s,children:r})]}),Object(S.jsx)("div",{children:o(t.address)}),"Isko"===r&&"".concat(n," / ").concat(100-n)]})}},{title:"Claimed SLP",dataIndex:"address",key:"address",width:50,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"claimable","number")})}},{title:"Locked SLP",dataIndex:"address",key:"address",width:50,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"lockedSlp","number")})}},{title:"Total SLP",dataIndex:"address",key:"address",width:50,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"total","number")})}},{title:"Daily Avg",dataIndex:"address",key:"address",width:50,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"dailyAvg","decimal")})}},{title:"Last Claim Date",dataIndex:"address",key:"address",width:150,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"lastClaimedAt","date")})}},{title:"Next Claim Date",dataIndex:"address",key:"address",width:150,render:function(e,t){return Object(S.jsx)("span",{children:l(t.address,"nextClaimDate","none")})}}];return Object(S.jsx)(F.a,{loading:t,dataSource:i.value,columns:b,scroll:{x:1300}})},q=a(161),W=E.a.Title,z=DataView=function(e){var t=e.value,a=e.title,n=e.style,r=void 0===n?{}:n;return Object(S.jsxs)("div",{style:Object(q.a)({},r),children:[Object(S.jsx)("div",{style:{marginRight:"30px",color:"gray"},children:a}),Object(S.jsx)(W,{level:4,children:t})]})},G=function(){var e=Object(n.useContext)(I),t=e.players,a=e.playersData,r=e.slpRatePeso;return Object(S.jsxs)("div",{style:{display:"flex",marginBottom:"15px",flexWrap:"wrap"},children:[Object(S.jsx)(z,{title:"Manager's Total Earnings",value:function(){var e=0;return t.value.forEach((function(t){var n=t.address,s=t.type,i=t.isko_share,c=Object(u.filter)(a,(function(e){return e.id.toLowerCase()===n.toLowerCase()}));if(c.length>0)if("Isko"===s){var l=c[0].total*(i/100);e+=l*r}else e+=c[0].total*r})),"PHP ".concat(R()(e).format("0,0.00"))}(),style:{marginRight:"20px"}}),Object(S.jsx)(z,{title:"Ikos' Total Earnings",value:function(){var e=0;return Object(u.filter)(t.value,{type:"Isko"}).forEach((function(t){var n=t.isko_share,s=t.address,i=Object(u.filter)(a,(function(e){return e.id.toLowerCase()===s.toLowerCase()}));if(i.length>0){var c=i[0].total*(n/100);e+=c*r}})),"PHP ".concat(R()(e).format("0,0.00"))}()})]})},H=(E.a.Paragraph,function(){var e=Object(n.useContext)(I),t=e.players,a=e.playersData,r=e.slpRatePeso,s=function(e,t,n){var r=Object(u.filter)(a,(function(t){return t.id.toLowerCase()===e.toLowerCase()}));if(r.length>0){var s=r[0][t];switch(n){case"number":return R()(s).format("0,0");case"date":return f()(new Date(1e3*s)).format("LLL");case"decimal":return R()(s).format("0.0");default:return s}}return"-"},i=function(e){if(a){var t=Object(u.filter)(a,(function(t){return t.id.toLowerCase()===e.address.toLowerCase()}))[0];if(t&&e){var n=Object(u.get)(e,"isko_share",0),s=0;return 0!==n&&(s=t.total*(n/100)*r),R()(s).format("0,0.00")}}return"-"},c=function(e){if(a){var t=Object(u.filter)(a,(function(t){return t.id.toLowerCase()===e.address.toLowerCase()}))[0];if(t&&e){var n=Object(u.get)(e,"isko_share",0),s=100-n,i=0;return 0!==n&&(i=t.total*(s/100)*r),R()(i).format("0,0.00")}}return"-"},l=[{title:"Name",dataIndex:"name",key:"name",width:10,render:function(e,t){var a=t.type,n=t.isko_share,r=a||"Manager",s="Manager"===r?"gold":"cyan";return Object(S.jsxs)("div",{children:[Object(S.jsxs)("div",{children:[Object(S.jsx)("span",{style:{fontWeight:"bold",marginRight:"10px"},children:e}),Object(S.jsx)(M.a,{color:s,children:r})]}),"Isko"===r&&"".concat(n," / ").concat(100-n)]})}},{title:"SLP Earned",dataIndex:"name",key:"name",width:10,render:function(e,t){return Object(S.jsx)("span",{children:s(t.address,"total","number")})}},{title:"Isko's Share (Peso)",dataIndex:"name",key:"name",width:10,render:function(e,t){return Object(S.jsx)("span",{children:i(t)})}},{title:"Manager's Share (Peso)",dataIndex:"name",key:"name",width:10,render:function(e,t){return Object(S.jsx)("span",{children:c(t)})}}];return Object(S.jsx)(F.a,{scroll:{x:700},dataSource:t.value,columns:l})}),K=E.a.Paragraph,Y=E.a.Title,Q=function(){var e=Object(n.useContext)(I),t=e.slpRatePeso,a=e.setSlpRatePeso;return Object(S.jsx)("div",{style:{marginBottom:"10px"},children:Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{style:{marginRight:"30px",color:"gray"},children:"SLP Rate in Peso"}),Object(S.jsx)(Y,{level:4,children:Object(S.jsx)(K,{editable:{onChange:function(e){""!==e&&(a(parseFloat(e)),window.localStorage.setItem("slpRatePeso",parseInt(e)))}},children:R()(t).format("0,0.00")})})]})})},U=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)(Q,{}),Object(S.jsx)(G,{}),Object(S.jsx)(H,{})]})},X=m.a.TabPane;var Z=function(){var e=Object(n.useContext)(I),t=e.players,a=e.setPlayers,r=e.playersData,s=e.setPlayersData,i=e.selectedPlayer,c=e.setSelectedPlayer,j=Object(n.useState)(!0),h=Object(d.a)(j,2),v=h[0],y=h[1],k=Object(n.useState)(!1),w=Object(d.a)(k,2),C=w[0],P=w[1];Object(n.useEffect)((function(){L()}),[]);var L=function(){var e=[];function a(){return(a=Object(o.a)(l.a.mark((function a(n){var r,i,c,o,d,u;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,b()("https://lunacia.skymavis.com/game-api/clients/".concat(n.address,"/items/1"));case 3:(r=a.sent).data&&(i=r.data,c=i.client_id,o=i.total,d=i.claimable_total,u=i.last_claimed_item_at,e.push({id:c,total:o||0,claimable:d||0,lockedSlp:o-d,lastClaimedAt:u,dailyAvg:_(u,o),nextClaimDate:R(u)})),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),e.push({id:"invalid-user-".concat(n.address),total:0,claimable:0,lockedSlp:0,lastClaimedAt:f()(),dailyAvg:0,nextClaimDate:f()()});case 10:s(e),e.length===t.value.length&&y(!1);case 12:case"end":return a.stop()}}),a,null,[[0,7]])})))).apply(this,arguments)}t.value.length<1?y(!1):t.value.forEach((function(e){!function(e){a.apply(this,arguments)}(e)}))},_=function(e,t){var a=f()(new Date(1e3*e)),n=f()().diff(a,"days");return n<1?t:t/n},R=function(e){return f()(new Date(1e3*e)).add(14,"days").format("LLL")};return Object(S.jsxs)("div",{className:"SLP_Monitoring_App",style:{padding:"15px 25px",margin:"auto"},children:[Object(S.jsxs)("div",{style:{fontSize:"1.5em",fontWeight:"bold",marginBottom:"10px",display:"flex"},children:[Object(S.jsx)("div",{style:{flexGrow:"3"},children:"SLP Tracker"}),Object(S.jsx)(p.a,{size:"large",shape:"circle",icon:Object(S.jsx)(x.a,{}),style:{marginRight:"20px"},onClick:function(){y(!0),s([]),L()}}),Object(S.jsx)(p.a,{size:"large",type:"primary",shape:"round",icon:Object(S.jsx)(g.a,{}),onClick:function(){P(!0),c({})},children:"Player"})]}),C&&Object(S.jsx)(D,{onSubmit:function(e){y(!0);var n=Object(u.cloneDeep)(r),c=Object(u.cloneDeep)(t);b()("https://lunacia.skymavis.com/game-api/clients/".concat(e.address,"/items/1")).then((function(t){if(t.data){var r=t.data,l=r.client_id,o=r.total,d=r.claimable_total,j=r.last_claimed_item_at,b={id:l,total:o||0,claimable:d||0,lockedSlp:o-d,lastClaimedAt:j,dailyAvg:_(j,o),nextClaimDate:R(j)};if(i.name){var h=Object(u.findIndex)(n,(function(e){return e.id.toLowerCase()===i.address.toLowerCase()})),f=Object(u.findIndex)(c.value,(function(e){return e.address.toLowerCase()===i.address.toLowerCase()}));-1!==h&&-1!==f&&(n.splice(h,1,b),c.value.splice(f,1,e))}else n.push(b),c.value.push(e)}y(!1),s(n),window.localStorage.setItem("players",JSON.stringify(c)),a(c)})).catch((function(e){O.b.error("You entered an invalid etherium address"),y(!1)})),P(!1)},visible:!0,onCancel:function(){P(!1)},selectedPlayer:i}),Object(S.jsxs)(m.a,{defaultActiveKey:"1",children:[Object(S.jsx)(X,{tab:"Monitoring",children:Object(S.jsx)(J,{loading:v,onDelete:function(e){var n=Object(u.filter)(t.value,(function(t){return t.key!==e.key})),i=Object(u.filter)(r,(function(t){return t.id!==e.address}));a({value:n}),s(i),window.localStorage.setItem("players",JSON.stringify({value:n})),O.b.success("Successfully deleted ".concat(e.name))},onEdit:function(e){P(!0),c(e)}})},"1"),Object(S.jsx)(X,{tab:"Estimate Earnings",children:Object(S.jsx)(U,{})},"2")]})]})};var $=function(){return Object(S.jsx)(L,{children:Object(S.jsx)(Z,{})})},ee=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,287)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),s(e),i(e)}))};i.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)($,{})}),document.getElementById("root")),ee()}},[[274,1,2]]]);
//# sourceMappingURL=main.16f8e163.chunk.js.map