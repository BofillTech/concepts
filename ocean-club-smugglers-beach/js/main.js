/* The Ocean Club on Smuggler's Beach — concept interactions
   Vanilla ES6+, IIFE, progressive enhancement. */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---- sticky nav state ---- */
  var nav = doc.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var toggle = doc.querySelector(".nav__toggle");
  var drawer = doc.querySelector(".drawer");
  var scrim = doc.querySelector(".scrim");

  function setDrawer(open) {
    drawer.setAttribute("data-open", open);
    scrim.setAttribute("data-open", open);
    toggle.setAttribute("aria-expanded", open);
    body.classList.toggle("is-locked", open);
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setDrawer(drawer.getAttribute("data-open") !== "true");
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });
  doc.querySelectorAll(".drawer__link").forEach(function (l) {
    l.addEventListener("click", function () { setDrawer(false); });
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.getAttribute("data-open") === "true") setDrawer(false);
  });

  /* ---- scroll reveals ---- */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- booking bar: reveal after hero, date defaults, open engine ---- */
  var bar = doc.querySelector(".bookbar");
  var hero = doc.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        bar.setAttribute("data-show", !en.isIntersecting);
      });
    }, { threshold: 0 });
    heroIO.observe(hero);
  } else if (bar) {
    bar.setAttribute("data-show", "true");
  }

  var ci = doc.getElementById("checkin");
  var co = doc.getElementById("checkout");
  function fmt(d) { return d.toISOString().split("T")[0]; }
  if (ci && co) {
    var t = new Date(); t.setDate(t.getDate() + 1);
    var t2 = new Date(); t2.setDate(t2.getDate() + 2);
    ci.value = fmt(t); ci.min = fmt(new Date());
    co.value = fmt(t2); co.min = fmt(t2);
    ci.addEventListener("change", function () {
      var nd = new Date(ci.value); nd.setDate(nd.getDate() + 1);
      co.min = fmt(nd);
      if (new Date(co.value) <= new Date(ci.value)) co.value = fmt(nd);
    });
  }

  var ENGINE = "https://booking.oceanclubsmugglersbeach.com/";
  function openEngine() {
    /* The live h-rez/booking engine date-param format isn't confirmed,
       so we open the engine directly. Hook: append ?checkin=&checkout= when verified. */
    window.open(ENGINE, "_blank", "noopener");
  }
  doc.querySelectorAll("[data-book]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); openEngine(); });
  });

  /* ---- dynamic year ---- */
  var y = doc.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
