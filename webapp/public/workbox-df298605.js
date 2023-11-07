define(["exports"],(function(t){"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.0.0"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const c=t.method;if(!a&&this.i.has(c)&&(a=this.i.get(c)),!a)return;let o;try{o=a.handle({url:s,request:t,event:e,params:i})}catch(t){o=Promise.reject(t)}const h=r&&r.catchHandler;return o instanceof Promise&&(this.o||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),o}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let c;const o=()=>(c||(c=new a,c.addFetchListener(),c.addCacheListener()),c);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return o().registerRoute(a),a}try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(t){}class u{constructor(t={}){this.h=t.statuses,this.u=t.headers}isResponseCacheable(t){let e=!0;return this.h&&(e=this.h.includes(t.status)),this.u&&e&&(e=Object.keys(this.u).some((e=>t.headers.get(e)===this.u[e]))),e}}const l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=t=>[l.prefix,t,l.suffix].filter((t=>t&&t.length>0)).join("-"),w=t=>{(t=>{for(const e of Object.keys(l))t(e)})((e=>{"string"==typeof t[e]&&(l[e]=t[e])}))},d=t=>t||f(l.googleAnalytics),y=t=>t||f(l.precache),p=t=>t||f(l.runtime);function m(t){t.then((()=>{}))}const g=new Set;function R(){return R=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},R.apply(this,arguments)}const q=(t,e)=>e.some((e=>t instanceof e));let b,v;const D=new WeakMap,E=new WeakMap,x=new WeakMap,U=new WeakMap,I=new WeakMap;let N={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return E.get(t);if("objectStoreNames"===e)return t.objectStoreNames||x.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return O(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function k(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(v||(v=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(T(this),e),O(D.get(this))}:function(...e){return O(t.apply(T(this),e))}:function(e,...s){const n=t.call(T(this),e,...s);return x.set(n,e.sort?e.sort():[e]),O(n)}}function L(t){return"function"==typeof t?k(t):(t instanceof IDBTransaction&&function(t){if(E.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),n()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));E.set(t,e)}(t),q(t,b||(b=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,N):t)}function O(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(O(t.result)),n()},r=()=>{s(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&D.set(e,t)})).catch((()=>{})),I.set(e,t),e}(t);if(U.has(t))return U.get(t);const e=L(t);return e!==t&&(U.set(t,e),I.set(e,t)),e}const T=t=>I.get(t);function B(t,e,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),c=O(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(O(a.result),t.oldVersion,t.newVersion,O(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),c.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(t=>i(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),c}const C=["get","getKey","getAll","getAllKeys","count"],P=["put","add","delete","clear"],j=new Map;function S(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(j.get(e))return j.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,i=P.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!C.includes(s))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),i&&r.done]))[0]};return j.set(e,r),r}N=(t=>R({},t,{get:(e,s,n)=>S(e,s)||t.get(e,s,n),has:(e,s)=>!!S(e,s)||t.has(e,s)}))(N);try{self["workbox:expiration:7.0.0"]&&_()}catch(t){}const M="cache-entries",W=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class K{constructor(t){this.l=null,this.p=t}m(t){const e=t.createObjectStore(M,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}g(t){this.m(t),this.p&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),O(s).then((()=>{}))}(this.p)}async setTimestamp(t,e){const s={url:t=W(t),timestamp:e,cacheName:this.p,id:this.R(t)},n=(await this.getDb()).transaction(M,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(M,this.R(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(M).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.p&&(t&&s.timestamp<t||e&&r>=e?i.push(n.value):r++),n=await n.continue()}const a=[];for(const t of i)await s.delete(M,t.id),a.push(t.url);return a}R(t){return this.p+"|"+W(t)}async getDb(){return this.l||(this.l=await B("workbox-expiration",1,{upgrade:this.g.bind(this)})),this.l}}class A{constructor(t,e={}){this.q=!1,this.v=!1,this.D=e.maxEntries,this._=e.maxAgeSeconds,this.U=e.matchOptions,this.p=t,this.I=new K(t)}async expireEntries(){if(this.q)return void(this.v=!0);this.q=!0;const t=this._?Date.now()-1e3*this._:0,e=await this.I.expireEntries(t,this.D),s=await self.caches.open(this.p);for(const t of e)await s.delete(t,this.U);this.q=!1,this.v&&(this.v=!1,m(this.expireEntries()))}async updateTimestamp(t){await this.I.setTimestamp(t,Date.now())}async isURLExpired(t){if(this._){const e=await this.I.getTimestamp(t),s=Date.now()-1e3*this._;return void 0===e||e<s}return!1}async delete(){this.v=!1,await this.I.expireEntries(1/0)}}function F(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class ${constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}function G(t){return new Promise((e=>setTimeout(e,t)))}try{self["workbox:strategies:7.0.0"]&&_()}catch(t){}function H(t){return"string"==typeof t?new Request(t):t}class Q{constructor(t,e){this.N={},Object.assign(this,e),this.event=e.event,this.k=t,this.L=new $,this.O=[],this.T=[...t.plugins],this.B=new Map;for(const t of this.T)this.B.set(t,{});this.event.waitUntil(this.L.promise)}async fetch(t){const{event:e}=this;let n=H(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.k.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=H(t);let s;const{cacheName:n,matchOptions:i}=this.k,r=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=H(t);await G(0);const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const a=await this.C(e);if(!a)return!1;const{cacheName:c,matchOptions:o}=this.k,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const i=F(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===F(e.url,s))return t.match(e,n)}(h,i.clone(),["__WB_REVISION__"],o):null;try{await h.put(i,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of g)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:l,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.N[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=H(await t({mode:e,request:n,event:this.event,params:this.params}));this.N[s]=n}return this.N[s]}hasCallback(t){for(const e of this.k.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.k.plugins)if("function"==typeof e[t]){const s=this.B.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.O.push(t),t}async doneWaiting(){let t;for(;t=this.O.shift();)await t}destroy(){this.L.resolve(null)}async C(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class z{constructor(t={}){this.cacheName=p(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new Q(this,{event:e,request:s,params:n}),r=this.P(i,s,e);return[r,this.j(r,i,s,e)]}async P(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.S(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async j(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}const V={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};function J(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:7.0.0"]&&_()}catch(t){}function X(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class Y{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class Z{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.M.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.M=t}}let tt,et;async function st(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,c=function(){if(void 0===tt){const t=new Response("");if("body"in t)try{new Response(t.body),tt=!0}catch(t){tt=!1}tt=!1}return tt}()?i.body:await i.blob();return new Response(c,a)}class nt extends z{constructor(t={}){t.cacheName=y(t.cacheName),super(t),this.W=!1!==t.fallbackToNetwork,this.plugins.push(nt.copyRedirectedCacheableResponsesPlugin)}async S(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.K(t,e):await this.A(t,e))}async A(t,e){let n;const i=e.params||{};if(!this.W)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=i.integrity,r=t.integrity,a=!r||r===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.F(),await e.cachePut(t,n.clone()))}return n}async K(t,e){this.F();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}F(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==nt.copyRedirectedCacheableResponsesPlugin&&(n===nt.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(nt.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}nt.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},nt.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await st(t):t};class it{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.$=new Map,this.G=new Map,this.H=new Map,this.k=new nt({cacheName:y(t),plugins:[...e,new Z({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.k}precache(t){this.addToCacheList(t),this.V||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.V=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=X(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.$.has(i)&&this.$.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.$.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.H.has(t)&&this.H.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.H.set(t,n.integrity)}if(this.$.set(i,t),this.G.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return J(t,(async()=>{const e=new Y;this.strategy.plugins.push(e);for(const[e,s]of this.$){const n=this.H.get(s),i=this.G.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return J(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.$.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.$}getCachedURLs(){return[...this.$.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.$.get(e.href)}getIntegrityForCacheKey(t){return this.H.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const rt=()=>(et||(et=new it),et);class at extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}try{self["workbox:background-sync:7.0.0"]&&_()}catch(t){}const ct="requests",ot="queueName";class ht{constructor(){this.l=null}async addEntry(t){const e=(await this.getDb()).transaction(ct,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(ct).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(ct,ot,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(ct,ot,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(ct,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(ct).store.index(ot).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.l||(this.l=await B("workbox-background-sync",3,{upgrade:this.m})),this.l}m(t,e){e>0&&e<3&&t.objectStoreNames.contains(ct)&&t.deleteObjectStore(ct);t.createObjectStore(ct,{autoIncrement:!0,keyPath:"id"}).createIndex(ot,ot,{unique:!1})}}class ut{constructor(t){this.J=t,this.X=new ht}async pushEntry(t){delete t.id,t.queueName=this.J,await this.X.addEntry(t)}async unshiftEntry(t){const e=await this.X.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.J,await this.X.addEntry(t)}async popEntry(){return this.Y(await this.X.getLastEntryByQueueName(this.J))}async shiftEntry(){return this.Y(await this.X.getFirstEntryByQueueName(this.J))}async getAll(){return await this.X.getAllEntriesByQueueName(this.J)}async size(){return await this.X.getEntryCountByQueueName(this.J)}async deleteEntry(t){await this.X.deleteEntry(t)}async Y(t){return t&&await this.deleteEntry(t.id),t}}const lt=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class ft{static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of lt)void 0!==t[s]&&(e[s]=t[s]);return new ft(e)}constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.Z=t}toObject(){const t=Object.assign({},this.Z);return t.headers=Object.assign({},this.Z.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.Z.url,this.Z)}clone(){return new ft(this.toObject())}}const wt="workbox-background-sync",dt=new Set,yt=t=>{const e={request:new ft(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class pt{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:i}={}){if(this.tt=!1,this.et=!1,dt.has(t))throw new s("duplicate-queue-name",{name:t});dt.add(t),this.st=t,this.nt=n||this.replayRequests,this.it=i||10080,this.rt=Boolean(e),this.ct=new ut(this.st),this.ot()}get name(){return this.st}async pushRequest(t){await this.ht(t,"push")}async unshiftRequest(t){await this.ht(t,"unshift")}async popRequest(){return this.ut("pop")}async shiftRequest(){return this.ut("shift")}async getAll(){const t=await this.ct.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.it*1e3;e-n.timestamp>t?await this.ct.deleteEntry(n.id):s.push(yt(n))}return s}async size(){return await this.ct.size()}async ht({request:t,metadata:e,timestamp:s=Date.now()},n){const i={requestData:(await ft.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(i.metadata=e),n){case"push":await this.ct.pushEntry(i);break;case"unshift":await this.ct.unshiftEntry(i)}this.tt?this.et=!0:await this.registerSync()}async ut(t){const e=Date.now();let s;switch(t){case"pop":s=await this.ct.popEntry();break;case"shift":s=await this.ct.shiftEntry()}if(s){const n=60*this.it*1e3;return e-s.timestamp>n?this.ut(t):yt(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.st})}}async registerSync(){if("sync"in self.registration&&!this.rt)try{await self.registration.sync.register(`${wt}:${this.st}`)}catch(t){}}ot(){"sync"in self.registration&&!this.rt?self.addEventListener("sync",(t=>{if(t.tag===`${wt}:${this.st}`){const e=async()=>{let e;this.tt=!0;try{await this.nt({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.et||e&&!t.lastChance||await this.registerSync(),this.tt=!1,this.et=!1}};t.waitUntil(e())}})):this.nt({queue:this})}static get lt(){return dt}}class mt{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.ft.pushRequest({request:t})},this.ft=new pt(t,e)}}class gt extends z{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(V),this.wt=t.networkTimeoutSeconds||0}async S(t,e){const n=[],i=[];let r;if(this.wt){const{id:s,promise:a}=this.dt({request:t,logs:n,handler:e});r=s,i.push(a)}const a=this.yt({timeoutId:r,request:t,logs:n,handler:e});i.push(a);const c=await e.waitUntil((async()=>await e.waitUntil(Promise.race(i))||await a)());if(!c)throw new s("no-response",{url:t.url});return c}dt({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.wt)})),id:n}}async yt({timeoutId:t,request:e,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(i=t)}return t&&clearTimeout(t),!i&&r||(r=await n.cacheMatch(e)),r}}class Rt extends z{constructor(t={}){super(t),this.wt=t.networkTimeoutSeconds||0}async S(t,e){let n,i;try{const s=[e.fetch(t)];if(this.wt){const t=G(1e3*this.wt);s.push(t)}if(i=await Promise.race(s),!i)throw new Error(`Timed out the network response after ${this.wt} seconds.`)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}}try{self["workbox:google-analytics:7.0.0"]&&_()}catch(t){}const qt="www.google-analytics.com",bt="www.googletagmanager.com",vt=/^\/(\w+\/)?collect/,Dt=t=>{const e=({url:t})=>t.hostname===qt&&vt.test(t.pathname),s=new Rt({plugins:[t]});return[new i(e,s,"GET"),new i(e,s,"POST")]},Et=t=>{const e=new gt({cacheName:t});return new i((({url:t})=>t.hostname===qt&&"/analytics.js"===t.pathname),e,"GET")},xt=t=>{const e=new gt({cacheName:t});return new i((({url:t})=>t.hostname===bt&&"/gtag/js"===t.pathname),e,"GET")},_t=t=>{const e=new gt({cacheName:t});return new i((({url:t})=>t.hostname===bt&&"/gtm.js"===t.pathname),e,"GET")};t.CacheFirst=class extends z{async S(t,e){let n,i=await e.cacheMatch(t);if(!i)try{i=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}},t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.gt.isResponseCacheable(t)?t:null,this.gt=new u(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.Rt(n),r=this.qt(s);m(r.expireEntries());const a=r.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.qt(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.bt=t,this._=t.maxAgeSeconds,this.vt=new Map,t.purgeOnQuotaError&&function(t){g.add(t)}((()=>this.deleteCacheAndMetadata()))}qt(t){if(t===p())throw new s("expire-custom-caches-only");let e=this.vt.get(t);return e||(e=new A(t,this.bt),this.vt.set(t,e)),e}Rt(t){if(!this._)return!0;const e=this.Dt(t);if(null===e)return!0;return e>=Date.now()-1e3*this._}Dt(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.vt)await self.caches.delete(t),await e.delete();this.vt=new Map}},t.StaleWhileRevalidate=class extends z{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(V)}async S(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let i,r=await e.cacheMatch(t);if(r);else try{r=await n}catch(t){t instanceof Error&&(i=t)}if(!r)throw new s("no-response",{url:t.url,error:i});return r}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=y();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.initialize=(t={})=>{const e=d(t.cacheName),s=new mt("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=t,async({queue:t})=>{let e;for(;e=await t.shiftRequest();){const{request:s,timestamp:i}=e,r=new URL(s.url);try{const t="POST"===s.method?new URLSearchParams(await s.clone().text()):r.searchParams,e=i-(Number(t.get("qt"))||0),a=Date.now()-e;if(t.set("qt",String(a)),n.parameterOverrides)for(const e of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[e];t.set(e,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,t),await fetch(new Request(r.origin+r.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await t.unshiftRequest(e),s}}})});var n;const i=[_t(e),Et(e),xt(e),...Dt(s)],r=new a;for(const t of i)r.registerRoute(t);r.addFetchListener()},t.precacheAndRoute=function(t,e){!function(t){rt().precache(t)}(t),function(t){const e=rt();h(new at(e,t))}(e)},t.registerRoute=h,t.setCacheNameDetails=function(t){w(t)}}));