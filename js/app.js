/**
 * app.js - Master Application Controller
 * Handles starfield animation, tab routing, photo zoom modals, audio controls,
 * and keyboard shortcuts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Background Cosmic Starfield
  initBackgroundStarfield();

  // 2. Initialize Subsystems
  if (window.initSolarSystemSim) window.initSolarSystemSim();
  if (window.initDayNightSim) window.initDayNightSim();
  if (window.initSeasonsSim) window.initSeasonsSim();
  if (window.initMoonPhasesSim) window.initMoonPhasesSim();
  if (window.initEclipsesLab) window.initEclipsesLab();
  if (window.initCosmicQuiz) window.initCosmicQuiz();
  if (window.initToruPortal) window.initToruPortal();

  // 3. Tab Navigation Handling for Cosmic Explorer
  const tabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.sim-section');

  function switchTab(tabId) {
    tabs.forEach(t => {
      const isSelected = t.dataset.tab === tabId;
      t.classList.toggle('active', isSelected);
      t.setAttribute('aria-selected', isSelected);
    });

    sections.forEach(s => {
      const isActive = s.id === `section-${tabId}`;
      s.classList.toggle('active', isActive);
    });

    // Notify active simulation to resize & re-render
    if (tabId === 'solar-system' && window.solarSystemSim) {
      window.solarSystemSim.resize();
    } else if (tabId === 'day-night' && window.dayNightSim) {
      window.dayNightSim.resize();
    } else if (tabId === 'seasons' && window.seasonsSim) {
      window.seasonsSim.resize();
    } else if (tabId === 'moon-phases' && window.moonPhasesSim) {
      window.moonPhasesSim.resize();
    } else if (tabId === 'eclipses' && window.eclipsesLab) {
      window.eclipsesLab.resize();
    }

    window.cosmicAudio?.playWhoosh();
  }
  window.switchCosmicTab = switchTab;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  // 4. Audio Toggle Button
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  audioBtn?.addEventListener('click', () => {
    const isUnmuted = window.cosmicAudio?.toggleMute();
    if (audioIcon) {
      audioIcon.textContent = isUnmuted ? '🔊' : '🔇';
    }
  });

  // 5. Fullscreen Toggle Button
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  fullscreenBtn?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    window.cosmicAudio?.playClick();
  });

  // 6. Photo Zoom Lightbox Modal
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close-btn');

  function openPhotoModal(imgSrc, caption) {
    if (!modal || !modalImg || !modalCaption) return;
    modalImg.src = imgSrc;
    modalCaption.textContent = caption || 'High-Resolution Scientific Diagram';
    modal.classList.remove('hidden');
    window.cosmicAudio?.playChime(600);
  }

  function closePhotoModal() {
    if (modal) {
      modal.classList.add('hidden');
      window.cosmicAudio?.playClick();
    }
  }

  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => {
      openPhotoModal(img.src, img.dataset.caption || img.alt || img.title);
    });
  });

  modalClose?.addEventListener('click', closePhotoModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closePhotoModal();
  });

  // 7. Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePhotoModal();
    } else if (e.key === ' ' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      // Toggle play on current active sim
      const activeTab = document.querySelector('.nav-tab.active')?.dataset.tab;
      if (activeTab === 'solar-system') document.getElementById('ss-play-btn')?.click();
      else if (activeTab === 'day-night') document.getElementById('dn-play-btn')?.click();
      else if (activeTab === 'seasons') document.getElementById('sea-play-btn')?.click();
      else if (activeTab === 'moon-phases') document.getElementById('mp-play-btn')?.click();
    } else if (e.key >= '1' && e.key <= '6' && e.target.tagName !== 'INPUT') {
      const tabKeys = ['solar-system', 'day-night', 'seasons', 'moon-phases', 'eclipses', 'quiz'];
      const targetTab = tabKeys[parseInt(e.key) - 1];
      if (targetTab) switchTab(targetTab);
    } else if ((e.key === 'm' || e.key === 'M') && e.target.tagName !== 'INPUT') {
      audioBtn?.click();
    }
  });
});

/**
 * Animated Space Starfield with Shooting Stars (Meteors)
 */
function initBackgroundStarfield() {
  const canvas = document.getElementById('bg-starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Generate 250 Stars
  const stars = [];
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.85 ? '#38bdf8' : (Math.random() > 0.7 ? '#fef08a' : '#ffffff')
    });
  }

  // Shooting Stars
  const meteors = [];
  function spawnMeteor() {
    if (Math.random() < 0.015 && meteors.length < 3) {
      meteors.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.4),
        len: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 12,
        alpha: 1.0,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw Twinkling Stars
    for (const star of stars) {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
      ctx.fill();
    }

    // Spawn & Draw Shooting Stars
    spawnMeteor();
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.alpha -= 0.02;

      if (m.alpha <= 0 || m.x > width || m.y > height) {
        meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - Math.cos(m.angle) * m.len;
      const tailY = m.y - Math.sin(m.angle) * m.len;

      const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      meteorGrad.addColorStop(1, `rgba(56, 189, 248, ${m.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);
      ctx.strokeStyle = meteorGrad;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
