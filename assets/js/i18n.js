// i18n.js
let currentLang = localStorage.getItem('language') || 'es';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateContent();
  
  document.querySelectorAll('.language-switcher a, .language-switcher.mobile a').forEach(link => {
    if (link.textContent.toLowerCase() === lang || 
        (lang === 'es' && link.textContent === 'ES') ||
        (lang === 'en' && link.textContent === 'EN') ||
        (lang === 'fr' && link.textContent === 'FR')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updateContent() {
  const t = translations[currentLang];
  if (!t) return;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      element.textContent = t[key];
    }
  });

  const htmlT = htmlTranslations[currentLang] || {};
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    if (htmlT[key] !== undefined) {
      element.innerHTML = htmlT[key];
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const langLinks = document.querySelectorAll('.language-switcher a, .language-switcher.mobile a');
  langLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.textContent.toLowerCase();
      setLanguage(lang);
    });
  });

  setLanguage(currentLang);
});
