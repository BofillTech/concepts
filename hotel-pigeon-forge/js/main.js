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

  // Single orchestrated motion moment: gentle parallax on the hero frame photo
  var parallaxEl = document.querySelector('[data-parallax] img');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(parallaxEl && !reduceMotion){
    var ticking = false;
    var update = function(){
      var rect = parallaxEl.parentElement.parentElement.getBoundingClientRect();
      var progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      var shift = progress * -14;
      parallaxEl.style.transform = 'translateY(' + shift + 'px) scale(1.06)';
      ticking = false;
    };
    update();
    window.addEventListener('scroll', function(){
      if(!ticking){
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }
})();
