if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return b[e]||(s=new Promise(async s=>{if("document"in self){const b=document.createElement("script");b.src=e,document.head.appendChild(b),b.onload=s}else importScripts(e),s()})),s.then(()=>{if(!b[e])throw new Error(`Module ${e} didn’t register its module`);return b[e]})},s=(s,b)=>{Promise.all(s.map(e)).then(e=>b(1===e.length?e[0]:e))},b={require:Promise.resolve(s)};self.define=(s,t,a)=>{b[s]||(b[s]=Promise.resolve().then(()=>{let b={};const d={uri:location.origin+s.slice(1)};return Promise.all(t.map(s=>{switch(s){case"exports":return b;case"module":return d;default:return e(s)}})).then(e=>{const s=a(...e);return b.default||(b.default=s),b})}))}}define("./sw.js",["./workbox-77b59a61"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Memba-Blog"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://code.jquery.com/jquery-3.5.1.min.js"},{url:"https://www.memba.com/build/45733d9a7d356b0ebd29b3fbf814d971.woff",revision:"e811d21d46e69ff03a92761dd0b9f47e"},{url:"https://www.memba.com/build/58dd427e8678175caafcb0e93e8dd1f2.jpg",revision:"9e0bdff4970e28b99fd7c45d700c20fa"},{url:"https://www.memba.com/build/6633a7f304db97a48be491c9778830f7.png",revision:"cdfd82cd7caa66cfe027d1702b434bd9"},{url:"https://www.memba.com/build/9c473da0183f170a51201086a3c84008.png",revision:"cbb99b5861be0813c86d8b564e49a468"},{url:"https://www.memba.com/build/app-culture-en-es6.bundle.js?v=0.3.8",revision:"e1ae65864e25abd5cc0aa804d2c9c219"},{url:"https://www.memba.com/build/app-culture-fr-es6.bundle.js?v=0.3.8",revision:"9a1687c3e178346a417dcc5ab8fea3f5"},{url:"https://www.memba.com/build/app.theme.black.bundle.js?v=0.3.8",revision:"9c7202856eb0505ea6c77af032d0d13b"},{url:"https://www.memba.com/build/app.theme.bootstrap.bundle.js?v=0.3.8",revision:"8a6f88c7bc960c872923ded6f222e479"},{url:"https://www.memba.com/build/app.theme.flat.bundle.js?v=0.3.8",revision:"908445942da48bd96cf912b741faf7d1"},{url:"https://www.memba.com/build/app.theme.highcontrast.bundle.js?v=0.3.8",revision:"f7a9ba2c08b800a7fa7dcfb036660094"},{url:"https://www.memba.com/build/app.theme.indigo.bundle.js?v=0.3.8",revision:"f85c9d5555a0098945de1de8eb1aab31"},{url:"https://www.memba.com/build/app.theme.memba.bundle.js?v=0.3.8",revision:"295cf37714ebe07df49e537097af254c"},{url:"https://www.memba.com/build/app.theme.nordic.bundle.js?v=0.3.8",revision:"cb7d00866fa94ed2de3e5336710788f0"},{url:"https://www.memba.com/build/app.theme.turquoise.bundle.js?v=0.3.8",revision:"e0706fa875e0bc128fb255fdba1ba818"},{url:"https://www.memba.com/build/app.theme.urban.bundle.js?v=0.3.8",revision:"d405f5f39dc25c2d53d04834df09a4b5"},{url:"https://www.memba.com/build/app.theme.vintage.bundle.js?v=0.3.8",revision:"21ad3b62ec8a7492435110336a1a0d67"},{url:"https://www.memba.com/build/common.bundle.js?v=0.3.8",revision:"af093f99bd2e1f500c97718260af9893"},{url:"https://www.memba.com/build/edc3513dbd94240c09d78c25e494d655.eot",revision:"06c0e4eee47149717c20a979ffb49b61"},{url:"https://www.memba.com/build/error.bundle.js?v=0.3.8",revision:"6334ceae804c17fa8d0961d2b64a258b"},{url:"https://www.memba.com/build/f818f00b6561cddc041075994b0d7470.ttf",revision:"f0e822cb280b38eaa00d74d242a837f9"},{url:"https://www.memba.com/build/home.bundle.js?v=0.3.8",revision:"d72c2fbb24bcd085e2c59efc02e1c66e"},{url:"https://www.memba.com/build/init.bundle.js?v=0.3.8",revision:"336d203ef84892364814132c36356adb"},{url:"https://www.memba.com/build/page.bundle.js?v=0.3.8",revision:"0882154101bf5343f6c181b1e3175d1b"},{url:"https://www.memba.com/build/post.bundle.js?v=0.3.8",revision:"f5eef61973ac7c4ef036f4ef669df4e9"},{url:"https://www.memba.com/build/search.bundle.js?v=0.3.8",revision:"c77c5598f9c848eb79cf7abd995361e6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/cdn.kidoju.com/,new e.CacheFirst({cacheName:"Memba-Blog-runtime-assets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/www.memba.com(\/?$|\/[a-z]{2}($|\/))/,new e.StaleWhileRevalidate({cacheName:"Memba-Blog-runtime-content",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.initialize({})}));
