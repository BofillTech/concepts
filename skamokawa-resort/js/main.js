/* =========================================================
   Skamokawa Resort — concept behaviour
   Vanilla ES6+, IIFE, progressive enhancement.
   Note: the property takes bookings by phone (no online
   engine), so the Book buttons + booking bar place a call.
   ========================================================= */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var nav = document.querySelector(".nav-primary");
  var bookbar = document.getElementById("bookbar");
  var hero = document.querySelector(".hero");

  /* ---------- sticky header state ---------- */
  function onScroll() {
    if (header) {
      header.setAttribute("data-state", window.scrollY > 60 ? "scrolled" : "top");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- booking bar reveal (after hero) ---------- */
  if (bookbar && hero && "IntersectionObserver" in window) {
    var heroWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bookbar.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }, { rootMargin: "-40% 0px 0px 0px" });
    heroWatch.observe(hero);
  } else if (bookbar) {
    bookbar.classList.add("is-visible");
  }

  /* ---------- booking date defaults + validation ---------- */
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  function iso(d) { return d.toISOString().split("T")[0]; }
  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    var dayAfter = new Date(); dayAfter.setDate(today.getDate() + 2);
    checkin.min = iso(today);
    checkin.value = iso(tomorrow);
    checkout.min = iso(dayAfter);
    checkout.value = iso(dayAfter);
    checkin.addEventListener("change", function () {
      var next = new Date(checkin.value); next.setDate(next.getDate() + 1);
      checkout.min = iso(next);
      if (new Date(checkout.value) <= new Date(checkin.value)) checkout.value = iso(next);
    });
  }

  /* ---------- booking submit -> phone (no online engine) ---------- */
  var bookForm = document.getElementById("bookForm");
  if (bookForm) {
    bookForm.addEventListener("submit", function (e) {
      e.preventDefault();
      /* Swap this for a real booking-engine URL once one exists. */
      window.location.href = "tel:+13607950726";
    });
  }

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
