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
      if(window.innerWidth >= 900){ closeDrawer(); }
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Single orchestrated motion moment: subtle fade-in on the hero frame photo
  var fadeEl = document.querySelector('[data-fade]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(fadeEl && !reduceMotion){
    window.requestAnimationFrame(function(){
      window.requestAnimationFrame(function(){
        fadeEl.classList.add('is-visible');
      });
    });
  } else if(fadeEl){
    fadeEl.classList.add('is-visible');
  }
})();
