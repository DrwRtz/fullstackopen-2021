(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),o=t(3),a=t(1),i=t(0),u=function(e){var n=e.person,t=e.deletePerson;return Object(i.jsxs)("p",{children:[n.name," ",n.number," ",Object(i.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},d=function(e){return Object(i.jsxs)("div",{children:["filter shown with",Object(i.jsx)("input",{onChange:e.handleFilter,value:e.filter})]})},l=function(e){return Object(i.jsxs)("form",{onSubmit:e.addPerson,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{onChange:e.handleName,value:e.newName})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{onChange:e.handleNumber,value:e.newNumber})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.message;if(null===n)return null;return Object(i.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},b=function(e){var n=e.message;if(null===n)return null;return Object(i.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},f=t(4),j=t.n(f),h="/api/persons",m={getAll:function(){return j.a.get(h).then((function(e){return e.data}))},create:function(e){return j.a.post(h,e).then((function(e){return e.data}))},remove:function(e){return j.a.delete("".concat(h,"/").concat(e))},replace:function(e,n){return j.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))}},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),f=Object(o.a)(c,2),j=f[0],h=f[1],O=Object(a.useState)(""),p=Object(o.a)(O,2),v=p[0],g=p[1],x=Object(a.useState)(""),w=Object(o.a)(x,2),S=w[0],y=w[1],k=Object(a.useState)(null),N=Object(o.a)(k,2),C=N[0],P=N[1],A=Object(a.useState)(null),B=Object(o.a)(A,2),T=B[0],z=B[1];Object(a.useEffect)((function(){m.getAll().then((function(e){return r(e)}))}),[]);var D=function(e){var n=t.find((function(n){return n.id===e})),c="Delete ".concat(n.name," ?");window.confirm(c)&&m.remove(e).then((function(n){r(t.filter((function(n){return n.id!==e})))}))},E=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(s,{message:C}),Object(i.jsx)(b,{message:T}),Object(i.jsx)(d,{handleFilter:function(e){y(e.target.value)},filter:S}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(l,{addPerson:function(e){e.preventDefault();var n={name:j,number:v};if(t.find((function(e){return e.name===j}))){var c="".concat(j," is already added to phonebook, replace the old number with a new one?");if(window.confirm(c)){var o=t.find((function(e){return e.name===j}));m.replace(o.id,n).then((function(e){r(t.map((function(n){return n.id!==o.id?n:e}))),h(""),g(""),P("Changed ".concat(e.name)),setTimeout((function(){P(null)}),5e3)})).catch((function(e){h(""),g(""),z("Information of ".concat(o.name," has already been removed from server")),setTimeout((function(){z(null)}),5e3),r(t.filter((function(e){return e.id!==o.id})))}))}}else m.create(n).then((function(e){r(t.concat(e)),h(""),g(""),P("Added ".concat(e.name)),setTimeout((function(){P(null)}),5e3)})).catch((function(e){return z(e.response.data)}))},handleName:function(e){h(e.target.value)},handleNumber:function(e){g(e.target.value)},newName:j,newNumber:v}),Object(i.jsx)("h2",{children:"Numbers"}),E.map((function(e){return Object(i.jsx)(u,{person:e,deletePerson:D},e.name)}))]})};c.a.render(Object(i.jsx)(O,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.eef99cad.chunk.js.map