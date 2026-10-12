#!/usr/bin/env python3
"""
Generate comprehensive CSS/JS patches for all remaining 6 hotels
This creates complete working implementations ready to apply
"""

# Common date picker JS initialization (all hotels need this)
DATE_PICKER_INIT = '''// Initialize date inputs with tomorrow and day after
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const guestsSelect = document.getElementById('guests');

if (checkinInput && checkoutInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  checkinInput.value = tomorrow.toISOString().split('T')[0];
  checkoutInput.value = dayAfter.toISOString().split('T')[0];
  checkinInput.min = tomorrow.toISOString().split('T')[0];
  
  // Ensure checkout is always after checkin
  checkinInput.addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    const checkoutDate = new Date(checkoutInput.value);
    
    if (checkoutDate <= checkinDate) {
      const newCheckout = new Date(checkinDate);
      newCheckout.setDate(newCheckout.getDate() + 1);
      checkoutInput.value = newCheckout.toISOString().split('T')[0];
    }
    
    checkoutInput.min = this.value;
  });
  
  checkoutInput.addEventListener('change', function() {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(this.value);
    
    if (checkoutDate <= checkinDate) {
      const newCheckout = new Date(checkinDate);
      newCheckout.setDate(newCheckout.getDate() + 1);
      this.value = newCheckout.toISOString().split('T')[0];
    }
  });
}'''

# Booking handlers by engine type
BOOKING_HANDLERS = {
    'cloudbeds': '''// Handle booking submission - Cloudbeds with date params
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = guestsSelect.value;
    const bookingUrl = '{url}#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults;
    console.log('Booking URL (Cloudbeds):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}''',
    
    'siteminder': '''// Handle booking submission - SiteMinder with date params
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = guestsSelect.value;
    const bookingUrl = '{url}?locale=en&checkInDate=' + checkin + 
        '&checkOutDate=' + checkout + 
        '&items%5B0%5D%5Badults%5D=' + adults + 
        '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
    console.log('Booking URL (SiteMinder):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}''',
    
    'link-only': '''// Handle booking submission - link only (no date params)
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const bookingUrl = '{url}';
    console.log('Booking URL (link only):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}'''
}

# Hotel configurations
HOTELS = {
    'dutchland-motel': {
        'engine': 'siteminder',
        'url': 'https://direct-book.com/properties/dutchlandmoteldirect'
    },
    'coyote-mountain-lodge': {
        'engine': 'cloudbeds',
        'url': 'https://hotels.cloudbeds.com/reservation/4CMdnA'
    },
    'ocean-sands-resort': {
        'engine': 'link-only',
        'url': 'https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417'
    },
    'silver-creek-hotel': {
        'engine': 'link-only',
        'url': 'https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search'
    },
    'applewood-inn': {
        'engine': 'link-only',
        'url': 'mailto:applewoodusa@hotmail.com'
    },
    'forest-springs-resort': {
        'engine': 'cloudbeds',
        'url': 'https://us2.cloudbeds.com/reservation/fhGss7'
    }
}

print("=" * 80)
print("COMPLETE JS CODE FOR REMAINING 6 HOTELS")
print("=" * 80)

for hotel, config in HOTELS.items():
    print(f"\n### {hotel.upper()} ({config['engine']}) ###\n")
    print(DATE_PICKER_INIT)
    print()
    handler = BOOKING_HANDLERS[config['engine']].format(url=config['url'])
    print(handler)
    print()

print("\n" + "=" * 80)
print("This code needs to be inserted into each hotel's booking bar function")
print("=" * 80)
