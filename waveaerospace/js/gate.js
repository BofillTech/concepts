/* WaveAerospace concept — simple review password gate (deters casual visitors; not real security) */
(function () {
  var HASH = '7f319561ca26ff166dceda06cb5a2d0987fbd144fae906e6b7dd8aa37fe162fc';
  var KEY = 'wa-concept-ok';
  var root = document.documentElement;
  try { if (sessionStorage.getItem(KEY) === HASH) { root.classList.add('wa-ok'); return; } } catch (e) {}

  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var gate = document.createElement('div');
    gate.id = 'wa-gate';
    gate.innerHTML =
      '<form class="wa-gate__box" autocomplete="off">' +
      '<img src="waveaerospace-img/img/wa-logo.png" alt="WaveAerospace" class="wa-gate__logo">' +
      '<p class="wa-gate__label">Restricted preview</p>' +
      '<label class="wa-gate__field">Password<input type="password" name="pw" required autofocus></label>' +
      '<button type="submit" class="wa-gate__btn">Enter</button>' +
      '<p class="wa-gate__err" role="alert" hidden>Incorrect password.</p>' +
      '</form>';
    document.body.appendChild(gate);
    var form = gate.querySelector('form'), input = form.querySelector('input'), err = form.querySelector('.wa-gate__err');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      sha256(input.value).then(function (h) {
        if (h === HASH) {
          try { sessionStorage.setItem(KEY, HASH); } catch (e) {}
          root.classList.add('wa-ok');
          gate.remove();
        } else {
          err.hidden = false; input.value = ''; input.focus();
        }
      });
    });
  });
})();
