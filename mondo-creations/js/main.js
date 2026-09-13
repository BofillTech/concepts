/* ============================================================
   MONDO CREATIONS — main.js
   Vanilla ES6+. No external libraries. No inline handlers.
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  doc.documentElement.classList.add("js");
  var body = doc.body;

  /* ---------- Dynamic year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------- Sticky header shadow ---------- */
  var header = doc.getElementById("siteHeader");
  function onScrollHeader() {
    if (!header) { return; }
    if (window.scrollY > 8) { header.classList.add("is-stuck"); }
    else { header.classList.remove("is-stuck"); }
  }

  /* ---------- Mobile drawer ---------- */
  var toggle = doc.getElementById("navToggle");
  var nav = doc.querySelector(".nav-primary");
  var scrim = doc.getElementById("navScrim");

  function openNav() {
    if (!nav) { return; }
    nav.classList.add("is-open");
    if (scrim) { scrim.hidden = false; }
    if (toggle) { toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Close menu"); }
    body.classList.add("is-locked");
  }
  function closeNav() {
    if (!nav) { return; }
    nav.classList.remove("is-open");
    if (scrim) { scrim.hidden = true; }
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); }
    body.classList.remove("is-locked");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (nav && nav.classList.contains("is-open")) { closeNav(); } else { openNav(); }
    });
  }
  if (scrim) { scrim.addEventListener("click", closeNav); }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && nav.classList.contains("is-open")) { closeNav(); }
  });
  /* Close drawer when a nav link is tapped */
  if (nav) {
    nav.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A") { closeNav(); }
    });
  }

  /* ---------- Scroll reveals ---------- */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Mobile quick bar reveal ---------- */
  var quickbar = doc.getElementById("quickbar");
  var hero = doc.querySelector(".hero");
  if (quickbar && hero && "IntersectionObserver" in window) {
    var qbIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { quickbar.classList.remove("is-visible"); }
        else { quickbar.classList.add("is-visible"); }
      });
    }, { threshold: 0 });
    qbIo.observe(hero);
  }

  /* ---------- Quote form (demo) ---------- */
  var form = doc.getElementById("quoteForm");
  var note = doc.getElementById("quoteFormNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = doc.getElementById("qf-name");
      var email = doc.getElementById("qf-email");
      var okName = name && name.value.trim().length > 0;
      var okEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      if (!okName || !okEmail) {
        if (note) {
          note.textContent = "Please add your name and a valid email so we can reach you.";
          note.classList.remove("is-ok");
          note.classList.add("is-err");
        }
        if (!okName && name) { name.focus(); }
        else if (!okEmail && email) { email.focus(); }
        return;
      }

      /* DEMO ONLY — wire to a real endpoint (Brevo / Formspree / WP form) here. */
      if (note) {
        note.textContent = "Thanks — your request is in. We'll be in touch shortly.";
        note.classList.remove("is-err");
        note.classList.add("is-ok");
      }
      form.reset();
    });
  }

  /* ---------- Project filter (Projects page only) ---------- */
  var filterGroup = doc.getElementById("filterGroup");
  if (filterGroup) {
    var pills = filterGroup.querySelectorAll(".filter__pill");
    var cards = doc.querySelectorAll(".project-card");
    var empty = doc.getElementById("projectEmpty");

    function applyFilter(cat) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = cat === "all" || card.getAttribute("data-category") === cat;
        card.hidden = !match;
        if (match) { shown++; }
      });
      if (empty) { empty.hidden = shown !== 0; }
      pills.forEach(function (p) {
        var isMatch = p.getAttribute("data-filter") === cat;
        p.classList.toggle("is-active", isMatch);
        p.setAttribute("aria-pressed", isMatch ? "true" : "false");
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        var cat = pill.getAttribute("data-filter");
        applyFilter(cat);
        var url = new URL(window.location.href);
        if (cat === "all") { url.searchParams.delete("category"); }
        else { url.searchParams.set("category", cat); }
        window.history.replaceState(null, "", url);
      });
    });

    var initial = new URLSearchParams(window.location.search).get("category") || "all";
    var validCats = Array.prototype.map.call(pills, function (p) { return p.getAttribute("data-filter"); });
    applyFilter(validCats.indexOf(initial) > -1 ? initial : "all");
  }

  /* ---------- FAQ accordion (FAQ page only) ---------- */
  var faqList = doc.getElementById("faqList");
  if (faqList) {
    var faqButtons = faqList.querySelectorAll(".faq-item__q");
    faqButtons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
      if (i === 0) { btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- Listeners ---------- */
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();
})();
