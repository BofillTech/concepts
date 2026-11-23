/* Providence Oyster Bar concept — location switch for Reserve / Order / Call */
(function () {
  'use strict';

  var KEY = 'pob-location';
  var body = document.body;
  var buttons = document.querySelectorAll('.dock__loc');
  var links = document.querySelectorAll('.js-loc-link');

  function setLocation(loc, remember) {
    if (loc !== 'fh' && loc !== 'eg') { return; }
    body.setAttribute('data-location', loc);

    buttons.forEach(function (btn) {
      var on = btn.getAttribute('data-loc') === loc;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    links.forEach(function (link) {
      var href = link.getAttribute('data-' + loc);
      if (href) { link.setAttribute('href', href); }
    });

    if (remember) {
      try { window.localStorage.setItem(KEY, loc); } catch (e) { /* storage unavailable */ }
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLocation(btn.getAttribute('data-loc'), true);
    });
  });

  // Choosing a door or a location card also sets the dock.
  document.querySelectorAll('.door--fh, .spot--fh').forEach(function (el) {
    el.addEventListener('click', function () { setLocation('fh', true); });
  });
  document.querySelectorAll('.door--eg, .spot--eg').forEach(function (el) {
    el.addEventListener('click', function () { setLocation('eg', true); });
  });

  var saved = null;
  try { saved = window.localStorage.getItem(KEY); } catch (e) { saved = null; }
  if (saved) { setLocation(saved, false); }
})();
