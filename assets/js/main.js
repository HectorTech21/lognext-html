// main.js
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

  const serviceToggles = document.querySelectorAll('.service-submenu-toggle');
  serviceToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      e.stopPropagation();

      const serviceItem = toggle.closest('.service-submenu-item');
      if (!serviceItem) return;

      const isActive = serviceItem.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  });
}

function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  const playPauseBtn = document.getElementById('videoPlayPauseBtn');
  if (!video) return;
  
  video.currentTime = 3;
  video.pause();
  
  video.onclick = function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  video.play().catch(error => {
    console.log('Autoplay blocked:', error);
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  const cards = document.querySelectorAll('.carousel-card');
  const cardCount = cards.length;
  let currentPage = 0;
  let autoSlideInterval;
  
  // Calcular cuántas tarjetas se ven según el ancho de pantalla
  let cardsPerView = 3;
  
  function updateCardsPerView() {
    if (window.innerWidth <= 1100 && window.innerWidth > 768) {
      cardsPerView = 2;
    } else if (window.innerWidth <= 768) {
      cardsPerView = 1;
    } else {
      cardsPerView = 3;
    }
  }
  
  function getTotalPages() {
    return Math.ceil(cardCount / cardsPerView);
  }
  
  function getCurrentPage() {
    return Math.floor(currentPage / cardsPerView);
  }
  
  function updateDots() {
    if (!dotsContainer) return;
    
    const totalPages = getTotalPages();
    const currentPageIndex = Math.floor(currentPage / cardsPerView);
    
    // Limpiar dots existentes
    dotsContainer.innerHTML = '';
    
    // Crear nuevos dots (uno por página)
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentPageIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToPage(i);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function goToPage(pageIndex) {
    currentPage = pageIndex * cardsPerView;
    updateCarousel();
  }
  
  function updateCarousel() {
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth + 25;
    const maxPage = getTotalPages() - 1;
    const currentPageIndex = Math.floor(currentPage / cardsPerView);
    
    // Limitar a la última página
    if (currentPageIndex > maxPage) {
      currentPage = maxPage * cardsPerView;
    }
    
    track.style.transform = `translateX(-${currentPage * cardWidth}px)`;
    updateDots();
  }
  
  function nextSlide() {
    updateCardsPerView();
    const totalPages = getTotalPages();
    const currentPageIndex = Math.floor(currentPage / cardsPerView);
    
    if (currentPageIndex < totalPages - 1) {
      currentPage = (currentPageIndex + 1) * cardsPerView;
      updateCarousel();
    }
  }
  
  function prevSlide() {
    const currentPageIndex = Math.floor(currentPage / cardsPerView);
    if (currentPageIndex > 0) {
      currentPage = (currentPageIndex - 1) * cardsPerView;
      updateCarousel();
    }
  }
  
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      updateCardsPerView();
      const totalPages = getTotalPages();
      const currentPageIndex = Math.floor(currentPage / cardsPerView);
      
      if (currentPageIndex < totalPages - 1) {
        currentPage = (currentPageIndex + 1) * cardsPerView;
        updateCarousel();
      }
      // Si llega al final, se queda ahí (no vuelve al principio)
    }, 4000);
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  
  track.addEventListener('mouseenter', pauseAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);
  
  window.addEventListener('resize', () => {
    updateCardsPerView();
    updateCarousel();
  });
  
  updateCardsPerView();
  startAutoSlide();
  updateCarousel();
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  revealElements.forEach(el => observer.observe(el));
}

function initAnimatedBackground() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('stat-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 4 + Math.random() * 4 + 's';
    statsSection.appendChild(particle);
  }
}

function initBenefitParticles() {
  const benefitsSection = document.querySelector('.benefits-section');
  if (!benefitsSection) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('benefit-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 4 + Math.random() * 4 + 's';
    benefitsSection.appendChild(particle);
  }
}

function initTeamCarousel() {
  const slidesContainer = document.querySelector('.carousel-slides-team');
  const slides = document.querySelectorAll('.carousel-slide-team');
  const prevBtn = document.getElementById('prevTeamBtn');
  const nextBtn = document.getElementById('nextTeamBtn');
  const dotsContainer = document.getElementById('teamDots');
  
  if (!slidesContainer || !slides.length) return;
  
  let currentIndex = 0;
  let autoSlideInterval;
  const slideCount = slides.length;
  
  if (dotsContainer) {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('team-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  const dots = document.querySelectorAll('.team-dot');
  
  function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }
  
  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateCarousel();
    resetAutoSlide();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  }
  
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }
  
  const carouselContainer = document.querySelector('.carousel-container-team');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
  
  startAutoSlide();
  updateCarousel();
}

function initCasosParticles() {
  const casosSection = document.querySelector('.service-casos-full');
  if (!casosSection) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('caso-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 4 + Math.random() * 4 + 's';
    casosSection.appendChild(particle);
  }
}

