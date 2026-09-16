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
})();
