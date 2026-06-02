/* =============================================================
   Bar Harbor Motel — Homepage Concept
   Vanilla ES6+ · IIFE · no dependencies
   ============================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BOOKING_URL = "https://reservations.barharbormotel.com/108277#/guestsandrooms";

  /* ---------- Sticky header ---------- */
  var header = document.querySelector(".header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Hero load-in ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add("is-ready"); });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });
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

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Booking bar ---------- */
  var bar = document.querySelector(".bookbar");
  var inEl = document.getElementById("checkin");
  var outEl = document.getElementById("checkout");
  var bookBtns = document.querySelectorAll("[data-book]");

  function iso(d) { return d.toISOString().split("T")[0]; }
  if (inEl && outEl) {
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    var dayAfter = new Date(); dayAfter.setDate(today.getDate() + 2);
    inEl.min = iso(today); inEl.value = iso(tomorrow);
    outEl.min = iso(tomorrow); outEl.value = iso(dayAfter);

    inEl.addEventListener("change", function () {
      var next = new Date(inEl.value); next.setDate(next.getDate() + 1);
      outEl.min = iso(next);
      if (new Date(outEl.value) <= new Date(inEl.value)) outEl.value = iso(next);
    });
  }
  bookBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.open(BOOKING_URL, "_blank", "noopener");
    });
  });

  /* show booking bar after hero */
  if (bar) {
    if (!("IntersectionObserver" in window)) {
      bar.classList.add("is-visible");
    } else {
      var sentinel = document.querySelector(".hero");
      var barIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle("is-visible", !entry.isIntersecting);
        });
      }, { threshold: 0 });
      if (sentinel) barIo.observe(sentinel); else bar.classList.add("is-visible");
    }
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