function initCommunicationFilters() {
  const filters = document.querySelector('.communication-filters');
  const cards = document.querySelectorAll('.news-card[data-category]');

  if (!filters || !cards.length) return;

  const buttons = filters.querySelectorAll('.filter-chip[data-filter]');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedFilter = this.getAttribute('data-filter');

      buttons.forEach(filterButton => {
        const isActive = filterButton === this;
        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach(card => {
        const shouldShow = selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter;
        card.hidden = !shouldShow;
      });
    });
  });
}

// ========== SISTEMA DE COOKIES (CORREGIDO - NO ROMPE SCROLLBAR) ==========
function initCookieSystem() {
    const STORAGE_KEY = 'lognext_cookie_preferences';
    
    const defaultPreferences = {
        necessary: true,
        functional: false,
        analytics: false,
        performance: false,
        advertising: false
    };
    
    let modal = document.getElementById('cookieModal');
    let cookieBtn = document.getElementById('cookieBtn');
    let closeBtn = document.getElementById('closeCookieModal');
    let acceptAllBtn = document.getElementById('acceptAllCookies');
    let rejectAllBtn = document.getElementById('rejectAllCookies');
    let acceptNecessaryBtn = document.getElementById('acceptNecessaryCookies');
    
    let chkFunctional = document.getElementById('cookieFunctional');
    let chkAnalytics = document.getElementById('cookieAnalytics');
    let chkPerformance = document.getElementById('cookiePerformance');
    let chkAdvertising = document.getElementById('cookieAdvertising');
    
    function loadPreferences() {
        const saved = localStorage.getItem(STORAGE_KEY);
        let preferences;
        
        if (saved) {
            preferences = JSON.parse(saved);
        } else {
            preferences = { ...defaultPreferences };
        }
        
        if (chkFunctional) chkFunctional.checked = preferences.functional;
        if (chkAnalytics) chkAnalytics.checked = preferences.analytics;
        if (chkPerformance) chkPerformance.checked = preferences.performance;
        if (chkAdvertising) chkAdvertising.checked = preferences.advertising;
        
        return preferences;
    }
    
    function saveCurrentPreferences() {
        const preferences = {
            necessary: true,
            functional: chkFunctional ? chkFunctional.checked : false,
            analytics: chkAnalytics ? chkAnalytics.checked : false,
            performance: chkPerformance ? chkPerformance.checked : false,
            advertising: chkAdvertising ? chkAdvertising.checked : false
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        applyCookiePreferences(preferences);
        return preferences;
    }
    
    function acceptAll() {
        if (chkFunctional) chkFunctional.checked = true;
        if (chkAnalytics) chkAnalytics.checked = true;
        if (chkPerformance) chkPerformance.checked = true;
        if (chkAdvertising) chkAdvertising.checked = true;
        saveCurrentPreferences();
        closeModal();
    }
    
    function rejectAll() {
        if (chkFunctional) chkFunctional.checked = false;
        if (chkAnalytics) chkAnalytics.checked = false;
        if (chkPerformance) chkPerformance.checked = false;
        if (chkAdvertising) chkAdvertising.checked = false;
        saveCurrentPreferences();
        closeModal();
    }
    
    function acceptOnlyNecessary() {
        rejectAll();
    }
    
    function applyCookiePreferences(preferences) {
        console.log('Preferencias de cookies aplicadas:', preferences);
        
        if (preferences.analytics) {
            console.log('Analytics activado');
        } else {
            console.log('Analytics desactivado');
        }
        
        if (preferences.advertising) {
            console.log('Publicidad activada');
        } else {
            console.log('Publicidad desactivada');
        }
        
        window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', { detail: preferences }));
    }
    
    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            // Restaurar correctamente el overflow para que la scrollbar vuelva
            document.body.style.overflow = '';
        }
    }
    
    // Cargar preferencias guardadas
    loadPreferences();
    
    // Mostrar modal si es primera visita
    if (!localStorage.getItem(STORAGE_KEY)) {
        setTimeout(() => {
            openModal();
        }, 500);
    }
    
    // Eventos
    if (cookieBtn) cookieBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (acceptAllBtn) acceptAllBtn.addEventListener('click', acceptAll);
    if (rejectAllBtn) rejectAllBtn.addEventListener('click', rejectAll);
    if (acceptNecessaryBtn) acceptNecessaryBtn.addEventListener('click', acceptOnlyNecessary);
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    const checkboxes = [chkFunctional, chkAnalytics, chkPerformance, chkAdvertising];
    checkboxes.forEach(chk => {
        if (chk) {
            chk.addEventListener('change', function() {
                saveCurrentPreferences();
            });
        }
    });
}


// ========== INICIALIZACI?N PRINCIPAL ==========
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initHeroVideo();
  initCounters();
  initCarousel();
  initScrollReveal();
  initAnimatedBackground();
  initBenefitParticles();
  initTeamCarousel();
  initCasosParticles();
  initCommunicationFilters();
  initCookieSystem(); // Sistema de cookies iniciado - NO ROMPE LA SCROLLBAR
});
