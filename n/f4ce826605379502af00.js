(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{215:function(t,e,r){(function(e){t.exports=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(object,t){return Object.prototype.hasOwnProperty.call(object,t)},e.p="",e(e.s=3)}([function(t,e,r){"use strict";e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(window.google&&window.google.charts?Promise.resolve(window.google.charts):(c||(c=new Promise((function(t){var script=document.createElement("script");script.type="text/javascript",script.onload=function(){return t(window.google.charts)},script.src=o,document.body.appendChild(script)}))),c)).then((function(r){if("object"!==(void 0===e?"undefined":n(e)))throw new Error("Google Charts loader: settings must be an object");var o=t+"_"+JSON.stringify(e,Object.keys(e).sort());if(l.has(o))return l.get(o);var c=new Promise((function(n){r.load(t,e),r.setOnLoadCallback((function(){return n(window.google)}))}));return l.set(o,c),c}))};var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o="https://www.gstatic.com/charts/loader.js",c=null,l=new Map},function(t,e,r){var n=r(5)(r(4),r(6),null,null);t.exports=n.exports},function(t,e){t.exports=function(t,e,r){function n(){var d=Date.now()-f;d<e&&d>=0?o=setTimeout(n,e-d):(o=null,r||(v=t.apply(l,c),l=c=null))}var o,c,l,f,v;null==e&&(e=100);var d=function(){l=this,c=arguments,f=Date.now();var d=r&&!o;return o||(o=setTimeout(n,e)),d&&(v=t.apply(l,c),l=c=null),v};return d.clear=function(){o&&(clearTimeout(o),o=null)},d.flush=function(){o&&(v=t.apply(l,c),l=c=null,clearTimeout(o),o=null)},d}},function(t,r,n){"use strict";function o(t){t.component("GChart",f.a)}Object.defineProperty(r,"__esModule",{value:!0}),r.install=o;var c=n(0),l=n(1),f=n.n(l);n.d(r,"loadGoogleCharts",(function(){return c.a})),n.d(r,"GChart",(function(){return f.a}));var v={version:"0.3.2",install:o};r.default=v;var d=null;"undefined"!=typeof window?d=window.Vue:void 0!==e&&(d=e.Vue),d&&d.use(v)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),o=r(2),c=r.n(o),l=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],r=!0,n=!1,o=void 0;try{for(var c,l=t[Symbol.iterator]();!(r=(c=l.next()).done)&&(e.push(c.value),!i||e.length!==i);r=!0);}catch(t){n=!0,o=t}finally{try{!r&&l.return&&l.return()}finally{if(n)throw o}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v=null;e.default={name:"GChart",props:{type:{type:String},data:{type:[Array,Object],default:function(){return[]}},options:{type:Object,default:function(){return{}}},version:{type:String,default:"current"},settings:{type:Object,default:function(){return{packages:["corechart","table"]}}},events:{type:Object},createChart:{type:Function},resizeDebounce:{type:Number,default:200}},data:function(){return{chartObject:null}},watch:{data:{deep:!0,handler:function(){this.drawChart()}},options:{deep:!0,handler:function(){this.drawChart()}},type:function(t){this.createChartObject(),this.drawChart()}},mounted:function(){var t=this;r.i(n.a)(this.version,this.settings).then((function(e){v=e;var r=t.createChartObject();t.$emit("ready",r,e),t.drawChart()})),this.resizeDebounce>0&&window.addEventListener("resize",c()(this.drawChart,this.resizeDebounce))},beforeDestroy:function(){this.chartObject&&this.chartObject.clearChart()},methods:{drawChart:function(){if(v&&this.chartObject){var data=this.getValidChartData();data&&this.chartObject.draw(data,this.options)}},getValidChartData:function(){return this.data instanceof v.visualization.DataTable?this.data:this.data instanceof v.visualization.DataView?this.data:Array.isArray(this.data)?v.visualization.arrayToDataTable(this.data):null!==this.data&&"object"===f(this.data)?new v.visualization.DataTable(this.data):null},createChartObject:function(){var t=this.createChart||function(t,e,r){if(!r)throw new Error("please, provide chart type property");return new e.visualization[r](t)};return this.chartObject=t(this.$refs.chart,v,this.type),this.attachListeners(),this.chartObject},attachListeners:function(){var t=this;this.events&&Object.entries(this.events).forEach((function(e){var r=l(e,2),n=r[0],o=r[1];v.visualization.events.addListener(t.chartObject,n,o)}))}}}},function(t,e){t.exports=function(t,e,r,n){var o,c=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(o=t,c=t.default);var f="function"==typeof c?c.options:c;if(e&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns),r&&(f._scopeId=r),n){var v=f.computed||(f.computed={});Object.keys(n).forEach((function(t){var e=n[t];v[t]=function(){return e}}))}return{esModule:o,exports:c,options:f}}},function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart"})},staticRenderFns:[]}}])}).call(this,r(29))},216:function(t,e,r){"use strict";var n=r(215);r.o(n,"GChart")&&r.d(e,"GChart",(function(){return n.GChart}))},218:function(t,e,r){var content=r(222);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(43).default)("635441da",content,!0,{sourceMap:!1})},221:function(t,e,r){"use strict";var n=r(218);r.n(n).a},222:function(t,e,r){(e=r(42)(!1)).push([t.i,"a[data-v-e3c26cc0]{color:#35495e;text-decoration:underline}a[data-v-e3c26cc0]:hover{text-decoration:none}",""]),t.exports=e},223:function(t,e,r){"use strict";r.r(e);r(5),r(3),r(2),r(1),r(4);var n=r(0),o=r(49),c={name:"StorageCardList",props:{storage:{type:Object,required:!0}},data:function(){return{topCardList:[{key:"numBlocks",title:"Height",icon:"cube"},{key:"numTransactions",title:"Transactions",icon:"scroll"},{key:"numAccounts",title:"Accounts",icon:"user"}]}}},l=r(41),f=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row no-gutters"},t._l(t.topCardList,(function(data){return r("div",{key:data.key,staticClass:"col col-12 col-sm-6 col-md-4"},[r("div",{staticClass:"card m-3"},[r("div",{staticClass:"card-body d-flex justify-content-between align-items-center"},[r("font-awesome-icon",{staticStyle:{"font-size":"3rem"},attrs:{icon:data.icon}}),t._v(" "),r("div",{staticClass:"text-right"},[r("div",{staticClass:"text-muted"},[t._v(t._s(data.title))]),t._v(" "),t.storage[data.key]?r("div",{staticClass:"h4"},[t._v("\n            "+t._s(t.storage[data.key])+"\n          ")]):r("div",[r("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)])],1)])])})),0)}),[],!1,null,null,null).exports;r(9),r(62);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={name:"TopHarvestersTable",props:{blocks:{type:Array,required:!0},url:{type:String,required:!0}},data:function(){return{transProps:{name:"block-list"},harvesterTableFields:[{key:"rank",label:"Rank",class:"text-center"},{key:"signerPublicKey",label:"Harvester",tdClass:"text-monospace small align-middle"},{key:"count",label:"Blocks"},{key:"fee",label:"Fees earned"}]}},computed:{signerToCount:function(){if(0===this.blocks.length)return{};var t={},e=!0,r=!1,n=void 0;try{for(var o,c=this.blocks[Symbol.iterator]();!(e=(o=c.next()).done);e=!0){var b=o.value;void 0===t[b.block.signerPublicKey]?t[b.block.signerPublicKey]={harvestCount:1,totalFee:Number(b.meta.totalFee)}:(t[b.block.signerPublicKey].harvestCount+=1,t[b.block.signerPublicKey].totalFee+=Number(b.meta.totalFee))}}catch(t){r=!0,n=t}finally{try{e||null==c.return||c.return()}finally{if(r)throw n}}return t},harvesterData:function(){var t=this;return Object.keys(this.signerToCount).map((function(e){return{signerPublicKey:e,count:t.signerToCount[e].harvestCount,fee:t.signerToCount[e].totalFee}})).sort((function(t,e){var a=t.count,b=e.count;return a<b?1:a>b?-1:0})).map((function(t,e){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({rank:e+1},t)}))}}},h=Object(l.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-table",{staticClass:"mt-3",attrs:{"show-empty":"",striped:"",hover:"",small:"",responsive:"",items:t.harvesterData,fields:t.harvesterTableFields,"tbody-transition-props":t.transProps},scopedSlots:t._u([{key:"cell(fee)",fn:function(data){return[r("span",[t._v(t._s(t.$formatter.intPart(data.value)))]),t._v("."),r("span",{staticClass:"small"},[t._v(t._s(t.$formatter.fracPart(data.value)))])]}},{key:"cell(signerPublicKey)",fn:function(data){return[r("a",{attrs:{href:t.url+"/accounts/"+data.value,target:"_blank"}},[t._v(t._s(data.value))])]}},{key:"empty",fn:function(t){return[r("div",{staticClass:"text-center"},[r("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)]}}])})}),[],!1,null,null,null).exports,y=r(14),m={name:"HarvesterPiChart",components:{GChart:r(216).GChart},props:{blocks:{type:Array,required:!0}},computed:{harvesterPiChartOptions:function(){return{title:"Harvester (last ".concat(this.blocks.length," blocks)")}},signerToCount:function(){if(0===this.blocks.length)return{};var t={},e=!0,r=!1,n=void 0;try{for(var o,c=this.blocks[Symbol.iterator]();!(e=(o=c.next()).done);e=!0){var b=o.value;void 0===t[b.block.signerPublicKey]?t[b.block.signerPublicKey]={harvestCount:1,totalFee:Number(b.meta.totalFee)}:(t[b.block.signerPublicKey].harvestCount+=1,t[b.block.signerPublicKey].totalFee+=Number(b.meta.totalFee))}}catch(t){r=!0,n=t}finally{try{e||null==c.return||c.return()}finally{if(r)throw n}}return t},harvesterPiChartData:function(){var t=this,q=Object.keys(this.signerToCount).map((function(e){return[e,t.signerToCount[e].harvestCount]})).sort((function(t,e){return e[1]-t[1]}));return[["Signer","Count"]].concat(Object(y.a)(q))}}},_=Object(l.a)(m,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.blocks.length>0?e("GChart",{attrs:{settings:{packages:["corechart"]},type:"PieChart",data:this.harvesterPiChartData,options:this.harvesterPiChartOptions}}):e("div",{staticClass:"p-3"},[e("h6",[this._v("Harvester Pi Chart")]),this._v(" "),e("div",{staticClass:"text-center"},[e("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)])],1)}),[],!1,null,null,null).exports,C={name:"LatestBlocksTable",props:{blocks:{type:Array,required:!0},url:{type:String,required:!0}},computed:{latestBlocksData:function(){var t=this;return this.blocks.slice(0,10).map((function(b){return{hash:b.meta.hash,timeDiff:t.$formatter.catapultTimeDiff(b.block.timestamp),height:b.block.height,signerPublicKey:b.block.signerPublicKey,transactionsCount:b.meta.transactionsCount,totalFee:Number(b.meta.totalFee)}}))}}},w=Object(l.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[0===t.blocks.length?r("div",[r("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1):r("transition-group",{attrs:{name:"block-list",tag:"div"}},t._l(t.latestBlocksData,(function(b){return r("div",{key:b.hash,staticClass:"d-flex align-items-center border-bottom my-2 py-2"},[r("div",{staticClass:"p-2 mr-3"},[r("a",{attrs:{href:t.url+"/blocks/"+b.height,target:"_blank"}},[t._v(t._s(b.height))])]),t._v(" "),r("div",{staticClass:"text-truncate mx-3 flex-fill"},[r("div",{staticClass:"text-truncate"},[t._v("\n          Harvester\n          "),r("span",{staticClass:"text-monospace"},[r("a",{attrs:{href:t.url+"/accounts/"+b.signerPublicKey,target:"_blank"}},[t._v(t._s(b.signerPublicKey))])])]),t._v(" "),r("div",[r("a",{attrs:{href:t.url+"/transactions/confirmed?height="+b.height,target:"_blank"}},[t._v("\n            "+t._s(b.transactionsCount))]),t._v(" "),r("small",[t._v("transactions")])])]),t._v(" "),r("div",{staticClass:"ml-3 text-right"},[r("div",{staticClass:"text-nowrap"},[r("span",[t._v(t._s(t.$formatter.intPart(b.totalFee)))]),t._v("."),r("span",{staticClass:"small"},[t._v(t._s(t.$formatter.fracPart(b.totalFee)))]),t._v(" "),r("small",[t._v("total fee")])]),t._v(" "),r("div",{staticClass:"text-muted text-nowrap",staticStyle:{"font-size":"80%"}},[t._v("\n          "+t._s(t.$formatter.timePass(b.timeDiff))+" ago\n        ")])])])})),0)],1)}),[],!1,null,null,null).exports,k={name:"LatestTransactionsTable",props:{transactions:{type:Array,required:!0},url:{type:String,required:!0}},computed:{latestTransactionsData:function(){return this.transactions.map((function(t){return{hash:t.meta.hash,signerPublicKey:t.transaction.signerPublicKey,maxFee:t.transaction.maxFee,height:t.meta.height,type:t.transaction.type}}))}}};function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var j={components:{LatestTransactionsTable:Object(l.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[0===t.latestTransactionsData.length?r("div",[t._v("\n    None\n  ")]):t._e(),t._v(" "),r("transition-group",{attrs:{name:"transaction-list",tag:"div"}},t._l(t.latestTransactionsData,(function(e){return r("div",{key:e.hash,staticClass:"d-flex align-items-center border-bottom my-2 py-2"},[r("div",{staticClass:"text-truncate text-monospace mr-3",staticStyle:{"max-width":"4rem"}},[r("a",{attrs:{href:t.url+"/transactions/confirmed/"+e.hash,target:"_blank"}},[t._v("\n          "+t._s(e.hash)+"\n        ")])]),t._v(" "),r("div",{staticClass:"text-truncate mx-3 flex-fill"},[r("div",{staticClass:"text-truncate",staticStyle:{"max-width":"10rem"}},[t._v("\n          Sender\n          "),r("span",{staticClass:"text-monospace"},[r("a",{attrs:{href:t.url+"/accounts/"+e.signerPublicKey,target:"_blank"}},[t._v(t._s(e.signerPublicKey))])])]),t._v(" "),r("div",[t._v("\n          "+t._s(t.$formatter.txType(e.type))+"\n          "),r("small",[t._v("Transaction")])])]),t._v(" "),r("div",{staticClass:"ml-3 text-right"},[r("div",{staticClass:"text-nowrap"},[r("span",[t._v(t._s(t.$formatter.intPart(e.maxFee)))]),t._v("."),r("span",{staticClass:"small"},[t._v(t._s(t.$formatter.fracPart(e.maxFee)))]),t._v(" "),r("small",[t._v("max fee")])]),t._v(" "),r("div",{staticClass:"text-muted text-nowrap",staticStyle:{"font-size":"80%"}},[r("a",{attrs:{href:t.url+"/blocks/"+e.height,target:"_blank"}},[t._v(t._s(e.height))]),t._v("\n          height\n        ")])])])})),0)],1)}),[],!1,null,null,null).exports,HarvesterPiChart:_,TopHarvestersTable:h,StorageCardList:f,LatestBlocksTable:w},data:function(){return{now:Date.now()}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)(["url","storage","blocks","transactions"])),mounted:function(){var t=this;this.secondsInterval=setInterval((function(){t.now=Date.now()}),1e3)},destroyed:function(){clearInterval(this.secondsInterval)}},x=(r(221),Object(l.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("StorageCardList",{attrs:{storage:t.storage}}),t._v(" "),r("div",{staticClass:"row no-gutters"},[r("div",{staticClass:"col col-12 col-md-8"},[r("div",{staticClass:"card m-3"},[r("div",{staticClass:"card-body"},[r("h5",[t._v("\n            Top Harvesters "),r("small",[t._v("(last "+t._s(t.blocks.length)+" blocks)")])]),t._v(" "),r("TopHarvestersTable",{attrs:{blocks:t.blocks,url:t.url}})],1)])]),t._v(" "),r("div",{staticClass:"col col-12 col-md-4"},[r("div",{staticClass:"card m-3 p-1"},[r("HarvesterPiChart",{attrs:{blocks:t.blocks}})],1)])]),t._v(" "),r("div",{staticClass:"row no-gutters"},[r("div",{staticClass:"col col-12 col-md-6"},[r("div",{staticClass:"card m-3"},[r("div",{staticClass:"card-body"},[r("div",{staticClass:"d-flex justify-content-between"},[r("h5",[t._v("\n              Latest blocks\n            ")]),t._v(" "),r("small",[r("nuxt-link",{attrs:{to:"/blocks/1"}},[t._v("see more")])],1)]),t._v(" "),r("LatestBlocksTable",{attrs:{blocks:t.blocks,url:t.url}})],1)])]),t._v(" "),r("div",{staticClass:"col col-12 col-md-6"},[r("div",{staticClass:"card m-3"},[r("div",{staticClass:"card-body"},[r("h5",[t._v("\n            Latest transactions\n          ")]),t._v(" "),r("LatestTransactionsTable",{attrs:{transactions:t.transactions,url:t.url}})],1)])])])],1)}),[],!1,null,"e3c26cc0",null));e.default=x.exports}}]);