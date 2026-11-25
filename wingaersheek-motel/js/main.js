(function(){
  var header=document.querySelector('.site-header');
  function onScroll(){header.classList.toggle('is-scrolled',window.scrollY>10);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var track=document.querySelector('.gallery__track');
  function step(dir){var item=track.querySelector('.gallery__item');var w=item?item.getBoundingClientRect().width+14:300;track.scrollBy({left:dir*w,behavior:'smooth'});}
  document.querySelector('.gallery__prev').addEventListener('click',function(){step(-1);});
  document.querySelector('.gallery__next').addEventListener('click',function(){step(1);});
  track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
  var y=document.querySelector('.js-year');if(y){y.textContent=new Date().getFullYear();}
})();
