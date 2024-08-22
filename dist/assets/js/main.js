document.querySelectorAll(".swatch__button").forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),(async t=>{try{await navigator.clipboard.writeText(t);let e=document.querySelector(".toaster");e||(e=document.createElement("div"),e.classList.add("toaster"),document.querySelector("body").appendChild(e));let n=document.createElement("div");n.classList.add("toaster__toast"),n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true"),n.innerHTML="Copied!",e.appendChild(n);let o=e.lastChild;window.setTimeout((()=>{o.classList.add("fade-out"),window.setTimeout((()=>{o.remove()}),500)}),3e3)}catch(t){console.error("Failed to copy: ",t)}})(t.currentTarget.dataset.copyText)}))})),(()=>{"use strict";const t=Math.min,e=Math.max,n=Math.round,o=(Math.floor,t=>({x:t,y:t})),i={left:"right",right:"left",bottom:"top",top:"bottom"},r={start:"end",end:"start"};function l(t,e){return"function"==typeof t?t(e):t}function c(t){return t.split("-")[0]}function a(t){return t.split("-")[1]}function s(t){return"y"===t?"height":"width"}function f(t){return["top","bottom"].includes(c(t))?"y":"x"}function u(t){return"x"===f(t)?"y":"x"}function d(t){return t.replace(/start|end/g,(t=>r[t]))}function p(t){return t.replace(/left|right|bottom|top/g,(t=>i[t]))}function h(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function m(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function g(t,e,n){let{reference:o,floating:i}=t;const r=f(e),l=u(e),d=s(l),p=c(e),h="y"===r,m=o.x+o.width/2-i.width/2,g=o.y+o.height/2-i.height/2,y=o[d]/2-i[d]/2;let w;switch(p){case"top":w={x:m,y:o.y-i.height};break;case"bottom":w={x:m,y:o.y+o.height};break;case"right":w={x:o.x+o.width,y:g};break;case"left":w={x:o.x-i.width,y:g};break;default:w={x:o.x,y:o.y}}switch(a(e)){case"start":w[l]-=y*(n&&h?-1:1);break;case"end":w[l]+=y*(n&&h?-1:1)}return w}function y(n){const o=t(...n.map((t=>t.left))),i=t(...n.map((t=>t.top)));return{x:o,y:i,width:e(...n.map((t=>t.right)))-o,height:e(...n.map((t=>t.bottom)))-i}}function w(t){return b(t)?(t.nodeName||"").toLowerCase():"#document"}function x(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function v(t){var e;return null==(e=(b(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function b(t){return t instanceof Node||t instanceof x(t).Node}function R(t){return t instanceof Element||t instanceof x(t).Element}function L(t){return t instanceof HTMLElement||t instanceof x(t).HTMLElement}function T(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof x(t).ShadowRoot)}function E(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=P(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function A(t){return["table","td","th"].includes(w(t))}function S(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function C(t){const e=D(),n=R(t)?P(t):t;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function D(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function O(t){return["html","body","#document"].includes(w(t))}function P(t){return x(t).getComputedStyle(t)}function k(t){return R(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function F(t){if("html"===w(t))return t;const e=t.assignedSlot||t.parentNode||T(t)&&t.host||v(t);return T(e)?e.host:e}function H(t){const e=F(t);return O(e)?t.ownerDocument?t.ownerDocument.body:t.body:L(e)&&E(e)?e:H(e)}function W(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const i=H(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=x(i);if(r){const t=_(l);return e.concat(l,l.visualViewport||[],E(i)?i:[],t&&n?W(t):[])}return e.concat(i,W(i,[],n))}function _(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function B(t){const e=P(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=L(t),l=r?t.offsetWidth:o,c=r?t.offsetHeight:i,a=n(o)!==l||n(i)!==c;return a&&(o=l,i=c),{width:o,height:i,$:a}}function V(t){return R(t)?t:t.contextElement}function M(t){const e=V(t);if(!L(e))return o(1);const i=e.getBoundingClientRect(),{width:r,height:l,$:c}=B(e);let a=(c?n(i.width):i.width)/r,s=(c?n(i.height):i.height)/l;return a&&Number.isFinite(a)||(a=1),s&&Number.isFinite(s)||(s=1),{x:a,y:s}}const N=o(0);function $(t){const e=x(t);return D()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:N}function q(t,e,n,i){void 0===e&&(e=!1),void 0===n&&(n=!1);const r=t.getBoundingClientRect(),l=V(t);let c=o(1);e&&(i?R(i)&&(c=M(i)):c=M(t));const a=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==x(t))&&e}(l,n,i)?$(l):o(0);let s=(r.left+a.x)/c.x,f=(r.top+a.y)/c.y,u=r.width/c.x,d=r.height/c.y;if(l){const t=x(l),e=i&&R(i)?x(i):i;let n=t,o=_(n);for(;o&&i&&e!==n;){const t=M(o),e=o.getBoundingClientRect(),i=P(o),r=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,l=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;s*=t.x,f*=t.y,u*=t.x,d*=t.y,s+=r,f+=l,n=x(o),o=_(n)}}return m({width:u,height:d,x:s,y:f})}function j(t){return q(v(t)).left+k(t).scrollLeft}function X(t,n,i){let r;if("viewport"===n)r=function(t,e){const n=x(t),o=v(t),i=n.visualViewport;let r=o.clientWidth,l=o.clientHeight,c=0,a=0;if(i){r=i.width,l=i.height;const t=D();(!t||t&&"fixed"===e)&&(c=i.offsetLeft,a=i.offsetTop)}return{width:r,height:l,x:c,y:a}}(t,i);else if("document"===n)r=function(t){const n=v(t),o=k(t),i=t.ownerDocument.body,r=e(n.scrollWidth,n.clientWidth,i.scrollWidth,i.clientWidth),l=e(n.scrollHeight,n.clientHeight,i.scrollHeight,i.clientHeight);let c=-o.scrollLeft+j(t);const a=-o.scrollTop;return"rtl"===P(i).direction&&(c+=e(n.clientWidth,i.clientWidth)-r),{width:r,height:l,x:c,y:a}}(v(t));else if(R(n))r=function(t,e){const n=q(t,!0,"fixed"===e),i=n.top+t.clientTop,r=n.left+t.clientLeft,l=L(t)?M(t):o(1);return{width:t.clientWidth*l.x,height:t.clientHeight*l.y,x:r*l.x,y:i*l.y}}(n,i);else{const e=$(t);r={...n,x:n.x-e.x,y:n.y-e.y}}return m(r)}function Y(t,e){const n=F(t);return!(n===e||!R(n)||O(n))&&("fixed"===P(n).position||Y(n,e))}function z(t,e,n){const i=L(e),r=v(e),l="fixed"===n,c=q(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const s=o(0);if(i||!i&&!l)if(("body"!==w(e)||E(r))&&(a=k(e)),i){const t=q(e,!0,l,e);s.x=t.x+e.clientLeft,s.y=t.y+e.clientTop}else r&&(s.x=j(r));return{x:c.left+a.scrollLeft-s.x,y:c.top+a.scrollTop-s.y,width:c.width,height:c.height}}function G(t){return"static"===P(t).position}function I(t,e){return L(t)&&"fixed"!==P(t).position?e?e(t):t.offsetParent:null}function J(t,e){const n=x(t);if(S(t))return n;if(!L(t)){let e=F(t);for(;e&&!O(e);){if(R(e)&&!G(e))return e;e=F(e)}return n}let o=I(t,e);for(;o&&A(o)&&G(o);)o=I(o,e);return o&&O(o)&&G(o)&&!C(o)?n:o||function(t){let e=F(t);for(;L(e)&&!O(e);){if(C(e))return e;if(S(e))return null;e=F(e)}return null}(t)||n}const K={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:i,strategy:r}=t;const l="fixed"===r,c=v(i),a=!!e&&S(e.floating);if(i===c||a&&l)return n;let s={scrollLeft:0,scrollTop:0},f=o(1);const u=o(0),d=L(i);if((d||!d&&!l)&&(("body"!==w(i)||E(c))&&(s=k(i)),L(i))){const t=q(i);f=M(i),u.x=t.x+i.clientLeft,u.y=t.y+i.clientTop}return{width:n.width*f.x,height:n.height*f.y,x:n.x*f.x-s.scrollLeft*f.x+u.x,y:n.y*f.y-s.scrollTop*f.y+u.y}},getDocumentElement:v,getClippingRect:function(n){let{element:o,boundary:i,rootBoundary:r,strategy:l}=n;const c=[..."clippingAncestors"===i?S(o)?[]:function(t,e){const n=e.get(t);if(n)return n;let o=W(t,[],!1).filter((t=>R(t)&&"body"!==w(t))),i=null;const r="fixed"===P(t).position;let l=r?F(t):t;for(;R(l)&&!O(l);){const e=P(l),n=C(l);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||E(l)&&!n&&Y(t,l))?o=o.filter((t=>t!==l)):i=e,l=F(l)}return e.set(t,o),o}(o,this._c):[].concat(i),r],a=c[0],s=c.reduce(((n,i)=>{const r=X(o,i,l);return n.top=e(r.top,n.top),n.right=t(r.right,n.right),n.bottom=t(r.bottom,n.bottom),n.left=e(r.left,n.left),n}),X(o,a,l));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}},getOffsetParent:J,getElementRects:async function(t){const e=this.getOffsetParent||J,n=this.getDimensions,o=await n(t.floating);return{reference:z(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:n}=B(t);return{width:e,height:n}},getScale:M,isElement:R,isRTL:function(t){return"rtl"===P(t).direction}},Q=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:s,middlewareData:u}=e,d=await async function(t,e){const{placement:n,platform:o,elements:i}=t,r=await(null==o.isRTL?void 0:o.isRTL(i.floating)),s=c(n),u=a(n),d="y"===f(n),p=["left","top"].includes(s)?-1:1,h=r&&d?-1:1,m=l(e,t);let{mainAxis:g,crossAxis:y,alignmentAxis:w}="number"==typeof m?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...m};return u&&"number"==typeof w&&(y="end"===u?-1*w:w),d?{x:y*h,y:g*p}:{x:g*p,y:y*h}}(e,t);return s===(null==(n=u.offset)?void 0:n.placement)&&null!=(o=u.arrow)&&o.alignmentOffset?{}:{x:i+d.x,y:r+d.y,data:{...d,placement:s}}}}},U=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:g,initialPlacement:y,platform:w,elements:x}=e,{mainAxis:v=!0,crossAxis:b=!0,fallbackPlacements:R,fallbackStrategy:L="bestFit",fallbackAxisSideDirection:T="none",flipAlignment:E=!0,...A}=l(t,e);if(null!=(n=r.arrow)&&n.alignmentOffset)return{};const S=c(i),C=f(y),D=c(y)===y,O=await(null==w.isRTL?void 0:w.isRTL(x.floating)),P=R||(D||!E?[p(y)]:function(t){const e=p(t);return[d(t),e,d(e)]}(y)),k="none"!==T;!R&&k&&P.push(...function(t,e,n,o){const i=a(t);let r=function(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],l=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:l;default:return[]}}(c(t),"start"===n,o);return i&&(r=r.map((t=>t+"-"+i)),e&&(r=r.concat(r.map(d)))),r}(y,E,T,O));const F=[y,...P],H=await async function(t,e){var n;void 0===e&&(e={});const{x:o,y:i,platform:r,rects:c,elements:a,strategy:s}=t,{boundary:f="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:p=!1,padding:g=0}=l(e,t),y=h(g),w=a[p?"floating"===d?"reference":"floating":d],x=m(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(w)))||n?w:w.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:f,rootBoundary:u,strategy:s})),v="floating"===d?{x:o,y:i,width:c.floating.width,height:c.floating.height}:c.reference,b=await(null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),R=await(null==r.isElement?void 0:r.isElement(b))&&await(null==r.getScale?void 0:r.getScale(b))||{x:1,y:1},L=m(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:b,strategy:s}):v);return{top:(x.top-L.top+y.top)/R.y,bottom:(L.bottom-x.bottom+y.bottom)/R.y,left:(x.left-L.left+y.left)/R.x,right:(L.right-x.right+y.right)/R.x}}(e,A),W=[];let _=(null==(o=r.flip)?void 0:o.overflows)||[];if(v&&W.push(H[S]),b){const t=function(t,e,n){void 0===n&&(n=!1);const o=a(t),i=u(t),r=s(i);let l="x"===i?o===(n?"end":"start")?"right":"left":"start"===o?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=p(l)),[l,p(l)]}(i,g,O);W.push(H[t[0]],H[t[1]])}if(_=[..._,{placement:i,overflows:W}],!W.every((t=>t<=0))){var B,V;const t=((null==(B=r.flip)?void 0:B.index)||0)+1,e=F[t];if(e)return{data:{index:t,overflows:_},reset:{placement:e}};let n=null==(V=_.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:V.placement;if(!n)switch(L){case"bestFit":{var M;const t=null==(M=_.filter((t=>{if(k){const e=f(t.placement);return e===C||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:M[0];t&&(n=t);break}case"initialPlacement":n=y}if(i!==n)return{reset:{placement:n}}}return{}}}},Z=n=>({name:"arrow",options:n,async fn(o){const{x:i,y:r,placement:c,rects:f,platform:d,elements:p,middlewareData:m}=o,{element:g,padding:y=0}=l(n,o)||{};if(null==g)return{};const w=h(y),x={x:i,y:r},v=u(c),b=s(v),R=await d.getDimensions(g),L="y"===v,T=L?"top":"left",E=L?"bottom":"right",A=L?"clientHeight":"clientWidth",S=f.reference[b]+f.reference[v]-x[v]-f.floating[b],C=x[v]-f.reference[v],D=await(null==d.getOffsetParent?void 0:d.getOffsetParent(g));let O=D?D[A]:0;O&&await(null==d.isElement?void 0:d.isElement(D))||(O=p.floating[A]||f.floating[b]);const P=S/2-C/2,k=O/2-R[b]/2-1,F=t(w[T],k),H=t(w[E],k),W=F,_=O-R[b]-H,B=O/2-R[b]/2+P,V=e(W,t(B,_)),M=!m.arrow&&null!=a(c)&&B!==V&&f.reference[b]/2-(B<W?F:H)-R[b]/2<0,N=M?B<W?B-W:B-_:0;return{[v]:x[v]+N,data:{[v]:V,centerOffset:B-V-N,...M&&{alignmentOffset:N}},reset:M}}});let tt=document.querySelectorAll(".tooltip__trigger"),et=function(t){t.style.display="none"},nt=function(t,e){e.style.display="block",ot(t,e)},ot=function(n,o){let i=o.querySelector(".tooltip__arrow"),r="top";var a;o.dataset.placement&&(r=o.dataset.placement),((t,e,n)=>{const o=new Map,i={platform:K,...n},r={...i.platform,_c:o};return(async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,c=r.filter(Boolean),a=await(null==l.isRTL?void 0:l.isRTL(e));let s=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:u}=g(s,o,a),d=o,p={},h=0;for(let n=0;n<c.length;n++){const{name:r,fn:m}=c[n],{x:y,y:w,data:x,reset:v}=await m({x:f,y:u,initialPlacement:o,placement:d,strategy:i,middlewareData:p,rects:s,platform:l,elements:{reference:t,floating:e}});f=null!=y?y:f,u=null!=w?w:u,p={...p,[r]:{...p[r],...x}},v&&h<=50&&(h++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(s=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:i}):v.rects),({x:f,y:u}=g(s,d,a))),n=-1)}return{x:f,y:u,placement:d,strategy:i,middlewareData:p}})(t,e,{...i,platform:r})})(n,o,{placement:r,middleware:[U(),(void 0===a&&(a={}),{name:"inline",options:a,async fn(n){const{placement:o,elements:i,rects:r,platform:s,strategy:u}=n,{padding:d=2,x:p,y:g}=l(a,n),w=Array.from(await(null==s.getClientRects?void 0:s.getClientRects(i.reference))||[]),x=function(t){const e=t.slice().sort(((t,e)=>t.y-e.y)),n=[];let o=null;for(let t=0;t<e.length;t++){const i=e[t];!o||i.y-o.y>o.height/2?n.push([i]):n[n.length-1].push(i),o=i}return n.map((t=>m(y(t))))}(w),v=m(y(w)),b=h(d),R=await s.getElementRects({reference:{getBoundingClientRect:function(){if(2===x.length&&x[0].left>x[1].right&&null!=p&&null!=g)return x.find((t=>p>t.left-b.left&&p<t.right+b.right&&g>t.top-b.top&&g<t.bottom+b.bottom))||v;if(x.length>=2){if("y"===f(o)){const t=x[0],e=x[x.length-1],n="top"===c(o),i=t.top,r=e.bottom,l=n?t.left:e.left,a=n?t.right:e.right;return{top:i,bottom:r,left:l,right:a,width:a-l,height:r-i,x:l,y:i}}const n="left"===c(o),i=e(...x.map((t=>t.right))),r=t(...x.map((t=>t.left))),l=x.filter((t=>n?t.left===r:t.right===i)),a=l[0].top,s=l[l.length-1].bottom;return{top:a,bottom:s,left:r,right:i,width:i-r,height:s-a,x:r,y:a}}return v}},floating:i.floating,strategy:u});return r.reference.x!==R.reference.x||r.reference.y!==R.reference.y||r.reference.width!==R.reference.width||r.reference.height!==R.reference.height?{reset:{rects:R}}:{}}}),Q(8),Z({element:i})]}).then((({x:t,y:e,placement:n,middlewareData:r})=>{Object.assign(o.style,{left:`${t}px`,top:`${e}px`});const{x:l,y:c}=r.arrow,a={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];Object.assign(i.style,{left:null!=l?`${l}px`:"",top:null!=c?`${c}px`:"",right:"",bottom:"",[a]:"-4px"})}))};tt.forEach((t=>{let e=t,n=t.nextElementSibling;e.addEventListener("mouseenter",(()=>{nt(e,n)})),e.addEventListener("focus",(()=>{nt(e,n)})),e.addEventListener("mouseleave",(()=>{et(n)})),e.addEventListener("blur",(()=>{et(n)}))}))})();