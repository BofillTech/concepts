const { chromium } = require('playwright');

const HOTELS = [
  'roam-inn', 'open-hearth-inn', 'north-vancouver-hotel', 'general-palmer-hotel',
  'ocean-club-hotel', 'hotel-chalet', 'rsvp-hotel', 'dutchland-motel',
  'coyote-mountain-lodge', 'ocean-sands-resort', 'silver-creek-hotel',
  'applewood-inn', 'forest-springs-resort'
];

async function testHotel(page, hotel, width) {
  const url = `file:///workspace/${hotel}/index.html`;
  await page.goto(url);
  await page.setViewportSize({ width, height: 900 });
  
  // Scroll past hero
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  
  // Check if booking bar is visible
  const barVisible = await page.isVisible('.booking-bar');
  
  // Check for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  // Try to interact with booking bar
  const hasDateInputs = await page.isVisible('#checkin');
  
  return { hotel, width, barVisible, hasDateInputs, errors: errors.length };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const hotel of HOTELS) {
    const r1440 = await testHotel(page, hotel, 1440);
    const r390 = await testHotel(page, hotel, 390);
    console.log(`${hotel}: 1440=${r1440.barVisible} 390=${r390.barVisible}`);
  }
  
  await browser.close();
})();
