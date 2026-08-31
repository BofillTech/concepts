(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---- sticky nav ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => { if (nav) nav.classList.toggle("is-stuck", window.scrollY > 60); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("drawer");
  const closeBtn = document.getElementById("drawerClose");
  const openDrawer = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-locked");
  };
  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
  };
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  }

  /* ---- reveal on scroll ---- */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  /* ---- hero / feature video (autoplay unless reduced motion; poster is the fallback) ---- */
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    if (reduce) {
      heroVideo.removeAttribute("autoplay");
      try { heroVideo.pause(); } catch (e) { /* noop */ }
    } else {
      const tryPlay = () => {
        const pr = heroVideo.play();
        if (pr && typeof pr.catch === "function") pr.catch(() => {});
      };
      tryPlay();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) heroVideo.pause(); else tryPlay();
      });
    }
  }

  /* ---- hero slider (crossfade + autoplay + dots) ---- */
  const slider = document.getElementById("heroSlider");
  if (slider) {
    const slides = [...slider.querySelectorAll(".hero__slide")];
    const dots = [...document.querySelectorAll(".hero__dot")];
    let i = 0;
    let timer = null;
    const DELAY = 7500;
    const show = (n) => {
      slides[i].classList.remove("is-active");
      if (dots[i]) dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      if (dots[i]) dots[i].classList.add("is-active");
    };
    const next = () => show(i + 1);
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (slides.length > 1 && !reduce) { stop(); timer = setInterval(next, DELAY); } };
    dots.forEach((d, n) => d.addEventListener("click", () => { show(n); start(); }));
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
    start();
  }

  /* ---- bottom booking bar: dates ---- */
  const bbIn = document.getElementById("bbIn");
  const bbOut = document.getElementById("bbOut");
  const bbGo = document.getElementById("bbGo");
  if (bbIn && bbOut) {
    const DAY = 86400000;
    const fmt = (d) => {
      const m = `0${d.getMonth() + 1}`.slice(-2);
      const day = `0${d.getDate()}`.slice(-2);
      return `${d.getFullYear()}-${m}-${day}`;
    };
    const parse = (v) => {
      const p = v.split("-");
      return new Date(+p[0], +p[1] - 1, +p[2]);
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + DAY);
    bbIn.min = fmt(today);
    bbOut.min = fmt(tomorrow);
    if (!bbIn.value) bbIn.value = fmt(today);
    if (!bbOut.value) bbOut.value = fmt(tomorrow);
    const syncGo = () => {
      if (!bbGo) return;
      const base = bbGo.getAttribute("data-base");
      bbGo.href = `${base}?checkin=${encodeURIComponent(bbIn.value)}&checkout=${encodeURIComponent(bbOut.value)}`;
    };
    bbIn.addEventListener("change", () => {
      if (!bbIn.value) return;
      const nextDay = new Date(parse(bbIn.value).getTime() + DAY);
      bbOut.min = fmt(nextDay);
      if (!bbOut.value || parse(bbOut.value) <= parse(bbIn.value)) bbOut.value = fmt(nextDay);
      syncGo();
    });
    bbOut.addEventListener("change", syncGo);
    syncGo();
  }

  /* ---- dynamic year ---- */
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- gallery filter sub-menu ---- */
  const galleryFilter = document.querySelector(".gallery-filter");
  if (galleryFilter) {
    const figs = document.querySelectorAll(".gallery-grid figure");
    galleryFilter.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-filter__btn");
      if (!btn) return;
      const f = btn.getAttribute("data-filter");
      galleryFilter.querySelectorAll(".gallery-filter__btn").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      figs.forEach((fig) => {
        const showFig = f === "all" || fig.getAttribute("data-cat") === f;
        fig.classList.toggle("is-hidden", !showFig);
      });
    });
  }

  /* ---- room thumbnail swap ---- */
  document.querySelectorAll(".roomrow__thumbs").forEach((strip) => {
    const main = strip.parentElement.querySelector(".roomrow__main");
    if (!main) return;
    strip.querySelectorAll(".roomrow__thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        main.src = img.getAttribute("src");
        main.alt = img.getAttribute("alt");
        strip.querySelectorAll(".roomrow__thumb").forEach((b) => b.classList.toggle("is-active", b === btn));
      });
    });
  });

  /* ---- gallery lightbox ---- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = document.getElementById("lightboxImg");
    const lbCap = document.getElementById("lightboxCap");
    const figures = [...document.querySelectorAll(".gallery-grid figure")];
    let order = [];
    let pos = -1;
    const visibleFigs = () => figures.filter((f) => !f.classList.contains("is-hidden"));
    const renderAt = (p) => {
      pos = (p + order.length) % order.length;
      const img = order[pos].querySelector("img");
      lbImg.setAttribute("src", img.getAttribute("src"));
      lbImg.setAttribute("alt", img.getAttribute("alt") || "");
      lbCap.textContent = img.getAttribute("alt") || "";
    };
    const openLb = (fig) => {
      order = visibleFigs();
      const idx = order.indexOf(fig);
      if (idx < 0) return;
      renderAt(idx);
      lightbox.hidden = false;
      document.body.classList.add("is-locked");
    };
    const closeLb = () => {
      lightbox.hidden = true;
      document.body.classList.remove("is-locked");
    };
    figures.forEach((fig) => {
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("click", () => openLb(fig));
      fig.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(fig); }
      });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => renderAt(pos - 1));
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => renderAt(pos + 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });
    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") renderAt(pos - 1);
      else if (e.key === "ArrowRight") renderAt(pos + 1);
    });
  }

  /* ---- weddings lead-gen form ---- */
  const weddingForm = document.getElementById("weddingForm");
  if (weddingForm) {
    weddingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = document.getElementById("weddingFormNote");
      if (note) note.hidden = false;
      weddingForm.querySelectorAll("input, textarea, button").forEach((el) => { el.disabled = true; });
    });
  }

  /* ---- gentle parallax drift on tagged images ---- */
  (() => {
    const els = [...document.querySelectorAll("[data-parallax]")];
    if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      els.forEach((el) => {
        const p = el.parentElement.getBoundingClientRect();
        if (p.bottom < 0 || p.top > window.innerHeight) return;
        const prog = (window.innerHeight - p.top) / (window.innerHeight + p.height);
        el.style.transform = `translateY(${(prog - 0.5) * 11}%)`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();
})();
