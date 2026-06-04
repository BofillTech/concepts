/* =========================================================
   Edenbrook Motel — main.js
   Vanilla ES6+ · IIFE · no dependencies
   ========================================================= */
(function () {
  "use strict";

  var BOOKING_URL = "https://reserve3.resnexus.com/resnexus/reservations/lodging/16668E41-05B9-474F-AE2C-74AF095D2D29";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.setAttribute("data-state", window.scrollY > 60 ? "scrolled" : "top");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-primary");
  var scrim = document.querySelector(".nav-scrim");

  function openNav() {
    nav.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    if (scrim) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add("is-open"); }); }
  }
  function closeNav() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (scrim) {
      scrim.classList.remove("is-open");
      setTimeout(function () { scrim.hidden = true; }, 350);
    }
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("is-open") ? closeNav() : openNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    if (scrim) scrim.addEventListener("click", closeNav);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && nav.classList.contains("is-open")) closeNav();
    });
  }

  /* ---------- dynamic year ---------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- bottom booking bar ---------- */
  var bar = document.querySelector("[data-bookbar]");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var barObs = new IntersectionObserver(function (entries) {
      // show bar once hero is mostly scrolled past
      bar.classList.toggle("is-visible", !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: "-70% 0px 0px 0px" });
    barObs.observe(hero);
  } else if (bar) {
    bar.classList.add("is-visible");
  }

  /* ---------- date inputs: sensible defaults + validation ---------- */
  function iso(d) { return d.toISOString().split("T")[0]; }
  var checkin = document.querySelector("[data-checkin]");
  var checkout = document.querySelector("[data-checkout]");
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

  /* ---------- booking form submit -> ResNexus ---------- */
  var form = document.querySelector("[data-bookbar]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // ResNexus accepts the lodging URL directly; dates are kept for a real
      // engine that supports arrival/departure params (swap-in point).
      var url = BOOKING_URL;
      if (checkin && checkin.value && checkout && checkout.value) {
        url += (url.indexOf("?") > -1 ? "&" : "?") +
          "checkin=" + encodeURIComponent(checkin.value) +
          "&checkout=" + encodeURIComponent(checkout.value);
      }
      window.open(url, "_blank", "noopener");
    });
  }
})();
