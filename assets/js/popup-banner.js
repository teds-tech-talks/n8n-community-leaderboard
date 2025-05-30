document.addEventListener('DOMContentLoaded', function() {
    // Constants for time durations
    const INITIAL_SHOW_DELAY = 30 * 1000; // 30 seconds before first potential show
    const VISIBILITY_TRANSITION_DELAY = 100; // ms for CSS transition to kick in
    const SHORT_DELAY = 2 * 60 * 1000; // 2 mins
    const CLOSE_DELAY = 3 * 24 * 60 * 60 * 1000; // 3 Days
    const CTA_DELAY = 14 * 24 * 60 * 60 * 1000;

    // Storage keys
    const SUPPRESSED_UNTIL_KEY = 'popupSuppressedUntil';
    const LAST_NON_INTERACTED_APPEARANCE_KEY = 'popupLastNonInteractedAppearanceTime';

    const popupBanner = document.getElementById('popup-banner');
    const closePopupButton = document.getElementById('close-popup-btn');
    const ctaButton = document.querySelector('.popup-cta-btn'); 
    const imageLink = document.getElementById('popup-image-link');

    if (!popupBanner || !closePopupButton || !ctaButton || !imageLink) {
        console.error('Popup banner HTML elements not found. Ensure #popup-image-link ID is on the image anchor, and .popup-cta-btn class on the CTA.');
        return;
    }

    function canShowPopup() {
        // 1. Check long-term suppression (localStorage)
        const suppressedUntilString = localStorage.getItem(SUPPRESSED_UNTIL_KEY);
        if (suppressedUntilString) {
            const suppressedUntil = parseInt(suppressedUntilString, 10);
            if (Date.now() < suppressedUntil) {
                // console.log('Popup suppressed by localStorage until', new Date(suppressedUntil));
                return false; 
            }
        }

        // 2. Check session-based 5-minute delay for non-interacted appearances
        const lastAppearanceTimeString = sessionStorage.getItem(LAST_NON_INTERACTED_APPEARANCE_KEY);
        if (lastAppearanceTimeString) {
            const lastAppearanceTime = parseInt(lastAppearanceTimeString, 10);
            if ((Date.now() - lastAppearanceTime) < SHORT_DELAY) {
                // console.log('Popup suppressed by sessionStorage (5-min rule)');
                return false; 
            }
        }
        
        // console.log('Popup eligible to show.');
        return true; 
    }

    function actuallyShowPopup() {
        // Record this appearance time for the 5-minute rule
        sessionStorage.setItem(LAST_NON_INTERACTED_APPEARANCE_KEY, Date.now().toString());
        // console.log('Popup showing, setting last non-interacted appearance time.');

        // Delay adding visible class slightly to ensure transition plays
        setTimeout(() => {
            if (popupBanner) { 
                 popupBanner.classList.add('visible');
            }
        }, VISIBILITY_TRANSITION_DELAY);
    }

    function hidePopupAndSetSuppression(durationInMs, umamiEventNameForCloseAction) {
        if (popupBanner) {
            popupBanner.classList.remove('visible');
        }
        
        localStorage.setItem(SUPPRESSED_UNTIL_KEY, (Date.now() + durationInMs).toString());
        // console.log('Popup hidden, suppressed until', new Date(Date.now() + durationInMs));
        
        sessionStorage.removeItem(LAST_NON_INTERACTED_APPEARANCE_KEY); // Clear session cooldown

        // Track Umami event specifically for close, if provided
        // This is now only relevant if an event name is explicitly passed for other reasons.
        // For the standard close, CTA, and image clicks, Umami events are handled by data-attributes in HTML.
        if (umamiEventNameForCloseAction && typeof umami !== 'undefined' && umami.track) {
            umami.track(umamiEventNameForCloseAction);
            // console.log('Umami event tracked:', umamiEventNameForCloseAction);
        }
    }

    // Event Listeners
    closePopupButton.addEventListener('click', () => {
        // Umami event is handled by its data-umami-event attribute on the HTML element
        hidePopupAndSetSuppression(CLOSE_DELAY);
    });

    ctaButton.addEventListener('click', () => {
        // Umami event is handled by its data-umami-event attribute on the HTML element
        hidePopupAndSetSuppression(CTA_DELAY);
    });

    imageLink.addEventListener('click', () => {
        // Umami event is handled by its data-umami-event attribute on the HTML element
        hidePopupAndSetSuppression(CTA_DELAY);
    });

    // Initial decision to show popup
    if (canShowPopup()) {
        setTimeout(actuallyShowPopup, INITIAL_SHOW_DELAY);
    }
});
