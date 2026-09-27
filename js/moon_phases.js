/**
 * moon_phases.js - Interactive Moon Phases Simulation
 * Synchronizes a top-down orbital space view with a realistic Earth sky view
 * across the 29.5-day lunar synodic cycle.
 */

class MoonPhasesSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.isRunning = true;
    this.lunarDay = 14.76; // Start at Full Moon
    this.cycleLength = 29.53; // days in synodic month
    this.orbitSpeed = 0.8; // lunar days per real second

    // 8 Classical Moon Phases
    this.phases = [
      { name: 'New Moon', day: 0, icon: '🌑', desc: 'Moon is between Sun and Earth. The illuminated side faces away from us.' },
      { name: 'Waxing Crescent', day: 3.7, icon: '🌒', desc: 'A sliver of the sunlit side appears on the right edge, growing daily.' },
      { name: 'First Quarter', day: 7.4, icon: '🌓', desc: 'Half of the Moon’s visible disk is illuminated by sunlight on the right.' },
      { name: 'Waxing Gibbous', day: 11.1, icon: '🌔', desc: 'More than half is lit, swelling towards a brilliant complete sphere.' },
      { name: 'Full Moon', day: 14.76, icon: '🌕', desc: 'Earth is between Sun and Moon. The entire sunlit face reflects light to us!' },
      { name: 'Waning Gibbous', day: 18.5, icon: '🌖', desc: 'Sunlight begins receding from the right edge ("waning" = fading).' },
      { name: 'Third Quarter', day: 22.1, icon: '🌗', desc: 'Left half illuminated; rises around midnight and sets at noon.' },
      { name: 'Waning Crescent', day: 25.8, icon: '🌘', desc: 'A thin silver crescent on the left before turning into a New Moon.' }
    ];

    // Realistic Moon Satellite Texture
    this.moonImage = new Image();
    this.moonImage.src = 'assets/images/realistic_moon.jpg';
    this.imageLoaded = false;
    this.moonImage.onload = () => {
      this.imageLoaded = true;
    };

    this.setupRibbon();
    this.setupEvents();
    this.resize();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupRibbon() {
    const ribbon = document.getElementById('lunar-ribbon');
    if (!ribbon) return;
    ribbon.innerHTML = '';

    this.phases.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = `phase-node ${idx === 4 ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="phase-node-icon">${p.icon}</span>
        <span class="phase-node-label">${p.name}</span>
      `;
      btn.addEventListener('click', () => {
        this.lunarDay = p.day;
        this.updateDisplay();
        window.cosmicAudio?.playClick();
      });
      ribbon.appendChild(btn);
    });
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

    document.getElementById('mp-play-btn')?.addEventListener('click', (e) => {
      this.isRunning = !this.isRunning;
      e.target.textContent = this.isRunning ? '⏸ Pause' : '▶ Play';
      window.cosmicAudio?.playClick();
    });

    document.getElementById('mp-reset-btn')?.addEventListener('click', () => {
      this.lunarDay = 14.76;
      this.updateDisplay();
      window.cosmicAudio?.playClick();
    });

    const daySlider = document.getElementById('mp-day-slider');
    daySlider?.addEventListener('input', (e) => {
      this.lunarDay = parseFloat(e.target.value);
      this.updateDisplay();
    });
  }

  getCurrentPhase() {
    const normDay = (this.lunarDay % this.cycleLength + this.cycleLength) % this.cycleLength;
    let closest = this.phases[0];
    let minDiff = 999;

    for (const p of this.phases) {
      let diff = Math.abs(normDay - p.day);
      if (diff > this.cycleLength / 2) diff = this.cycleLength - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    }
    return closest;
  }

  updateDisplay() {
    const slider = document.getElementById('mp-day-slider');
    if (slider && document.activeElement !== slider) {
      slider.value = this.lunarDay;
    }

    const curPhase = this.getCurrentPhase();
    const dayDisplay = document.getElementById('mp-day-display');
    if (dayDisplay) {
      dayDisplay.textContent = `Day ${this.lunarDay.toFixed(1)} (${curPhase.name} ${curPhase.icon})`;
    }

    // Highlight ribbon active button
    const ribbonButtons = document.querySelectorAll('.phase-node');
    this.phases.forEach((p, idx) => {
      if (ribbonButtons[idx]) {
        if (p.name === curPhase.name) {
          ribbonButtons[idx].classList.add('active');
        } else {
          ribbonButtons[idx].classList.remove('active');
        }
      }
    });
  }

  update(dt) {
    if (this.isRunning) {
      this.lunarDay = (this.lunarDay + this.orbitSpeed * dt) % this.cycleLength;
      this.updateDisplay();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    // Split screen layout:
    // Left: Top-down orbital view
    // Right: Earth Sky View (What observer sees looking up)
    const isMobile = this.displayWidth < 768;
    const viewWidth = isMobile ? this.displayWidth : this.displayWidth * 0.58;
    const skyWidth = isMobile ? this.displayWidth : this.displayWidth * 0.42;

    this.drawOrbitalView(0, 0, viewWidth, this.displayHeight);
    this.drawEarthSkyView(viewWidth, 0, skyWidth, this.displayHeight);

    // Separator line
    if (!isMobile) {
      ctx.beginPath();
      ctx.moveTo(viewWidth, 20);
      ctx.lineTo(viewWidth, this.displayHeight - 20);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  drawOrbitalView(vx, vy, vw, vh) {
    const ctx = this.ctx;
    const cx = vx + vw / 2;
    const cy = vy + vh / 2;
    const orbitRadius = Math.min(vw, vh) * 0.32;

    // View Header
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('🔭 VIEW FROM DEEP SPACE (TOP-DOWN)', cx, vy + 28);

    // 1. Draw Sunlight Streaming from the Right
    const sunRaysGrad = ctx.createLinearGradient(cx + orbitRadius * 1.5, cy, cx + orbitRadius * 0.7, cy);
    sunRaysGrad.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
    sunRaysGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = sunRaysGrad;
    ctx.fillRect(cx + orbitRadius * 0.5, cy - orbitRadius * 1.2, orbitRadius * 1.2, orbitRadius * 2.4);

    ctx.font = '700 11px Outfit, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'right';
    ctx.fillText('☀️ Parallel Sunlight ➔', vx + vw - 16, cy);

    // 2. Circular Moon Orbit Line
    ctx.beginPath();
    ctx.arc(cx, cy, orbitRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Central Earth
    const earthRadius = 26;
    ctx.beginPath();
    ctx.arc(cx, cy, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    // Earth Continents hint
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(cx - 6, cy - 4, 8, 0, Math.PI * 2);
    ctx.arc(cx + 6, cy + 8, 7, 0, Math.PI * 2);
    ctx.fill();

    // Earth Shadow: Sun is on right (+X), shadow is on left (-X)
    ctx.beginPath();
    ctx.arc(cx, cy, earthRadius, Math.PI / 2, -Math.PI / 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
    ctx.fill();

    ctx.font = '600 11px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Earth', cx, cy + 3);

    // 4. Calculate Moon Orbital Angle
    // Day 0 (New Moon): Moon is directly between Earth and Sun (Right side: angle 0)
    // Day 7.4 (First Quarter): Top (angle -PI/2)
    // Day 14.8 (Full Moon): Left side (angle PI)
    // Day 22.1 (Third Quarter): Bottom (angle PI/2)
    const moonAngle = -((this.lunarDay / this.cycleLength) * Math.PI * 2);
    const mx = cx + Math.cos(moonAngle) * orbitRadius;
    const my = cy + Math.sin(moonAngle) * orbitRadius;
    const moonRadius = 14;

    // Sightline from Earth to Moon
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(mx, my);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Moon body
    if (this.imageLoaded && this.moonImage.width > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, moonRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(this.moonImage, mx - moonRadius, my - moonRadius, moonRadius * 2, moonRadius * 2);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(mx, my, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#cbd5e1';
      ctx.fill();
    }

    // Moon Shadow: Sun is on the right, so the LEFT half of the Moon is ALWAYS dark in space!
    ctx.beginPath();
    ctx.arc(mx, my, moonRadius, Math.PI / 2, -Math.PI / 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.9)';
    ctx.fill();

    // Moon Aura
    ctx.beginPath();
    ctx.arc(mx, my, moonRadius + 3, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '600 11px Outfit, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Moon', mx, my - moonRadius - 6);

    // Space insight label
    ctx.font = '500 11px Outfit, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Notice: Half the Moon is ALWAYS lit by the Sun in space!', cx, cy + orbitRadius + 35);
  }

  drawEarthSkyView(sx, sy, sw, sh) {
    const ctx = this.ctx;
    const cx = sx + sw / 2;
    const cy = sy + sh / 2;
    const diskRadius = Math.min(sw * 0.35, 75);

    // Sky View Header
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('👀 VIEW FROM EARTH NIGHT SKY', cx, sy + 28);

    // Telescope Round Frame
    ctx.beginPath();
    ctx.arc(cx, cy, diskRadius + 14, 0, Math.PI * 2);
    ctx.fillStyle = '#020617';
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Background Stars in telescope
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 20; i++) {
      const starX = cx + (Math.sin(i * 37) * diskRadius * 0.9);
      const starY = cy + (Math.cos(i * 19) * diskRadius * 0.9);
      ctx.beginPath();
      ctx.arc(starX, starY, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Phase fraction calculation (-1 for new moon, 0 for quarter, +1 for full moon)
    // angle = (lunarDay / cycleLength) * 2PI
    const phaseFraction = (this.lunarDay / this.cycleLength) * Math.PI * 2;
    const isWaxing = phaseFraction < Math.PI;
    const illumination = Math.cos(phaseFraction); // 1 = New, -1 = Full

    // 1. Draw Base Moon Disk (Dark side with faint Earthshine / Da Vinci Glow)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, diskRadius, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - diskRadius, cy - diskRadius, diskRadius * 2, diskRadius * 2);

    if (this.imageLoaded && this.moonImage.width > 0) {
      // Faint Earthshine reveals dark craters and maria
      ctx.globalAlpha = 0.16;
      ctx.drawImage(this.moonImage, cx - diskRadius, cy - diskRadius, diskRadius * 2, diskRadius * 2);
      ctx.globalAlpha = 1.0;
    }
    ctx.restore();

    // 2. Draw Sunlit Phase Portion with full-detail realistic Moon photo
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, diskRadius, 0, Math.PI * 2);
    ctx.clip(); // Constrain strictly within Moon disk circle

    ctx.beginPath();
    if (isWaxing) {
      // Lit on the right side
      ctx.arc(cx, cy, diskRadius, -Math.PI / 2, Math.PI / 2, false);
      ctx.ellipse(cx, cy, Math.abs(illumination) * diskRadius, diskRadius, 0, Math.PI / 2, -Math.PI / 2, illumination > 0);
    } else {
      // Lit on the left side
      ctx.arc(cx, cy, diskRadius, Math.PI / 2, -Math.PI / 2, false);
      ctx.ellipse(cx, cy, Math.abs(illumination) * diskRadius, diskRadius, 0, -Math.PI / 2, Math.PI / 2, illumination > 0);
    }
    ctx.clip(); // CLIPPED STRICTLY TO THE SUNLIT PHASE!

    if (this.imageLoaded && this.moonImage.width > 0) {
      ctx.drawImage(this.moonImage, cx - diskRadius, cy - diskRadius, diskRadius * 2, diskRadius * 2);
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
    }
    ctx.restore();

    // 3. Subtle soft shadow along the terminator boundary
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, diskRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.max(0.1, Math.abs(illumination) * diskRadius), diskRadius, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(2, 6, 23, 0.45)';
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();

    // 4. Outer Celestial Rim Glow
    ctx.beginPath();
    ctx.arc(cx, cy, diskRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Phase Name & Description Below
    const curPhase = this.getCurrentPhase();
    ctx.font = '700 14px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${curPhase.name} ${curPhase.icon}`, cx, cy + diskRadius + 32);

    ctx.font = '500 11px Outfit, sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    // Wrap description text
    const words = curPhase.desc.split(' ');
    let line1 = words.slice(0, 7).join(' ');
    let line2 = words.slice(7).join(' ');
    ctx.fillText(line1, cx, cy + diskRadius + 50);
    if (line2) ctx.fillText(line2, cx, cy + diskRadius + 65);
  }

  animate(currentTime) {
    if (!this.lastTime) this.lastTime = currentTime;
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    if (this.canvas.offsetParent !== null) {
      this.update(dt);
      this.draw();
    }

    requestAnimationFrame(this.animate);
  }
}

// Global initializer
window.initMoonPhasesSim = () => {
  window.moonPhasesSim = new MoonPhasesSim('canvas-moon-phases');
};
