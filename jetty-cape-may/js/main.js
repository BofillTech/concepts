(function () {
  "use strict";

  /* ---- Bottom rail drawer toggle ---- */
  var toggle = document.querySelector(".rail__toggle");
  var links = document.querySelector(".rail__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Broken-image fallback for the hotlinked logo ---- */
  document.querySelectorAll("img[data-fallback-text]").forEach(function (img) {
    img.addEventListener("error", function () {
      var span = document.createElement("span");
      span.textContent = img.getAttribute("data-fallback-text") || "";
      span.style.fontFamily = "var(--font-display), serif";
      span.style.color = "#fff";
      span.style.fontSize = "1.1rem";
      span.style.letterSpacing = "0.04em";
      img.replaceWith(span);
    });
  });

  /* ---- Dynamic footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- Subtle staggered reveal on scroll (killed by reduced motion) ---- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".section-title, .room, .review, .welcome__media img"
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }
})();
