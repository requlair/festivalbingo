if(!self.define){let e,i={};const s=(s,f)=>(s=new URL(s+".js",f).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(f,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const a=e=>s(e,n),c={module:{uri:n},exports:o,require:a};i[n]=Promise.all(f.map((e=>c[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-12691204.js",revision:null},{url:"assets/index-45accf07.css",revision:null},{url:"index.html",revision:"30926c345afb3b05b4e15829f4b6cf8d"},{url:"registerSW.js",revision:"11bcd4ec60ac67655003cf5141ca4c41"},{url:"favicon.ico",revision:"e9456e5b4e8c4a8b9175f93f50c155f2"},{url:"apple-touch-icon.png",revision:"06481d4dde2bbb1b809fd4d2a04aef44"},{url:"images/festival-header.png",revision:"078d7e34efe4e0b7099f320f3b17490b"},{url:"images/paaspop-header.png",revision:"852f27c2213d79ec1153218365209701"},{url:"images/lowlands-header.png",revision:"de7fcad6826f59bfdc28bfc4fca1386d"},{url:"images/lowlands-logo.png",revision:"19e1228eb5f2188394ea9fef66094be7"},{url:"images/paaspop-logo.png",revision:"ed5a0776facc699bcb98d3ea0f2f6fd0"},{url:"images/festival-logo.png",revision:"6bcde98b669e911212eb4da7845d728e"},{url:"fonts/BeatsterDemo-KLMA.ttf",revision:"ce153fba7fd5904956a7c3ea19c51cdb"},{url:"fonts/Recoleta-Regular.otf",revision:"dc2877447e78bbe347fc57e5f2d32302"},{url:"fonts/LL22-HvH-Pixel-Regular.ttf",revision:"4abe3d9aa249beb7f681962602971543"},{url:"pwa-192x192.png",revision:"89b56fb3a7808b04f0c61209f0ff23a2"},{url:"pwa-512x512.png",revision:"c2f8fa0db26252e641fcc71fd35798e6"},{url:"manifest.webmanifest",revision:"41eaf1435f3462235eae37477797a0f6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
