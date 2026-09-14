(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header shadow state
  var head = document.getElementById('siteHead');
  var onScroll = function(){
    if(!head) return;
    if(window.scrollY > 12){ head.classList.add('is-solid'); }
    else{ head.classList.remove('is-solid'); }
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Mobile drawer
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('drawerBackdrop');
  var closeBtn = document.getElementById('drawerClose');

  function openDrawer(){
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.hidden = false;
    backdrop.hidden = false;
    toggle.setAttribute('aria-expanded','true');
  }
  function closeDrawer(){
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    window.setTimeout(function(){ drawer.hidden = true; backdrop.hidden = true; }, 420);
  }
  if(toggle && drawer && backdrop){
    toggle.addEventListener('click', openDrawer);
    closeBtn && closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeDrawer); });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // Mobile booking bar visibility (hide once footer CTA is in view)
  var bookbar = document.getElementById('bookbar');
  var ctaBand = document.querySelector('.cta-band');
  if(bookbar){
    bookbar.hidden = false;
    if('IntersectionObserver' in window && ctaBand){
      var bio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          bookbar.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
        });
      }, { threshold:.2 });
      bio.observe(ctaBand);
    }
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
})();
