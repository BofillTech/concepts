(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  // Footer year
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Sticky topbar shadow on scroll
  var topbar = document.getElementById("topbar");
  function onScroll() {
    if (!topbar) { return; }
    if (window.scrollY > 8) {
      topbar.classList.add("is-scrolled");
    } else {
      topbar.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile drawer toggle
  var burger = document.querySelector("[data-drawer-toggle]");
  var drawer = document.getElementById("drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var isOpen = !drawer.hidden;
      drawer.hidden = isOpen;
      burger.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("drawer-open", !isOpen);
    });
    drawer.querySelectorAll("[data-drawer-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        drawer.hidden = true;
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("drawer-open");
      });
    });
  }

  // Hero load-in
  var hero = document.querySelector(".hero");
  if (hero) {
    window.requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add("is-loaded"); }, 60);
    });
  }

  // Scroll reveal for sections
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
