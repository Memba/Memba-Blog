if(!self.define){const e=async e=>{if("require"!==e&&(e+=".js"),!a[e]&&(await new Promise(async b=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=b}else importScripts(e),b()}),!a[e]))throw new Error(`Module ${e} didn’t register its module`);return a[e]},b=async(b,a)=>{const s=await Promise.all(b.map(e));a(1===s.length?s[0]:s)};b.toUrl=e=>`./${e}`;const a={require:Promise.resolve(b)};self.define=(b,s,d)=>{a[b]||(a[b]=new Promise(async a=>{let c={};const t={uri:location.origin+b.slice(1)},i=await Promise.all(s.map(b=>"exports"===b?c:"module"===b?t:e(b))),m=d(...i);c.default||(c.default=m),a(c)}))}}define("./sw.js",["./workbox-db4ea5ce"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Memba-Blog"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"},{url:"https://www.memba.com/build/45733d9a7d356b0ebd29b3fbf814d971.woff",revision:"e811d21d46e69ff03a92761dd0b9f47e"},{url:"https://www.memba.com/build/58dd427e8678175caafcb0e93e8dd1f2.jpg",revision:"9e0bdff4970e28b99fd7c45d700c20fa"},{url:"https://www.memba.com/build/6633a7f304db97a48be491c9778830f7.png",revision:"cdfd82cd7caa66cfe027d1702b434bd9"},{url:"https://www.memba.com/build/9c473da0183f170a51201086a3c84008.png",revision:"cbb99b5861be0813c86d8b564e49a468"},{url:"https://www.memba.com/build/app-culture-en-es6.bundle.js?v=0.3.8",revision:"1c2ec65a0bc5a9d4ff59c9abf0ea6b84"},{url:"https://www.memba.com/build/app-culture-fr-es6.bundle.js?v=0.3.8",revision:"59172b6aab4dea11957840c97b253c57"},{url:"https://www.memba.com/build/app.theme.black.bundle.js?v=0.3.8",revision:"fb41716d4a712dbf7aa5e91847d1d3d1"},{url:"https://www.memba.com/build/app.theme.bootstrap.bundle.js?v=0.3.8",revision:"3ca71cb965aec7af85757ac6d3fd0c34"},{url:"https://www.memba.com/build/app.theme.flat.bundle.js?v=0.3.8",revision:"4ac8dbd7cfb6627064d840ea90a2e5b9"},{url:"https://www.memba.com/build/app.theme.highcontrast.bundle.js?v=0.3.8",revision:"04b15107d3d79cc2e56236e1928b1984"},{url:"https://www.memba.com/build/app.theme.indigo.bundle.js?v=0.3.8",revision:"b575b0c967aad548079c47186a79602b"},{url:"https://www.memba.com/build/app.theme.memba.bundle.js?v=0.3.8",revision:"978099fbca33e7863f96aa9c5064d610"},{url:"https://www.memba.com/build/app.theme.nordic.bundle.js?v=0.3.8",revision:"b1fbe270ab995680ebe42cc1c4562ac0"},{url:"https://www.memba.com/build/app.theme.turquoise.bundle.js?v=0.3.8",revision:"350c7d1285646f8db81b2acab3329e4b"},{url:"https://www.memba.com/build/app.theme.urban.bundle.js?v=0.3.8",revision:"b1868decbd45d79803d01830857cf448"},{url:"https://www.memba.com/build/app.theme.vintage.bundle.js?v=0.3.8",revision:"6e0d12dbf0c53806cac64ad900714a71"},{url:"https://www.memba.com/build/common.bundle.js?v=0.3.8",revision:"cd551fa567eb525f0d05dd9d3f1c934a"},{url:"https://www.memba.com/build/edc3513dbd94240c09d78c25e494d655.eot",revision:"06c0e4eee47149717c20a979ffb49b61"},{url:"https://www.memba.com/build/error.bundle.js?v=0.3.8",revision:"4d36350e7280ca95a50148857de1576b"},{url:"https://www.memba.com/build/f818f00b6561cddc041075994b0d7470.ttf",revision:"f0e822cb280b38eaa00d74d242a837f9"},{url:"https://www.memba.com/build/home.bundle.js?v=0.3.8",revision:"9c04ecbf6d61d87c7ca5ce735816bdfa"},{url:"https://www.memba.com/build/init.bundle.js?v=0.3.8",revision:"50f34699d775a3facf956386e54eb27b"},{url:"https://www.memba.com/build/page.bundle.js?v=0.3.8",revision:"6eb9d91bdb20fc7c4ee106b6d5d309a3"},{url:"https://www.memba.com/build/post.bundle.js?v=0.3.8",revision:"74a41f219ea2674314932a5c519f983f"},{url:"https://www.memba.com/build/search.bundle.js?v=0.3.8",revision:"83c12116376597d29145d54f6872cbe1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/cdn.kidoju.com/,new e.CacheFirst({cacheName:"Memba-Blog-runtime-assets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/www.memba.com(\/?$|\/[a-z]{2}($|\/))/,new e.StaleWhileRevalidate({cacheName:"Memba-Blog-runtime-content",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.initialize({})}));
