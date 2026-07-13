// Page behavior
(function() {
  var btns = document.querySelectorAll('.gal-filter');
  var tiles = document.querySelectorAll('#galleryGrid .gal-tile');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.dataset.filter;
      btns.forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      tiles.forEach(function(t) {
        if (filter === 'all' || t.dataset.cat === filter) t.classList.remove('hide');
        else t.classList.add('hide');
      });
    });
  });
})();


const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
