!function(e){function t(t){for(var n,r,c=t[0],u=t[1],a=0,l=[];a<c.length;a++)r=c[a],o[r]&&l.push(o[r][0]),o[r]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(i&&i(t);l.length;)l.shift()()}var n={},o={0:0};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=c);var u,a=document.createElement("script");a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.src=function(e){return r.p+""+({1:"json/eventInfo",4:"json/speakers"}[e]||e)+".bundle.js"}(e),u=function(t){a.onerror=a.onload=null,clearTimeout(i);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+r+": "+c+")");u.type=r,u.request=c,n[1](u)}o[e]=void 0}};var i=setTimeout((function(){u({type:"timeout",target:a})}),12e4);a.onerror=a.onload=u,document.head.appendChild(a)}return Promise.all(t)},r.m=e,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.oe=function(e){throw console.error(e),e};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var i=u;r(r.s=4)}({4:function(e,t,n){"use strict";n.r(t);n(5);var o=document.querySelector(".header--main"),r=document.querySelector(".h1--eventtitle"),c=document.querySelector(".h2--eventsubtitle"),u=document.querySelector(".section--navbar"),a=document.querySelector(".div--eventessentials"),i=document.querySelector("#h2--about"),l=document.querySelector(".p--aboutDescription"),d=document.querySelector(".img--about"),s=document.querySelector(".div--firstspeakers"),p=document.querySelector(".div--collapsiblespeakers"),f=document.querySelector("#collapseButton"),m=document.querySelector(".div--ticketTypes"),y=document.querySelector(".div--partners"),v=document.querySelector("#featuredSpeakerTemplate").content,h=document.querySelector("#ticketTemplate").content,S=document.querySelector("#featuredPartnerTemplate").content,g=[],q=!0;window.onload=function(){n.e(1).then(n.t.bind(null,7,3)).then((function(e){var t=e.default;g=t,console.log(t),b(g),C(g),k(g),x(g),P(g),T(g)})),n.e(4).then(n.t.bind(null,3,3)).then((function(e){var t=e.default;w(t)}))},window.addEventListener("DOMContentLoaded",(function(){fetch("./images/calendar.svg").then((function(e){return e.text()})).then((function(e){document.querySelector("#calendarSvgContainer").insertAdjacentHTML("afterbegin",e)}))})),window.addEventListener("scroll",(function(e){window.scrollY<20?(u.classList.remove("onscrollHeight"),a.classList.remove("scrollDown")):(u.classList.add("onscrollHeight"),a.classList.add("scrollDown"))})),f.addEventListener("click",(function(e){q=!q,p.classList.toggle("collapsed"),f.textContent=q?"See more":"See less"}));var b=function(){document.documentElement.style.setProperty("--mainColor",g.mainEventColor),document.documentElement.style.setProperty("--secondaryColor",g.secondaryColor)},C=function(e){o.style.backgroundImage="url(".concat(e.coverPhoto,")"),document.title=e.eventTitle,r.textContent=e.eventTitle,c.textContent=e.eventTagline},k=function(e){i.textContent=e.descriptionHeader,l.innerHTML=e.description,d.src=e.aboutImage},w=function(e){e.slice(0,6).map((function(e){var t=v.cloneNode(!0).querySelector(".div--speakerfeatured");t.querySelector("img").src=e.speakerFeaturedImg,t.querySelector("h3").textContent=e.speakerName,t.querySelector("p").textContent=e.speakerPosition,s.appendChild(t)})),e.slice(6).map((function(e){var t=v.cloneNode(!0).querySelector(".div--speakerfeatured");t.querySelector("img").src=e.speakerFeaturedImg,t.querySelector("h3").textContent=e.speakerName,t.querySelector("p").textContent=e.speakerPosition,p.appendChild(t)}))},x=function(e){e.ticketTypes.map((function(e){var t=h.cloneNode(!0).querySelector(".div--ticketItem");t.querySelector("h3").textContent=e.ticketName,t.querySelector("p").textContent=e.ticketPrice,e.included.map((function(e){var n=document.createElement("li");n.textContent=e,t.appendChild(n)})),m.appendChild(t)}))},P=function(e){e.featuredPartners.map((function(e){var t=S.cloneNode(!0);t.querySelector(".img--partnerFeatured").style.backgroundImage="url(".concat(e.logo,")"),y.appendChild(t)}))},T=function(e){var t=e.venueName,n=e.location,o=e.hashtags;document.querySelector(".p--address").textContent="".concat(t,", ").concat(n),document.querySelector(".p--venuename").textContent=t,document.querySelector(".p--hashtag").textContent=o}},5:function(e,t,n){}});