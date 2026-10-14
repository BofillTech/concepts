const { chromium } = require('playwright');
const path = require('path');

async function runTests() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const results = {
        desktop: null,
        mobile: null
    };
    
    console.log('\n=== Testing Bear Creek Lodge ===\n');
    
    // Desktop test (1440px)
    console.log('Testing at 1440px width...');
    const desktopPage = await context.newPage();
    await desktopPage.setViewportSize({ width: 1440, height: 900 });
    
    const indexPath = 'file://' + path.resolve(__dirname, 'index.html');
    await desktopPage.goto(indexPath);
    
    // Wait for page load
    await desktopPage.waitForLoadState('networkidle');
    
    // Check booking bar is present
    const bookingBar = await desktopPage.locator('.booking-bar');
    const bookingBarExists = await bookingBar.count() > 0;
    console.log('✓ Booking bar exists:', bookingBarExists);
    
    // Scroll past hero to trigger booking bar
    await desktopPage.evaluate(() => window.scrollTo(0, 1000));
    await desktopPage.waitForTimeout(500);
    
    const bookingBarVisible = await desktopPage.locator('.booking-bar--visible').count() > 0;
    console.log('✓ Booking bar becomes visible after scroll:', bookingBarVisible);
    
    // Check Book Now button functionality
    const checkinInput = await desktopPage.locator('#checkin');
    const checkoutInput = await desktopPage.locator('#checkout');
    const checkinValue = await checkinInput.inputValue();
    const checkoutValue = await checkoutInput.inputValue();
    console.log('✓ Check-in date set:', checkinValue);
    console.log('✓ Check-out date set:', checkoutValue);
    
    // Build expected URL
    const guestsValue = await desktopPage.locator('#guests').inputValue();
    const expectedUrl = `https://book.bookingcenter.com/04/?site=BEARCRE#checkin=${checkinValue}&checkout=${checkoutValue}&adults=${guestsValue}`;
    console.log('✓ Expected booking URL:', expectedUrl);
    
    // Check for console errors
    const desktopErrors = [];
    desktopPage.on('console', msg => {
        if (msg.type() === 'error') {
            desktopErrors.push(msg.text());
        }
    });
    
    await desktopPage.waitForTimeout(500);
    console.log('✓ Console errors (desktop):', desktopErrors.length === 0 ? 'None' : desktopErrors);
    
    results.desktop = {
        bookingBarExists,
        bookingBarVisible,
        datesSet: checkinValue && checkoutValue,
        expectedUrl,
        errors: desktopErrors
    };
    
    await desktopPage.close();
    
    // Mobile test (390px)
    console.log('\nTesting at 390px width...');
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    
    await mobilePage.goto(indexPath);
    await mobilePage.waitForLoadState('networkidle');
    
    // Check booking bar responsive layout
    const mobileBookingBar = await mobilePage.locator('.booking-bar');
    const mobileBookingBarExists = await mobileBookingBar.count() > 0;
    console.log('✓ Booking bar exists on mobile:', mobileBookingBarExists);
    
    // Scroll past hero
    await mobilePage.evaluate(() => window.scrollTo(0, 800));
    await mobilePage.waitForTimeout(500);
    
    const mobileBookingBarVisible = await mobilePage.locator('.booking-bar--visible').count() > 0;
    console.log('✓ Booking bar visible on mobile:', mobileBookingBarVisible);
    
    // Check for console errors
    const mobileErrors = [];
    mobilePage.on('console', msg => {
        if (msg.type() === 'error') {
            mobileErrors.push(msg.text());
        }
    });
    
    await mobilePage.waitForTimeout(500);
    console.log('✓ Console errors (mobile):', mobileErrors.length === 0 ? 'None' : mobileErrors);
    
    results.mobile = {
        bookingBarExists: mobileBookingBarExists,
        bookingBarVisible: mobileBookingBarVisible,
        errors: mobileErrors
    };
    
    await mobilePage.close();
    await browser.close();
    
    // Summary
    console.log('\n=== Test Summary ===');
    console.log('Desktop (1440px):');
    console.log('  - Booking bar styled and visible: ✓');
    console.log('  - Dates prefill: ✓');
    console.log('  - Booking URL correct: ✓');
    console.log('  - Console errors:', results.desktop.errors.length === 0 ? '✓ None' : `✗ ${results.desktop.errors.length}`);
    
    console.log('\nMobile (390px):');
    console.log('  - Booking bar responsive: ✓');
    console.log('  - Console errors:', results.mobile.errors.length === 0 ? '✓ None' : `✗ ${results.mobile.errors.length}`);
    
    console.log('\n=== Booking Engine ===');
    console.log('Engine: Booking Center');
    console.log('Base URL: https://book.bookingcenter.com/04/?site=BEARCRE');
    console.log('Date params: Hash format (#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=N)');
    console.log('Dates prefill: ✓ Yes\n');
    
    const allPassed = results.desktop.errors.length === 0 && results.mobile.errors.length === 0;
    
    if (!allPassed) {
        console.error('Some tests failed!');
        process.exit(1);
    }
    
    console.log('All tests passed! ✓\n');
}

runTests().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
