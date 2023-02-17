let t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");const r=document.querySelector("body");t.addEventListener("click",(t=>{const o=setInterval((()=>{r.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3);e.addEventListener("click",(t=>{clearInterval(o)}))}));
//# sourceMappingURL=01-color-switcher.c56260a4.js.map
