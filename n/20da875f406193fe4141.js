(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{215:function(t,e,n){(function(e){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(object,t){return Object.prototype.hasOwnProperty.call(object,t)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(window.google&&window.google.charts?Promise.resolve(window.google.charts):(c||(c=new Promise((function(t){var script=document.createElement("script");script.type="text/javascript",script.onload=function(){return t(window.google.charts)},script.src=o,document.body.appendChild(script)}))),c)).then((function(n){if("object"!==(void 0===e?"undefined":r(e)))throw new Error("Google Charts loader: settings must be an object");var o=t+"_"+JSON.stringify(e,Object.keys(e).sort());if(l.has(o))return l.get(o);var c=new Promise((function(r){n.load(t,e),n.setOnLoadCallback((function(){return r(window.google)}))}));return l.set(o,c),c}))};var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o="https://www.gstatic.com/charts/loader.js",c=null,l=new Map},function(t,e,n){var r=n(5)(n(4),n(6),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n){function r(){var d=Date.now()-h;d<e&&d>=0?o=setTimeout(r,e-d):(o=null,n||(f=t.apply(l,c),l=c=null))}var o,c,l,h,f;null==e&&(e=100);var d=function(){l=this,c=arguments,h=Date.now();var d=n&&!o;return o||(o=setTimeout(r,e)),d&&(f=t.apply(l,c),l=c=null),f};return d.clear=function(){o&&(clearTimeout(o),o=null)},d.flush=function(){o&&(f=t.apply(l,c),l=c=null,clearTimeout(o),o=null)},d}},function(t,n,r){"use strict";function o(t){t.component("GChart",h.a)}Object.defineProperty(n,"__esModule",{value:!0}),n.install=o;var c=r(0),l=r(1),h=r.n(l);r.d(n,"loadGoogleCharts",(function(){return c.a})),r.d(n,"GChart",(function(){return h.a}));var f={version:"0.3.2",install:o};n.default=f;var d=null;"undefined"!=typeof window?d=window.Vue:void 0!==e&&(d=e.Vue),d&&d.use(f)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(2),c=n.n(o),l=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],n=!0,r=!1,o=void 0;try{for(var c,l=t[Symbol.iterator]();!(n=(c=l.next()).done)&&(e.push(c.value),!i||e.length!==i);n=!0);}catch(t){r=!0,o=t}finally{try{!n&&l.return&&l.return()}finally{if(r)throw o}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f=null;e.default={name:"GChart",props:{type:{type:String},data:{type:[Array,Object],default:function(){return[]}},options:{type:Object,default:function(){return{}}},version:{type:String,default:"current"},settings:{type:Object,default:function(){return{packages:["corechart","table"]}}},events:{type:Object},createChart:{type:Function},resizeDebounce:{type:Number,default:200}},data:function(){return{chartObject:null}},watch:{data:{deep:!0,handler:function(){this.drawChart()}},options:{deep:!0,handler:function(){this.drawChart()}},type:function(t){this.createChartObject(),this.drawChart()}},mounted:function(){var t=this;n.i(r.a)(this.version,this.settings).then((function(e){f=e;var n=t.createChartObject();t.$emit("ready",n,e),t.drawChart()})),this.resizeDebounce>0&&window.addEventListener("resize",c()(this.drawChart,this.resizeDebounce))},beforeDestroy:function(){this.chartObject&&this.chartObject.clearChart()},methods:{drawChart:function(){if(f&&this.chartObject){var data=this.getValidChartData();data&&this.chartObject.draw(data,this.options)}},getValidChartData:function(){return this.data instanceof f.visualization.DataTable?this.data:this.data instanceof f.visualization.DataView?this.data:Array.isArray(this.data)?f.visualization.arrayToDataTable(this.data):null!==this.data&&"object"===h(this.data)?new f.visualization.DataTable(this.data):null},createChartObject:function(){var t=this.createChart||function(t,e,n){if(!n)throw new Error("please, provide chart type property");return new e.visualization[n](t)};return this.chartObject=t(this.$refs.chart,f,this.type),this.attachListeners(),this.chartObject},attachListeners:function(){var t=this;this.events&&Object.entries(this.events).forEach((function(e){var n=l(e,2),r=n[0],o=n[1];f.visualization.events.addListener(t.chartObject,r,o)}))}}}},function(t,e){t.exports=function(t,e,n,r){var o,c=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(o=t,c=t.default);var h="function"==typeof c?c.options:c;if(e&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns),n&&(h._scopeId=n),r){var f=h.computed||(h.computed={});Object.keys(r).forEach((function(t){var e=r[t];f[t]=function(){return e}}))}return{esModule:o,exports:c,options:h}}},function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart"})},staticRenderFns:[]}}])}).call(this,n(29))},216:function(t,e,n){"use strict";var r=n(215);n.o(r,"GChart")&&n.d(e,"GChart",(function(){return r.GChart}))},217:function(t,e,n){var content=n(220);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("127e95aa",content,!0,{sourceMap:!1})},219:function(t,e,n){"use strict";var r=n(217);n.n(r).a},220:function(t,e,n){(e=n(42)(!1)).push([t.i,".card{margin-top:1rem}",""]),t.exports=e},225:function(t,e,n){"use strict";n.r(e);n(5),n(3),n(2),n(1),n(4);var r=n(14),o=(n(9),n(0)),c=n(49);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h={components:{GChart:n(216).GChart},data:function(){return{blockTimeChartOptions:{title:"Block time differences (last 100 blocks)"},difficultyChartOptions:{title:"Block difficulty (last 100 blocks)"},transactionsChartOptions:{title:"Transactions per block (last 100 blocks)"},transactionFeeChartOptions:{title:"Fee per block (last 100 blocks)"},transactionFeeMulChartOptions:{title:"Fee multiplier per block (last 100 blocks)"}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["url","storage","blocks"]),{blocksForChart:function(){return this.blocks.map((function(b){return{timestamp:Number(b.block.timestamp),height:b.block.height,transactionsCount:b.meta.transactionsCount,totalFee:Number(b.meta.totalFee),feeMultiplier:b.block.feeMultiplier,difficulty:Number(b.block.difficulty)/1e14}})).sort((function(t,e){return Number(t.height)-Number(e.height)}))},blockTimeChartData:function(){var q=this.blocksForChart.map((function(b,t,e){return 0===t?[b.height,null]:[b.height,(b.timestamp-e[t-1].timestamp)/1e3]}));return[["Height","Time Difference (in seconds)"]].concat(Object(r.a)(q))},difficultyChartData:function(){var q=this.blocksForChart.map((function(b){return[b.height,b.difficulty]})).slice(1);return[["Height","Block difficulty"]].concat(Object(r.a)(q))},transactionsChartData:function(){var q=this.blocksForChart.map((function(b){return[b.height,b.transactionsCount]}));return[["Height","Number of transactions"]].concat(Object(r.a)(q))},transactionFeeChartData:function(){var q=this.blocksForChart.map((function(b){return[b.height,b.totalFee/1e6]}));return[["Height","Fee"]].concat(Object(r.a)(q))},transactionFeeMulChartData:function(){var q=this.blocksForChart.map((function(b){return[b.height,b.feeMultiplier]}));return[["Height","Fee multiplier"]].concat(Object(r.a)(q))}})},f=(n(219),n(41)),component=Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-body"},t._l(t.storage,(function(e,r){return n("div",{key:r,staticClass:"d-flex justify-content-between",staticStyle:{"max-width":"300px"}},[n("span",[t._v(t._s(r))]),t._v(" "),n("span",[t._v(t._s(e))])])})),0)]),t._v(" "),n("div",{staticClass:"card p-1",staticStyle:{height:"400px"}},[t.blocks.length>0?n("GChart",{staticStyle:{height:"100%",width:"100%"},attrs:{settings:{packages:["corechart"]},type:"LineChart",data:t.blockTimeChartData,options:t.blockTimeChartOptions}}):n("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)],1),t._v(" "),n("div",{staticClass:"card p-1",staticStyle:{height:"400px"}},[t.blocks.length>0?n("GChart",{staticStyle:{height:"100%",width:"100%"},attrs:{settings:{packages:["corechart"]},type:"LineChart",data:t.difficultyChartData,options:t.difficultyChartOptions}}):n("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)],1),t._v(" "),n("div",{staticClass:"card p-1",staticStyle:{height:"400px"}},[t.blocks.length>0?n("GChart",{staticStyle:{height:"100%",width:"100%"},attrs:{settings:{packages:["corechart"]},type:"LineChart",data:t.transactionsChartData,options:t.transactionsChartOptions}}):n("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)],1),t._v(" "),n("div",{staticClass:"card p-1",staticStyle:{height:"400px"}},[t.blocks.length>0?n("GChart",{staticStyle:{height:"100%",width:"100%"},attrs:{settings:{packages:["corechart"]},type:"LineChart",data:t.transactionFeeChartData,options:t.transactionFeeChartOptions}}):n("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)],1),t._v(" "),n("div",{staticClass:"card p-1",staticStyle:{height:"400px"}},[t.blocks.length>0?n("GChart",{staticStyle:{height:"100%",width:"100%"},attrs:{settings:{packages:["corechart"]},type:"LineChart",data:t.transactionFeeMulChartData,options:t.transactionFeeMulChartOptions}}):n("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)],1)])}),[],!1,null,null,null);e.default=component.exports}}]);