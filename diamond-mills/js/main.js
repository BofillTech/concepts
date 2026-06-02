/* =================================================================
   Diamond Mills Resort — interactions
   Vanilla ES6, IIFE, progressive enhancement.
   ================================================================= */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---------- Footer year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------- Sticky header state ---------- */
  var header = doc.getElementById("siteHeader");
  function syncHeader() {
    if (!header) { return; }
    header.setAttribute("data-state", window.scrollY > 80 ? "scrolled" : "top");
  }
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  /* ---------- Flyout menu ---------- */
  var flyout = doc.getElementById("flyout");
  var toggle = doc.getElementById("menuToggle");
  var lastFocus = null;

  function openFlyout() {
    if (!flyout) { return; }
    lastFocus = doc.activeElement;
    flyout.hidden = false;
    /* allow display to apply before transition */
    window.requestAnimationFrame(function () { flyout.classList.add("is-open"); });
    body.classList.add("is-locked");
    if (toggle) { toggle.setAttribute("aria-expanded", "true"); }
    var firstClose = flyout.querySelector("[data-flyout-close], a");
    if (firstClose) { firstClose.focus(); }
  }

  function closeFlyout() {
    if (!flyout || flyout.hidden) { return; }
    flyout.classList.remove("is-open");
    body.classList.remove("is-locked");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); }
    var onEnd = function () {
      flyout.hidden = true;
      flyout.removeEventListener("transitionend", onEnd);
    };
    flyout.addEventListener("transitionend", onEnd);
    /* fallback in case transitionend doesn't fire */
    window.setTimeout(function () { if (flyout.classList.contains("is-open") === false) { flyout.hidden = true; } }, 600);
    if (lastFocus && typeof lastFocus.focus === "function") { lastFocus.focus(); }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (flyout && flyout.classList.contains("is-open")) { closeFlyout(); } else { openFlyout(); }
    });
  }

  if (flyout) {
    flyout.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-flyout-close]")) { closeFlyout(); }
      /* close when a real navigation link is followed */
      var link = t.closest("a[href]");
      if (link && !link.hasAttribute("data-flyout-close")) { closeFlyout(); }
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && flyout && flyout.classList.contains("is-open")) { closeFlyout(); }
  });

  /* ---------- Room tabs ---------- */
  var tablist = doc.querySelector('.rooms__tabs');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    function selectTab(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute("aria-controls"));
        if (panel) { panel.hidden = !selected; }
      });
    }

    tablist.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab) { selectTab(tab); }
    });

    tablist.addEventListener("keydown", function (e) {
      var idx = tabs.indexOf(doc.activeElement);
      if (idx === -1) { return; }
      var next = null;
      if (e.key === "ArrowRight") { next = tabs[(idx + 1) % tabs.length]; }
      else if (e.key === "ArrowLeft") { next = tabs[(idx - 1 + tabs.length) % tabs.length]; }
      else if (e.key === "Home") { next = tabs[0]; }
      else if (e.key === "End") { next = tabs[tabs.length - 1]; }
      if (next) { e.preventDefault(); next.focus(); selectTab(next); }
    });
  }

  /* ---------- Bottom booking bar reveal ---------- */
  var bookbar = doc.getElementById("bookbar");
  if (bookbar) {
    var revealAt = function () {
      /* show after the hero, hide again near the very bottom (footer) */
      var scrolled = window.scrollY;
      var nearBottom = (window.innerHeight + scrolled) >= (doc.body.offsetHeight - 220);
      if (scrolled > window.innerHeight * 0.6 && !nearBottom) {
        bookbar.classList.add("is-visible");
      } else {
        bookbar.classList.remove("is-visible");
      }
    };
    revealAt();
    window.addEventListener("scroll", revealAt, { passive: true });
    window.addEventListener("resize", revealAt, { passive: true });

    /* sensible default dates: today + tomorrow */
    var ci = bookbar.querySelector('input[name="checkin"]');
    var co = bookbar.querySelector('input[name="checkout"]');
    var fmt = function (d) { return d.toISOString().slice(0, 10); };
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    if (ci) { ci.min = fmt(today); ci.value = fmt(today); }
    if (co) { co.min = fmt(tomorrow); co.value = fmt(tomorrow); }
    if (ci && co) {
      ci.addEventListener("change", function () {
        var next = new Date(ci.value); next.setDate(next.getDate() + 1);
        co.min = fmt(next);
        if (co.value <= ci.value) { co.value = fmt(next); }
      });
    }
  }

})();
