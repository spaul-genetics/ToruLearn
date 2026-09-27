/**
 * eclipses.js - Interactive Eclipses Laboratory
 * Simulates Solar and Lunar eclipses, umbra & penumbra shadow cones,
 * 5.1° orbital plane tilt, and real-time Earth sky totality views.
 */

class EclipsesLab {
  constructor(canvasId, viewCanvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.viewCanvas = document.getElementById(viewCanvasId);
    this.viewCtx = this.viewCanvas.getContext('2d');

    this.mode = 'solar'; // 'solar' or 'lunar'
    this.alignment = 0; // -100 to +100 (0 = exact totality alignment)
    this.useTilt = true; // 5.1 degree tilt simulation
    this.nodeOffset = 0; // vertical offset due to tilt

    // Realistic Moon Photograph
    this.moonImage = new Image();
    this.moonImage.src = 'assets/images/realistic_moon.jpg';
    this.imageLoaded = false;
    this.moonImage.onload = () => {
      this.imageLoaded = true;
    };

    this.setupEvents();
    this.resize();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.displayWidth = rect.width;
    this.displayHeight = rect.height;
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());

    // Switch between Solar and Lunar
    document.getElementById('btn-solar-eclipse')?.addEventListener('click', () => {
      this.setMode('solar');
      window.cosmicAudio?.playClick();
    });

    document.getElementById('btn-lunar-eclipse')?.addEventListener('click', () => {
      this.setMode('lunar');
      window.cosmicAudio?.playClick();
    });

    // Alignment Slider
    const alignSlider = document.getElementById('ec-alignment-slider');
    alignSlider?.addEventListener('input', (e) => {
      this.alignment = parseFloat(e.target.value);
      this.updateStatus();
    });

    // Tilt Toggle
    const tiltToggle = document.getElementById('ec-tilt-toggle');
    tiltToggle?.addEventListener('change', (e) => {
      this.useTilt = e.target.checked;
      this.updateStatus();
      window.cosmicAudio?.playClick();
    });

