document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('heroVideo');
  const playPauseBtn = document.getElementById('videoPlayPauseBtn');

  // Autoplay para que funcione 
  if (video) {
    video.play().catch(error => {
      console.log('Autoplay blocked:', error);
    });
  }

  // boton play/pause
  if (playPauseBtn && video) {
    playPauseBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});
