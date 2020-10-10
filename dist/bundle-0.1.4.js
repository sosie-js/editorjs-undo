!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Undo=e():t.Undo=e()}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e),n.d(e,"default",(function(){return s}));var o=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.holder=n,this.observer=null,this.debounceTimer=200,this.mutationDebouncer=this.debounce((function(){e()}),this.debounceTimer)}var e,n,o;return e=t,(n=[{key:"setMutationObserver",value:function(){var t=this,e=document.querySelector("#".concat(this.holder));this.observer=new MutationObserver((function(e){t.mutationHandler(e)})),this.observer.observe(e,{childList:!0,attributes:!0,subtree:!0,characterData:!0,characterDataOldValue:!0})}},{key:"mutationHandler",value:function(t){var e=this,n=!1;t.forEach((function(t){switch(t.type){case"childList":t.target.id===e.holder?e.onDestroy():n=!0;break;case"characterData":n=!0;break;case"attributes":t.target.classList.contains("ce-block")||(n=!0)}})),n&&this.mutationDebouncer()}},{key:"debounce",value:function(t,e){var n,i=this;return function(){for(var o=arguments.length,r=new Array(o),s=0;s<o;s++)r[s]=arguments[s];var a=i;clearTimeout(n),n=setTimeout((function(){return t.apply(a,r)}),e)}}},{key:"onDestroy",value:function(){var t=new CustomEvent("destroy");document.dispatchEvent(t),this.observer.disconnect()}}])&&i(e.prototype,n),o&&i(e,o),t}();function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var s=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i={maxLength:30,onUpdate:function(){}};this.editor=e.editor,this.shouldSaveHistory=!0,this.maxLength=e.maxLength?e.maxLength:i.maxLength,this.onUpdate=e.onUpdate?e.onUpdate:i.onUpdate,new o((function(){return n.registerChange()}),this.editor.configuration.holder).setMutationObserver(),this.setEventListeners(),this.initialItem=null,this.clear()}var e,n,i;return e=t,(n=[{key:"truncate",value:function(t,e){for(;t.length>e;)t.shift()}},{key:"initialize",value:function(t){var e="blocks"in t?t.blocks:t,n={index:e.length-1,state:e};this.stack[0]=n,this.initialItem=n}},{key:"clear",value:function(){this.stack=this.initialItem?[this.initialItem]:[{index:0,state:[]}],this.position=0,this.onUpdate()}},{key:"registerChange",value:function(){var t=this;this.editor&&this.editor.save&&this.shouldSaveHistory&&this.editor.save().then((function(e){t.editorDidUpdate(e.blocks)&&t.save(e.blocks)})),this.shouldSaveHistory=!0}},{key:"editorDidUpdate",value:function(t){var e=this.stack[this.position].state;return t.length!==e.length||JSON.stringify(e)!==JSON.stringify(t)}},{key:"save",value:function(t){this.position>=this.maxLength&&this.truncate(this.stack,this.maxLength),this.position=Math.min(this.position,this.stack.length-1),this.stack=this.stack.slice(0,this.position+1);var e=this.editor.blocks.getCurrentBlockIndex();this.stack.push({index:e,state:t}),this.position+=1,this.onUpdate()}},{key:"undo",value:function(){var t=this;if(this.canUndo()){this.shouldSaveHistory=!1;var e=this.stack[this.position-=1],n=e.index,i=e.state;this.onUpdate(),this.editor.blocks.render({blocks:i}).then((function(){return t.editor.caret.setToBlock(n,"end")}))}}},{key:"redo",value:function(){var t=this;if(this.canRedo()){this.shouldSaveHistory=!1;var e=this.stack[this.position+=1],n=e.index,i=e.state;this.onUpdate(),this.editor.blocks.render({blocks:i}).then((function(){return t.editor.caret.setToBlock(n,"end")}))}}},{key:"canUndo",value:function(){return this.position>0}},{key:"canRedo",value:function(){return this.position<this.count()}},{key:"count",value:function(){return this.stack.length-1}},{key:"setEventListeners",value:function(){var t=this,e=/(Mac)/i.test(navigator.platform)?"metaKey":"ctrlKey",n=function(n){n[e]&&"z"===n.key&&(n.preventDefault(),t.undo())},i=function(n){n[e]&&"y"===n.key&&(n.preventDefault(),t.redo())};document.addEventListener("keydown",n),document.addEventListener("keydown",i),document.addEventListener("destroy",(function(){document.removeEventListener("keydown",n),document.removeEventListener("keydown",i)}))}}])&&r(e.prototype,n),i&&r(e,i),t}()}]).default}));