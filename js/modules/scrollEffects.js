let lastScrollY = window.scrollY;
let isHeaderVisible = true;

export function initScrollEffects() {
  // Initialize scroll progress indicator
  const progressBar = document.querySelector('.scroll-progress');
  
  // Initialize section observers
  initSectionObservers();
  
  // Handle header visibility on scroll
  window.addEventListener('scroll', () => {
    updateHeaderVisibility();
    updateScrollProgress(progressBar);
  });
}

function updateHeaderVisibility() {
  const header = document.querySelector('header');
  const currentScrollY = window.scrollY;
  
  // Show/hide header based on scroll direction
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    if (isHeaderVisible) {
      header.style.transform = 'translateY(-100%)';
      isHeaderVisible = false;
    }
  } else {
    if (!isHeaderVisible) {
      header.style.transform = 'translateY(0)';
      isHeaderVisible = true;
    }
  }
  
  lastScrollY = currentScrollY;
}

function updateScrollProgress(progressBar) {
  if (!progressBar) return;
  
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  
  progressBar.style.width = `${scrolled}%`;
}

function initSectionObservers() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation to tech cards if present
        const cards = entry.target.querySelectorAll('.tech-card');
        cards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.2}s`;
          card.classList.add('visible');
        });
      }
    });
  }, {
    threshold: 0.2
  });
  
  sections.forEach(section => {
    section.classList.add('hidden');
    sectionObserver.observe(section);
  });
} 