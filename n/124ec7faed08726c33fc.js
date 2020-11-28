(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{226:function(t,e,r){"use strict";r.r(e);r(5),r(3),r(4),r(2),r(47),r(27),r(28),r(1),r(48);var n=r(17),o=(r(9),r(0)),c=r(49);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var k,m={components:{},validate:function(t){var e=t.params;return/^\d+$/.test(e.page)},data:function(){return{transProps:{name:"block-list"},fields:[{key:"block.height",label:"Height"},{key:"block.timestamp",label:"Timestamp",class:"d-none d-sm-table-cell",formatter:this.$formatter.catapultTime},{key:"block.signerPublicKey",label:"Harvester",tdClass:"text-monospace",class:"d-none d-lg-table-cell"},{key:"meta.transactionsCount",label:"#TXes"},{key:"meta.statementsCount",label:"Stmts"},{key:"meta.totalFee",label:"Fees"},{key:"block.feeMultiplier",label:"Fee mul"}],storeSubscription:null,blocks:[]}},computed:h({},Object(c.b)({url:"url",getBlocksCache:"blocksPage/getBlocks",hasBlocksCache:"blocksPage/has",chainHeight:"blockHeight"}),{newBtnDisabled:function(){return 0===this.chainHeight||Math.ceil(this.chainHeight/100)===Number(this.$route.params.page)},oldBtnDisabled:function(){return"1"===this.$route.params.page},blockItems:function(){return this.blocks.map((function(b){return h({},b,{hash:b.meta.hash})}))}}),mounted:function(){var t=this;document.addEventListener("keyup",this.arrowKeyHandler),this.render(),this.storeSubscription=this.$store.subscribe((function(e,r){if("addBlock"===e.type){var n=e.payload.block;t.$store.commit("blocksPage/addBlocks",{pageNumber:Math.ceil(Number(n.block.height)/100),blocks:[e.payload.block]})}}))},destroyed:function(){document.removeEventListener("keyup",this.arrowKeyHandler),this.storeSubscription&&this.storeSubscription()},methods:{newBtnClick:function(){if(!this.newBtnDisabled){var t=Number(this.$route.params.page)+1;this.$router.push("/blocks/".concat(t))}},oldBtnClick:function(){if(!this.oldBtnDisabled){var t=Number(this.$route.params.page)-1;this.$router.push("/blocks/".concat(t))}},arrowKeyHandler:function(t){"ArrowLeft"===t.key?this.newBtnClick():"ArrowRight"===t.key&&this.oldBtnClick()},render:(k=Object(n.a)(regeneratorRuntime.mark((function t(){var e,r,n,data,o,c,l,h,k,m,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=Number(this.$route.params.page),this.hasBlocksCache(e)){t.next=12;break}return(r=new URLSearchParams).append("pageSize",100..toString()),r.append("order","asc"),r.append("pageNumber",e.toString()),t.next=9,this.$cachedApi.$get("/blocks?".concat(r.toString()));case 9:n=t.sent,data=n.data,this.$store.commit("blocksPage/setBlocks",{blocks:data,pageNumber:e});case 12:for(o=this.getBlocksCache(e),this.blocks=o,c=this.calcMissBlocks(e,o,this.chainHeight),l=c.fromHeight,h=c.toHeight,k=[],m=l;m<=h;m++)k.push(this.$cachedApi.$get("/blocks/".concat(m)));return t.next=19,Promise.all(k);case 19:d=t.sent,this.$store.commit("blocksPage/addBlocks",{blocks:d,pageNumber:e});case 21:case"end":return t.stop()}}),t,this)}))),function(){return k.apply(this,arguments)}),calcMissBlocks:function(t,e,r){var n=Math.ceil(r/100),o=e.reduce((function(t,e){return t<Number(e.block.height)?Number(e.block.height):t}),0);if(t===n){if(o!==r)return{fromHeight:o,toHeight:r}}else if(e.length<100)return{fromHeight:o,toHeight:100*t};return{fromHeight:0,toHeight:-1}},clear:function(){this.blocks=[]},floor100:function(t){return 100*Math.floor((Number(t)-1)/100)+1}}},d=r(41),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"mb-2"},[r("b-button",{attrs:{disabled:t.newBtnDisabled,size:"sm"},on:{click:t.newBtnClick}},[t._v("New (Left Key)")]),t._v(" "),r("b-button",{attrs:{disabled:t.oldBtnDisabled,size:"sm"},on:{click:t.oldBtnClick}},[t._v("Old (Right Key)")])],1),t._v(" "),r("b-table",{attrs:{"show-empty":"",hover:"",small:"","primary-key":"hash",fields:t.fields,items:t.blockItems,"tbody-transition-props":t.transProps},scopedSlots:t._u([{key:"cell(block.height)",fn:function(data){return[r("a",{attrs:{href:t.url+"/blocks/"+data.value,target:"_blank"}},[t._v(t._s(data.value))])]}},{key:"cell(block.signerPublicKey)",fn:function(data){return[r("a",{attrs:{href:t.url+"/accounts/"+data.value,target:"_blank"}},[t._v(t._s(data.value))])]}},{key:"cell(meta.transactionsCount)",fn:function(data){return[r("a",{attrs:{href:t.url+"/transactions/confirmed?height="+data.item.block.height,target:"_blank"}},[t._v("\n        "+t._s(data.value)+"\n      ")])]}},{key:"cell(meta.totalFee)",fn:function(data){return[r("span",[t._v(t._s(t.$formatter.intPart(data.value)))]),t._v("."),r("span",{staticClass:"small"},[t._v(t._s(t.$formatter.fracPart(data.value)))])]}},{key:"cell(meta.statementsCount)",fn:function(data){return[r("a",{attrs:{href:t.url+"/block/"+data.item.block.height+"/receipts",target:"_blank"}},[t._v("\n        "+t._s(data.value)+"\n      ")])]}},{key:"empty",fn:function(t){return[r("div",{staticClass:"text-center"},[r("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1)]}}])}),t._v(" "),r("b-button",{attrs:{disabled:t.newBtnDisabled},on:{click:t.newBtnClick}},[t._v("New")]),t._v(" "),r("b-button",{attrs:{disabled:t.oldBtnDisabled},on:{click:t.oldBtnClick}},[t._v("Old")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);