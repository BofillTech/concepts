(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---- sticky nav ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) { nav.classList.add("is-stuck"); }
    else { nav.classList.remove("is-stuck"); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("drawer");
  var closeBtn = document.getElementById("drawerClose");
  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-locked");
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- hero video (autoplay unless reduced motion; poster is the fallback) ---- */
  var heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    if (reduce) {
      heroVideo.removeAttribute("autoplay");
      try { heroVideo.pause(); } catch (e) {}
    } else {
      var tryPlay = function () {
        var pr = heroVideo.play();
        if (pr && typeof pr.catch === "function") { pr.catch(function () {}); }
      };
      tryPlay();
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) { heroVideo.pause(); } else { tryPlay(); }
      });
    }
  }

  /* ---- hero slider (crossfade + autoplay + dots) ---- */
  var slider = document.getElementById("heroSlider");
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".hero__slide"));
    var dots = Array.prototype.slice.call(document.querySelectorAll(".hero__dot"));
    var i = 0, timer = null, DELAY = 7500;
    function show(n) {
      slides[i].classList.remove("is-active");
      if (dots[i]) dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      if (dots[i]) { dots[i].classList.add("is-active"); }
    }
    function next() { show(i + 1); }
    function start() { if (slides.length > 1 && !reduce) { stop(); timer = setInterval(next, DELAY); } }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { show(n); start(); });
    });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  /* ---- bottom booking bar: dates ---- */
  var bbIn = document.getElementById("bbIn");
  var bbOut = document.getElementById("bbOut");
  var bbGo = document.getElementById("bbGo");
  if (bbIn && bbOut) {
    var DAY = 86400000;
    function fmt(d) {
      var m = ("0" + (d.getMonth() + 1)).slice(-2);
      var day = ("0" + d.getDate()).slice(-2);
      return d.getFullYear() + "-" + m + "-" + day;
    }
    function parse(v) {
      var p = v.split("-");
      return new Date(+p[0], +p[1] - 1, +p[2]);
    }
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(today.getTime() + DAY);

    bbIn.min = fmt(today);
    bbOut.min = fmt(tomorrow);
    if (!bbIn.value) bbIn.value = fmt(today);
    if (!bbOut.value) bbOut.value = fmt(tomorrow);

    function syncGo() {
      if (!bbGo) return;
      var base = bbGo.getAttribute("data-base");
      bbGo.href = base + "?checkin=" + encodeURIComponent(bbIn.value) +
                  "&checkout=" + encodeURIComponent(bbOut.value);
    }
    // check-out must always follow check-in
    bbIn.addEventListener("change", function () {
      if (!bbIn.value) return;
      var nextDay = new Date(parse(bbIn.value).getTime() + DAY);
      bbOut.min = fmt(nextDay);
      if (!bbOut.value || parse(bbOut.value) <= parse(bbIn.value)) {
        bbOut.value = fmt(nextDay);
      }
      syncGo();
    });
    bbOut.addEventListener("change", syncGo);
    syncGo();
  }

  /* ---- dynamic year ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- gallery filter sub-menu ---- */
  var galleryFilter = document.querySelector(".gallery-filter");
  if (galleryFilter) {
    var figs = document.querySelectorAll(".gallery-grid figure");
    galleryFilter.addEventListener("click", function (e) {
      var btn = e.target.closest(".gallery-filter__btn");
      if (!btn) return;
      var f = btn.getAttribute("data-filter");
      galleryFilter.querySelectorAll(".gallery-filter__btn").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      figs.forEach(function (fig) {
        var show = (f === "all") || fig.getAttribute("data-cat") === f;
        fig.classList.toggle("is-hidden", !show);
      });
    });
  }


  /* ---- room thumbnail swap ---- */
  document.querySelectorAll(".roomrow__thumbs").forEach(function (strip) {
    var main = strip.parentElement.querySelector(".roomrow__main");
    if (!main) return;
    strip.querySelectorAll(".roomrow__thumb").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        main.src = img.getAttribute("src");
        main.alt = img.getAttribute("alt");
        strip.querySelectorAll(".roomrow__thumb").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });
  });


  /* ---- gallery lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = document.getElementById("lightboxImg");
    var lbCap = document.getElementById("lightboxCap");
    var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid figure"));
    var order = [], pos = -1;
    function visible() { return figures.filter(function (f) { return !f.classList.contains("is-hidden"); }); }
    function renderAt(p) {
      pos = (p + order.length) % order.length;
      var img = order[pos].querySelector("img");
      lbImg.setAttribute("src", img.getAttribute("src"));
      lbImg.setAttribute("alt", img.getAttribute("alt") || "");
      lbCap.textContent = img.getAttribute("alt") || "";
    }
    function open(fig) {
      order = visible();
      var idx = order.indexOf(fig);
      if (idx < 0) return;
      renderAt(idx);
      lightbox.hidden = false;
      document.body.classList.add("is-locked");
    }
    function close() {
      lightbox.hidden = true;
      document.body.classList.remove("is-locked");
    }
    figures.forEach(function (fig) {
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("click", function () { open(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); }
      });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () { renderAt(pos - 1); });
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () { renderAt(pos + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") renderAt(pos - 1);
      else if (e.key === "ArrowRight") renderAt(pos + 1);
    });
  }

})();
