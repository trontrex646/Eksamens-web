export function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  let isOpen = false;

  // Toggle menu state
  function toggleMenu() {
    isOpen = !isOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !header.contains(e.target)) {
      toggleMenu();
    }
  });

  // Handle hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });

  // Handle resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && isOpen) {
        toggleMenu();
      }
    }, 250);
  });
} 