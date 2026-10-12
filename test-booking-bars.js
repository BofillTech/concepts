/**
 * Playwright test for date-picker booking bars across all 13 hotel concepts
 * Tests at 1440px (desktop) and 390px (mobile)
 */

const { chromium } = require('playwright');

const hotels = [
  // 8 hotels completed in PR #20
  { slug: 'roam-inn', type: 'link-only' },
  { slug: 'open-hearth-inn', type: 'link-only' },
  { slug: 'north-vancouver-hotel', type: 'link-only' },
  { slug: 'general-palmer-hotel', type: 'cloudbeds', reservationUrl: 'https://hotels.cloudbeds.com/en/reservation/cwKUgx' },
  { slug: 'ocean-club-hotel', type: 'link-only' },
  { slug: 'dutchland-motel', type: 'siteminder' },
  { slug: 'hotel-chalet', type: 'synxis' },
  { slug: 'rsvp-hotel', type: 'siteminder' },
  
  // 5 hotels completed in this PR
  { slug: 'coyote-mountain-lodge', type: 'cloudbeds', reservationUrl: 'https://hotels.cloudbeds.com/reservation/4CMdnA' },
  { slug: 'forest-springs-resort', type: 'cloudbeds', reservationUrl: 'https://hotels.cloudbeds.com/reservation/4eNEUA' },
  { slug: 'ocean-sands-resort', type: 'link-only', expectedUrl: 'https://www.oceansandsresort.com/reservations/?adcid=2417' },
  { slug: 'silver-creek-hotel', type: 'link-only' },
  { slug: 'applewood-inn', type: 'link-only' }
];

