/* Long Island Regents Prep — shared behavior (vanilla ES6+, IIFE) */
(function () {
  "use strict";
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.querySelector(".nav-mobile");

  if (header) {
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    Array.prototype.forEach.call(mobile.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobile.classList.contains("is-open")) {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* FAQ accordion */
  Array.prototype.forEach.call(document.querySelectorAll(".faq__q"), function (q) {
    q.addEventListener("click", function () {
      var panel = q.nextElementSibling;
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
    });
  });

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("in"); });
  }

  /* Click-to-load video poster */
  Array.prototype.forEach.call(document.querySelectorAll("[data-video]"), function (poster) {
    poster.addEventListener("click", function (e) {
      var src = poster.getAttribute("data-video");
      if (!src) return;
      e.preventDefault();
      var f = document.createElement("iframe");
      f.setAttribute("src", src + "?autoplay=1&rel=0");
      f.setAttribute("title", "Long Island Regents Prep video");
      f.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
      f.setAttribute("allowfullscreen", "");
      poster.parentNode.replaceChild(f, poster);
    });
  });

  /* Dynamic year */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
