(function(t){function a(a){for(var r,c,i=a[0],s=a[1],l=a[2],u=0,d=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&d.push(o[c][0]),o[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);h&&h(a);while(d.length)d.shift()();return n.push.apply(n,l||[]),e()}function e(){for(var t,a=0;a<n.length;a++){for(var e=n[a],r=!0,c=1;c<e.length;c++){var s=e[c];0!==o[s]&&(r=!1)}r&&(n.splice(a--,1),t=i(i.s=e[0]))}return t}var r={},o={app:0},n=[];function c(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"c79d9ae1"}[t]+".js"}function i(a){if(r[a])return r[a].exports;var e=r[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.e=function(t){var a=[],e=o[t];if(0!==e)if(e)a.push(e[2]);else{var r=new Promise((function(a,r){e=o[t]=[a,r]}));a.push(e[2]=r);var n,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=c(t);var l=new Error;n=function(a){s.onerror=s.onload=null,clearTimeout(u);var e=o[t];if(0!==e){if(e){var r=a&&("load"===a.type?"missing":a.type),n=a&&a.target&&a.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",l.name="ChunkLoadError",l.type=r,l.request=n,e[1](l)}o[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:s})}),12e4);s.onerror=s.onload=n,document.head.appendChild(s)}return Promise.all(a)},i.m=t,i.c=r,i.d=function(t,a,e){i.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,a){if(1&a&&(t=i(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var r in t)i.d(e,r,function(a){return t[a]}.bind(null,r));return e},i.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(a,"a",a),a},i.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},i.p="",i.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=a,s=s.slice();for(var u=0;u<s.length;u++)a(s[u]);var h=l;n.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var r=e("2b0e"),o=e("bc3a"),n=e.n(o),c=e("2106"),i=e.n(c),s=e("9062"),l=e.n(s),u=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},h=[],d=(e("5c0b"),e("2877")),p={},f=Object(d["a"])(p,u,h,!1,null,null,null),v=f.exports,g=(e("d3b7"),e("8c4f")),_=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home container"},[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("h2",[t._v("加入購物車")]),e("div",{staticClass:"row row-cols-1 row-cols-md-3 g-4"},t._l(t.data,(function(a){return e("div",{key:a.id,staticClass:"card",staticStyle:{width:"18rem"}},[e("img",{staticClass:"card-img-top",attrs:{src:a.image,alt:"..."}}),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[t._v(t._s(a.title))]),e("a",{staticClass:"btn btn-primary",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.addtoCarts(a)}}},[t._v("加入購物車")])])])})),0),e("hr"),e("h2",[t._v("購物車(localStorage)")]),e("table",{staticClass:"table"},[t._m(0),e("tbody",t._l(t.carData,(function(a){return e("tr",{key:a.id},[e("td",[t._v(" "+t._s(a.product_id)+" ")]),e("td",[t._v(" "+t._s(a.name)+" ")]),e("td",[t._v(" "+t._s(a.qty)+" ")]),e("td",[t._v(" "+t._s(a.origin_price)+" ")]),e("td",[t._v(" "+t._s(a.price)+" ")])])})),0)]),e("h5",[t._v("localStorage 金額："+t._s(t.localStoragePrice))]),t._m(1),e("div",[e("a",{staticClass:"btn btn-primary",attrs:{href:"http://"},on:{click:function(a){return a.preventDefault(),t.getLocalStorage(a)}}},[t._v("取得 LocalStorage 金額")]),t._v(" | "),e("a",{staticClass:"btn btn-primary",attrs:{href:"http://"},on:{click:function(a){return a.preventDefault(),t.editLocalStorage(a)}}},[t._v("修改 LocalStorage 金額")])]),e("hr"),e("h5",[t._v("販售金額："+t._s(t.getPrice))]),e("div",[e("a",{staticClass:"btn btn-primary",attrs:{href:"http://"},on:{click:function(a){return a.preventDefault(),t.postCarts(a)}}},[t._v("送出購物車內容")]),t._v(" | "),e("a",{staticClass:"btn btn-primary",attrs:{href:"http://"},on:{click:function(a){return a.preventDefault(),t.deleteLocalStorage(a)}}},[t._v("清空購物車(LocalStorage)")])]),e("hr"),e("h2",[t._v("購物車(遠端結果)")]),e("table",{staticClass:"table"},[t._m(2),e("tbody",t._l(t.carts,(function(a){return e("tr",{key:a.id},[e("td",[t._v(" "+t._s(a.id)+" ")]),e("td",[t._v(" "+t._s(a.product.title)+" ")]),e("td",[t._v(" "+t._s(a.qty)+" ")])])})),0)]),e("h5",[t._v("final_total: "+t._s(t.cartsFinalTotal))]),e("h5",[t._v("total: "+t._s(t.cartsTotal))]),e("a",{staticClass:"btn btn-primary",attrs:{href:"http://"},on:{click:function(a){return a.preventDefault(),t.deleteCarts(a)}}},[t._v("清空購物車")])],1)},m=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("ID")]),e("th",[t._v("名稱")]),e("th",[t._v("數量")]),e("th",[t._v("原始金額")]),e("th",[t._v("販售金額")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("small",[t._v(" 以下功能將會同時將產品金額與 localStorage 金額通通改成 0。 "),e("br"),t._v("該區塊功能主要是說明，就算修改 localStorage 金額是不影響送出後的訂單金額，其主要原因實際計算金額還是在後端。 ")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("ID")]),e("th",[t._v("名稱")]),e("th",[t._v("數量")])])}],b=(e("99af"),e("4160"),e("c975"),e("d81d"),e("a434"),e("a9e3"),e("3ca3"),e("159b"),e("ddb0"),e("96cf"),e("1da1")),y={name:"Home",data:function(){return{isLoading:!1,data:[],carts:[],carData:JSON.parse(localStorage.getItem("carData"))||[],localStoragePrice:0,cartsFinalTotal:0,cartsTotal:0}},methods:{getProducts:function(){var t=this;this.isLoading=!0,this.axios.get("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/products/all")).then((function(a){t.data=a.data.products,t.isLoading=!1}))},getCarts:function(){var t=this;this.isLoading=!0,this.cartsTotal=0,this.cartsFinalTotal=0,this.axios.get("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart")).then((function(a){t.carts=a.data.data.carts,t.carts.forEach((function(a){t.cartsTotal+=Number(a.total),t.cartsFinalTotal+=Number(a.final_total)})),t.isLoading=!1}))},addtoCarts:function(t){var a=this,e=[];if(this.carData.forEach((function(t){e.push(t.product_id)})),-1===e.indexOf(t.id)){var r={product_id:t.id,qty:1,name:t.title,origin_price:t.origin_price,price:t.price};this.carData.push(r),localStorage.setItem("carData",JSON.stringify(this.carData))}else{var o={};this.carData.forEach((function(e,r){if(e.product_id===t.id){var n=e.qty;o={product_id:t.id,qty:n+=1,name:t.title,origin_price:t.origin_price,price:t.price},a.carData.splice(r,1)}})),this.carData.push(o),localStorage.setItem("carData",JSON.stringify(this.carData))}},postCarts:function(){var t=this;this.isLoading=!0;var a=[];this.axios.get("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart")).then((function(t){var e=t.data.data.carts;e.forEach((function(t){a.push(t.id)}))})).then(Object(b["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(a.map((function(a){return console.log("準備清空購物車"),t.axios["delete"]("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart/").concat(a)).then((function(){console.log("購物車已經清空")}))})));case 2:case"end":return e.stop()}}),e)})))).then(Object(b["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Promise.all(t.carData.map((function(a){var e={product_id:a.product_id,qty:a.qty};return t.axios.post("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart"),{data:e}).then((function(){console.log("加入成功。")}))})));case 2:case"end":return a.stop()}}),a)})))).then((function(){t.carData=[],localStorage.removeItem("carData"),t.isLoading=!1,t.getCarts()}))},deleteCarts:function(){var t=this;this.isLoading=!0;var a=[];this.axios.get("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart")).then((function(t){var e=t.data.data.carts;e.forEach((function(t){a.push(t.id)}))})).then((function(){a.forEach((function(a){t.axios["delete"]("".concat("https://vue-course-api.hexschool.io","/api/").concat("hexschool","/cart/").concat(a)).then((function(){t.isLoading=!1,t.getCarts()}))})),t.cartsFinalTotal=0,t.cartsTotal=0})).then((function(){t.isLoading=!1}))},deleteLocalStorage:function(){localStorage.removeItem("carData"),this.carData=JSON.parse(localStorage.getItem("carData"))||[],this.localStoragePrice=0},getLocalStorage:function(){var t=this;this.localStoragePrice=0;var a=JSON.parse(localStorage.getItem("carData"))||[];a.forEach((function(a){t.localStoragePrice+=Number(a.price*a.qty)}))},editLocalStorage:function(){var t=JSON.parse(localStorage.getItem("carData"))||[];t.forEach((function(t){t.price=0,t.origin_price=0})),this.carData=t,localStorage.setItem("carData",JSON.stringify(this.carData)),this.getLocalStorage()}},computed:{getPrice:function(){if(0===this.carData.length)return 0;if(this.carData.length>1){var t=0;return this.carData.forEach((function(a){t+=Number(a.price*a.qty)})),t}return this.carData[0].price*this.carData[0].qty}},created:function(){this.getProducts(),this.getCarts()}},S=y,D=Object(d["a"])(S,_,m,!1,null,null,null),x=D.exports;r["a"].use(g["a"]);var w=[{path:"/",name:"Home",component:x},{path:"/about",name:"About",component:function(){return e.e("about").then(e.bind(null,"f820"))}}],C=new g["a"]({routes:w}),L=C,O=e("2f62");r["a"].use(O["a"]);var P=new O["a"].Store({state:{},mutations:{},actions:{},modules:{}});e("e40d");r["a"].component("Loading",l.a),r["a"].use(i.a,n.a),r["a"].config.productionTip=!1,new r["a"]({router:L,store:P,render:function(t){return t(v)}}).$mount("#app")},"5c0b":function(t,a,e){"use strict";e("9c0c")},"9c0c":function(t,a,e){}});
//# sourceMappingURL=app.31106795.js.map