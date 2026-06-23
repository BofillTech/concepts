/* Sands Townhouses — main.js (vanilla ES6+, no dependencies) */
(function(){
  'use strict';
  var nav=document.getElementById('nav');
  var bbar=document.getElementById('bbar');
  var hasHero=!!document.querySelector('.hero');

  // sticky nav + booking-bar reveal (homepage only; sub-pages keep nav solid + bar visible)
  function onScroll(){var y=window.scrollY;if(nav)nav.classList.toggle('is-stuck',y>40);if(bbar)bbar.classList.toggle('in',y>650);}
  if(hasHero){window.addEventListener('scroll',onScroll,{passive:true});onScroll();}

  // mobile nav drawer
  var t=document.getElementById('navToggle'),links=document.getElementById('navlinks');
  if(t&&links){
    t.addEventListener('click',function(){var o=links.classList.toggle('is-open');t.setAttribute('aria-expanded',o);});
    links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('is-open');t.setAttribute('aria-expanded',false);}});
  }

  // hero slider (cross-fade autoplay + dots)
  var slides=document.querySelectorAll('.hero__slide');
  var dots=document.querySelectorAll('#heroDots button');
  var hi=0,htimer;
  function go(n){slides[hi].classList.remove('is-active');if(dots[hi])dots[hi].classList.remove('is-active');hi=(n+slides.length)%slides.length;slides[hi].classList.add('is-active');if(dots[hi])dots[hi].classList.add('is-active');}
  if(slides.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    htimer=setInterval(function(){go(hi+1);},5500);
    dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);clearInterval(htimer);htimer=setInterval(function(){go(hi+1);},5500);});});
  }

  // scroll reveals
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  } else { document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');}); }

  // gallery lightbox
  document.querySelectorAll('.gal__item[data-lb]').forEach(function(a){a.addEventListener('click',function(){var img=a.querySelector('img');var lb=document.getElementById('lbimg');if(lb){lb.src=img.src;lb.alt=img.alt||'';}});});

  // booking-bar default dates (today / tomorrow)
  var ci=document.getElementById('ci'),co=document.getElementById('co');
  if(ci&&co){var d=new Date(),d2=new Date(Date.now()+864e5);ci.value=d.toISOString().slice(0,10);co.value=d2.toISOString().slice(0,10);}

  // FAQ accordion
  document.querySelectorAll('.faqitem__q').forEach(function(b){b.addEventListener('click',function(){var it=b.closest('.faqitem');var o=it.classList.toggle('is-open');b.setAttribute('aria-expanded',o);});});
})();
