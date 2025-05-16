document.addEventListener('DOMContentLoaded', function() {
  const popupBanner = document.getElementById('popup-banner');
  const closePopupButton = document.getElementById('close-popup-btn');

  if (!popupBanner || !closePopupButton) {
    console.error('Popup banner HTML elements not found.');
    return;
  }

  // Function to show the popup
  function showPopup() {
    // Check if the popup was closed previously in this session
    if (sessionStorage.getItem('popupBannerClosed')) {
      return;
    }
    // Delay adding visible class slightly to ensure transition plays
    // especially on initial page load.
    setTimeout(() => {
        popupBanner.classList.add('visible');
    }, 50); // Small delay like 50ms
  }

  // Function to hide the popup
  function hidePopup() {
    popupBanner.classList.remove('visible');
    // Set a flag in sessionStorage to not show again in this session
    sessionStorage.setItem('popupBannerClosed', 'true');
  }

  // Event listener for the close button
  closePopupButton.addEventListener('click', hidePopup);

  // Show the popup after a delay (e.g., 3 seconds)
  setTimeout(showPopup, 3000); // 3000 milliseconds = 3 seconds
});
