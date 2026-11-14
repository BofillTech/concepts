/* WaveAerospace — site script (vanilla ES6, no dependencies) */
(function () {
  'use strict';

  // Pause background video for visitors who prefer reduced motion
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  // Keep the copyright year current
  document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  // Briefing form: in the static concept the form is not connected.
  // In WordPress this markup is replaced by a Fluent Forms form (see HANDOFF.md).
  var form = document.querySelector('.js-briefing-form');
  if (form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.hidden = false;
        status.textContent = 'Concept preview: this form will be connected at launch. Please email sales@waveaerospace.com';
      }
    });
  }
})();
