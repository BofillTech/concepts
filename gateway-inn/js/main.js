/* Gateway Inn concept — interactions (vanilla ES6, IIFE) */
(function () {
  "use strict";

  var BOOKING_URL = "https://gatewayinn.client.innroad.com/";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- Sticky header ---- */
    var header = document.querySelector(".site-header");
    var onScroll = function () {
      if (window.scrollY > 40) { header.classList.add("is-stuck"); }
      else { header.classList.remove("is-stuck"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- Mobile nav ---- */
    var toggle = document.querySelector(".nav-toggle");
    var mobileNav = document.querySelector(".mobile-nav");
    var overlay = document.querySelector(".nav-overlay");

    var setNav = function (open) {
      if (!mobileNav) { return; }
      mobileNav.classList.toggle("is-open", open);
      if (overlay) { overlay.classList.toggle("is-open", open); }
      document.body.classList.toggle("nav-open", open);
      if (toggle) { toggle.setAttribute("aria-expanded", open ? "true" : "false"); }
    };
    if (toggle) { toggle.addEventListener("click", function () { setNav(!mobileNav.classList.contains("is-open")); }); }
    if (overlay) { overlay.addEventListener("click", function () { setNav(false); }); }
    if (mobileNav) {
      mobileNav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setNav(false); });
      });
    }

    /* ---- Scroll reveal ---- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---- Bottom booking bar ---- */
    var bar = document.querySelector(".book-bar");
    var hero = document.querySelector(".hero");
    if (bar && hero) {
      var heroObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { bar.classList.toggle("is-visible", !e.isIntersecting); });
      }, { threshold: 0 });
      heroObs.observe(hero);
    } else if (bar) {
      bar.classList.add("is-visible");
    }

    /* date defaults + min */
    var ci = document.getElementById("bb-checkin");
    var co = document.getElementById("bb-checkout");
    var fmt = function (d) { return d.toISOString().split("T")[0]; };
    if (ci && co) {
      var today = new Date();
      var tom = new Date(); tom.setDate(today.getDate() + 1);
      ci.min = fmt(today);
      ci.value = fmt(today);
      co.min = fmt(tom);
      co.value = fmt(tom);
      ci.addEventListener("change", function () {
        var next = new Date(ci.value); next.setDate(next.getDate() + 1);
        co.min = fmt(next);
        if (co.value <= ci.value) { co.value = fmt(next); }
      });
    }

    var bookBtn = document.getElementById("bb-book");
    if (bookBtn) {
      bookBtn.addEventListener("click", function () {
        window.open(BOOKING_URL, "_blank", "noopener");
      });
    }
  });
})();
