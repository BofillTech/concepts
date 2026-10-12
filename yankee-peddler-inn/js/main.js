/**
 * Yankee Peddler Inn — Newport, RI
 * Main JavaScript
 */

(function() {
  'use strict';

  // ==========================================================================
  // Date Utilities
  // ==========================================================================

  /**
   * Get date string in YYYY-MM-DD format for input type=date
   */
  function getDateString(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Convert YYYY-MM-DD to MM/DD/YYYY for rezStream
   */
  function toRezStreamFormat(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }

  /**
   * Get date object from YYYY-MM-DD string
   */
  function parseDate(dateString) {
    return new Date(dateString + 'T00:00:00');
  }

  /**
   * Calculate nights between two dates
   */
  function getNights(arrival, departure) {
    const arrivalDate = parseDate(arrival);
    const departureDate = parseDate(departure);
    return Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // Booking Forms Setup
  // ==========================================================================

  // Set default dates (tomorrow and day after)
  const tomorrow = getDateString(1);
  const dayAfter = getDateString(2);

  // Hero booking form
  const heroArrival = document.getElementById('heroArrival');
  const heroDeparture = document.getElementById('heroDeparture');
  const heroArrivalHidden = document.getElementById('heroArrivalHidden');
  const heroDepartureHidden = document.getElementById('heroDepartureHidden');
  const heroBookingForm = document.getElementById('heroBookingForm');

  if (heroArrival && heroDeparture) {
    heroArrival.value = tomorrow;
    heroDeparture.value = dayAfter;
    heroArrival.min = tomorrow;
    heroDeparture.min = getDateString(2);

    // Update departure min when arrival changes
    heroArrival.addEventListener('change', function() {
      const arrivalDate = parseDate(heroArrival.value);
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const year = nextDay.getFullYear();
      const month = String(nextDay.getMonth() + 1).padStart(2, '0');
      const day = String(nextDay.getDate()).padStart(2, '0');
      const minDeparture = `${year}-${month}-${day}`;
      heroDeparture.min = minDeparture;

      // If current departure is before new min, update it
      if (heroDeparture.value && parseDate(heroDeparture.value) <= arrivalDate) {
        heroDeparture.value = minDeparture;
      }
    });
  }

  // Sticky booking form
  const stickyArrival = document.getElementById('stickyArrival');
  const stickyDeparture = document.getElementById('stickyDeparture');
  const stickyArrivalHidden = document.getElementById('stickyArrivalHidden');
  const stickyDepartureHidden = document.getElementById('stickyDepartureHidden');
  const stickyBookingForm = document.getElementById('stickyBookingForm');

  if (stickyArrival && stickyDeparture) {
    stickyArrival.value = tomorrow;
    stickyDeparture.value = dayAfter;
    stickyArrival.min = tomorrow;
    stickyDeparture.min = getDateString(2);

    // Update departure min when arrival changes
    stickyArrival.addEventListener('change', function() {
      const arrivalDate = parseDate(stickyArrival.value);
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const year = nextDay.getFullYear();
      const month = String(nextDay.getMonth() + 1).padStart(2, '0');
      const day = String(nextDay.getDate()).padStart(2, '0');
      const minDeparture = `${year}-${month}-${day}`;
      stickyDeparture.min = minDeparture;

      // If current departure is before new min, update it
      if (stickyDeparture.value && parseDate(stickyDeparture.value) <= arrivalDate) {
        stickyDeparture.value = minDeparture;
      }
    });
  }

  // ==========================================================================
  // Form Validation & Submission
  // ==========================================================================

  /**
   * Validate booking dates
   */
  function validateBooking(arrival, departure) {
    const arrivalValue = arrival.value;
    const departureValue = departure.value;

    if (!arrivalValue || !departureValue) {
      alert('Please select both check-in and check-out dates.');
      return false;
    }

    const nights = getNights(arrivalValue, departureValue);

    if (nights < 1) {
      alert('Check-out must be at least one day after check-in.');
      return false;
    }

    if (nights > 21) {
      alert('Maximum stay is 21 nights. Please adjust your dates.');
      return false;
    }

    return true;
  }

  /**
   * Handle hero form submission
   */
  if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', function(e) {
      if (!validateBooking(heroArrival, heroDeparture)) {
        e.preventDefault();
        return false;
      }

      // Convert dates to MM/DD/YYYY format
      heroArrivalHidden.value = toRezStreamFormat(heroArrival.value);
      heroDepartureHidden.value = toRezStreamFormat(heroDeparture.value);
    });
  }

  /**
   * Handle sticky form submission
   */
  if (stickyBookingForm) {
    stickyBookingForm.addEventListener('submit', function(e) {
      if (!validateBooking(stickyArrival, stickyDeparture)) {
        e.preventDefault();
        return false;
      }

      // Convert dates to MM/DD/YYYY format
      stickyArrivalHidden.value = toRezStreamFormat(stickyArrival.value);
      stickyDepartureHidden.value = toRezStreamFormat(stickyDeparture.value);
    });
  }

  // ==========================================================================
  // Sticky Booking Bar
  // ==========================================================================

  const bookingBar = document.getElementById('bookingBar');
  const hero = document.querySelector('.hero');
  let bookingBarVisible = false;

  function updateBookingBarVisibility() {
    if (!bookingBar || !hero) return;

    const heroBottom = hero.getBoundingClientRect().bottom;
    const shouldShow = heroBottom < 0;

    if (shouldShow && !bookingBarVisible) {
      bookingBarVisible = true;
      bookingBar.classList.add('is-visible');
      document.body.classList.add('booking-bar-visible');
    } else if (!shouldShow && bookingBarVisible) {
      bookingBarVisible = false;
      bookingBar.classList.remove('is-visible');
      document.body.classList.remove('booking-bar-visible');
    }
  }

  // Check on scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateBookingBarVisibility);
  });

  // Check on load and resize
  window.addEventListener('load', updateBookingBarVisibility);
  window.addEventListener('resize', updateBookingBarVisibility);

  // Initial check
  updateBookingBarVisibility();

})();
