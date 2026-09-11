(function(){
  "use strict";
  var nav=document.getElementById("nav"),bar=document.getElementById("bar"),
      burger=document.getElementById("burger"),drawer=document.getElementById("drawer");
  document.getElementById("yr").textContent=new Date().getFullYear();
  window.addEventListener("scroll",function(){
    nav.classList.toggle("is-stuck",window.scrollY>10);
    bar.classList.toggle("is-on",window.scrollY>window.innerHeight*.6);
  },{passive:true});
  burger.addEventListener("click",function(){
    var open=drawer.classList.toggle("is-open");
    burger.setAttribute("aria-expanded",open);
  });
  drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){
    drawer.classList.remove("is-open");burger.setAttribute("aria-expanded","false");
  });});
  document.querySelectorAll(".figure img").forEach(function(img){
    img.addEventListener("error",function(){img.remove();});
  });
})();
