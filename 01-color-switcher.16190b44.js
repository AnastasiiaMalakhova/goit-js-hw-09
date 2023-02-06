const t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");let o=setInterval((function(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3);e.addEventListener("click",(function(){t.style.backgroundColor=o})),n.addEventListener("click",(function(){clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.16190b44.js.map
