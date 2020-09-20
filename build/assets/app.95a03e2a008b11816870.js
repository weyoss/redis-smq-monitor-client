(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e){e.exports=JSON.parse('{"name":"redis-smq-monitor","description":"A monitoring tool for RedisSMQ message queue","version":"1.1.0","main":"./build/index.js","author":"Weyoss <weyoss@protonmail.com>","license":"MIT","keywords":["redis","message queue","message","queue","job queue","jobs","redis-smq"],"repository":{"type":"git","url":"https://github.com/weyoss/redis-smq-monitor.git"},"homepage":"https://github.com/weyoss/redis-smq-monitor","bugs":{"url":"https://github.com/weyoss/redis-smq-monitor/issues"},"types":"./src/server/types/index.d.ts","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","start:dev":"run-p start:server start:webpack","start:server":"TS_NODE_PROJECT=\'tsconfig-server.json\' nodemon src/client/tools/ws-server-launcher.ts","start:webpack":"webpack-dev-server --progress --color --open","prebuild":"npm run build:clean","build":"run-p build:client build:server","build:clean":"rimraf ./build && mkdir build","build:client":"webpack -p --progress --colors","build:server":"tsc --project tsconfig-server.json"},"devDependencies":{"@babel/core":"7.11.6","@types/finalhandler":"1.1.0","@types/ioredis":"4.17.4","@types/node":"13.13.21","@types/react":"16.9.49","@types/react-dom":"16.9.8","@types/react-redux":"7.1.9","@types/react-router":"5.1.8","@types/react-router-dom":"5.1.5","@types/recharts":"1.8.15","@types/redis":"2.8.27","@types/redux-immutable-state-invariant":"2.1.1","@types/serve-static":"1.13.5","@types/socket.io":"2.1.11","@types/socket.io-client":"1.4.33","babel-loader":"8.1.0","bootstrap":"4.5.2","clean-webpack-plugin":"3.0.0","css-loader":"3.6.0","file-loader":"6.1.0","html-loader":"1.3.0","html-webpack-plugin":"4.4.1","mini-css-extract-plugin":"0.9.0","nodemon":"2.0.4","npm-run-all":"4.1.5","prettier":"2.1.2","react":"16.13.1","react-dom":"16.13.1","react-hot-loader":"4.12.21","react-redux":"7.2.1","react-router":"5.2.0","react-router-dom":"5.2.0","recharts":"1.8.5","redux":"4.0.5","redux-immutable-state-invariant":"2.1.0","redux-thunk":"2.3.0","rimraf":"3.0.2","socket.io-client":"2.3.0","style-loader":"1.2.1","ts-loader":"6.2.2","ts-node":"9.0.0","typescript":"3.9.7","url-loader":"4.1.0","webpack":"4.44.1","webpack-cli":"3.3.12","webpack-dev-server":"3.11.0"},"dependencies":{"finalhandler":"1.1.2","ioredis":"4.17.3","redis":"3.0.2","serve-static":"1.14.1","socket.io":"2.3.0"}}')},221:function(e,t,n){},399:function(e,t,n){},401:function(e,t,n){},403:function(e,t,n){},427:function(e,t){},430:function(e,t,n){"use strict";n.r(t);var a,r=n(1),l=n.n(r),c=n(33),o=n(16),s=n(38),u=n(169),i=n.n(u),m=n(170);!function(e){e.UPDATE_STATS="UPDATE_STATS"}(a||(a={}));var d=function(){return(d=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},p={rates:{input:0,processing:0,acknowledged:0,unacknowledged:0},queues:{}},E=function(e,t){if(void 0===e&&(e=p),t.type===a.UPDATE_STATS){var n=t.stats;return d(d({},e),n)}return e},h={stats:p};var f=function(){return l.a.createElement("nav",{className:"navbar is-primary"},l.a.createElement("h1",null,"RedisSMQ ",l.a.createElement("small",{className:"text-muted"},"Monitor")))},g=(n(221),function(e){var t=e.version,n=e.license;return l.a.createElement("footer",null,"RedisSMQ Monitor v"+t,l.a.createElement("br",null),"© Weyoss 2017 - 2020. Licensed under ",n,".")}),v=n(101),b=function(){return l.a.createElement(g,{version:v.version,license:v.license})},y=n(8);function w(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Page Not Found"),l.a.createElement("p",null,"The page your are looking for does not exist."))}function k(e,t){if(void 0===t&&(t=2),0===e)return"0 Bytes";var n=t<0?0:t,a=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,a)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}var S=function(e){var t=e.consumers;return l.a.createElement("div",{className:"consumers"},l.a.createElement("h3",null,"Consumers"),function(e){var t=[];for(var n in e){var a=e[n];t.push(l.a.createElement("tr",{key:a.id},l.a.createElement("td",null,a.id),l.a.createElement("td",null,a.resources.pid," /",l.a.createElement("br",null),a.resources.hostname),l.a.createElement("td",null,a.resources.ipAddress.join("<br />")),l.a.createElement("td",null,a.rates.processing),l.a.createElement("td",null,a.rates.acknowledged),l.a.createElement("td",null,a.rates.unacknowledged),l.a.createElement("td",null,a.resources.cpu.percentage),l.a.createElement("td",null,k(a.resources.ram.usage.rss)),l.a.createElement("td",null,k(a.resources.ram.free)),l.a.createElement("td",null,k(a.resources.ram.total))))}return t.length?l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Note: Sometimes the CPU usage is not accurate and does not match the real CPU usage. Therefore it should be regarded just as an indicative value."),l.a.createElement("table",{className:"table .consumers"},l.a.createElement("thead",{className:"thead-light"},l.a.createElement("tr",null,l.a.createElement("th",{rowSpan:3},"ID"),l.a.createElement("th",{rowSpan:3},"PID /",l.a.createElement("br",null),"Hostname"),l.a.createElement("th",{rowSpan:3},"IP",l.a.createElement("br",null),"Address"),l.a.createElement("th",{rowSpan:3},"Processing ",l.a.createElement("br",null),"msg/sec"),l.a.createElement("th",{rowSpan:3},"Acks ",l.a.createElement("br",null),"msg/sec"),l.a.createElement("th",{rowSpan:3},"Unacks ",l.a.createElement("br",null),"msg/sec"),l.a.createElement("th",{colSpan:5},"Resources")),l.a.createElement("tr",null,l.a.createElement("th",{rowSpan:2},"CPU ",l.a.createElement("br",null)," (%)"),l.a.createElement("th",{colSpan:3},"Memory")),l.a.createElement("tr",null,l.a.createElement("th",null,"Usage"),l.a.createElement("th",null,"Free"),l.a.createElement("th",null,"Total"))),l.a.createElement("tbody",null,t))):l.a.createElement("p",null,"No existing consumers yet.")}(t))};var O=function(e){var t=e.producers;return l.a.createElement("div",{className:"Producers margin-bottom"},l.a.createElement("h3",null,"Producers"),function(e){var t=[];for(var n in e){var a=e[n];t.push(l.a.createElement("tr",{key:a.id},l.a.createElement("td",{scope:"row"},a.id),l.a.createElement("td",null,a.rates.input)))}return t.length?l.a.createElement("table",{className:"table"},l.a.createElement("thead",{className:"thead-light"},l.a.createElement("tr",null,l.a.createElement("th",{scope:"col"},"ID"),l.a.createElement("th",{scope:"col"},"Published messages (msg/sec)"))),l.a.createElement("tbody",null,t)):l.a.createElement("p",null,"No queue producers yet.")}(t))},j=n(19),q=n(13),N=(n(399),function(e){var t=e.rates,n=e.timeline,a=t.input,r=t.processing,c=t.acknowledged,o=t.unacknowledged;return l.a.createElement("div",{className:"timeline"},l.a.createElement("div",{className:"chartContainer"},l.a.createElement(q.e,{width:"90%",height:"100%"},l.a.createElement(q.d,{margin:{top:0,right:0,left:0,bottom:0},data:n},l.a.createElement(q.g,{cursor:{stroke:"red",strokeWidth:2}}),l.a.createElement(q.b,{verticalAlign:"top",height:36,align:"right"}),l.a.createElement(q.f,null),l.a.createElement(q.c,{name:"Input",type:"monotone",dataKey:"input",stroke:"#1f78b4",isAnimationActive:!1}),l.a.createElement(q.c,{name:"Processing",type:"monotone",dataKey:"processing",stroke:"#e8a838",isAnimationActive:!1}),l.a.createElement(q.c,{name:"Acknowledged",type:"monotone",dataKey:"acknowledged",stroke:"#61cdbb",isAnimationActive:!1}),l.a.createElement(q.c,{name:"Unacknowledged",type:"monotone",dataKey:"unacknowledged",stroke:"#f47560",isAnimationActive:!1}),l.a.createElement(q.a,{stroke:"#ccc"}),l.a.createElement(q.h,{dataKey:"na"}),l.a.createElement(q.i,null)))),l.a.createElement("table",{className:"table"},l.a.createElement("thead",{className:"thead-light"},l.a.createElement("tr",null,l.a.createElement("th",null,"Input",l.a.createElement("br",null)," msg/sec"),l.a.createElement("th",null,"Processing",l.a.createElement("br",null)," msg/sec"),l.a.createElement("th",null,"Acknowledged",l.a.createElement("br",null)," msg/sec"),l.a.createElement("th",null,"Unacknowledged",l.a.createElement("br",null)," msg/sec"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,a),l.a.createElement("td",null,r),l.a.createElement("td",null,c),l.a.createElement("td",null,o)))))}),A=function(){return(A=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},P=function(e){var t=e.rates,n=Object(r.useState)(new Array(60).fill({processing:0,acknowledged:0,unacknowledged:0,input:0})),a=n[0],c=n[1];return Object(r.useEffect)((function(){var e=a.map((function(e){return e}));e.push(A({},t)),e.shift(),c(e)}),[t]),l.a.createElement(N,{rates:t,timeline:a})},x=function(e){var t=e.queue,n=e.rates;if(!t)return l.a.createElement("div",null,l.a.createElement("h2",null,"Queue not found!"),l.a.createElement("p",null,"The queue you are looking for does not exists."),l.a.createElement("hr",null),l.a.createElement("p",null,l.a.createElement(j.b,{to:"/"},"Go home")));var a=t.namespace,r=t.name,c=t.size,o=t.erroredMessages,s=t.consumers,u=t.producers;return l.a.createElement("div",{className:"queue fullWidth"},l.a.createElement("h2",null,"Individual Queue Metrics / ",r," "),l.a.createElement("p",null,"The following metrics are gathered from the ",l.a.createElement("b",null,r)," queue under the ",l.a.createElement("b",null,a)," namespace."),l.a.createElement("hr",null),l.a.createElement(P,{rates:n}),l.a.createElement("hr",null),l.a.createElement("h3",null,"Queue metrics"),l.a.createElement("table",{className:"table"},l.a.createElement("thead",{className:"thead-light"},l.a.createElement("tr",null,l.a.createElement("th",null,"Size"),l.a.createElement("th",null,"Failed messages"),l.a.createElement("th",null,"Consumers"),l.a.createElement("th",null,"Producers"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,c),l.a.createElement("td",null,o),l.a.createElement("td",null,Object.keys(s).length),l.a.createElement("td",null,Object.keys(u).length)))),l.a.createElement(S,{consumers:s}),l.a.createElement(O,{producers:u}))},T=function(e){var t=e.match,n=Object(o.c)((function(e){return e.stats.queues})),a=t.params,c=a.ns,s=a.qn,u=n[c]&&n[c][s],i=Object(r.useState)({processing:0,input:0,acknowledged:0,unacknowledged:0}),m=i[0],d=i[1];return Object(r.useEffect)((function(){var e={processing:0,input:0,acknowledged:0,unacknowledged:0};for(var t in null==u?void 0:u.consumers){var n=(null==u?void 0:u.consumers[t]).rates;e.acknowledged+=n.acknowledged,e.processing+=n.processing,e.unacknowledged+=n.unacknowledged}for(var a in null==u?void 0:u.producers){var r=(null==u?void 0:u.producers[a]).rates;e.input+=r.input}d(e)}),[u]),l.a.createElement(x,{queue:u,rates:m})},M=function(e){var t=e.rates;return l.a.createElement("div",{className:"overview fullWidth"},l.a.createElement("h2",null,"Global MQ Overview"),l.a.createElement("p",null,"The following metrics are gathered from all existing queues in the system. Select a specific queue from the queue listing, to view its metrics."),l.a.createElement("hr",null),l.a.createElement(P,{rates:t}))},_=function(){var e=Object(o.c)((function(e){return e.stats.rates}));return l.a.createElement(M,{rates:e})};function I(){return l.a.createElement(y.c,null,l.a.createElement(y.a,{exact:!0,path:"/",component:_}),l.a.createElement(y.a,{exact:!0,path:"/ns/:ns/qn/:qn",component:T}),l.a.createElement(y.a,{component:w}))}n(401);var Q,B=function(e){var t=e.queues,n=e.activeQueue,a=[];for(var r in t){var c=t[r],o=[];for(var s in c){var u=c[s],i=r+"-"+s,m=n&&n.qn===u.name&&n.ns===u.namespace?"active":"inactive";o.push(l.a.createElement("li",{key:i},l.a.createElement(j.b,{className:m,to:"/ns/"+r+"/qn/"+s},u.name," (",u.size,")")))}a.push(l.a.createElement("li",{key:r},l.a.createElement("span",null,r," (",o.length,")"),l.a.createElement("ul",{className:"embedded"},o)))}return a.length?l.a.createElement("ul",null,a):l.a.createElement("p",null,"No existing queues yet.")},U=function(e){var t=e.queues,n=e.activeQueue;return l.a.createElement("div",{className:"queueLabels fullWidth"},l.a.createElement("h2",null,"Queues"),l.a.createElement(B,{queues:t,activeQueue:n}))},C=function(){var e=Object(o.c)((function(e){return e.stats.queues})),t=Object(y.f)("/ns/:ns/qn/:qn"),n=t?t.params:null;return l.a.createElement(U,{queues:e,activeQueue:n})},D=function(e){return e.loading?l.a.createElement("div",{className:"spinner-border",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")):null},W=function(){return Object(y.f)({path:"/",exact:!0})?null:l.a.createElement("div",{className:"homeLink"},l.a.createElement(j.b,{className:"leading",to:"/"},"← Home"))},F=(n(402),n(403),function(e){var t=e.loading;return t?l.a.createElement(D,{loading:t}):l.a.createElement(l.a.Fragment,null,l.a.createElement(f,null),l.a.createElement("div",{className:"mainContainer"},l.a.createElement("div",{className:"sidePanel"},l.a.createElement(C,null)),l.a.createElement("div",{className:"page"},l.a.createElement(W,null),l.a.createElement(I,null))),l.a.createElement(b,null))}),K=function(e){var t=e.loading;return l.a.createElement(j.a,null,l.a.createElement(F,{loading:t}))},z=n(180),R=n.n(z),G=function(e,t,n,a){return new(n||(n=Promise))((function(r,l){function c(e){try{s(a.next(e))}catch(e){l(e)}}function o(e){try{s(a.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,o)}s((a=a.apply(e,t||[])).next())}))},J=function(e,t){var n,a,r,l,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(l){return function(o){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,a&&(r=2&l[0]?a.return:l[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,l[1])).done)return r;switch(a=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return c.label++,{value:l[1],done:!1};case 5:c.label++,a=l[1],l=[0];continue;case 7:l=c.ops.pop(),c.trys.pop();continue;default:if(!(r=c.trys,(r=r.length>0&&r[r.length-1])||6!==l[0]&&2!==l[0])){c=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){c.label=l[1];break}if(6===l[0]&&c.label<r[1]){c.label=r[1],r=l;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(l);break}r[2]&&c.ops.pop(),c.trys.pop();continue}l=t.call(e,c)}catch(e){l=[6,e],a=0}finally{n=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,o])}}},L={init:function(){return G(this,void 0,void 0,(function(){return J(this,(function(e){switch(e.label){case 0:if(Q)throw new Error("Already initialized.");return[4,G(void 0,void 0,void 0,(function(){return J(this,(function(e){return console.log("Trying to connect to WS server..."),[2,new Promise((function(e,t){var n=R()("");n.once("connect",(function(){console.log("Successfully connected to WS server."),e(n)})),n.once("connect_error",(function(e){console.error("An error occurred while trying to connect to WS server."),t(e)}))}))]}))}))];case 1:return[2,Q=e.sent()]}}))}))},getSocket:function(){if(!Q)throw new Error("WS has not yet been initialized.");return Q}};var H,Y=function(){return(Y=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},Z=function(){var e=Object(r.useState)({loading:!0,init:!0}),t=e[0],n=e[1],c=Object(o.b)();return Object(r.useEffect)((function(){t.init&&(n(Y(Y({},t),{init:!1})),L.init().then((function(e){n(Y(Y({},t),{loading:!1})),e.on("stats",(function(e){c(function(e){return{type:a.UPDATE_STATS,stats:e}}(e))}))})).catch((function(e){n((function(){throw e}))})))}),[]),l.a.createElement(K,{loading:t.loading})},V=(H=function(e,t){return(H=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}H(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),X=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={error:null,errorInfo:null},t}return V(t,e),t.prototype.componentDidCatch=function(e,t){this.setState({error:e,errorInfo:t})},t.prototype.render=function(){var e=this.props.children;if(null!==this.state.errorInfo){var t=this.state.errorInfo.componentStack,n=this.state.error.toString();return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,"Something went wrong."),l.a.createElement("h3",null,"Error"),l.a.createElement("pre",null,n),l.a.createElement("h3",null,"ErrorInfo"),l.a.createElement("pre",null,t))}return e},t}(l.a.Component),$=function(e){void 0===e&&(e=h);var t=Object(s.a)(i()(),m.a);return Object(s.d)(Object(s.c)({stats:E}),e,t)}();Object(c.render)(l.a.createElement(o.a,{store:$},l.a.createElement(X,null,l.a.createElement(Z,null))),document.getElementById("app"))}},[[430,1,2]]]);