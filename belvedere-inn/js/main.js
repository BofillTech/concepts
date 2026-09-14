(function(){
  'use strict';

  // Sticky header shadow on scroll
  var head = document.getElementById('siteHead');
  if(head){
    var onScroll = function(){
      if(window.scrollY > 8){ head.classList.add('is-scrolled'); }
      else{ head.classList.remove('is-scrolled'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Highlight the active section in the persistent bottom nav bar
  var links = Array.prototype.slice.call(document.querySelectorAll('.bottombar__link[href^="#"]'));
  var sections = links
    .map(function(link){ return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if(sections.length && 'IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function(link){
          var match = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', match);
          if(match){ link.setAttribute('aria-current', 'true'); }
          else{ link.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function(section){ observer.observe(section); });
  }

  // Staggered reveal on scroll
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
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