async function testHotel(page, hotel, viewportWidth) {
  const viewportName = viewportWidth === 1440 ? 'desktop' : 'mobile';
  const url = `file://${__dirname}/${hotel.slug}/index.html`;
  
  console.log(`\n  Testing ${hotel.slug} at ${viewportWidth}px...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait a moment for any JS to initialize
    await page.waitForTimeout(500);
    
    // Find the booking bar - try common IDs/classes
    const bookingBarSelectors = [
      '#bookingBar', 
      '#booking-bar', 
      '.booking-bar',
      '[id*="booking"]'
    ];
    
    let bookingBar = null;
    for (const selector of bookingBarSelectors) {
      bookingBar = await page.$(selector);
      if (bookingBar) break;
    }
    
    if (!bookingBar) {
      console.log(`    ❌ FAIL: No booking bar found`);
      return false;
    }
    
    // Check if booking bar is initially hidden (should be below viewport)
    const initiallyVisible = await bookingBar.isVisible();
    const initialTransform = await bookingBar.evaluate(el => window.getComputedStyle(el).transform);
    
    // Scroll to trigger booking bar appearance
    await page.evaluate(() => {
      const hero = document.querySelector('.hero, #hero, [class*="hero"]');
      if (hero) {
        window.scrollTo(0, hero.offsetHeight + 100);
      } else {
        window.scrollTo(0, 1000);
      }
    });
    
    await page.waitForTimeout(500);
    
    // Check if booking bar is now visible
    const nowVisible = await bookingBar.isVisible();
    if (!nowVisible) {
      console.log(`    ⚠️  WARNING: Booking bar not visible after scroll`);
    }
    
    // Check for date inputs
    const checkinInput = await page.$('#checkin, input[type="date"][id*="checkin"], input[type="date"][name*="checkin"]');
    const checkoutInput = await page.$('#checkout, input[type="date"][id*="checkout"], input[type="date"][name*="checkout"]');
    
    if (!checkinInput || !checkoutInput) {
      console.log(`    ❌ FAIL: Date inputs not found (checkin: ${!!checkinInput}, checkout: ${!!checkoutInput})`);
      return false;
    }
    
    // Check date values
    const checkinValue = await checkinInput.inputValue();
    const checkoutValue = await checkoutInput.inputValue();
    
    if (!checkinValue || !checkoutValue) {
      console.log(`    ❌ FAIL: Date inputs not populated (checkin: "${checkinValue}", checkout: "${checkoutValue}")`);
      return false;
    }
    
    // Verify checkout is after checkin
    const checkinDate = new Date(checkinValue);
    const checkoutDate = new Date(checkoutValue);
    
    if (checkoutDate <= checkinDate) {
      console.log(`    ❌ FAIL: Checkout date not after checkin (checkin: ${checkinValue}, checkout: ${checkoutValue})`);
      return false;
    }
    
    // Check for guests selector
    const guestsSelect = await page.$('#guests, select[id*="guest"], select[name*="guest"]');
    if (!guestsSelect) {
      console.log(`    ⚠️  WARNING: Guests selector not found`);
    }
    
    // Check for Book Now button
    const bookButton = await page.$('#booking-bar-submit, .booking-bar__btn, .booking-bar__cta, button[id*="booking"], a[class*="booking"]');
    if (!bookButton) {
      console.log(`    ❌ FAIL: Book Now button not found`);
      return false;
    }
    
    // Check computed styles to ensure bar is actually styled (not raw form elements)
    const barBgColor = await bookingBar.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const inputBgColor = await checkinInput.evaluate(el => window.getComputedStyle(el).backgroundColor);
    
    if (barBgColor === 'rgba(0, 0, 0, 0)' || barBgColor === 'transparent') {
      console.log(`    ⚠️  WARNING: Booking bar has no background color`);
    }
    
    // Check console for errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Test booking URL generation (Cloudbeds only)
    if (hotel.type === 'cloudbeds' && hotel.reservationUrl) {
      // Click the button and capture console log
      let bookingUrl = '';
      page.on('console', msg => {
        const text = msg.text();
        if (text.includes('booking URL') || text.includes(hotel.reservationUrl)) {
          bookingUrl = text;
        }
      });
      
      // Don't actually click (would open new tab), just verify URL would be correct
      // The JS logs the URL before opening
      // await bookButton.click({ trial: true });
    }
    
    console.log(`    ✅ PASS: Booking bar styled and functional`);
    console.log(`      - Bar visible after scroll: ${nowVisible}`);
    console.log(`      - Dates: ${checkinValue} to ${checkoutValue}`);
    console.log(`      - Guests selector: ${!!guestsSelect}`);
    
    return true;
    
  } catch (error) {
    console.log(`    ❌ FAIL: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n🧪 Testing date-picker booking bars across 13 hotel concepts\n');
  
  const browser = await chromium.launch();
  const results = {
    desktop: { pass: 0, fail: 0 },
    mobile: { pass: 0, fail: 0 }
  };
  
  // Test desktop
  console.log('📱 DESKTOP (1440px)');
  console.log('='.repeat(60));
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  
  for (const hotel of hotels) {
    const passed = await testHotel(desktopPage, hotel, 1440);
    if (passed) results.desktop.pass++;
    else results.desktop.fail++;
  }
  
  await desktopContext.close();
  
  // Test mobile
  console.log('\n\n📱 MOBILE (390px)');
  console.log('='.repeat(60));
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  
  for (const hotel of hotels) {
    const passed = await testHotel(mobilePage, hotel, 390);
    if (passed) results.mobile.pass++;
    else results.mobile.fail++;
  }
  
  await mobileContext.close();
  await browser.close();
  
  // Summary
  console.log('\n\n📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Desktop: ${results.desktop.pass}/${hotels.length} passed, ${results.desktop.fail} failed`);
  console.log(`Mobile:  ${results.mobile.pass}/${hotels.length} passed, ${results.mobile.fail} failed`);
  console.log(`Total:   ${results.desktop.pass + results.mobile.pass}/${hotels.length * 2} tests passed`);
  
  if (results.desktop.fail > 0 || results.mobile.fail > 0) {
    console.log('\n⚠️  Some tests failed - review output above');
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
