/* Red Agave Adventure Resort — concept interactions
   Vanilla ES6, no dependencies. Concept by Bofill Technologies. */
(function () {
  "use strict";

  var doc = document;
  var BOOKING_URL = "https://apps.gracesoft.com/EasyWebRez/roomdetails/734";

  /* ---------- Sticky header state ---------- */
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.setAttribute("data-state", window.scrollY > 60 ? "scrolled" : "top");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var toggle = doc.querySelector(".nav-toggle");
  var drawer = doc.getElementById("mobile-drawer");
  var scrim = doc.querySelector("[data-scrim]");
  var closeBtn = doc.querySelector(".mobile-drawer__close");

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    scrim.hidden = false;
    /* allow display to apply before transitioning */
    requestAnimationFrame(function () {
      drawer.classList.add("is-open");
      scrim.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    doc.documentElement.classList.add("nav-open");
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    scrim.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    doc.documentElement.classList.remove("nav-open");
    window.setTimeout(function () {
      drawer.hidden = true;
      scrim.hidden = true;
    }, 380);
  }
  if (toggle) toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (scrim) scrim.addEventListener("click", closeDrawer);
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 920 && drawer && !drawer.hidden) closeDrawer();
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Booking bar reveal (after hero) ---------- */
  var bar = doc.querySelector("[data-bookbar]");
  var hero = doc.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    bar.hidden = false;
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "-80px 0px 0px 0px" });
    barIO.observe(hero);
  } else if (bar) {
    bar.hidden = false;
    bar.classList.add("is-visible");
  }

  /* ---------- Booking date logic ---------- */
  function fmt(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }
  var checkin = doc.querySelector("[data-checkin]");
  var checkout = doc.querySelector("[data-checkout]");
  var today = new Date();
  var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
  var dayAfter = new Date(); dayAfter.setDate(today.getDate() + 2);

  if (checkin && checkout) {
    checkin.min = fmt(today);
    checkin.value = fmt(tomorrow);
    checkout.min = fmt(dayAfter);
    checkout.value = fmt(dayAfter);
    checkin.addEventListener("change", function () {
      var ci = new Date(checkin.value + "T00:00:00");
      var nextDay = new Date(ci); nextDay.setDate(ci.getDate() + 1);
      checkout.min = fmt(nextDay);
      if (new Date(checkout.value + "T00:00:00") <= ci) {
        checkout.value = fmt(nextDay);
      }
    });
  }

  /* Build a booking URL. NOTE: GraceSoft EasyWebRez param names for
     check-in/out are not confirmed — passing checkin/checkout as a
     best effort. Swap to the engine's real params when verified. */
  function bookingHref() {
    if (checkin && checkout && checkin.value && checkout.value) {
      return BOOKING_URL + "?checkin=" + encodeURIComponent(checkin.value) +
        "&checkout=" + encodeURIComponent(checkout.value);
    }
    return BOOKING_URL;
  }
  var barBtn = doc.querySelector("[data-book-bar]");
  if (barBtn) {
    barBtn.addEventListener("click", function () {
      barBtn.setAttribute("href", bookingHref());
    });
  }

  /* ---------- Dynamic year ---------- */
  var yr = doc.querySelector("[data-year]");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
