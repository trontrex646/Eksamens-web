import translations from '../translations.js';

let currentLanguage = localStorage.getItem('language') || 'lv';

export function initLanguageSwitch() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => switchLanguage(e.target.value));
    }
    
    // Apply initial translations
    updateContent(currentLanguage);
}

export function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateContent(lang);
}

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    const inputElements = document.querySelectorAll('[data-translate-placeholder]');
    inputElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[lang] && translations[lang]['meta-description']) {
        metaDescription.content = translations[lang]['meta-description'];
    }

    // Dispatch event for other modules that might need to know about language changes
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Export current language getter for other modules
export function getCurrentLanguage() {
    return currentLanguage;
} 