(function(){
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal — villas, good-life vignettes, gallery, voices
  document.querySelectorAll('.gallery__row .frame').forEach(function(el){ el.classList.add('reveal'); });
  document.querySelectorAll('.voice').forEach(function(el){ el.classList.add('reveal'); });

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if(revealEls.length && 'IntersectionObserver' in window && !reduceMotion){
    var revealObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // Subtle hero parallax (rolled) — two photos drift at different rates
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('.parallax'));
  if(parallaxEls.length && !reduceMotion){
    var ticking = false;
    function updateParallax(){
      var heroRect = document.querySelector('.hero');
      if(!heroRect) return;
      var scrollY = window.scrollY || window.pageYOffset;
      parallaxEls.forEach(function(el){
        var rate = parseFloat(el.getAttribute('data-parallax')) || 0;
        el.style.transform = 'translateY(' + (scrollY * rate * 0.15) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }
})();
