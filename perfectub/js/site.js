/* Perfectub site script: menu, Resources dropdown, product selector, contact forms. */
(function(){
  var toggle=document.querySelector('.sh__toggle'), nav=document.getElementById('site-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded',open?'true':'false');
    });
  }
  [].forEach.call(document.querySelectorAll('.sh__sub-btn'),function(btn){
    var item=btn.parentNode;
    btn.addEventListener('click',function(){
      var open=item.classList.toggle('is-open'); btn.setAttribute('aria-expanded',open?'true':'false');
    });
    item.addEventListener('keydown',function(e){
      if(e.key==='Escape'){item.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.focus();}
    });
  });
  document.addEventListener('click',function(e){
    [].forEach.call(document.querySelectorAll('.sh__item--sub.is-open'),function(item){
      if(!item.contains(e.target)){item.classList.remove('is-open');item.querySelector('.sh__sub-btn').setAttribute('aria-expanded','false');}
    });
  });

  /* product page: size and drain side update the price and the label */
  var buy=document.querySelector('[data-buybox]');
  if(buy){
    var price=buy.querySelector('[data-price]'), pick=buy.querySelector('[data-pick]');
    var update=function(){
      var size=buy.querySelector('input[name="size"]:checked'), side=buy.querySelector('input[name="drain"]:checked');
      if(size&&price){price.firstChild.nodeValue=size.getAttribute('data-price');}
      if(pick){pick.textContent=(size?size.value:'')+(side?', '+side.value+' drain':'');}
    };
    [].forEach.call(buy.querySelectorAll('input'),function(i){i.addEventListener('change',update);});
    update();
  }

  /* concept forms: open an email to Brak Tub with the form contents (a real form handler is wired at go-live) */
  [].forEach.call(document.querySelectorAll('form[data-mailto]'),function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[];
      [].forEach.call(form.elements,function(el){
        if(!el.name||el.type==='submit')return;
        if((el.type==='radio'||el.type==='checkbox')&&!el.checked)return;
        lines.push(el.getAttribute('data-label')+': '+el.value);
      });
      window.location.href='mailto:'+form.getAttribute('data-mailto')+'?subject='+encodeURIComponent(form.getAttribute('data-subject')||'Website inquiry')+'&body='+encodeURIComponent(lines.join('\n'));
    });
  });
})();
