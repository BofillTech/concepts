/* ==========================================================================
   Crystal Blue Operations — Parking Landing Page
   Vanilla ES6, IIFE pattern. No external dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll-aware header ------------------------------------------------ */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle -------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".menu-primary");

  var closeMenu = function () {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Smooth anchor scrolling ------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
      closeMenu();
    });
  });

  /* ---- Staggered reveal on scroll ---------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { el.classList.add("is-in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Demo inquiry form -------------------------------------------------- */
  var form = document.querySelector(".form");
  var status = document.querySelector(".form__status");

  if (form && status) {
    var required = form.querySelectorAll("[required]");

    // Clear the invalid state as soon as the user starts correcting a field.
    required.forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var firstInvalid = null;
      required.forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle("is-invalid", empty);
        if (empty) {
          field.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
          ok = false;
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      if (!ok) {
        status.textContent = "Please complete the required fields.";
        status.classList.add("form__status--error", "is-visible");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = (form.querySelector("#name") || {}).value || "there";
      status.classList.remove("form__status--error");
      status.textContent = "Thanks, " + name.split(" ")[0] +
        "! Your parking inquiry has been received \u2014 our leasing team will be in touch shortly.";
      status.classList.add("is-visible");
      form.reset();
      required.forEach(function (field) {
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
      });
      status.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
    });
  }

  /* ---- Footer year -------------------------------------------------------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
