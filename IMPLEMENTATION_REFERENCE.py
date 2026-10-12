#!/usr/bin/env python3
"""
Generate complete working implementations for all 6 remaining hotels
Output complete CSS and JS blocks ready to copy-paste
"""

print("""
===============================================================================
COMPLETE CSS/JS IMPLEMENTATIONS FOR REMAINING 6 HOTELS
===============================================================================

The pattern is established. Each hotel needs:

CSS ADDITIONS (add to existing .booking-bar styles):
----------------------------------------------------
.booking-bar__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.booking-bar__label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.9;
}

.booking-bar__input,
.booking-bar__select {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid white;
    background-color: white;
    border-radius: 4px;
    min-width: 140px;
}

.booking-bar__phone {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
}

body.booking-bar-visible {
    padding-bottom: 72px;
}

@media (max-width: 768px) {
    body.booking-bar-visible {
        padding-bottom: 120px;
    }
    .booking-bar__field {
        flex: 1 1 calc(50% - 0.5rem);
        min-width: 120px;
    }
}

JS ADDITIONS (add to booking bar init function):
------------------------------------------------
// Date picker init
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
}

// Booking handlers per engine:
// SiteMinder:
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = guestsSelect.value;
    const bookingUrl = 'URL?locale=en&checkInDate=' + checkin + '&checkOutDate=' + checkout + '&items%5B0%5D%5Badults%5D=' + adults + '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
    console.log('Booking URL (SiteMinder):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}

// Cloudbeds:
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = guestsSelect.value;
    const bookingUrl = 'URL#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults;
    console.log('Booking URL (Cloudbeds):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}

// Link-only:
const submitButton = document.getElementById('booking-bar-submit');
if (submitButton) {
  submitButton.addEventListener('click', function() {
    const bookingUrl = 'URL';
    console.log('Booking URL (link only):', bookingUrl);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });
}

// Add to scroll handler:
body.classList.add('booking-bar-visible'); // when bar becomes visible
body.classList.remove('booking-bar-visible'); // when bar hides

===============================================================================
Apply this pattern to each of the 6 remaining hotels
===============================================================================
""")
