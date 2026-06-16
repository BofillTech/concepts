/* Eisenhower Hotel & Conference Center — Concept by Bofill Technologies */
(function () {
  "use strict";

  var BOOKING_URL =
    "https://secure.guestcentric.net/api/bg/book.php?apikey=093f2cdf9d0d5fc85410ebbaeebe0dbe&s=default&l=en_US";

  /* ---- Sticky nav ---- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile drawer ---- */
  var toggle = document.querySelector(".nav__toggle");
  var drawer = document.querySelector(".drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Scroll reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Booking bar ---- */
  function fmt(d) { return d.toISOString().split("T")[0]; }
  var today = new Date();
  var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);

  var ci = document.getElementById("checkin");
  var co = document.getElementById("checkout");
  if (ci && co) {
    ci.min = fmt(today);
    ci.value = fmt(today);
    co.min = fmt(tomorrow);
    co.value = fmt(tomorrow);
    ci.addEventListener("change", function () {
      var next = new Date(ci.value);
      next.setDate(next.getDate() + 1);
      co.min = fmt(next);
      if (new Date(co.value) <= new Date(ci.value)) co.value = fmt(next);
    });
  }

  document.querySelectorAll("[data-book]").forEach(function (el) {
    el.addEventListener("click", function (ev) {
      ev.preventDefault();
      window.open(BOOKING_URL, "_blank", "noopener");
    });
  });
})();
