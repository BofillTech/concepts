(function(){
  'use strict';

  // Mobile drawer toggle
  var burger = document.querySelector('[data-drawer-toggle]');
  var drawer = document.getElementById('drawer');
  if(burger && drawer){
    var closeDrawer = function(){
      drawer.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    };
    var openDrawer = function(){
      drawer.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    };
    burger.addEventListener('click', function(){
      if(drawer.hidden){ openDrawer(); } else { closeDrawer(); }
    });
    drawer.querySelectorAll('[data-drawer-link]').forEach(function(link){
      link.addEventListener('click', closeDrawer);
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 1024){ closeDrawer(); }
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Highlight the active section in the side-rail nav
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail__nav a[href^="#"]'));
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
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function(section){ navObserver.observe(section); });
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
