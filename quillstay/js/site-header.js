/* QuillStay shared site header.
   Edit the lists below to change the menu on every page at once. */
(function () {
  var host = document.getElementById('site-header');
  if (!host) return;

  /* ---------- Settings you may want to change ---------- */
  var CONFIG = {
    phoneDisplay: '203-457-8550',
    phoneHref: 'tel:203-457-8550',
    demoUrl: '',   // paste a scheduling link here (e.g. Google Calendar booking page) to make "Book a demo" open it
    loginUrl: ''   // paste the customer login address here and a "Log in" link appears
  };

  var ANCHORS = [   // homepage sections (jump to the section on the homepage, from any page)
    ['Features', '#features'],
    ['For guests', '#guests'],
    ['Integrations', '#integrations'],
    ['Pricing', '#pricing']
  ];
  var GROUPS = [
    { label: 'Solutions', items: [
      ['Condo-Hotels & Co-Ops', 'Owner portals and statements', '/condo-hotels/'],
      ['Your First Booking Engine', 'New to online booking?', '/first-booking-engine/'],
      ['Why Switch', 'Free migration, no downtime', '/switch/'],
      ['Case Study: Royal Atlantic', '90 rooms in Montauk, NY', '/case-studies/royal-atlantic/']
    ]},
    { label: 'Resources', items: [
      ['FAQ', 'Straight answers', '/faq/'],
      ['How-To Videos', 'Short training walkthroughs', '/how-to-videos/'],
      ['Training Course', 'Step-by-step client training (login required)', '/training/'],
      ['Onboarding Guide', 'How we get you live', '/onboarding/'],
      ['Intro Video', 'QuillStay in 3 minutes', '/introvideo/'],
      ['Support', 'Call or email, 24/7 phone', '/support/']
    ]}
  ];
  /* The QuillStay logo is embedded right here (not loaded from an image file), so it always shows,
     even if the image files in /img are missing. To change the logo, replace these two data strings. */
  var LOGO_LIGHT = 'data:image/webp;base64,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';
  /* ----------------------------------------------------- */

  var isHome = host.hasAttribute('data-home');
  var path = location.pathname.replace(/index\.html$/, '');
  function anchor(h) { return isHome ? h : '/' + h; }
  function cur(p) { return path === p ? ' aria-current="page"' : ''; }
  var demoHref = CONFIG.demoUrl || (document.getElementById('demo') ? '#demo' : '/#demo');
  var demoAttrs = CONFIG.demoUrl ? ' target="_blank" rel="noopener"' : '';

  var desktop = ANCHORS.map(function (a) {
    return '<li><a class="sh-link" href="' + anchor(a[1]) + '">' + a[0] + '</a></li>';
  }).join('');
  GROUPS.forEach(function (g, i) {
    var menu = g.items.map(function (it) {
      return '<a href="' + it[2] + '"' + cur(it[2]) + '>' + it[0] + '<small>' + it[1] + '</small></a>';
    }).join('');
    desktop += '<li class="has-dd"><button type="button" class="sh-link" aria-expanded="false" aria-haspopup="true" aria-controls="sh-menu-' + i + '">' +
      g.label + '<span class="sh-caret" aria-hidden="true"></span></button><div class="sh-menu" id="sh-menu-' + i + '">' + menu + '</div></li>';
  });

  var panel = '';
  panel += ANCHORS.map(function (a) { return '<a href="' + anchor(a[1]) + '">' + a[0] + '</a>'; }).join('');
  GROUPS.forEach(function (g) {
    panel += '<h5>' + g.label + '</h5>' + g.items.map(function (it) {
      return '<a href="' + it[2] + '"' + cur(it[2]) + '>' + it[0] + '</a>';
    }).join('');
  });
  if (CONFIG.loginUrl) panel += '<h5>Customers</h5><a href="' + CONFIG.loginUrl + '">Log in</a>';
  panel += '<a class="sh-panel-cta" href="' + demoHref + '"' + demoAttrs + '>Book a demo</a>' +
           '<a class="sh-panel-call" href="' + CONFIG.phoneHref + '">Call ' + CONFIG.phoneDisplay + '</a>';

  var phoneIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1C10.4 21.1 2.9 13.6 2.9 4.4c0-.6.4-1 1-1H7.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';

  host.innerHTML =
    '<div class="sh-bar">' +
      '<a class="sh-logo" href="' + (isHome ? '#top' : '/') + '" aria-label="QuillStay home"><img src="' + LOGO_LIGHT + '" alt="QuillStay" width="99" height="38"></a>' +
      '<nav aria-label="Main" style="display:contents"><ul class="sh-links">' + desktop + '</ul></nav>' +
      '<div class="sh-actions">' +
        '<a class="sh-phone" href="' + CONFIG.phoneHref + '" aria-label="Call ' + CONFIG.phoneDisplay + '">' + phoneIcon +
          '<span class="sh-phone-text">' + CONFIG.phoneDisplay + '</span></a>' +
        (CONFIG.loginUrl ? '<a class="sh-login" href="' + CONFIG.loginUrl + '">Log in</a>' : '') +
        '<a class="sh-demo" href="' + demoHref + '"' + demoAttrs + '>Book a demo</a>' +
        '<button type="button" class="sh-burger" aria-label="Open menu" aria-expanded="false" aria-controls="sh-panel"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</div>' +
    '<div class="sh-panel" id="sh-panel">' + panel + '</div>';

  var burger = host.querySelector('.sh-burger');
  var dds = Array.prototype.slice.call(host.querySelectorAll('.has-dd'));

  function closeDropdowns(except) {
    dds.forEach(function (li) {
      if (li !== except) { li.classList.remove('open'); li.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
  }
  function setPanel(open) {
    host.classList.toggle('panel-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  dds.forEach(function (li) {
    var btn = li.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !li.classList.contains('open');
      closeDropdowns(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  burger.addEventListener('click', function (e) { e.stopPropagation(); closeDropdowns(); setPanel(!host.classList.contains('panel-open')); });
  host.querySelector('.sh-panel').addEventListener('click', function (e) { if (e.target.closest('a')) setPanel(false); });
  document.addEventListener('click', function (e) { if (!host.contains(e.target)) { closeDropdowns(); setPanel(false); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDropdowns(); setPanel(false); } });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) setPanel(false); });
})();


/* ---------- Extra footer links ----------
   Adds links to the footer columns on every page from this one file.
   Format: [column heading, link text, address, put it after this existing link's address]
   (If a page's footer already has the link, nothing is added twice.) */
(function () {
  var FOOTER_EXTRA = [
    ['Resources', 'Training Course', '/training/', '/how-to-videos/']
  ];
  function run() {
    FOOTER_EXTRA.forEach(function (x) {
      var cols = document.querySelectorAll('footer .foot-col');
      for (var i = 0; i < cols.length; i++) {
        var h = cols[i].querySelector('h4');
        if (!h || h.textContent.trim() !== x[0]) continue;
        if (cols[i].querySelector('a[href="' + x[2] + '"]')) return;
        var a = document.createElement('a');
        a.href = x[2];
        a.textContent = x[1];
        var after = x[3] && cols[i].querySelector('a[href="' + x[3] + '"]');
        if (after) after.parentNode.insertBefore(a, after.nextSibling); else cols[i].appendChild(a);
        return;
      }
    });
  }
  /* Footer logo: embedded too, so it never depends on an image file. */
  var LOGO_DARK = 'data:image/webp;base64,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';
  function fixFooterLogo() {
    var img = document.querySelector('footer .foot-brand img');
    if (img) img.src = LOGO_DARK;
  }
  function start() { run(); fixFooterLogo(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
