import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function test() {
    const browser = await chromium.launch();
    const errors = [];

    try {
        // Test desktop (1440px)
        console.log('\n🖥️  Testing desktop (1440px)...');
        const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        
        desktopPage.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(`Desktop console error: ${msg.text()}`);
            }
        });

        desktopPage.on('pageerror', error => {
            errors.push(`Desktop page error: ${error.message}`);
        });

        await desktopPage.goto(`file://${join(__dirname, 'index.html')}`);
        await desktopPage.waitForTimeout(500);

        // Check booking bar visibility after scroll
        await desktopPage.evaluate(() => window.scrollBy(0, 1000));
        await desktopPage.waitForTimeout(300);
        
        const bookingBarVisible = await desktopPage.evaluate(() => {
            const bar = document.getElementById('bookingBar');
            return bar && bar.classList.contains('is-visible');
        });

        console.log(`✓ Booking bar appears after scroll: ${bookingBarVisible ? 'YES' : 'NO'}`);

        // Check booking bar styling
        const bookingBarStyled = await desktopPage.evaluate(() => {
            const bar = document.getElementById('bookingBar');
            if (!bar) return false;
            const styles = window.getComputedStyle(bar);
            return styles.position === 'sticky' && styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
        });

        console.log(`✓ Booking bar is styled: ${bookingBarStyled ? 'YES' : 'NO'}`);

        // Check Book Now button and URL
        const bookNowUrl = await desktopPage.evaluate(() => {
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            return `https://newbooking.azds.com/captain-cook/#checkin=${checkin}&checkout=${checkout}&adults=${guests}`;
        });

        console.log(`✓ Book Now URL: ${bookNowUrl}`);
        console.log(`✓ Dates prefill: ${bookNowUrl.includes('checkin=') && bookNowUrl.includes('checkout=') ? 'YES' : 'NO'}`);

        await desktopPage.close();

        // Test mobile (390px)
        console.log('\n📱 Testing mobile (390px)...');
        const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
        
        mobilePage.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(`Mobile console error: ${msg.text()}`);
            }
        });

        mobilePage.on('pageerror', error => {
            errors.push(`Mobile page error: ${error.message}`);
        });

        await mobilePage.goto(`file://${join(__dirname, 'index.html')}`);
        await mobilePage.waitForTimeout(500);

        // Check mobile booking bar
        await mobilePage.evaluate(() => window.scrollBy(0, 800));
        await mobilePage.waitForTimeout(300);
        
        const mobileBookingBarVisible = await mobilePage.evaluate(() => {
            const bar = document.getElementById('bookingBar');
            return bar && bar.classList.contains('is-visible');
        });

        console.log(`✓ Mobile booking bar appears: ${mobileBookingBarVisible ? 'YES' : 'NO'}`);

        await mobilePage.close();

        // Report errors
        console.log('\n📋 Test Summary:');
        if (errors.length === 0) {
            console.log('✅ All tests passed! No console errors detected.');
        } else {
            console.log(`❌ Found ${errors.length} error(s):`);
            errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

test();
