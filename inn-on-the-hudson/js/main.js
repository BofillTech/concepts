(function () {
  "use strict";

  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  var menuClose = document.querySelector(".mobile-menu__close");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    var firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.focus();
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });
  }
  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* Highlight current section in the side rail as the guest scrolls */
  var sections = document.querySelectorAll("main [id]");
  var railLinks = document.querySelectorAll(".rail-nav__link");
  if (sections.length && railLinks.length && "IntersectionObserver" in window) {
    var map = {};
    railLinks.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      map[id] = link;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            railLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
            link.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* Pause the fact ticker on hover/focus for readability */
  var ticker = document.querySelector(".ticker__track");
  if (ticker) {
    ticker.addEventListener("mouseenter", function () { ticker.style.animationPlayState = "paused"; });
    ticker.addEventListener("mouseleave", function () { ticker.style.animationPlayState = "running"; });
    ticker.addEventListener("focusin", function () { ticker.style.animationPlayState = "paused"; });
    ticker.addEventListener("focusout", function () { ticker.style.animationPlayState = "running"; });
  }
})();
