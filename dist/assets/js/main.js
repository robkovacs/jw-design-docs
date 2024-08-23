document.querySelectorAll(".swatch__button").forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),(async t=>{try{await navigator.clipboard.writeText(t);let e=document.querySelector(".toaster");e||(e=document.createElement("div"),e.classList.add("toaster"),document.querySelector("body").appendChild(e));let n=document.createElement("div");n.classList.add("toaster__toast"),n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true"),n.innerHTML="Copied!",e.appendChild(n);let o=e.lastChild;window.setTimeout((()=>{o.classList.add("fade-out"),window.setTimeout((()=>{o.remove()}),500)}),3e3)}catch(t){console.error("Failed to copy: ",t)}})(t.currentTarget.dataset.copyText)}))})),(()=>{"use strict";const t=Math.min,e=Math.max,n=Math.round,o=(Math.floor,t=>({x:t,y:t})),i={left:"right",right:"left",bottom:"top",top:"bottom"},r={start:"end",end:"start"};function l(n,o,i){return e(n,t(o,i))}function c(t,e){return"function"==typeof t?t(e):t}function a(t){return t.split("-")[0]}function s(t){return t.split("-")[1]}function f(t){return"x"===t?"y":"x"}function u(t){return"y"===t?"height":"width"}function d(t){return["top","bottom"].includes(a(t))?"y":"x"}function p(t){return f(d(t))}function h(t){return t.replace(/start|end/g,(t=>r[t]))}function m(t){return t.replace(/left|right|bottom|top/g,(t=>i[t]))}function g(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function y(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function w(t,e,n){let{reference:o,floating:i}=t;const r=d(e),l=p(e),c=u(l),f=a(e),h="y"===r,m=o.x+o.width/2-i.width/2,g=o.y+o.height/2-i.height/2,y=o[c]/2-i[c]/2;let w;switch(f){case"top":w={x:m,y:o.y-i.height};break;case"bottom":w={x:m,y:o.y+o.height};break;case"right":w={x:o.x+o.width,y:g};break;case"left":w={x:o.x-i.width,y:g};break;default:w={x:o.x,y:o.y}}switch(s(e)){case"start":w[l]-=y*(n&&h?-1:1);break;case"end":w[l]+=y*(n&&h?-1:1)}return w}async function x(t,e){var n;void 0===e&&(e={});const{x:o,y:i,platform:r,rects:l,elements:a,strategy:s}=t,{boundary:f="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:p=!1,padding:h=0}=c(e,t),m=g(h),w=a[p?"floating"===d?"reference":"floating":d],x=y(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(w)))||n?w:w.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:f,rootBoundary:u,strategy:s})),v="floating"===d?{x:o,y:i,width:l.floating.width,height:l.floating.height}:l.reference,b=await(null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),R=await(null==r.isElement?void 0:r.isElement(b))&&await(null==r.getScale?void 0:r.getScale(b))||{x:1,y:1},L=y(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:b,strategy:s}):v);return{top:(x.top-L.top+m.top)/R.y,bottom:(L.bottom-x.bottom+m.bottom)/R.y,left:(x.left-L.left+m.left)/R.x,right:(L.right-x.right+m.right)/R.x}}function v(n){const o=t(...n.map((t=>t.left))),i=t(...n.map((t=>t.top)));return{x:o,y:i,width:e(...n.map((t=>t.right)))-o,height:e(...n.map((t=>t.bottom)))-i}}function b(t){return T(t)?(t.nodeName||"").toLowerCase():"#document"}function R(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function L(t){var e;return null==(e=(T(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function T(t){return t instanceof Node||t instanceof R(t).Node}function E(t){return t instanceof Element||t instanceof R(t).Element}function A(t){return t instanceof HTMLElement||t instanceof R(t).HTMLElement}function S(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof R(t).ShadowRoot)}function C(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=H(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function D(t){return["table","td","th"].includes(b(t))}function O(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function P(t){const e=k(),n=E(t)?H(t):t;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function k(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function F(t){return["html","body","#document"].includes(b(t))}function H(t){return R(t).getComputedStyle(t)}function W(t){return E(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function _(t){if("html"===b(t))return t;const e=t.assignedSlot||t.parentNode||S(t)&&t.host||L(t);return S(e)?e.host:e}function B(t){const e=_(t);return F(e)?t.ownerDocument?t.ownerDocument.body:t.body:A(e)&&C(e)?e:B(e)}function V(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const i=B(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=R(i);if(r){const t=M(l);return e.concat(l,l.visualViewport||[],C(i)?i:[],t&&n?V(t):[])}return e.concat(i,V(i,[],n))}function M(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function N(t){const e=H(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=A(t),l=r?t.offsetWidth:o,c=r?t.offsetHeight:i,a=n(o)!==l||n(i)!==c;return a&&(o=l,i=c),{width:o,height:i,$:a}}function $(t){return E(t)?t:t.contextElement}function q(t){const e=$(t);if(!A(e))return o(1);const i=e.getBoundingClientRect(),{width:r,height:l,$:c}=N(e);let a=(c?n(i.width):i.width)/r,s=(c?n(i.height):i.height)/l;return a&&Number.isFinite(a)||(a=1),s&&Number.isFinite(s)||(s=1),{x:a,y:s}}const j=o(0);function X(t){const e=R(t);return k()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:j}function Y(t,e,n,i){void 0===e&&(e=!1),void 0===n&&(n=!1);const r=t.getBoundingClientRect(),l=$(t);let c=o(1);e&&(i?E(i)&&(c=q(i)):c=q(t));const a=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==R(t))&&e}(l,n,i)?X(l):o(0);let s=(r.left+a.x)/c.x,f=(r.top+a.y)/c.y,u=r.width/c.x,d=r.height/c.y;if(l){const t=R(l),e=i&&E(i)?R(i):i;let n=t,o=M(n);for(;o&&i&&e!==n;){const t=q(o),e=o.getBoundingClientRect(),i=H(o),r=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,l=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;s*=t.x,f*=t.y,u*=t.x,d*=t.y,s+=r,f+=l,n=R(o),o=M(n)}}return y({width:u,height:d,x:s,y:f})}function z(t){return Y(L(t)).left+W(t).scrollLeft}function G(t,n,i){let r;if("viewport"===n)r=function(t,e){const n=R(t),o=L(t),i=n.visualViewport;let r=o.clientWidth,l=o.clientHeight,c=0,a=0;if(i){r=i.width,l=i.height;const t=k();(!t||t&&"fixed"===e)&&(c=i.offsetLeft,a=i.offsetTop)}return{width:r,height:l,x:c,y:a}}(t,i);else if("document"===n)r=function(t){const n=L(t),o=W(t),i=t.ownerDocument.body,r=e(n.scrollWidth,n.clientWidth,i.scrollWidth,i.clientWidth),l=e(n.scrollHeight,n.clientHeight,i.scrollHeight,i.clientHeight);let c=-o.scrollLeft+z(t);const a=-o.scrollTop;return"rtl"===H(i).direction&&(c+=e(n.clientWidth,i.clientWidth)-r),{width:r,height:l,x:c,y:a}}(L(t));else if(E(n))r=function(t,e){const n=Y(t,!0,"fixed"===e),i=n.top+t.clientTop,r=n.left+t.clientLeft,l=A(t)?q(t):o(1);return{width:t.clientWidth*l.x,height:t.clientHeight*l.y,x:r*l.x,y:i*l.y}}(n,i);else{const e=X(t);r={...n,x:n.x-e.x,y:n.y-e.y}}return y(r)}function I(t,e){const n=_(t);return!(n===e||!E(n)||F(n))&&("fixed"===H(n).position||I(n,e))}function J(t,e,n){const i=A(e),r=L(e),l="fixed"===n,c=Y(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const s=o(0);if(i||!i&&!l)if(("body"!==b(e)||C(r))&&(a=W(e)),i){const t=Y(e,!0,l,e);s.x=t.x+e.clientLeft,s.y=t.y+e.clientTop}else r&&(s.x=z(r));return{x:c.left+a.scrollLeft-s.x,y:c.top+a.scrollTop-s.y,width:c.width,height:c.height}}function K(t){return"static"===H(t).position}function Q(t,e){return A(t)&&"fixed"!==H(t).position?e?e(t):t.offsetParent:null}function U(t,e){const n=R(t);if(O(t))return n;if(!A(t)){let e=_(t);for(;e&&!F(e);){if(E(e)&&!K(e))return e;e=_(e)}return n}let o=Q(t,e);for(;o&&D(o)&&K(o);)o=Q(o,e);return o&&F(o)&&K(o)&&!P(o)?n:o||function(t){let e=_(t);for(;A(e)&&!F(e);){if(P(e))return e;if(O(e))return null;e=_(e)}return null}(t)||n}const Z={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:i,strategy:r}=t;const l="fixed"===r,c=L(i),a=!!e&&O(e.floating);if(i===c||a&&l)return n;let s={scrollLeft:0,scrollTop:0},f=o(1);const u=o(0),d=A(i);if((d||!d&&!l)&&(("body"!==b(i)||C(c))&&(s=W(i)),A(i))){const t=Y(i);f=q(i),u.x=t.x+i.clientLeft,u.y=t.y+i.clientTop}return{width:n.width*f.x,height:n.height*f.y,x:n.x*f.x-s.scrollLeft*f.x+u.x,y:n.y*f.y-s.scrollTop*f.y+u.y}},getDocumentElement:L,getClippingRect:function(n){let{element:o,boundary:i,rootBoundary:r,strategy:l}=n;const c=[..."clippingAncestors"===i?O(o)?[]:function(t,e){const n=e.get(t);if(n)return n;let o=V(t,[],!1).filter((t=>E(t)&&"body"!==b(t))),i=null;const r="fixed"===H(t).position;let l=r?_(t):t;for(;E(l)&&!F(l);){const e=H(l),n=P(l);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||C(l)&&!n&&I(t,l))?o=o.filter((t=>t!==l)):i=e,l=_(l)}return e.set(t,o),o}(o,this._c):[].concat(i),r],a=c[0],s=c.reduce(((n,i)=>{const r=G(o,i,l);return n.top=e(r.top,n.top),n.right=t(r.right,n.right),n.bottom=t(r.bottom,n.bottom),n.left=e(r.left,n.left),n}),G(o,a,l));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}},getOffsetParent:U,getElementRects:async function(t){const e=this.getOffsetParent||U,n=this.getDimensions,o=await n(t.floating);return{reference:J(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:n}=N(t);return{width:e,height:n}},getScale:q,isElement:E,isRTL:function(t){return"rtl"===H(t).direction}},tt=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:l,middlewareData:f}=e,u=await async function(t,e){const{placement:n,platform:o,elements:i}=t,r=await(null==o.isRTL?void 0:o.isRTL(i.floating)),l=a(n),f=s(n),u="y"===d(n),p=["left","top"].includes(l)?-1:1,h=r&&u?-1:1,m=c(e,t);let{mainAxis:g,crossAxis:y,alignmentAxis:w}="number"==typeof m?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...m};return f&&"number"==typeof w&&(y="end"===f?-1*w:w),u?{x:y*h,y:g*p}:{x:g*p,y:y*h}}(e,t);return l===(null==(n=f.offset)?void 0:n.placement)&&null!=(o=f.arrow)&&o.alignmentOffset?{}:{x:i+u.x,y:r+u.y,data:{...u,placement:l}}}}},et=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:u={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...p}=c(t,e),h={x:n,y:o},m=await x(e,p),g=d(a(i)),y=f(g);let w=h[y],v=h[g];if(r){const t="y"===y?"bottom":"right";w=l(w+m["y"===y?"top":"left"],w,w-m[t])}if(s){const t="y"===g?"bottom":"right";v=l(v+m["y"===g?"top":"left"],v,v-m[t])}const b=u.fn({...e,[y]:w,[g]:v});return{...b,data:{x:b.x-n,y:b.y-o}}}}},nt=e=>({name:"arrow",options:e,async fn(n){const{x:o,y:i,placement:r,rects:a,platform:f,elements:d,middlewareData:h}=n,{element:m,padding:y=0}=c(e,n)||{};if(null==m)return{};const w=g(y),x={x:o,y:i},v=p(r),b=u(v),R=await f.getDimensions(m),L="y"===v,T=L?"top":"left",E=L?"bottom":"right",A=L?"clientHeight":"clientWidth",S=a.reference[b]+a.reference[v]-x[v]-a.floating[b],C=x[v]-a.reference[v],D=await(null==f.getOffsetParent?void 0:f.getOffsetParent(m));let O=D?D[A]:0;O&&await(null==f.isElement?void 0:f.isElement(D))||(O=d.floating[A]||a.floating[b]);const P=S/2-C/2,k=O/2-R[b]/2-1,F=t(w[T],k),H=t(w[E],k),W=F,_=O-R[b]-H,B=O/2-R[b]/2+P,V=l(W,B,_),M=!h.arrow&&null!=s(r)&&B!==V&&a.reference[b]/2-(B<W?F:H)-R[b]/2<0,N=M?B<W?B-W:B-_:0;return{[v]:x[v]+N,data:{[v]:V,centerOffset:B-V-N,...M&&{alignmentOffset:N}},reset:M}}}),ot=function(n){return void 0===n&&(n={}),{name:"inline",options:n,async fn(o){const{placement:i,elements:r,rects:l,platform:s,strategy:f}=o,{padding:u=2,x:p,y:h}=c(n,o),m=Array.from(await(null==s.getClientRects?void 0:s.getClientRects(r.reference))||[]),w=function(t){const e=t.slice().sort(((t,e)=>t.y-e.y)),n=[];let o=null;for(let t=0;t<e.length;t++){const i=e[t];!o||i.y-o.y>o.height/2?n.push([i]):n[n.length-1].push(i),o=i}return n.map((t=>y(v(t))))}(m),x=y(v(m)),b=g(u),R=await s.getElementRects({reference:{getBoundingClientRect:function(){if(2===w.length&&w[0].left>w[1].right&&null!=p&&null!=h)return w.find((t=>p>t.left-b.left&&p<t.right+b.right&&h>t.top-b.top&&h<t.bottom+b.bottom))||x;if(w.length>=2){if("y"===d(i)){const t=w[0],e=w[w.length-1],n="top"===a(i),o=t.top,r=e.bottom,l=n?t.left:e.left,c=n?t.right:e.right;return{top:o,bottom:r,left:l,right:c,width:c-l,height:r-o,x:l,y:o}}const n="left"===a(i),o=e(...w.map((t=>t.right))),r=t(...w.map((t=>t.left))),l=w.filter((t=>n?t.left===r:t.right===o)),c=l[0].top,s=l[l.length-1].bottom;return{top:c,bottom:s,left:r,right:o,width:o-r,height:s-c,x:r,y:c}}return x}},floating:r.floating,strategy:f});return l.reference.x!==R.reference.x||l.reference.y!==R.reference.y||l.reference.width!==R.reference.width||l.reference.height!==R.reference.height?{reset:{rects:R}}:{}}}};let it=document.querySelectorAll(".tooltip__trigger"),rt=function(t){t.style.display="none"},lt=function(t,e){e.style.display="block",ct(t,e)},ct=function(t,e){let n=e.querySelector(".tooltip__arrow"),o="top";var i;e.dataset.placement&&(o=e.dataset.placement),((t,e,n)=>{const o=new Map,i={platform:Z,...n},r={...i.platform,_c:o};return(async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,c=r.filter(Boolean),a=await(null==l.isRTL?void 0:l.isRTL(e));let s=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:u}=w(s,o,a),d=o,p={},h=0;for(let n=0;n<c.length;n++){const{name:r,fn:m}=c[n],{x:g,y,data:x,reset:v}=await m({x:f,y:u,initialPlacement:o,placement:d,strategy:i,middlewareData:p,rects:s,platform:l,elements:{reference:t,floating:e}});f=null!=g?g:f,u=null!=y?y:u,p={...p,[r]:{...p[r],...x}},v&&h<=50&&(h++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(s=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:i}):v.rects),({x:f,y:u}=w(s,d,a))),n=-1)}return{x:f,y:u,placement:d,strategy:i,middlewareData:p}})(t,e,{...i,platform:r})})(t,e,{placement:o,middleware:[(void 0===i&&(i={}),{name:"flip",options:i,async fn(t){var e,n;const{placement:o,middlewareData:r,rects:l,initialPlacement:f,platform:g,elements:y}=t,{mainAxis:w=!0,crossAxis:v=!0,fallbackPlacements:b,fallbackStrategy:R="bestFit",fallbackAxisSideDirection:L="none",flipAlignment:T=!0,...E}=c(i,t);if(null!=(e=r.arrow)&&e.alignmentOffset)return{};const A=a(o),S=d(f),C=a(f)===f,D=await(null==g.isRTL?void 0:g.isRTL(y.floating)),O=b||(C||!T?[m(f)]:function(t){const e=m(t);return[h(t),e,h(e)]}(f)),P="none"!==L;!b&&P&&O.push(...function(t,e,n,o){const i=s(t);let r=function(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],l=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:l;default:return[]}}(a(t),"start"===n,o);return i&&(r=r.map((t=>t+"-"+i)),e&&(r=r.concat(r.map(h)))),r}(f,T,L,D));const k=[f,...O],F=await x(t,E),H=[];let W=(null==(n=r.flip)?void 0:n.overflows)||[];if(w&&H.push(F[A]),v){const t=function(t,e,n){void 0===n&&(n=!1);const o=s(t),i=p(t),r=u(i);let l="x"===i?o===(n?"end":"start")?"right":"left":"start"===o?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=m(l)),[l,m(l)]}(o,l,D);H.push(F[t[0]],F[t[1]])}if(W=[...W,{placement:o,overflows:H}],!H.every((t=>t<=0))){var _,B;const t=((null==(_=r.flip)?void 0:_.index)||0)+1,e=k[t];if(e)return{data:{index:t,overflows:W},reset:{placement:e}};let n=null==(B=W.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:B.placement;if(!n)switch(R){case"bestFit":{var V;const t=null==(V=W.filter((t=>{if(P){const e=d(t.placement);return e===S||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:V[0];t&&(n=t);break}case"initialPlacement":n=f}if(o!==n)return{reset:{placement:n}}}return{}}}),ot(),et({padding:16}),tt(8),nt({element:n})]}).then((({x:t,y:o,placement:i,middlewareData:r})=>{Object.assign(e.style,{left:`${t}px`,top:`${o}px`});const{x:l,y:c}=r.arrow,a={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];Object.assign(n.style,{left:null!=l?`${l}px`:"",top:null!=c?`${c}px`:"",right:"",bottom:"",[a]:"-4px"})}))};it.forEach((t=>{let e=t,n=t.nextElementSibling;e.addEventListener("mouseenter",(()=>{lt(e,n)})),e.addEventListener("focus",(()=>{lt(e,n)})),e.addEventListener("mouseleave",(()=>{rt(n)})),e.addEventListener("blur",(()=>{rt(n)}))}))})();