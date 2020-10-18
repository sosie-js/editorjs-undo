!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Undo=t():e.Undo=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(1)),o=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e,t,n){var i=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||r.default)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[i+s]=a[s];return t||(0,o.default)(a)};t.default=a,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!r)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(o)};var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),o=new Uint8Array(16);e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);var i=function(e,t){var n=t||0,o=r;return[o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]]].join("")};t.default=i,e.exports=t.default},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));var r=n(0),o=n.n(r);function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}!function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.holder=n,this.observer=null,this.debounceTimer=200,this.mutationDebouncer=this.debounce((function(){t()}),this.debounceTimer)}var t,n,r;return t=e,(n=[{key:"setMutationObserver",value:function(){var e=this,t="string"==typeof this.holder?document.querySelector("#".concat(this.holder)):this.holder;this.observer=new MutationObserver((function(t){e.mutationHandler(t)})),this.observer.observe(t,{childList:!0,attributes:!0,subtree:!0,characterData:!0,characterDataOldValue:!0})}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"mutationHandler",value:function(e){var t=this;if(!this.disabled){var n=!1,r={wrapper:"ce-block",wrapperStretched:"ce-block--stretched",content:"ce-block__content",focused:"ce-block--focused",selected:"ce-block--selected",dropTarget:"ce-block--drop-target"},i=new Set;if(e.forEach((function(e){var a=e.target,s="."+r.wrapper;function u(e,t){var n;if("add"===t)return Array.from(e.addedNodes).find((function(e){return e.classList.contains(r.wrapper)}));if("remove"===t)return Array.from(e.removedNodes).find((function(e){return e.classList.contains(r.wrapper)}));var o=e.target;return o instanceof Text?null===(n=o.parentElement)||void 0===n?void 0:n.closest(s):o instanceof Element?o.querySelector(s)||o.closest(s):null}var c=!1,d=!1;switch(e.type){case"childList":e.target.id===t.holder?t.onDestroy():n=!0,c=!0;break;case"characterData":d=!0,n=!0;break;case"attributes":e.target.classList.contains("ce-block")||(n=!0)}if(c||d){var l=function(e){var t=function(e){return e instanceof Element&&e.classList.contains(r.wrapper)};return Array.from(e.removedNodes).find(t)?"remove":Array.from(e.addedNodes).find(t)?"add":"update"}(e),f=e.type;switch(e.type){case"childList":case"characterData":var h=u(e,l);if(h){var v=h.dataset.blockId||o()();h.dataset.blockId||h.setAttribute("data-block-id",v),i.add({blockId:v,mutType:f,changeType:l,blockElement:h})}break;case"attributes":if(!a.classList.contains(r.wrapper)){var p=u(e,l);if(p){var b=p.dataset.blockId||o()();p.dataset.blockId||p.setAttribute("data-block-id",b),i.add({blockId:b,mutType:f,changeType:l,blockElement:p})}break}}}})),n){if(i.size>0){var a=new CustomEvent("changeBlocks",{cancelable:!0,detail:{changed:i}});document.dispatchEvent(a)}this.mutationDebouncer()}}}},{key:"debounce",value:function(e,t){var n,r=this;return function(){for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];var s=r;clearTimeout(n),n=setTimeout((function(){return e.apply(s,i)}),t)}}},{key:"onDestroy",value:function(){var e=new CustomEvent("destroy");document.dispatchEvent(e),this.observer.disconnect()}}])&&i(t.prototype,n),r&&i(t,r),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var r={maxLength:30,onUpdate:function(){}};this.editor=t.editor,this.shouldSaveHistory=!0,this.maxLength=t.maxLength?t.maxLength:r.maxLength,this.onUpdate=t.onUpdate?t.onUpdate:r.onUpdate;var o=new a((function(){return n.registerChange()}),this.editor.configuration.holder);this.disable=function(){o.disable()},this.enable=function(){o.enable()},o.setMutationObserver(),this.setEventListeners(),this.initialItem=null,this.clear()}var t,n,r;return t=e,(n=[{key:"truncate",value:function(e,t){for(;e.length>t;)e.shift()}},{key:"initialize",value:function(e){var t="blocks"in e?e.blocks:e,n={index:t.length-1,state:t};this.stack[0]=n,this.initialItem=n}},{key:"clear",value:function(){this.stack=this.initialItem?[this.initialItem]:[{index:0,state:[]}],this.position=0,this.onUpdate()}},{key:"registerChange",value:function(){var t=this;this.editor&&this.editor.save&&this.shouldSaveHistory&&(e.disable(),this.editor.save().then((function(n){t.editorDidUpdate(n.blocks)&&t.save(n.blocks),e.enable()}))),this.shouldSaveHistory=!0}},{key:"editorDidUpdate",value:function(e){var t=this.stack[this.position].state;return e.length!==t.length||JSON.stringify(t)!==JSON.stringify(e)}},{key:"save",value:function(e){this.position>=this.maxLength&&this.truncate(this.stack,this.maxLength),this.position=Math.min(this.position,this.stack.length-1),this.stack=this.stack.slice(0,this.position+1);var t=this.editor.blocks.getCurrentBlockIndex();this.stack.push({index:t,state:e}),this.position+=1,this.onUpdate()}},{key:"undo",value:function(){var e=this;if(this.canUndo()){this.shouldSaveHistory=!1;var t=this.stack[this.position-=1],n=t.index,r=t.state;this.onUpdate(),this.editor.blocks.render({blocks:r}).then((function(){return e.editor.caret.setToBlock(n,"end")}))}}},{key:"redo",value:function(){var e=this;if(this.canRedo()){this.shouldSaveHistory=!1;var t=this.stack[this.position+=1],n=t.index,r=t.state;this.onUpdate(),this.editor.blocks.render({blocks:r}).then((function(){return e.editor.caret.setToBlock(n,"end")}))}}},{key:"canUndo",value:function(){return this.position>0}},{key:"canRedo",value:function(){return this.position<this.count()}},{key:"count",value:function(){return this.stack.length-1}},{key:"setEventListeners",value:function(){var e=this,t=/(Mac)/i.test(navigator.platform)?"metaKey":"ctrlKey",n=function(n){n[t]&&"z"===n.key&&(n.preventDefault(),e.undo())},r=function(n){n[t]&&"y"===n.key&&(n.preventDefault(),e.redo())};document.addEventListener("keydown",n),document.addEventListener("keydown",r),document.addEventListener("destroy",(function(){document.removeEventListener("keydown",n),document.removeEventListener("keydown",r)}))}}])&&s(t.prototype,n),r&&s(t,r),e}()}]).default}));