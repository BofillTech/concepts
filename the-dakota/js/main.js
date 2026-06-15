/* The Dakota — Sioux Falls | Concept by Bofill Technologies */
(function () {
  "use strict";

  /* ---------- sticky nav state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.setAttribute("data-state", window.scrollY > 30 ? "scrolled" : "top");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  var scrim = document.getElementById("navScrim");

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    scrim.hidden = false;
    document.body.classList.add("no-scroll");
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    scrim.hidden = true;
    document.body.classList.remove("no-scroll");
  }
  toggle.addEventListener("click", function () {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  scrim.addEventListener("click", closeMenu);
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024 && menu.classList.contains("is-open")) closeMenu();
  });

  /* ---------- scroll reveals ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- logo fallback (if hotlinked logo fails) ---------- */
  var logo = document.querySelector(".nav__logo");
  var fallback = document.querySelector(".nav__brand-fallback");
  if (logo) {
    logo.addEventListener("error", function () {
      logo.style.display = "none";
      if (fallback) fallback.style.display = "inline";
    });
  }

  /* ---------- booking bar: reveal + date defaults ---------- */
  var bar = document.getElementById("bookbar");
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  var form = document.getElementById("bookForm");
  var RMS = "https://bookings10.rmscloud.com/Search/Index/14213/90/";

  function fmt(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  var today = new Date();
  var tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  var dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);

  if (checkin && checkout) {
    checkin.min = fmt(today);
    checkin.value = fmt(tomorrow);
    checkout.min = fmt(tomorrow);
    checkout.value = fmt(dayAfter);
    checkin.addEventListener("change", function () {
      var ci = new Date(checkin.value);
      var next = new Date(ci); next.setDate(ci.getDate() + 1);
      checkout.min = fmt(next);
      if (new Date(checkout.value) <= ci) checkout.value = fmt(next);
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      /* RMS IBE opens to the property; date params can be appended here
         once the engine's checkin/checkout query format is confirmed. */
      window.open(RMS, "_blank", "noopener");
    });
  }

  /* reveal bar once hero scrolls past */
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var hio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        bar.classList.toggle("is-visible", !en.isIntersecting);
      });
    }, { threshold: 0 });
    hio.observe(hero);
  } else if (bar) {
    bar.classList.add("is-visible");
  }

  /* ---------- dynamic year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
