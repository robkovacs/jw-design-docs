document.querySelectorAll(".swatch__button").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),(async e=>{try{await navigator.clipboard.writeText(e);let t=document.querySelector(".toaster");t||(t=document.createElement("div"),t.classList.add("toaster"),document.querySelector("body").appendChild(t));let a=document.createElement("div");a.classList.add("toaster__toast"),a.setAttribute("role","alert"),a.setAttribute("aria-live","assertive"),a.setAttribute("aria-atomic","true"),a.innerHTML="Copied!",t.appendChild(a);let o=t.lastChild;window.setTimeout((()=>{o.classList.add("fade-out"),window.setTimeout((()=>{o.remove()}),500)}),3e3)}catch(e){console.error("Failed to copy: ",e)}})(e.currentTarget.dataset.copyText)}))})),(()=>{"use strict";console.log("more to come")})();