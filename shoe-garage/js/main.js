/* The Shoe Garage — email capture (vanilla ES6, IIFE) */
(function () {
  "use strict";

  var form = document.getElementById("captureForm");
  var input = document.getElementById("email");
  var success = document.getElementById("successMsg");
  var microcopy = document.getElementById("microcopy");
  if (!form || !input) return;

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var val = input.value.trim();

    if (!emailRe.test(val)) {
      input.classList.add("is-invalid");
      input.focus();
      return;
    }

    // ── CONNECT YOUR LIST HERE ──────────────────────────────────────────
    // Replace the line below with a real POST to Brevo / Formspree, e.g.:
    //   fetch("https://api.brevo.com/v3/contacts", { ... })
    //   or point the <form> action at a Formspree endpoint.
    // For now it captures client-side and confirms.
    // ────────────────────────────────────────────────────────────────────
    console.log("Captured email:", val);

    form.classList.add("is-hidden");
    if (microcopy) microcopy.classList.add("is-hidden");
    if (success) success.classList.add("is-shown");
  });

  input.addEventListener("input", function () {
    input.classList.remove("is-invalid");
  });
})();
