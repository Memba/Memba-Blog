if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise((async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},s=(s,t)=>{Promise.all(s.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(s)};self.define=(s,b,m)=>{t[s]||(t[s]=Promise.resolve().then((()=>{let t={};const d={uri:location.origin+s.slice(1)};return Promise.all(b.map((s=>{switch(s){case"exports":return t;case"module":return d;default:return e(s)}}))).then((e=>{const s=m(...e);return t.default||(t.default=s),t}))})))}}define("./sw.js",["./workbox-f544ae7b"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Memba-Blog"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://code.jquery.com/jquery-3.6.0.min.js"},{url:"https://www.memba.com/build/45733d9a7d356b0ebd29b3fbf814d971.woff",revision:null},{url:"https://www.memba.com/build/58dd427e8678175caafcb0e93e8dd1f2.jpg",revision:null},{url:"https://www.memba.com/build/6633a7f304db97a48be491c9778830f7.png",revision:null},{url:"https://www.memba.com/build/9c473da0183f170a51201086a3c84008.png",revision:null},{url:"https://www.memba.com/build/app-culture-en-es6.bundle.js?v=0.3.8",revision:"d1f6d0716c8d464f35affdfe343df15c"},{url:"https://www.memba.com/build/app-culture-fr-es6.bundle.js?v=0.3.8",revision:"26dfc31e846f71849f5d336cb5dad4da"},{url:"https://www.memba.com/build/app.theme.black.bundle.js?v=0.3.8",revision:"6b257bc9a28d6c836cadbc076c9cf519"},{url:"https://www.memba.com/build/app.theme.bootstrap.bundle.js?v=0.3.8",revision:"71516855588a2d78a2b8153903d48f07"},{url:"https://www.memba.com/build/app.theme.flat.bundle.js?v=0.3.8",revision:"3d19b0e44ae7e44f1f105c77655f80be"},{url:"https://www.memba.com/build/app.theme.highcontrast.bundle.js?v=0.3.8",revision:"2e0899bb489efcb6272ef5f5c98bb45d"},{url:"https://www.memba.com/build/app.theme.indigo.bundle.js?v=0.3.8",revision:"965a48fd228ef7f8932f8980dcdbcb4a"},{url:"https://www.memba.com/build/app.theme.memba.bundle.js?v=0.3.8",revision:"cdee198993ba1bdf21528db2701b29ec"},{url:"https://www.memba.com/build/app.theme.nordic.bundle.js?v=0.3.8",revision:"cb1f223930374f6fc4247bfb9591720f"},{url:"https://www.memba.com/build/app.theme.turquoise.bundle.js?v=0.3.8",revision:"4fe557dc72f74898e9dbd702a0a66742"},{url:"https://www.memba.com/build/app.theme.urban.bundle.js?v=0.3.8",revision:"c682964aff94ebb8898aa22b5d6e0400"},{url:"https://www.memba.com/build/app.theme.vintage.bundle.js?v=0.3.8",revision:"9ba25d3e398405a14799ea0e53ef54a0"},{url:"https://www.memba.com/build/common.bundle.js?v=0.3.8",revision:"2ef378fc8406897656f2bb114e5d1702"},{url:"https://www.memba.com/build/edc3513dbd94240c09d78c25e494d655.eot",revision:null},{url:"https://www.memba.com/build/error.bundle.js?v=0.3.8",revision:"39111fc3c4efdbc3e8673a330c8ece8d"},{url:"https://www.memba.com/build/f818f00b6561cddc041075994b0d7470.ttf",revision:null},{url:"https://www.memba.com/build/home.bundle.js?v=0.3.8",revision:"7264759c0afd89d034243632589af11b"},{url:"https://www.memba.com/build/init.bundle.js?v=0.3.8",revision:"a06510b6b882f347cf2a6d0b1b656b38"},{url:"https://www.memba.com/build/page.bundle.js?v=0.3.8",revision:"db191d18b0ec4a08287ec0d2579c844f"},{url:"https://www.memba.com/build/post.bundle.js?v=0.3.8",revision:"48721f7a07bd712dc2c53d6ac67e8b8d"},{url:"https://www.memba.com/build/search.bundle.js?v=0.3.8",revision:"4e05456a87b62fefcb78c63ff16d81ec"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/cdn.kidoju.com/,new e.CacheFirst({cacheName:"Memba-Blog-runtime-assets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/www.memba.com(\/?$|\/[a-z]{2}($|\/))/,new e.StaleWhileRevalidate({cacheName:"Memba-Blog-runtime-content",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.initialize({})}));
