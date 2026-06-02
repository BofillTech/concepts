/* =====================================================================
   Peninsula Island Resort & Spa — main.js
   Vanilla ES6+, IIFE pattern. No external dependencies.
   ===================================================================== */
(function () {
  "use strict";

  var BOOKING_URL = "https://peninsulaislandresort.client.innroad.com/";

  /* ---------- Sticky nav ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var drawer = document.querySelector(".nav__drawer");
  function setDrawer(open) {
    if (!drawer || !toggle || !nav) return;
    drawer.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
  }
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setDrawer(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setDrawer(false);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Booking bar ---------- */
  var form = document.querySelector(".bookbar");
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");

  // Default check-in = today, check-out = tomorrow; enforce min dates.
  function fmt(d) { return d.toISOString().split("T")[0]; }
  var today = new Date();
  var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
  if (checkin) {
    checkin.min = fmt(today);
    if (!checkin.value) checkin.value = fmt(today);
  }
  if (checkout) {
    checkout.min = fmt(tomorrow);
    if (!checkout.value) checkout.value = fmt(tomorrow);
  }
  if (checkin && checkout) {
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
      // Concept demo: forward to the property's real booking engine.
      window.open(BOOKING_URL, "_blank", "noopener");
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
