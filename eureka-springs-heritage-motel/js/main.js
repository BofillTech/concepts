/* =========================================================
   Eureka Springs Heritage Motel — main.js
   Vanilla ES6+ IIFE. No external libraries.
   ========================================================= */
(function () {
  "use strict";

  var BOOKING_URL = "https://v2.reservationkey.com/86494/Reserve";

  /* ---------- sticky nav ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  var scrim = document.querySelector(".nav__scrim");

  function openNav() {
    links.classList.add("is-open");
    scrim.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }
  function closeNav() {
    links.classList.remove("is-open");
    scrim.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (links.classList.contains("is-open")) closeNav();
      else openNav();
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  links && links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("is-open")) closeNav();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeNav();
  });

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- booking bar reveal after hero ---------- */
  var bar = document.querySelector(".bookbar");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) bar.classList.remove("is-visible");
        else bar.classList.add("is-visible");
      });
    }, { threshold: 0 });
    barIO.observe(hero);
  } else if (bar) {
    bar.classList.add("is-visible");
  }

  /* ---------- date defaults ---------- */
  function fmt(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  if (checkin && checkout) {
    var today = new Date();
    var t1 = new Date(today); t1.setDate(t1.getDate() + 1);
    var t2 = new Date(today); t2.setDate(t2.getDate() + 2);
    checkin.min = fmt(today);
    checkin.value = fmt(t1);
    checkout.min = fmt(t1);
    checkout.value = fmt(t2);
    checkin.addEventListener("change", function () {
      var ci = new Date(checkin.value);
      var nextDay = new Date(ci); nextDay.setDate(nextDay.getDate() + 1);
      checkout.min = fmt(nextDay);
      if (new Date(checkout.value) <= ci) checkout.value = fmt(nextDay);
    });
  }

  /* ---------- book actions ---------- */
  function goBook() {
    /* ReservationKey opens to the property reservation page.
       Hook: append date params here once the engine's param format is confirmed. */
    window.open(BOOKING_URL, "_blank", "noopener");
  }
  document.querySelectorAll("[data-book]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      goBook();
    });
  });

  /* ---------- image hotlink fallback ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      if (img.dataset.failed) return;
      img.dataset.failed = "1";
      var alt = img.getAttribute("data-fallback");
      if (alt) { img.src = alt; }
      else { img.style.visibility = "hidden"; }
    });
  });

  /* ---------- dynamic year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
