document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.getElementById('hamburger-menu');
  const header = document.querySelector('.collapsed-header');
  
  if (hamburgerButton && header) {
    hamburgerButton.addEventListener('click', function() {
      // Toggle active class on hamburger button
      this.classList.toggle('active');
      
      // Toggle expanded class on header
      header.classList.toggle('expanded');
    });
  }
});
