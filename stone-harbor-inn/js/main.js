(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---- Hamburger menu ---- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-menu");
  function closeMenu(returnFocus) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) { toggle.focus(); }
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = nav.querySelector("a"); if (first) { first.focus(); } }
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { closeMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(true); }
    });
  }

  /* ---- Sticky header state ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Key-tag room finder (ARIA tabs) ---- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.keys [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.setAttribute("tabindex", on ? "0" : "-1");
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) { panel.hidden = !on; }
    });
    if (focus) { tab.focus(); }
  }
  if (tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") { next = tabs[(i + 1) % tabs.length]; }
        if (e.key === "ArrowLeft") { next = tabs[(i - 1 + tabs.length) % tabs.length]; }
        if (e.key === "Home") { next = tabs[0]; }
        if (e.key === "End") { next = tabs[tabs.length - 1]; }
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    select(tabs[0], false);
  }

  /* ---- Hotlinked image fallback (class only, no inline styles) ---- */
  document.querySelectorAll("main img").forEach(function (img) {
    function mark() { if (img.parentElement) { img.parentElement.classList.add("is-missing"); } }
    img.addEventListener("error", mark);
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) { mark(); }
  });

  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
