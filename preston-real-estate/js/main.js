(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  var header=d.querySelector('.site-header'), bar=d.querySelector('.mobile-bar');
  function onScroll(){
    var y=window.scrollY||0;
    header.classList.toggle('scrolled', y>40);
    if(bar) bar.classList.toggle('show', y>window.innerHeight*0.6);
  }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  var nav=d.querySelector('.nav'), t=d.querySelector('.nav-toggle');
  if(t){ t.addEventListener('click', function(){
    var open=!nav.classList.contains('open');
    nav.classList.toggle('open', open); header.classList.toggle('nav-open', open);
    header.classList.toggle('scrolled', open || (window.scrollY||0)>40);
    t.setAttribute('aria-expanded', open);
  });}
  var els=d.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in')}); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  },{rootMargin:'0px 0px -8% 0px', threshold:.08});
  els.forEach(function(e){ io.observe(e); });
})();