    // Snap to Node button
    document.getElementById('ec-align-node-btn')?.addEventListener('click', () => {
      this.alignment = 0;
      if (alignSlider) alignSlider.value = 0;
      this.updateStatus();
      window.cosmicAudio?.playSuccess();
    });
  }

  setMode(mode) {
    this.mode = mode;
    const btnSolar = document.getElementById('btn-solar-eclipse');
    const btnLunar = document.getElementById('btn-lunar-eclipse');
    const heroImg = document.getElementById('eclipse-hero-img');
    const captionTag = document.getElementById('eclipse-caption-tag');

    if (mode === 'solar') {
      btnSolar?.classList.add('active');
      btnLunar?.classList.remove('active');
      if (heroImg) heroImg.src = 'assets/images/solar_eclipse.jpg';
      if (captionTag) captionTag.textContent = "Moon's Shadow (Umbra & Penumbra) Reaching Earth";
    } else {
      btnLunar?.classList.add('active');
      btnSolar?.classList.remove('active');
      if (heroImg) heroImg.src = 'assets/images/lunar_eclipse.jpg';
      if (captionTag) captionTag.textContent = "Earth's Shadow Casting Red Glow onto Moon";
    }

    this.updateStatus();
  }

  updateStatus() {
    const alignLabel = document.getElementById('ec-alignment-val');
    const totalityBadge = document.getElementById('eclipse-totality-status');
    const descLabel = document.getElementById('eclipse-view-desc');

    const effectiveAlign = Math.abs(this.alignment);

    if (effectiveAlign < 12) {
      if (alignLabel) alignLabel.textContent = 'Exact Alignment (Totality!)';
      if (totalityBadge) {
        totalityBadge.textContent = 'Totality!';
        totalityBadge.style.background = 'rgba(244, 63, 94, 0.3)';
        totalityBadge.style.color = '#fda4af';
      }
      if (descLabel) {
        descLabel.textContent = this.mode === 'solar' 
          ? 'Solar Corona & Diamond Ring Shimmering!' 
          : 'Total Blood Moon! Atmospheric Rayleigh Red!';
      }
    } else if (effectiveAlign < 65) {
      if (alignLabel) alignLabel.textContent = 'Partial Eclipse Alignment';
      if (totalityBadge) {
        totalityBadge.textContent = 'Partial';
        totalityBadge.style.background = 'rgba(245, 158, 11, 0.25)';
        totalityBadge.style.color = '#fde047';
      }
      if (descLabel) {
        descLabel.textContent = this.mode === 'solar'
          ? 'Partial bite taken out of the Sun'
          : 'Earth shadow creeping across lunar face';
      }
    } else {
      if (alignLabel) alignLabel.textContent = 'No Eclipse (Moon misses shadow)';
      if (totalityBadge) {
        totalityBadge.textContent = 'No Eclipse';
        totalityBadge.style.background = 'rgba(255, 255, 255, 0.1)';
        totalityBadge.style.color = '#94a3b8';
      }
      if (descLabel) {
        descLabel.textContent = this.mode === 'solar'
          ? 'Standard bright Sun (No shadow on Earth)'
          : 'Standard bright Full Moon in sky';
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    const cy = this.displayHeight / 2;

    // In both modes, Sun is on the left
    const sunX = 70;
    const sunY = cy;
    const sunRadius = 55;

    // Draw Sun
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, sunRadius * 1.6);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#fef08a');
    sunGrad.addColorStop(0.7, '#f59e0b');
    sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();

    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('SUN', sunX, sunY + 4);

    // Vertical offset based on alignment and 5.1 degree tilt
    const vertOffset = (this.alignment / 100) * (this.useTilt ? 75 : 30);

    if (this.mode === 'solar') {
      this.drawSolarGeometry(sunX, sunY, sunRadius, cy, vertOffset);
    } else {
      this.drawLunarGeometry(sunX, sunY, sunRadius, cy, vertOffset);
    }

    // Update the circular telescope view
    this.drawTelescopeView();
  }

  drawSolarGeometry(sunX, sunY, sunRadius, cy, vertOffset) {
    const ctx = this.ctx;

    // Moon in middle, Earth on right
    const moonX = this.displayWidth * 0.46;
    const moonY = cy + vertOffset;
    const moonRadius = 14;

    const earthX = this.displayWidth * 0.82;
    const earthY = cy;
    const earthRadius = 38;

    // 1. Draw Umbra Shadow Cone (from Moon pointing to Earth)
    // Umbra narrows down to a tip on Earth's surface
    ctx.beginPath();
    ctx.moveTo(moonX, moonY - moonRadius);
    ctx.lineTo(earthX - earthRadius + 2, earthY + vertOffset * 0.5 - 4);
    ctx.lineTo(earthX - earthRadius + 2, earthY + vertOffset * 0.5 + 4);
    ctx.lineTo(moonX, moonY + moonRadius);
    ctx.closePath();
    ctx.fillStyle = 'rgba(2, 6, 23, 0.88)';
    ctx.fill();

    // 2. Draw Penumbra Shadow Cone (diverging outer cone)
    ctx.beginPath();
    ctx.moveTo(moonX, moonY - moonRadius);
    ctx.lineTo(earthX - earthRadius + 5, earthY + vertOffset * 0.5 - 42);
    ctx.lineTo(earthX - earthRadius + 5, earthY + vertOffset * 0.5 + 42);
    ctx.lineTo(moonX, moonY + moonRadius);
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
    ctx.fill();

    // Shadow Cone Labels
    if (Math.abs(vertOffset) < 30) {
      ctx.font = '600 10px Outfit, sans-serif';
      ctx.fillStyle = '#fda4af';
      ctx.textAlign = 'center';
      ctx.fillText('Umbra (Totality)', (moonX + earthX) / 2, cy + vertOffset * 0.5 + 4);

      ctx.fillStyle = '#a5b4fc';
      ctx.fillText('Penumbra (Partial)', (moonX + earthX) / 2, cy + vertOffset * 0.5 - 28);
    }

    // 3. Draw Moon Body
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#64748b';
    ctx.fill();

    // Moon night side shadow (facing Earth)
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    ctx.font = '600 11px Outfit, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('MOON (New)', moonX, moonY - moonRadius - 10);

    // 4. Draw Earth Body
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    // Earth Continents
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(earthX - 10, earthY - 8, 12, 0, Math.PI * 2);
    ctx.arc(earthX + 12, earthY + 12, 10, 0, Math.PI * 2);
    ctx.fill();

    // Earth Night Shadow (Right side)
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
    ctx.fill();

    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('EARTH', earthX, earthY + earthRadius + 18);

    // Umbra landing point on Earth
    if (Math.abs(vertOffset) < 18) {
      ctx.beginPath();
      ctx.arc(earthX - earthRadius, earthY + vertOffset * 0.4, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();

      ctx.font = '700 10px Outfit, sans-serif';
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('Path of Totality', earthX - earthRadius - 20, earthY + vertOffset * 0.4 - 10);
    }
  }

  drawLunarGeometry(sunX, sunY, sunRadius, cy, vertOffset) {
    const ctx = this.ctx;

    // Earth in middle, Moon on right
    const earthX = this.displayWidth * 0.46;
    const earthY = cy;
    const earthRadius = 38;

    const moonX = this.displayWidth * 0.82;
    const moonY = cy + vertOffset;
    const moonRadius = 14;

    // 1. Draw Earth's Umbra Shadow Cone (stretches past the Moon)
    ctx.beginPath();
    ctx.moveTo(earthX, earthY - earthRadius);
    ctx.lineTo(this.displayWidth, cy - earthRadius * 0.35);
    ctx.lineTo(this.displayWidth, cy + earthRadius * 0.35);
    ctx.lineTo(earthX, earthY + earthRadius);
    ctx.closePath();
    ctx.fillStyle = 'rgba(153, 27, 27, 0.35)'; // Copper red Rayleigh tint
    ctx.fill();

    // Penumbra Cone
    ctx.beginPath();
    ctx.moveTo(earthX, earthY - earthRadius);
    ctx.lineTo(this.displayWidth, cy - earthRadius * 1.5);
    ctx.lineTo(this.displayWidth, cy + earthRadius * 1.5);
    ctx.lineTo(earthX, earthY + earthRadius);
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
    ctx.fill();

    // Labels
    ctx.font = '600 10px Outfit, sans-serif';
    ctx.fillStyle = '#fda4af';
    ctx.textAlign = 'center';
    ctx.fillText("Earth's Umbra (Blood Red)", (earthX + moonX) / 2, cy - 8);

    // 2. Earth Body
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(earthX - 10, earthY - 8, 12, 0, Math.PI * 2);
    ctx.arc(earthX + 10, earthY + 10, 10, 0, Math.PI * 2);
    ctx.fill();

    // Earth Night Shadow
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.88)';
    ctx.fill();

    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('EARTH', earthX, earthY + earthRadius + 18);

    // 3. Moon Body (passing through shadow)
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);

    // If moon is inside umbra cone, color it Blood Red!
    if (Math.abs(vertOffset) < 14) {
      ctx.fillStyle = '#991b1b'; // Deep blood red
    } else if (Math.abs(vertOffset) < 45) {
      ctx.fillStyle = '#78716c'; // Dusty penumbral gray
    } else {
      ctx.fillStyle = '#f8fafc'; // Silvery full moon
    }
    ctx.fill();

    ctx.font = '600 11px Outfit, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('MOON (Full)', moonX, moonY - moonRadius - 10);
  }

  drawTelescopeView() {
    const vctx = this.viewCtx;
    const w = this.viewCanvas.width;
    const h = this.viewCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    vctx.clearRect(0, 0, w, h);

    // Deep space background
    vctx.fillStyle = '#050711';
    vctx.fillRect(0, 0, w, h);

    const effectiveAlign = Math.abs(this.alignment);

    if (this.mode === 'solar') {
      const sunRad = 52;
      const moonShiftX = (this.alignment / 100) * 120;

      // Draw Sun
      vctx.beginPath();
      vctx.arc(cx, cy, sunRad, 0, Math.PI * 2);
      vctx.fillStyle = '#fbbf24';
      vctx.fill();

      // If at Totality: Draw Solar Corona & Diamond Ring
      if (effectiveAlign < 10) {
        // Corona rays
        const coronaGrad = vctx.createRadialGradient(cx, cy, sunRad * 0.9, cx, cy, sunRad * 1.9);
        coronaGrad.addColorStop(0, '#ffffff');
        coronaGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.85)');
        coronaGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.4)');
        coronaGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        vctx.beginPath();
        vctx.arc(cx, cy, sunRad * 1.9, 0, Math.PI * 2);
        vctx.fillStyle = coronaGrad;
        vctx.fill();

        // Diamond Ring Flash on top right edge
        vctx.beginPath();
        vctx.arc(cx + sunRad * 0.72, cy - sunRad * 0.72, 8, 0, Math.PI * 2);
        vctx.fillStyle = '#ffffff';
        vctx.shadowColor = '#ffffff';
        vctx.shadowBlur = 20;
        vctx.fill();
        vctx.shadowBlur = 0;
      }

      // Moon Disk casting over Sun
      vctx.beginPath();
      vctx.arc(cx + moonShiftX, cy, sunRad * 1.02, 0, Math.PI * 2);
      vctx.fillStyle = '#020617';
      vctx.fill();

    } else {
      // Lunar Eclipse View
      const moonRad = 50;
      const shadowShiftX = (this.alignment / 100) * 110;

      // Draw Moon Disk with real Moon photograph
      vctx.save();
      vctx.beginPath();
      vctx.arc(cx, cy, moonRad, 0, Math.PI * 2);
      vctx.clip();

      if (this.imageLoaded && this.moonImage.width > 0) {
        vctx.drawImage(this.moonImage, cx - moonRad, cy - moonRad, moonRad * 2, moonRad * 2);
      } else {
        vctx.fillStyle = '#f1f5f9';
        vctx.fill();
      }

      if (effectiveAlign < 12) {
        // Totality Blood Moon Red tint overlay over real craters
        const bloodGrad = vctx.createRadialGradient(cx, cy, 6, cx, cy, moonRad);
        bloodGrad.addColorStop(0, 'rgba(239, 68, 68, 0.82)');
        bloodGrad.addColorStop(0.65, 'rgba(185, 28, 28, 0.90)');
        bloodGrad.addColorStop(1, 'rgba(69, 10, 10, 0.96)');
        vctx.fillStyle = bloodGrad;
        vctx.fill();
      }
      vctx.restore();

      // Earth shadow creeping over Moon
      if (effectiveAlign >= 12 && effectiveAlign < 70) {
        vctx.save();
        vctx.beginPath();
        vctx.arc(cx, cy, moonRad, 0, Math.PI * 2);
        vctx.clip();

        vctx.beginPath();
        vctx.arc(cx + shadowShiftX, cy, moonRad * 1.35, 0, Math.PI * 2);
        vctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        vctx.fill();
        vctx.restore();
      }
    }
  }

  animate(currentTime) {
    if (this.canvas.offsetParent !== null) {
      this.draw();
    }
    requestAnimationFrame(this.animate);
  }
}

// Global initializer
window.initEclipsesLab = () => {
  window.eclipsesLab = new EclipsesLab('canvas-eclipses', 'canvas-eclipse-view');
};
