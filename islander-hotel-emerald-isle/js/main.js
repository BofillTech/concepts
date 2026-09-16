(function(){
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Hamburger nav toggle (rolled: hamburger-only)
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('navPanel');
  if(toggle && panel){
    toggle.addEventListener('click', function(){
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
    });
    panel.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      });
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal — subtle fade only (rolled), no parallax
  document.querySelectorAll('.gallery__row .frame').forEach(function(el){ el.classList.add('reveal'); });

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
})();
