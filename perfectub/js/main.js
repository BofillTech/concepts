(function(){
  var shape=document.getElementById('shape');
  var btns=document.querySelectorAll('.toggle button');
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      shape.classList.toggle('is-standard',b.dataset.shape==='std');
    });
  });
})();
