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
      ['Onboarding Guide', 'How we get you live', '/onboarding/'],
      ['Intro Video', 'QuillStay in 3 minutes', '/introvideo/'],
      ['Support', 'Call or email, 24/7 phone', '/support/']
    ]}
  ];
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
      '<a class="sh-logo" href="' + (isHome ? '#top' : '/') + '" aria-label="QuillStay home"><img src="/img/quillstay-logo-light.png" alt="QuillStay"></a>' +
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
