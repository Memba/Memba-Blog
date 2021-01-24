/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-f3fe7154'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.setCacheNameDetails({
    prefix: "Memba-Blog"
  });
  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "http://localhost:3000/build/45733d9a7d356b0ebd29b3fbf814d971.woff",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/58dd427e8678175caafcb0e93e8dd1f2.jpg",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/6633a7f304db97a48be491c9778830f7.png",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/9c473da0183f170a51201086a3c84008.png",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/app-culture-en-es6.bundle.js?v=0.3.8",
    "revision": "85b1d1ce4490d6a28f95f4bfce615c76"
  }, {
    "url": "http://localhost:3000/build/app-culture-fr-es6.bundle.js?v=0.3.8",
    "revision": "2a9082ddbcc92105f50da23d10f9e3f1"
  }, {
    "url": "http://localhost:3000/build/app.theme.black.bundle.js?v=0.3.8",
    "revision": "b157ac5541f86303e988d7f5c39ef3f5"
  }, {
    "url": "http://localhost:3000/build/app.theme.bootstrap.bundle.js?v=0.3.8",
    "revision": "e1b452f95dd809268d913add42d7f9a2"
  }, {
    "url": "http://localhost:3000/build/app.theme.flat.bundle.js?v=0.3.8",
    "revision": "1ad541bf727d5bd701645640b502e0e0"
  }, {
    "url": "http://localhost:3000/build/app.theme.highcontrast.bundle.js?v=0.3.8",
    "revision": "cf66fb52e75d9aa978a8341f633d5d18"
  }, {
    "url": "http://localhost:3000/build/app.theme.indigo.bundle.js?v=0.3.8",
    "revision": "1c83c888448fd548e880045598056562"
  }, {
    "url": "http://localhost:3000/build/app.theme.memba.bundle.js?v=0.3.8",
    "revision": "9bb654964394a377da74863ddbd0e742"
  }, {
    "url": "http://localhost:3000/build/app.theme.nordic.bundle.js?v=0.3.8",
    "revision": "1494812468c693e486cf89fc921c55bf"
  }, {
    "url": "http://localhost:3000/build/app.theme.turquoise.bundle.js?v=0.3.8",
    "revision": "df121ce25f4fe1b0883a842d2463483c"
  }, {
    "url": "http://localhost:3000/build/app.theme.urban.bundle.js?v=0.3.8",
    "revision": "cbc88b404b04a9e77cab9b9410dd7bc3"
  }, {
    "url": "http://localhost:3000/build/app.theme.vintage.bundle.js?v=0.3.8",
    "revision": "533c99759a2782afab9684be1cc75fa6"
  }, {
    "url": "http://localhost:3000/build/common.bundle.js?v=0.3.8",
    "revision": "34575641b4485b1852b3cb97c1ee8e52"
  }, {
    "url": "http://localhost:3000/build/edc3513dbd94240c09d78c25e494d655.eot",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/error.bundle.js?v=0.3.8",
    "revision": "9f1f338983a80e44166988416ac1c80a"
  }, {
    "url": "http://localhost:3000/build/f818f00b6561cddc041075994b0d7470.ttf",
    "revision": null
  }, {
    "url": "http://localhost:3000/build/home.bundle.js?v=0.3.8",
    "revision": "0813e9abc3e2245525314637650117b4"
  }, {
    "url": "http://localhost:3000/build/init.bundle.js?v=0.3.8",
    "revision": "006ec63f164d02460c1915eea6ff63a1"
  }, {
    "url": "http://localhost:3000/build/page.bundle.js?v=0.3.8",
    "revision": "258802f10ecf3f6f6f807d85c77dcff6"
  }, {
    "url": "http://localhost:3000/build/post.bundle.js?v=0.3.8",
    "revision": "dfc6f981fbbd150559c87efe193863f2"
  }, {
    "url": "http://localhost:3000/build/search.bundle.js?v=0.3.8",
    "revision": "ebc819a1351dde856e59e149c11a7d64"
  }, {
    "url": "https://code.jquery.com/jquery-3.5.1.min.js"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(/^https:\/\/cdn.kidoju.com/, new workbox.CacheFirst({
    "cacheName": "Memba-Blog-runtime-assets",
    plugins: [new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 2592000,
      purgeOnQuotaError: true
    })]
  }), 'GET');
  workbox.registerRoute(/^http:\/\/localhost:3000(\/?$|\/[a-z]{2}($|\/))/, new workbox.StaleWhileRevalidate({
    "cacheName": "Memba-Blog-runtime-content",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com/, new workbox.StaleWhileRevalidate({
    "cacheName": "google-fonts-stylesheets",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com/, new workbox.CacheFirst({
    "cacheName": "google-fonts-webfonts",
    plugins: [new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 31536000,
      purgeOnQuotaError: true
    })]
  }), 'GET');
  workbox.initialize({});

});
