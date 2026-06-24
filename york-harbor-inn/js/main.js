/* ==========================================================================
   York Harbor Inn — main.js
   Vanilla ES6 (IIFE). No libraries, no inline handlers.
   Handles: mobile nav toggle, accessible FAQ accordion, smooth in-page jumps.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Mobile navigation toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("primary-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
  }

  /* ---- FAQ accordion ---- */
  var questions = document.querySelectorAll(".faq__q");

  function closeItem(btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "false");
    if (panel) { panel.style.maxHeight = null; }
  }

  function openItem(btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "true");
    if (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
  }

  Array.prototype.forEach.call(questions, function (btn) {
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeItem(btn);
      } else {
        openItem(btn);
      }
    });
  });

  /* Keep an open panel correctly sized on resize */
  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      Array.prototype.forEach.call(questions, function (btn) {
        if (btn.getAttribute("aria-expanded") === "true") {
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          if (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
        }
      });
    }, 150);
  });
})();
