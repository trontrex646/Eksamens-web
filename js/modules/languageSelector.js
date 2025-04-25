// Language translations object
const translations = {
  en: {
    home: "Home",
    download: "Download",
    about: "About Project",
    technical: "Technical Solution",
    contact: "Contact",
    // Add other translations
  },
  lv: {
    home: "Sākumlapa",
    download: "Lejupielāde",
    about: "Par Projektu",
    technical: "Tehniskais risinājums",
    contact: "Kontakti",
    // Add other translations
  },
  es: {
    home: "Inicio",
    download: "Descargar",
    about: "Sobre el Proyecto",
    technical: "Solución Técnica",
    contact: "Contacto",
    // Add other translations
  },
  de: {
    home: "Startseite",
    download: "Herunterladen",
    about: "Über das Projekt",
    technical: "Technische Lösung",
    contact: "Kontakt",
    // Add other translations
  }
};

export function initLanguageSelector() {
  const languageBtn = document.querySelector('.language-btn');
  const languageMenu = document.querySelector('.language-menu');
  const languageOptions = document.querySelectorAll('.lang-option');

  // Load saved language preference
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'lv';
  updateLanguage(savedLanguage);

  // Toggle language menu
  languageBtn.addEventListener('click', () => {
    languageMenu.classList.toggle('show');
  });

  // Handle language selection
  languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      updateLanguage(lang);
      languageMenu.classList.remove('show');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
      languageMenu.classList.remove('show');
    }
  });
}

function updateLanguage(lang) {
  // Save language preference
  localStorage.setItem('selectedLanguage', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.dataset.translatePlaceholder;
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Update button text
  document.querySelector('.language-btn').textContent = lang.toUpperCase();
} 