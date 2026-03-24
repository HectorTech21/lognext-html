// translations.js
const translations = {
  es: {
    nav_servicios: "Servicios",
    nav_quienes_somos: "Quienes somos",
    nav_trabaja: "Trabaja con nosotros",
    btn_portal: "Portal del empleado",
    submenu_ia: "Inteligencia Artificial",
    submenu_ams: "Application Management Services",
    submenu_ims: "Infrastructure Management Services",
    submenu_agile: "Ciberseguridad",
    submenu_outsourcing: "Outsourcing de Talento",
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "Transformamos la tecnología en soluciones robustas y accesibles para todos aquellos que necesitan simplificar el mañana y progresar en sus retos, ambiciones y propósitos.",
    hero_btn: "Ver servicios",
    servicios_title: "Nuestros Servicios",
    servicio1_title: "Gestión de flotas",
    servicio1_desc: "Optimización y control en tiempo real.",
    servicio2_title: "Rutas inteligentes",
    servicio2_desc: "Planificación eficiente basada en datos y tráfico.",
    servicio3_title: "Analítica avanzada",
    servicio3_desc: "Informes y métricas para mejorar la toma de decisiones."
  },
  en: {
    nav_servicios: "Services",
    nav_quienes_somos: "About Us",
    nav_trabaja: "Work with us",
    btn_portal: "Employee Portal",
    submenu_ia: "Artificial Intelligence",
    submenu_ams: "Application Management Services",
    submenu_ims: "Infrastructure Management Services",
    submenu_agile: "Cybersecurity",
    submenu_outsourcing: "Talent Outsourcing",
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "We transform technology into robust and accessible solutions for all those who need to simplify tomorrow and progress in their challenges, ambitions and purposes.",
    hero_btn: "View services",
    servicios_title: "Our Services",
    servicio1_title: "Fleet Management",
    servicio1_desc: "Optimization and real-time control.",
    servicio2_title: "Smart Routes",
    servicio2_desc: "Efficient planning based on data and traffic.",
    servicio3_title: "Advanced Analytics",
    servicio3_desc: "Reports and metrics to improve decision making."
  },
  fr: {
    nav_servicios: "Services",
    nav_quienes_somos: "Qui sommes-nous",
    nav_trabaja: "Travaillez avec nous",
    btn_portal: "Portail employé",
    submenu_ia: "Intelligence Artificielle",
    submenu_ams: "Services de gestion d'applications",
    submenu_ims: "Services de gestion d'infrastructure",
    submenu_agile: "Cybersécurité",
    submenu_outsourcing: "Externalisation de talents",
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "Nous transformons la technologie en solutions robustes et accessibles pour tous ceux qui ont besoin de simplifier demain et de progresser dans leurs défis, ambitions et objectifs.",
    hero_btn: "Voir les services",
    servicios_title: "Nos Services",
    servicio1_title: "Gestion de flotte",
    servicio1_desc: "Optimisation et contrôle en temps réel.",
    servicio2_title: "Itinéraires intelligents",
    servicio2_desc: "Planification efficace basée sur les données et le trafic.",
    servicio3_title: "Analytique avancée",
    servicio3_desc: "Rapports et métriques pour améliorer la prise de décision."
  }
};

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
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (!menuToggle || !mainNav) return;
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });
  
  const menuLinks = document.querySelectorAll('.menu a, .mobile-actions a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function(dropdown) {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });
}

// ========== CONTROL DEL VIDEO HERO ==========
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  const playPauseBtn = document.getElementById('videoPlayPauseBtn');
  
  if (!video || !playPauseBtn) return;
  
  video.pause();
  
  function toggleVideo() {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <rect x="6" y="4" width="4" height="16" fill="white" stroke="white"/>
        <rect x="14" y="4" width="4" height="16" fill="white" stroke="white"/>
      </svg>`;
    } else {
      video.pause();
      playPauseBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="white"/>
      </svg>`;
    }
  }
  
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleVideo();
  });
  
  video.addEventListener('click', () => {
    toggleVideo();
  });
  
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    playPauseBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="white"/>
    </svg>`;
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
  initMobileMenu();
  initHeroVideo();
});