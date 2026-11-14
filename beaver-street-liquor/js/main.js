/* Beaver Street Liquor concept — vanilla ES6 IIFE */
(() => {
  'use strict';

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // Open-now status + today's hours (Flagstaff runs on America/Phoenix, no DST)
  const HOURS = { 0: [9, 20], 1: [9, 22], 2: [9, 22], 3: [9, 22], 4: [9, 23], 5: [9, 23], 6: [9, 23] };
  const fmt = (h) => `${((h + 11) % 12) + 1} ${h < 12 ? 'AM' : 'PM'}`;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = (t) => (parts.find((p) => p.type === t) || {}).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const now = Number(get('hour')) + Number(get('minute')) / 60;

  const status = document.querySelector('[data-open-status]');
  if (status && day > -1) {
    const [open, close] = HOURS[day];
    if (now >= open && now < close) {
      status.textContent = `Open now until ${fmt(close)}`;
      status.classList.add('is-open');
    } else {
      const next = now < open ? 'today' : 'tomorrow';
      status.textContent = `Closed now. Opens ${next} at 9 AM`;
      status.classList.add('is-closed');
    }
  }
  document.querySelectorAll('.hours-table tr[data-days]').forEach((row) => {
    if (row.dataset.days.split(',').map(Number).includes(day)) row.classList.add('is-today');
  });

  // Category tabs (WAI-ARIA tabs pattern)
  const tabs = Array.from(document.querySelectorAll('.shelf-tab'));
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); select(tabs[j], true); }
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
