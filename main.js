// Import modules
import { initMobileNav } from './modules/mobileNav.js';
import { initScrollEffects } from './modules/scrollEffects.js';
import { initEdgeEffects } from './modules/edgeEffects.js';
import { initLanguage } from './modules/language.js';
import { initContactForm } from './modules/contactForm.js';
import { initLanguageSwitch } from './modules/languageSwitch.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollEffects();
  initEdgeEffects();
  initLanguage();
  initContactForm();
  initLanguageSwitch();
  
  // Initialize language selector
  const languageBtn = document.querySelector('.language-btn');
  const languageMenu = document.querySelector('.language-menu');
  
  languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    languageMenu.classList.remove('show');
  });

  // Handle language selection
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      document.querySelector('.current-lang').textContent = lang.toUpperCase();
      changeLanguage(lang);
      languageMenu.classList.remove('show');
    });
  });

  // Initialize EmailJS
  emailjs.init("bbY8Z1C5gWMRod8MM");
  
  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = '...';
      
      emailjs.sendForm('service_id', 'template_id', this)
        .then(() => {
          alert('Message sent successfully!');
          this.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to send message. Please try again.');
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        });
    });
  }
}); 