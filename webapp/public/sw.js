if(!self.define){let e,s={};const t=(t,o)=>(t=new URL(t+".js",o).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(o,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let l={};const m=e=>t(e,i),u={module:{uri:i},exports:l,require:m};s[i]=Promise.all(o.map((e=>u[e]||m(e)))).then((e=>(n(...e),l)))}}define(["./workbox-1a61d9c3"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Memba-Blog"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://code.jquery.com/jquery-3.6.3.min.js"},{url:"https://www.memba.com/build/45733d9a7d356b0ebd29.woff",revision:null},{url:"https://www.memba.com/build/58dd427e8678175caafc.jpg",revision:null},{url:"https://www.memba.com/build/6633a7f304db97a48be4.png",revision:null},{url:"https://www.memba.com/build/9c473da0183f170a5120.png",revision:null},{url:"https://www.memba.com/build/app-culture-en-es6.bundle.js?v=0.3.8",revision:"b13281acb31ed8e049fda0d4ec98cb9f"},{url:"https://www.memba.com/build/app-culture-fr-es6.bundle.js?v=0.3.8",revision:"b6dfa4bae5e68566f519607ad8e0d496"},{url:"https://www.memba.com/build/common.bundle.js?v=0.3.8",revision:"fb8d3faaa92d5b1175a5b8c469466723"},{url:"https://www.memba.com/build/edc3513dbd94240c09d7.eot",revision:null},{url:"https://www.memba.com/build/error.bundle.js?v=0.3.8",revision:"cfc1bba80cabee23606144d36e59f407"},{url:"https://www.memba.com/build/f818f00b6561cddc0410.ttf",revision:null},{url:"https://www.memba.com/build/home.bundle.js?v=0.3.8",revision:"46c69614ca7cf68f110083bb1dc4b4b2"},{url:"https://www.memba.com/build/init.bundle.js?v=0.3.8",revision:"a3481696117b1d4f4d710b60a60db6ce"},{url:"https://www.memba.com/build/page.bundle.js?v=0.3.8",revision:"832793dbdf50d9b4d1580a1116bd9ef8"},{url:"https://www.memba.com/build/post.bundle.js?v=0.3.8",revision:"02f08d61008a27de4910a74a125943a0"},{url:"https://www.memba.com/build/search.bundle.js?v=0.3.8",revision:"d18702c758eb20037df87e2b607e33d3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/cdn.kidoju.com/,new e.CacheFirst({cacheName:"Memba-Blog-runtime-assets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/www.memba.com(\/?$|\/[a-z]{2}($|\/))/,new e.StaleWhileRevalidate({cacheName:"Memba-Blog-runtime-content",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.initialize({})}));
