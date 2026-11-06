(function(){
  /* Set the property's booking engine URL here; dates are appended as ?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD */
  var BOOKING_URL = '';
  var h=document.getElementById('header');
  function onScroll(){h.classList.toggle('scrolled',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var btn=document.getElementById('menuBtn'),menu=document.getElementById('mobileMenu');
  btn.addEventListener('click',function(){var o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o);h.classList.add('scrolled')});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}});

  var ci=document.getElementById('checkin'),co=document.getElementById('checkout');
  function iso(d){return d.toISOString().slice(0,10)}
  var t=new Date();ci.min=iso(t);
  ci.addEventListener('change',function(){if(!ci.value)return;var n=new Date(ci.value);n.setDate(n.getDate()+1);co.min=iso(n);if(!co.value||co.value<=ci.value)co.value=iso(n)});
  document.querySelectorAll('[data-book]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();ci.focus();if(ci.showPicker){try{ci.showPicker()}catch(_){}}})});
  document.getElementById('bookForm').addEventListener('submit',function(e){
    e.preventDefault();
    if(!ci.value){ci.focus();return} if(!co.value){co.focus();return}
    if(BOOKING_URL){location.href=BOOKING_URL+(BOOKING_URL.indexOf('?')>-1?'&':'?')+'checkin='+ci.value+'&checkout='+co.value}
    else{location.href='tel:+16316682300'}
  });
})();
