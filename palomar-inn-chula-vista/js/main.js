/* =========================================================================
   Palomar Inn Chula Vista — main.js
   Vanilla ES6+, IIFE, no dependencies
   ========================================================================= */
(function () {
  "use strict";

  var BOOKING_URL = "https://direct-book.com/properties/3008PalomarInnDIRECT";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- hero ready (triggers Ken Burns + headline rise) ---- */
  var hero = document.getElementById("hero");
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add("is-ready"); });
  }

  /* ---- sticky header state ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile nav ---- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav-primary");
  var scrim = document.getElementById("nav-scrim");

  function closeNav() {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
    scrim.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
  function openNav() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    nav.classList.add("is-open");
    scrim.classList.add("is-open");
    document.body.classList.add("nav-open");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      open ? closeNav() : openNav();
    });
    scrim.addEventListener("click", closeNav);
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeNav();
    });
  }

  /* ---- footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- scroll reveals ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- booking bar reveal after hero ---- */
  var bookbar = document.getElementById("bookbar");
  if (bookbar && hero && "IntersectionObserver" in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bookbar.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }, { threshold: 0 });
    heroIO.observe(hero);
  } else if (bookbar) {
    bookbar.classList.add("is-visible");
  }

  /* ---- booking bar date defaults + validation ---- */
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");

  function iso(d) { return d.toISOString().split("T")[0]; }

  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    checkin.min = iso(today);
    checkin.value = iso(today);
    checkout.min = iso(tomorrow);
    checkout.value = iso(tomorrow);

    checkin.addEventListener("change", function () {
      var ci = new Date(checkin.value);
      var next = new Date(ci); next.setDate(ci.getDate() + 1);
      checkout.min = iso(next);
      if (new Date(checkout.value) <= ci) checkout.value = iso(next);
    });
  }

  /* ---- booking bar submit → engine (params hook for when format is known) ---- */
  if (bookbar) {
    bookbar.addEventListener("submit", function (e) {
      e.preventDefault();
      // direct-book param format unconfirmed — open the real engine.
      window.open(BOOKING_URL, "_blank", "noopener");
    });
  }
})();
