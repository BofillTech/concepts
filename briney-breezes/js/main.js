(function(){
  "use strict";
  var nav=document.getElementById('nav');
  var bar=document.getElementById('bookbar');
  var hero=document.querySelector('.hero');
  // sticky nav
  function onScroll(){ nav.classList.toggle('is-solid', window.scrollY>40); }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  // booking bar reveal after hero
  bar.classList.add('is-shown');
  // reveals
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el);});
  } else { document.querySelectorAll('[data-reveal]').forEach(function(el){el.classList.add('in');}); }
  // hero slider
  var slides=document.querySelectorAll('.hero__slide'), dotsWrap=document.getElementById('heroDots'), hi=0, htimer;
  if(slides.length>1 && dotsWrap){
    var dots=[];
    slides.forEach(function(_,i){
      var b=document.createElement('button');
      b.className='hero__dot'+(i===0?' is-active':''); b.type='button';
      b.setAttribute('aria-label','Show slide '+(i+1));
      b.addEventListener('click',function(){go(i);restart();});
      dotsWrap.appendChild(b); dots.push(b);
    });
    function go(n){ slides[hi].classList.remove('is-active'); dots[hi].classList.remove('is-active'); hi=(n+slides.length)%slides.length; slides[hi].classList.add('is-active'); dots[hi].classList.add('is-active'); }
    function restart(){ clearInterval(htimer); htimer=setInterval(function(){go(hi+1);},5500); }
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
  }
  // count-up stats
  var reduceM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el){
    var target=parseFloat(el.getAttribute('data-count')), dec=parseInt(el.getAttribute('data-dec')||'0',10), suf=el.getAttribute('data-suffix')||'';
    if(reduceM){ el.innerHTML=target.toFixed(dec)+suf; return; }
    var start=performance.now(), dur=1100;
    function step(now){
      var p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3);
      el.innerHTML=(target*e).toFixed(dec)+suf;
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var co2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){countUp(en.target);co2.unobserve(en.target);}});},{threshold:.6});
    document.querySelectorAll('[data-count]').forEach(function(el){co2.observe(el);});
  } else { document.querySelectorAll('[data-count]').forEach(function(el){el.innerHTML=el.getAttribute('data-count')+(el.getAttribute('data-suffix')||'');}); }
  var drawer=document.getElementById('drawer'), burger=document.getElementById('burger');
  function openD(){drawer.classList.add('is-open');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
  function closeD(){drawer.classList.remove('is-open');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}
  burger.addEventListener('click',openD);
  document.getElementById('drawerClose').addEventListener('click',closeD);
  drawer.addEventListener('click',function(e){if(e.target===drawer)closeD();});
  document.querySelectorAll('[data-close]').forEach(function(a){a.addEventListener('click',closeD);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeD();});
  // dates
  var ci=document.getElementById('ci'), co=document.getElementById('co');
  function iso(d){return d.toISOString().slice(0,10);}
  var t=new Date(), tm=new Date(Date.now()+864e5);
  ci.value=iso(t); ci.min=iso(t); co.value=iso(tm); co.min=iso(tm);
  ci.addEventListener('change',function(){
    var nd=new Date(ci.value); nd.setDate(nd.getDate()+1); co.min=iso(nd);
    if(co.value<=ci.value) co.value=iso(nd);
  });
  // booking engine
  function book(e){
    if(e) e.preventDefault();
    var base='https://hotels.cloudbeds.com/en/reservation/u1Mzkvga';
    var url=base+'?checkin='+ci.value+'&checkout='+co.value+'&adults='+document.getElementById('gs').value;
    window.open(url,'_blank','noopener');
  }
  document.querySelectorAll('[data-book]').forEach(function(b){b.addEventListener('click',book);});
  // year
  document.getElementById('yr').textContent=new Date().getFullYear();
})();

/* ---- Gallery lightbox (gallery.html) ---- */
(function(){
  "use strict";
  var lb=document.getElementById('lightbox');
  if(!lb) return;
  var img=document.getElementById('lbImg'),
      items=[].slice.call(document.querySelectorAll('.gallery-page__item')),
      idx=0;
  function show(i){
    idx=(i+items.length)%items.length;
    var full=items[idx].getAttribute('data-full');
    img.setAttribute('src',full);
    img.setAttribute('alt',items[idx].querySelector('img').getAttribute('alt')||'');
  }
  function open(i){ show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.remove('is-open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  items.forEach(function(it,i){ it.addEventListener('click',function(){open(i);}); });
  document.getElementById('lbClose').addEventListener('click',close);
  document.getElementById('lbPrev').addEventListener('click',function(){show(idx-1);});
  document.getElementById('lbNext').addEventListener('click',function(){show(idx+1);});
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('is-open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowLeft') show(idx-1);
    else if(e.key==='ArrowRight') show(idx+1);
  });
})();


/* ---- Room carousels (rooms.html) ---- */
(function(){
  "use strict";
  document.querySelectorAll('[data-carousel]').forEach(function(c){
    var track=c.querySelector('.carousel__track'),
        slides=c.querySelectorAll('.carousel__slide'),
        thumbs=c.querySelectorAll('.carousel__thumb'),
        count=c.querySelector('.carousel__count'),
        i=0, n=slides.length;
    if(!track || n===0) return;
    function go(k){
      i=(k+n)%n;
      track.style.transform='translateX(-'+(i*100)+'%)';
      thumbs.forEach(function(t,ti){t.classList.toggle('is-active',ti===i);});
      if(count) count.textContent=(i+1)+' / '+n;
    }
    var prev=c.querySelector('.carousel__btn--prev'), next=c.querySelector('.carousel__btn--next');
    if(prev) prev.addEventListener('click',function(){go(i-1);});
    if(next) next.addEventListener('click',function(){go(i+1);});
    thumbs.forEach(function(t,ti){t.addEventListener('click',function(){go(ti);});});
    go(0);
  });
})();


/* ---- Best Rate flyout ---- */
(function(){
  "use strict";
  var br=document.getElementById('bestrate'); if(!br) return;
  var tab=document.getElementById('bestrateTab'), close=document.getElementById('bestrateClose');
  function open(){br.classList.add('is-open');tab.setAttribute('aria-expanded','true');}
  function shut(){br.classList.remove('is-open');tab.setAttribute('aria-expanded','false');}
  tab.addEventListener('click',function(){br.classList.contains('is-open')?shut():open();});
  close.addEventListener('click',shut);
})();
