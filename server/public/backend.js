(()=>{"use strict";var e={n:r=>{var t=r&&r.__esModule?()=>r.default:()=>r;return e.d(t,{a:t}),t},d:(r,t)=>{for(var n in t)e.o(t,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:t[n]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)};const r=require("express");var t=e.n(r);const n=require("express-graphql"),o=require("mongoose");var a=e.n(o);const s=(0,require("graphql").buildSchema)("\n  type Todo {\n    id:ID!\n    title: String!\n    text: String!\n    done: Boolean!\n    deadline: String\n  }\n\n  type Sort {\n    id: ID!\n    order: Int!,\n    parameter: String!\n  }\n\n  type User {\n    id:ID!\n    email: String!\n    password: String!\n    sort: Sort!\n    todos: [Todo!]\n  }\n\n  type Query {\n    todo(userId: ID!, todoId: ID!): Todo\n    allTodos(userId: ID!): [Todo]\n    getSort(userId: ID!): Sort!\n    login(email: String!, password: String!) : User\n  }\n\n  type Mutation {\n    addTodo(userId: ID!, title: String!, text: String, deadline: String): Todo!\n    deleteTodo(userId: ID!, todoId: ID!): Todo\n    editTodo(userId: ID!, todoId: ID!, title: String!, text: String!, deadline: String): Todo!\n    doneTodo(userId: ID!, todoId: ID!): Todo! \n    setSort(userId: ID!, order: Int, parameter: String): Sort!\n    unchekAllChecked(userId: ID!): Query\n    deleteAllChecked(userId: ID!): Query\n    registerUser(email: String!, password: String!) : User\n  }\n"),u=require("@babel/runtime/helpers/defineProperty");var d=e.n(u);const i=require("@babel/runtime/helpers/asyncToGenerator");var c=e.n(i);const p=require("@babel/runtime/regenerator");var l=e.n(p),f=new o.Schema({title:String,text:String,done:{type:Boolean,default:!1},deadline:Date});const y=a().model("Todo",f);var I=new o.Schema({order:{type:Number,default:0},parameter:{type:String,default:"done"}});a().model("Sort",I);var m=new o.Schema({email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},sort:{type:I,default:{order:0,parameter:"done"}},todos:{type:[f],default:[]}});const v=a().model("User",m);function g(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?g(Object(t),!0).forEach((function(r){d()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var w,b,x,S,k,D,T,O,j,q,B,P;const U={allTodos:(P=c()(l().mark((function e(r){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,e.next=3,v.findById(t);case 3:return n=e.sent,e.abrupt("return",n.todos||[]);case 5:case"end":return e.stop()}}),e)}))),function(e){return P.apply(this,arguments)}),todo:(B=c()(l().mark((function e(r){var t,n,o,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.todoId,e.next=3,v.findById(t);case 3:return o=e.sent,a=o.todos.id(n),e.next=7,a;case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)}))),function(e){return B.apply(this,arguments)}),addTodo:(q=c()(l().mark((function e(r){var t,n,o,a,s,u;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.title,o=r.text,a=r.deadline,e.next=3,v.findById(t);case 3:return s=e.sent,u=new y({title:n,text:o||"",deadline:a}),s.todos.push(u),e.next=8,s.save();case 8:return e.abrupt("return",u);case 9:case"end":return e.stop()}}),e)}))),function(e){return q.apply(this,arguments)}),deleteTodo:(j=c()(l().mark((function e(r){var t,n,o,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.todoId,e.next=3,v.findById(t);case 3:return o=e.sent,(a=o.todos.id(n)).remove(),e.next=8,o.save();case 8:return e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)}))),function(e){return j.apply(this,arguments)}),editTodo:(O=c()(l().mark((function e(r){var t,n,o,a,s,u,d;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.todoId,o=r.title,a=r.text,s=r.deadline,e.next=3,v.findById(t);case 3:return u=e.sent,(d=u.todos.id(n)).set(h(h({},d),{},{title:o,text:a,deadline:s})),e.next=8,u.save();case 8:return e.abrupt("return",d);case 9:case"end":return e.stop()}}),e)}))),function(e){return O.apply(this,arguments)}),doneTodo:(T=c()(l().mark((function e(r){var t,n,o,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.todoId,e.next=3,v.findById(t);case 3:return o=e.sent,(a=o.todos.id(n)).set({done:!a.done}),e.next=8,o.save();case 8:return e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)}))),function(e){return T.apply(this,arguments)}),getSort:(D=c()(l().mark((function e(r){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,e.next=3,v.findById(t);case 3:return n=e.sent,e.abrupt("return",n.sort);case 5:case"end":return e.stop()}}),e)}))),function(e){return D.apply(this,arguments)}),setSort:(k=c()(l().mark((function e(r){var t,n,o,a,s;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,n=r.order,o=r.parameter,e.next=3,v.findById(t);case 3:return a=e.sent,(s=a.sort).set(h(h({},n&&{order:n}),o&&{parameter:o})),a.save(),e.abrupt("return",s);case 8:case"end":return e.stop()}}),e)}))),function(e){return k.apply(this,arguments)}),unchekAllChecked:(S=c()(l().mark((function e(r){var t,n,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,e.next=3,v.findById(t);case 3:return n=e.sent,o=n.todos.map((function(e){return e.done&&(e.done=!1),e})),n.todos=o,e.next=8,n.save();case 8:return e.abrupt("return",o);case 9:case"end":return e.stop()}}),e)}))),function(e){return S.apply(this,arguments)}),deleteAllChecked:(x=c()(l().mark((function e(r){var t,n,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,e.next=3,v.findById(t);case 3:return n=e.sent,o=n.todos.filter((function(e){return!e.done})),n.todos=o,e.next=8,n.save();case 8:return e.abrupt("return",o);case 9:case"end":return e.stop()}}),e)}))),function(e){return x.apply(this,arguments)}),registerUser:(b=c()(l().mark((function e(r){var t,n,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.email,n=r.password,e.next=3,v.findOne({email:t});case 3:if(!e.sent){e.next=6;break}return e.abrupt("return",new Error("Пользователь уже существует!"));case 6:return o=new v({email:t,password:n}),e.next=9,o.save();case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)}))),function(e){return b.apply(this,arguments)}),login:(w=c()(l().mark((function e(r){var t,n,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.email,n=r.password,e.next=3,v.findOne({email:t});case 3:if(o=e.sent){e.next=6;break}return e.abrupt("return",new Error("Пользователь не найден!"));case 6:if(o.password!==n){e.next=8;break}return e.abrupt("return",o);case 8:return e.abrupt("return",new Error("Неверный пароль пользователя!"));case 9:case"end":return e.stop()}}),e)}))),function(e){return w.apply(this,arguments)})};a().connect("mongodb+srv://artemkons:123@cluster0.9mla7.mongodb.net/todos_db?retryWrites=true&w=majority",{useNewUrlParser:!0,useUnifiedTopology:!0,useFindAndModify:!1});var C=a().connection;C.on("error",(function(e){return console.log("Connection error ".concat(e))})),C.once("open",(function(){return console.log("Connected to DB!")}));var E=t()();E.use("/api",(0,n.graphqlHTTP)({schema:s,rootValue:U,graphiql:!0})),E.listen(3e3,(function(){console.log("Example app listening at http://localhost")}))})();