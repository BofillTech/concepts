/* Mountain Shadows — concept interactions (vanilla ES6, no deps) */
(function () {
  "use strict";

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById("nav");
  var stuckAt = 40;
  function onScroll() {
    if (window.scrollY > stuckAt) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function closeMenu() {
    links.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Scroll reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Bottom booking bar: carry dates to booking engine ---- */
  var base = "https://guest.rezstream.com/search/mountain-shadows-2";
  var ci = document.getElementById("ci");
  var co = document.getElementById("co");
  var go = document.getElementById("bookGo");

  // default check-in = tomorrow, check-out = +2 nights
  var t = new Date(); t.setDate(t.getDate() + 1);
  var t2 = new Date(); t2.setDate(t2.getDate() + 3);
  function iso(d) { return d.toISOString().slice(0, 10); }
  ci.value = iso(t); co.value = iso(t2);
  ci.min = iso(new Date());

  function buildUrl() {
    var url = base;
    if (ci.value && co.value) {
      url += "?checkin=" + encodeURIComponent(ci.value) +
             "&checkout=" + encodeURIComponent(co.value);
    }
    go.setAttribute("href", url);
  }
  ci.addEventListener("change", function () {
    if (co.value && co.value <= ci.value) {
      var n = new Date(ci.value); n.setDate(n.getDate() + 1); co.value = iso(n);
    }
    co.min = ci.value; buildUrl();
  });
  co.addEventListener("change", buildUrl);
  buildUrl();
})();
