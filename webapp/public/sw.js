if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise((async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},s=(s,t)=>{Promise.all(s.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(s)};self.define=(s,b,m)=>{t[s]||(t[s]=Promise.resolve().then((()=>{let t={};const a={uri:location.origin+s.slice(1)};return Promise.all(b.map((s=>{switch(s){case"exports":return t;case"module":return a;default:return e(s)}}))).then((e=>{const s=m(...e);return t.default||(t.default=s),t}))})))}}define("./sw.js",["./workbox-9840122a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Memba-Blog"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://code.jquery.com/jquery-3.5.1.min.js"},{url:"https://www.memba.com/build/45733d9a7d356b0ebd29b3fbf814d971.woff",revision:null},{url:"https://www.memba.com/build/58dd427e8678175caafcb0e93e8dd1f2.jpg",revision:null},{url:"https://www.memba.com/build/6633a7f304db97a48be491c9778830f7.png",revision:null},{url:"https://www.memba.com/build/9c473da0183f170a51201086a3c84008.png",revision:null},{url:"https://www.memba.com/build/app-culture-en-es6.bundle.js?v=0.3.8",revision:"4e06506fb89fb7474a959e96da5c8a08"},{url:"https://www.memba.com/build/app-culture-fr-es6.bundle.js?v=0.3.8",revision:"c3ed9ed0a465165243f1dbc7ca367369"},{url:"https://www.memba.com/build/app.theme.black.bundle.js?v=0.3.8",revision:"67eedbfa5f0be1efa66afc6c8d63424b"},{url:"https://www.memba.com/build/app.theme.bootstrap.bundle.js?v=0.3.8",revision:"890151438b83ac46cd3c20389c52ef1d"},{url:"https://www.memba.com/build/app.theme.flat.bundle.js?v=0.3.8",revision:"ffd4422adff20f967aa39f9bea667939"},{url:"https://www.memba.com/build/app.theme.highcontrast.bundle.js?v=0.3.8",revision:"3655f45901dc92669eb22372906ee7e7"},{url:"https://www.memba.com/build/app.theme.indigo.bundle.js?v=0.3.8",revision:"04f465693dee0fb347916eb9de2de523"},{url:"https://www.memba.com/build/app.theme.memba.bundle.js?v=0.3.8",revision:"2bfc690c3b803a8ae5f9c0507b31c87e"},{url:"https://www.memba.com/build/app.theme.nordic.bundle.js?v=0.3.8",revision:"a4463f5d81110919245e3568e97e7ec0"},{url:"https://www.memba.com/build/app.theme.turquoise.bundle.js?v=0.3.8",revision:"f380960f2b9a901809fdbb83d3b9b55d"},{url:"https://www.memba.com/build/app.theme.urban.bundle.js?v=0.3.8",revision:"369ba67dee4cb69be248e2f99131474e"},{url:"https://www.memba.com/build/app.theme.vintage.bundle.js?v=0.3.8",revision:"31cfc69b5d8ce06e09e136ede9ffaafa"},{url:"https://www.memba.com/build/common.bundle.js?v=0.3.8",revision:"00df063c504064e43c0aeaf7b5a097f3"},{url:"https://www.memba.com/build/edc3513dbd94240c09d78c25e494d655.eot",revision:null},{url:"https://www.memba.com/build/error.bundle.js?v=0.3.8",revision:"77f4c886291ae320703402a8c61be301"},{url:"https://www.memba.com/build/f818f00b6561cddc041075994b0d7470.ttf",revision:null},{url:"https://www.memba.com/build/home.bundle.js?v=0.3.8",revision:"abaeadef4efefb17a170002f4cb3dec7"},{url:"https://www.memba.com/build/init.bundle.js?v=0.3.8",revision:"f2b0db20c81957474a60872a312b7faf"},{url:"https://www.memba.com/build/page.bundle.js?v=0.3.8",revision:"1031d83b2f0733be5f3c19c9acbb7d2f"},{url:"https://www.memba.com/build/post.bundle.js?v=0.3.8",revision:"d8f079989d9702481559f11e2d2843aa"},{url:"https://www.memba.com/build/search.bundle.js?v=0.3.8",revision:"4b6eec0e091663751f20a3b9c548390d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/cdn.kidoju.com/,new e.CacheFirst({cacheName:"Memba-Blog-runtime-assets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/www.memba.com(\/?$|\/[a-z]{2}($|\/))/,new e.StaleWhileRevalidate({cacheName:"Memba-Blog-runtime-content",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.initialize({})}));
