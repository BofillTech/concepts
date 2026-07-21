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
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (toggle && drawer && closeBtn) {
    toggle.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
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
})();
