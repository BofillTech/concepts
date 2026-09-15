(function(){
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Highlight the active section in the bottom dock nav
  var links = Array.prototype.slice.call(document.querySelectorAll('.dock a[data-dock-link]'));
  var sections = links
    .map(function(link){ return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if(sections.length && 'IntersectionObserver' in window){
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function(link){
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function(section){ navObserver.observe(section); });
  }

  // Subtle fade reveal on scroll
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.gallery__row .frame'));
  revealEls.forEach(function(el){ el.classList.add('reveal'); });
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
