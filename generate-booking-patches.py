#!/usr/bin/env python3
"""
Complete the CSS and JS updates for remaining hotels
This script generates the exact code needed for each hotel
"""

# Common CSS booking bar template (to be adapted per hotel)
BOOKING_BAR_CSS_ADDITIONS = '''
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
    transition: border-color 0.2s ease;
}

.booking-bar__input:focus,
.booking-bar__select:focus {
    outline: none;
}

.booking-bar__phone {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
    text-decoration: none;
    transition: opacity 0.2s ease;
}

.booking-bar__phone:hover {
    opacity: 0.8;
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
    
    .booking-bar__label {
        font-size: 0.7rem;
    }
    
    .booking-bar__input,
    .booking-bar__select {
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
        min-width: unset;
    }
    
    .booking-bar__phone {
        order: -1;
        font-size: 1.1rem;
        width: 36px;
        height: 36px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .booking-bar {
        transition: none;
    }
}
'''

# Common JS date picker initialization
DATE_PICKER_JS = '''
    // Initialize date inputs with tomorrow and day after
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
    }
'''

# Booking URL generation by engine type
def get_booking_url_js(engine, booking_url):
    if engine == 'cloudbeds':
        return f'''
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = guestsSelect.value;
            const bookingUrl = '{booking_url}#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults;
            console.log('Booking URL (Cloudbeds):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}
'''
    elif engine == 'siteminder':
        return f'''
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = guestsSelect.value;
            const bookingUrl = '{booking_url}?locale=en&checkInDate=' + checkin + 
                '&checkOutDate=' + checkout + 
                '&items%5B0%5D%5Badults%5D=' + adults + 
                '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
            console.log('Booking URL (SiteMinder):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}
'''
    elif engine == 'synxis':
        return f'''
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = guestsSelect.value;
            const bookingUrl = '{booking_url}&arrive=' + checkin + '&depart=' + checkout + '&adult=' + adults + '&rooms=1';
            console.log('Booking URL (SynXis):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}
'''
    else:  # link-only
        return f'''
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const bookingUrl = '{booking_url}';
            console.log('Booking URL (link only):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}
'''

# Example for one hotel
print("=== Example: ocean-club-hotel (link-only) ===")
print("\nJS Addition:")
print(DATE_PICKER_JS)
print(get_booking_url_js('link-only', 'https://www.reseze.net/servlet/WebresResDesk?hotelid=1620'))

print("\n=== Example: hotel-chalet (synxis) ===")
print("\nJS Addition:")
print(get_booking_url_js('synxis', 'https://reservations.thehotelchalet.com/?chain=31107&hotel=42145'))

print("\n=== Example: coyote-mountain-lodge (cloudbeds) ===")
print("\nJS Addition:")
print(get_booking_url_js('cloudbeds', 'https://hotels.cloudbeds.com/reservation/4CMdnA'))

print("\n\n=== CSS Additions (applies to all hotels) ===")
print(BOOKING_BAR_CSS_ADDITIONS)
