/* =====================================================================
   Island Inn Beach Resort — main.js
   Concept by Bofill Technologies. Vanilla ES6+, no dependencies.
   ===================================================================== */
(function () {
  "use strict";

  var BOOKING_URL = "https://app.thebookingbutton.com/properties/islandinnbeachresortdirect";

  /* ---- Sticky header state ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav drawer ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var scrim = document.querySelector(".nav-scrim");

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    if (scrim) scrim.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("no-scroll", open);
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  if (nav) {
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) setNav(false);
  });

  /* ---- Scroll reveals ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
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

  /* ---- Booking bar reveal after hero ---- */
  var bar = document.querySelector(".bookbar");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-visible", !entries[0].isIntersecting);
    }, { threshold: 0 });
    heroIO.observe(hero);
  } else if (bar) {
    bar.classList.add("is-visible");
  }

  /* ---- Booking date logic ---- */
  function iso(d) { return d.toISOString().split("T")[0]; }
  var ci = document.getElementById("bb-checkin");
  var co = document.getElementById("bb-checkout");
  if (ci && co) {
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    ci.min = iso(today); ci.value = iso(today);
    co.min = iso(tomorrow); co.value = iso(tomorrow);
    ci.addEventListener("change", function () {
      var next = new Date(ci.value); next.setDate(next.getDate() + 1);
      co.min = iso(next);
      if (co.value <= ci.value) co.value = iso(next);
    });
  }

  /* ---- Book Now (passes dates as hook for the booking engine) ---- */
  function goBook() {
    var url = BOOKING_URL;
    // NOTE: TheBookingButton param format for prefilled dates not yet confirmed.
    // When confirmed, append e.g. ?check_in=ci.value&check_out=co.value here.
    window.open(url, "_blank", "noopener");
  }
  document.querySelectorAll("[data-book]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); goBook(); });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
