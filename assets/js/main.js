document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('heroVideo');
  const playPauseBtn = document.getElementById('videoPlayPauseBtn');
  const intro = document.getElementById('siteIntro');
  const supportsPointerGlow = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (intro) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      intro.remove();
    } else {
      window.setTimeout(() => {
        intro.classList.add('is-hiding');

        window.setTimeout(() => {
          intro.remove();
        }, 500);
      }, 1450);
    }
  }


  if (video) {
    video.play().catch(error => {
      console.log('Autoplay blocked:', error);
    });
  }

  if (playPauseBtn && video) {
    playPauseBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }

  if (supportsPointerGlow) {
    const glowCards = document.querySelectorAll('.servicio-card-horizontal, .benefit-card.card-glow');

    glowCards.forEach(card => {
      card.classList.add('card-glow');
      let animationFrame = null;
      let mouseX = 0;
      let mouseY = 0;

      card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        if (animationFrame) {
          return;
        }

        animationFrame = window.requestAnimationFrame(() => {
          card.style.setProperty('--mouse-x', `${mouseX}px`);
          card.style.setProperty('--mouse-y', `${mouseY}px`);
          animationFrame = null;
        });
      });
    });
  }
});
