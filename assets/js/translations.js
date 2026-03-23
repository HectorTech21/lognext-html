// translations.js
const translations = {
  es: {
    // Header
    nav_servicios: "Servicios",
    nav_quienes_somos: "Quienes somos",
    nav_trabaja: "Trabaja con nosotros",
    btn_portal: "Portal del empleado",
    
    // Submenu Servicios
    submenu_ia: "Inteligencia Artificial",
    submenu_ams: "Application Management Services",
    submenu_ims: "Infrastructure Management Services",
    submenu_agile: "Agile Transformation",
    submenu_outsourcing: "Outsourcing de Talento",
    
    // Hero section
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "Transformamos la tecnología en soluciones robustas y accesibles para todos aquellos que necesitan simplificar el mañana y progresar en sus retos, ambiciones y propósitos.",
    hero_btn: "Ver servicios",
    
    // Servicios section
    servicios_title: "Nuestros Servicios",
    servicio1_title: "Gestión de flotas",
    servicio1_desc: "Optimización y control en tiempo real.",
    servicio2_title: "Rutas inteligentes",
    servicio2_desc: "Planificación eficiente basada en datos y tráfico.",
    servicio3_title: "Analítica avanzada",
    servicio3_desc: "Informes y métricas para mejorar la toma de decisiones."
  },
  
  en: {
    // Header
    nav_servicios: "Services",
    nav_quienes_somos: "About Us",
    nav_trabaja: "Work with us",
    btn_portal: "Employee Portal",
    
    // Submenu Servicios
    submenu_ia: "Artificial Intelligence",
    submenu_ams: "Application Management Services",
    submenu_ims: "Infrastructure Management Services",
    submenu_agile: "Agile Transformation",
    submenu_outsourcing: "Talent Outsourcing",
    
    // Hero section
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "We transform technology into robust and accessible solutions for all those who need to simplify tomorrow and progress in their challenges, ambitions and purposes.",
    hero_btn: "View services",
    
    // Servicios section
    servicios_title: "Our Services",
    servicio1_title: "Fleet Management",
    servicio1_desc: "Optimization and real-time control.",
    servicio2_title: "Smart Routes",
    servicio2_desc: "Efficient planning based on data and traffic.",
    servicio3_title: "Advanced Analytics",
    servicio3_desc: "Reports and metrics to improve decision making."
  },
  
  fr: {
    // Header
    nav_servicios: "Services",
    nav_quienes_somos: "Qui sommes-nous",
    nav_trabaja: "Travaillez avec nous",
    btn_portal: "Portail employé",
    
    // Submenu Servicios
    submenu_ia: "Intelligence Artificielle",
    submenu_ams: "Services de gestion d'applications",
    submenu_ims: "Services de gestion d'infrastructure",
    submenu_agile: "Transformation Agile",
    submenu_outsourcing: "Externalisation de talents",
    
    // Hero section
    hero_title: "YOUR MEANINGFUL TECH PARTNER",
    hero_description: "Nous transformons la technologie en solutions robustes et accessibles pour tous ceux qui ont besoin de simplifier demain et de progresser dans leurs défis, ambitions et objectifs.",
    hero_btn: "Voir les services",
    
    // Servicios section
    servicios_title: "Nos Services",
    servicio1_title: "Gestion de flotte",
    servicio1_desc: "Optimisation et contrôle en temps réel.",
    servicio2_title: "Itinéraires intelligents",
    servicio2_desc: "Planification efficace basée sur les données et le trafic.",
    servicio3_title: "Analytique avancée",
    servicio3_desc: "Rapports et métriques pour améliorer la prise de décision."
  }
};

// Idioma actual (por defecto español)
let currentLang = localStorage.getItem('language') || 'es';

// Función para cambiar el idioma
function setLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateContent();
  
  // Actualizar clase activa en el selector de idioma (tanto escritorio como móvil)
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

// Función para actualizar todos los textos
function updateContent() {
  const t = translations[currentLang];
  if (!t) return;
  
  // Actualizar elementos con atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      element.textContent = t[key];
    }
  });
}

// ========== FUNCIONALIDAD DEL MENÚ MÓVIL ==========

// Función para el menú hamburguesa
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!menuToggle || !mainNav) return;
  
  // Abrir/cerrar menú
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });
  
  // Cerrar menú al hacer clic en un enlace
  const menuLinks = document.querySelectorAll('.menu a, .mobile-actions a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Manejar submenús en móvil
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('> a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos de los botones de idioma (escritorio y móvil)
  const langLinks = document.querySelectorAll('.language-switcher a, .language-switcher.mobile a');
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.textContent.toLowerCase();
      setLanguage(lang);
    });
  });
  
  // Aplicar idioma guardado
  setLanguage(currentLang);
  
  // Inicializar menú móvil
  initMobileMenu();
});