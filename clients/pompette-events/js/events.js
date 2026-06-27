/* =========================================================================
   Pompette — Private Events page behaviour
   Vanilla ES6, single IIFE, no inline handlers. Layers over /js/main.js.
   ========================================================================= */
(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* -------------------------------------------------- Mobile nav */
  function initNav() {
    var nav    = $(".nav-primary");
    var toggle = $("[data-nav-toggle]");
    if (!nav || !toggle) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".menu-primary a", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------- Guest stepper */
  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  function initStepper(onChange) {
    var stepper = $("[data-stepper]");
    var input   = $("[data-guest-input]");
    if (!stepper || !input) return;

    var min = parseInt(input.min, 10) || 2;
    var max = parseInt(input.max, 10) || 200;

    function setVal(v) {
      input.value = clamp(v, min, max);
      onChange();
    }
    $$(".stepper__btn", stepper).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var step = parseInt(btn.getAttribute("data-step"), 10) || 0;
        setVal((parseInt(input.value, 10) || min) + step);
      });
    });
    input.addEventListener("input", onChange);
    input.addEventListener("change", function () {
      setVal(parseInt(input.value, 10) || min);
    });
  }

  /* -------------------------------------------------- Style chips */
  function initStyleChips(onChange) {
    var group = $("[data-style-group]");
    if (!group) return;
    $$(".chip", group).forEach(function (chip) {
      chip.addEventListener("click", function () {
        $$(".chip", group).forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        onChange();
      });
    });
  }

  function currentStyle() {
    var active = $("[data-style-group] .chip.is-active");
    return active ? active.getAttribute("data-style") : "cocktail";
  }

  /* -------------------------------------------------- Finder filter */
  // A space fits when the relevant capacity covers the headcount.
  // cocktail/buyout -> standing capacity; seated -> seated capacity.
  function spaceFits(space, guests, style) {
    var seated   = parseInt(space.getAttribute("data-cap-seated"), 10);   // NaN if empty
    var standing = parseInt(space.getAttribute("data-cap-standing"), 10);
    var isBuyout = space.getAttribute("data-buyout") === "true";

    if (style === "buyout") return isBuyout;             // only the full buyout
    if (style === "seated") {
      if (isNaN(seated)) return false;                   // bar has no seated cap
      return guests <= seated;
    }
    // cocktail / standing
    if (isNaN(standing)) return false;
    return guests <= standing;
  }

  function initFinder() {
    var spaces = $$("[data-space]");
    var result = $("[data-finder-result]");
    var input  = $("[data-guest-input]");
    if (!spaces.length || !input) return;

    function apply() {
      var guests = clamp(parseInt(input.value, 10) || 0, 2, 250);
      var style  = currentStyle();
      var matches = [];

      spaces.forEach(function (space) {
        var fits = spaceFits(space, guests, style);
        space.classList.toggle("is-match", fits);
        space.classList.toggle("is-dim", !fits);
        if (fits) {
          var name = $(".space__name", space);
          if (name) matches.push(name.textContent.trim());
        }
      });

      if (!result) return;
      var styleLabel = { cocktail: "a cocktail reception", seated: "a seated dinner", buyout: "a full buyout" }[style];
      if (matches.length === 0) {
        result.innerHTML = "That's a big one for " + styleLabel + " — tell us more below and we'll find a way to make it work.";
      } else {
        var list = matches.length === 1
          ? "<strong>" + matches[0] + "</strong>"
          : matches.slice(0, -1).map(function (m) { return "<strong>" + m + "</strong>"; }).join(", ")
            + " and <strong>" + matches[matches.length - 1] + "</strong>";
        result.innerHTML = "For " + guests + " guests at " + styleLabel + ", we'd suggest " + list + ".";
      }
    }

    initStepper(apply);
    initStyleChips(apply);
    apply();
  }

  /* -------------------------------------------------- Space CTA -> form */
  function initSpaceCtas() {
    var select = $("[data-inquiry-space]");
    $$("[data-inquire]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-inquire");
        if (select) {
          var opt = Array.prototype.filter.call(select.options, function (o) { return o.value === name; })[0];
          if (opt) select.value = name;
        }
        var target = document.getElementById("inquire");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        var nameField = document.getElementById("f-name");
        if (nameField) window.setTimeout(function () { nameField.focus(); }, 400);
      });
    });
  }

  /* -------------------------------------------------- Inquiry form */
  function initForm() {
    var form   = $("[data-inquiry-form]");
    var status = $("[data-form-status]");
    if (!form) return;

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name  = $("#f-name", form);
      var email = $("#f-email", form);
      var ok = true;

      [name, email].forEach(function (f) {
        var bad = !f.value.trim() || (f === email && !emailRe.test(f.value.trim()));
        f.classList.toggle("is-invalid", bad);
        if (bad) ok = false;
      });

      if (status) status.classList.toggle("is-error", !ok);
      if (!ok) {
        if (status) status.textContent = "Please add your name and a valid email.";
        return;
      }

      // NOTE: wire to the live forms handler (WPForms / Gravity / Brevo) on integration.
      if (status) status.textContent = "Thank you — your inquiry is on its way. We'll be in touch shortly.";
      form.reset();
    });
  }

  /* -------------------------------------------------- Boot */
  function init() {
    initNav();
    initFinder();
    initSpaceCtas();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
