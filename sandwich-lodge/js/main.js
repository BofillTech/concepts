/* ==========================================================================
   Sandwich Lodge & Resort — concept interactions
   Vanilla ES6, IIFE, progressive enhancement.
   ========================================================================== */
(function () {
  "use strict";

  // Booking destination — swap in the property's live SiteMinder booking URL.
  var BOOKING_URL = "https://www.sandwichlodge.com/";

  /* ---- Sticky header state on scroll ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 60) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu after tapping a link
    document.querySelectorAll(".menu-primary a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Scroll-triggered reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---- Booking bar: date logic + submit ---- */
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");
  var bar = document.getElementById("bookbar");

  var iso = function (d) { return d.toISOString().split("T")[0]; };
  var addDays = function (d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; };

  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = addDays(today, 1);
    checkin.min = iso(today);
    checkin.value = iso(today);
    checkout.min = iso(tomorrow);
    checkout.value = iso(tomorrow);

    checkin.addEventListener("change", function () {
      var ci = checkin.value ? new Date(checkin.value) : today;
      var nextDay = iso(addDays(ci, 1));
      checkout.min = nextDay;
      if (!checkout.value || checkout.value <= checkin.value) {
        checkout.value = nextDay;
      }
    });
  }

  var goBook = function () {
    var url = BOOKING_URL;
    if (checkin && checkout && checkin.value && checkout.value) {
      url += (url.indexOf("?") === -1 ? "?" : "&") +
             "checkin=" + encodeURIComponent(checkin.value) +
             "&checkout=" + encodeURIComponent(checkout.value);
    }
    window.open(url, "_blank", "noopener");
  };

  if (bar) {
    bar.addEventListener("submit", function (e) { e.preventDefault(); goBook(); });
  }

  /* ---- All "Book Now" buttons route through the booking destination ---- */
  document.querySelectorAll("[data-book]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      goBook();
    });
  });
})();
