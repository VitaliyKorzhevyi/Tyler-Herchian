const e=document.getElementById("menu-toggle"),t=document.querySelector(".backdrop-menu"),o=document.querySelector("body");e.addEventListener("click",(function(){e.classList.toggle("open"),t.classList.toggle("is-open"),o.classList.toggle("no-scroll")}));const n=document.querySelector(".services-list"),s=document.querySelectorAll(".services-lines span");function c(){const e=n.scrollLeft,t=Math.floor((e+15)/275),o=Math.max(0,Math.min(3,t));s.forEach(((e,t)=>{e.style.height=t===o?"2px":"1px"}))}n.addEventListener("scroll",c),window.addEventListener("load",c);
//# sourceMappingURL=index.82bed826.js.map