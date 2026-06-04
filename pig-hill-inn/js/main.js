/* The Pig Hill Inn — concept interactions
   Vanilla ES6, IIFE, progressive enhancement */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("navDrawer");
  var bookbar = document.getElementById("bookbar");
  var hero = document.querySelector(".hero");

  /* ---- Sticky nav background on scroll ---- */
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile drawer ---- */
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Bottom booking bar: show after hero scrolled past ---- */
  if (bookbar && hero && "IntersectionObserver" in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        bookbar.classList.toggle("is-visible", !e.isIntersecting);
      });
    }, { threshold: 0 });
    heroIO.observe(hero);
  } else if (bookbar) {
    bookbar.classList.add("is-visible");
  }

  /* ---- Booking bar date logic + submit ---- */
  var BOOK_URL = "https://via.eviivo.com/ThePigHillInn10516";
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  var form = document.getElementById("bookForm");

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

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      window.open(BOOK_URL, "_blank", "noopener");
    });
  }
})();
