/**
 * seasons.js - Interactive Earth Seasons Simulation
 * Demonstrates how Earth's 23.5° axial tilt and 365-day revolution around the Sun
 * cause Summer, Autumn, Winter, and Spring in Northern and Southern hemispheres.
 */

class SeasonsSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.isRunning = true;
    this.month = 5.0; // June (Solstice)
    this.orbitSpeed = 0.3; // months per real second
    this.tiltAngle = 23.5; // degrees

    this.months = [
      'January', 'February', 'March (Spring Equinox)', 'April', 'May',
      'June (Summer Solstice)', 'July', 'August', 'September (Autumn Equinox)',
      'October', 'November', 'December (Winter Solstice)'
    ];

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

    document.getElementById('sea-play-btn')?.addEventListener('click', (e) => {
      this.isRunning = !this.isRunning;
      e.target.textContent = this.isRunning ? '⏸ Pause' : '▶ Play';
      window.cosmicAudio?.playClick();
    });

    document.getElementById('sea-reset-btn')?.addEventListener('click', () => {
      this.month = 5.0; // June
      this.updateDisplay();
      window.cosmicAudio?.playClick();
    });

    const monthSlider = document.getElementById('sea-month-slider');
    monthSlider?.addEventListener('input', (e) => {
      this.month = parseFloat(e.target.value);
      this.updateDisplay();
    });

    const tiltSlider = document.getElementById('sea-tilt-slider');
    tiltSlider?.addEventListener('input', (e) => {
      this.tiltAngle = parseFloat(e.target.value);
      const tiltDisp = document.getElementById('sea-tilt-display');
      if (tiltDisp) tiltDisp.textContent = `${this.tiltAngle.toFixed(1)}°`;
      this.updateDisplay();
    });

    // Milestone buttons
    document.querySelectorAll('.milestone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.milestone-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.month = parseFloat(btn.dataset.month);
        this.updateDisplay();
        window.cosmicAudio?.playClick();
      });
    });
  }

  updateDisplay() {
    const monthSlider = document.getElementById('sea-month-slider');
    if (monthSlider && document.activeElement !== monthSlider) {
      monthSlider.value = this.month;
    }

    const currentMonthIdx = Math.floor(this.month) % 12;
    const monthName = this.months[currentMonthIdx];
    const monthDisplay = document.getElementById('sea-month-display');
    if (monthDisplay) {
      monthDisplay.textContent = monthName;
    }
  }

  update(dt) {
    if (this.isRunning) {
      this.month = (this.month + this.orbitSpeed * dt) % 12;
      this.updateDisplay();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    const cx = this.displayWidth / 2;
    const cy = this.displayHeight / 2;
    const orbitRadiusX = Math.min(this.displayWidth * 0.38, 300);
    const orbitRadiusY = orbitRadiusX * 0.55; // 3D oblique perspective

    // 1. Draw Elliptical Orbit Path
    ctx.beginPath();
    ctx.ellipse(cx, cy, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Central Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 55);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.2, '#fef08a');
    sunGrad.addColorStop(0.5, '#f59e0b');
    sunGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.3)');
    sunGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.beginPath();
    ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('SUN', cx, cy + 4);

    // 3. Four Orbital Milestone Reference Indicators
    const milestones = [
      { month: 5, label: 'June Solstice', x: cx, y: cy - orbitRadiusY, nh: 'Summer', sh: 'Winter' },
      { month: 8, label: 'Sept Equinox', x: cx + orbitRadiusX, y: cy, nh: 'Autumn', sh: 'Spring' },
      { month: 11, label: 'Dec Solstice', x: cx, y: cy + orbitRadiusY, nh: 'Winter', sh: 'Summer' },
      { month: 2, label: 'March Equinox', x: cx - orbitRadiusX, y: cy, nh: 'Spring', sh: 'Autumn' }
    ];

    for (const m of milestones) {
      ctx.beginPath();
      ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();

      ctx.font = '500 10px Outfit, sans-serif';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
      ctx.fillText(m.label, m.x, m.y + (m.y > cy ? 18 : -10));
    }

    // 4. Calculate Current Earth Position on Orbit
    // June (month 5) = top (angle -PI/2)
    // Sept (month 8) = right (angle 0)
    // Dec (month 11) = bottom (angle PI/2)
    // March (month 2) = left (angle PI)
    const orbitAngle = ((this.month - 8) / 12) * Math.PI * 2;
    const earthX = cx + Math.cos(orbitAngle) * orbitRadiusX;
    const earthY = cy + Math.sin(orbitAngle) * orbitRadiusY;
    const earthRadius = 24;

    // 5. Draw Sunlight Rays Streaming to Earth
    ctx.save();
    const rayAngle = Math.atan2(earthY - cy, earthX - cx);
    const sunEarthDist = Math.hypot(earthX - cx, earthY - cy);
    
    // Draw 3 animated ray lines
    for (let i = -1; i <= 1; i++) {
      const offset = i * 10;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rayAngle + Math.PI / 2) * offset, cy + Math.sin(rayAngle + Math.PI / 2) * offset);
      ctx.lineTo(earthX - Math.cos(rayAngle) * earthRadius, earthY - Math.sin(rayAngle) * earthRadius);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();

    // 6. Draw Earth Body with Fixed Axial Tilt
    // Tilt angle in space always points in the same direction (-X or toward Polaris)
    ctx.save();
    ctx.translate(earthX, earthY);

    const tiltRad = (this.tiltAngle * Math.PI) / 180;

    // Tilt Axis Line (Tilted relative to vertical)
    ctx.beginPath();
    const axisLen = earthRadius * 1.6;
    ctx.moveTo(-Math.sin(tiltRad) * axisLen, -Math.cos(tiltRad) * axisLen);
    ctx.lineTo(Math.sin(tiltRad) * axisLen, Math.cos(tiltRad) * axisLen);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // North Star Polaris Pointer
    ctx.font = '700 9px Outfit, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('Polaris ★', -Math.sin(tiltRad) * (axisLen + 8), -Math.cos(tiltRad) * (axisLen + 8));

    // Earth Sphere Base
    ctx.beginPath();
    ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();

    // Northern & Southern Hemispheres Divider (Equator)
    ctx.save();
    ctx.rotate(tiltRad);
    ctx.beginPath();
    ctx.ellipse(0, 0, earthRadius, earthRadius * 0.25, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Continents hints
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(-5, -10, 8, 0, Math.PI * 2); // Northern land
    ctx.arc(8, 10, 6, 0, Math.PI * 2);  // Southern land
    ctx.fill();
    ctx.restore();

    // Day/Night Shadow Mask based on Sun direction
    const sunDir = Math.atan2(cy - earthY, cx - earthX);
    ctx.beginPath();
    ctx.arc(0, 0, earthRadius, sunDir + Math.PI / 2, sunDir - Math.PI / 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.75)';
    ctx.fill();

    // Atmospheric rim glow
    ctx.beginPath();
    ctx.arc(0, 0, earthRadius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // 7. Calculate and Draw Hemisphere Status Callout
    // If earth is near top (June), North is tilted toward Sun -> NH Summer, SH Winter
    // If earth is near bottom (Dec), North is tilted away -> NH Winter, SH Summer
    const nhTiltedToward = -Math.sin(orbitAngle); // +1 at top (June), -1 at bottom (Dec)
    
    let nhSeason = 'Spring';
    let shSeason = 'Autumn';
    let nhDirectness = 'Moderate (Equinox)';
    
    if (nhTiltedToward > 0.4) {
      nhSeason = '☀️ Summer (Warm & Long Days)';
      shSeason = '❄️ Winter (Cold & Short Days)';
      nhDirectness = 'Direct, High-Angle Rays (Maximum Heat)';
    } else if (nhTiltedToward < -0.4) {
      nhSeason = '❄️ Winter (Cold & Short Days)';
      shSeason = '☀️ Summer (Warm & Long Days)';
      nhDirectness = 'Slanted, Shallow Rays (Spread Out Heat)';
    } else if (Math.cos(orbitAngle) > 0) {
      nhSeason = '🍂 Autumn';
      shSeason = '🌱 Spring';
      nhDirectness = 'Equal Direct Sunlight';
    } else {
      nhSeason = '🌱 Spring';
      shSeason = '🍂 Autumn';
      nhDirectness = 'Equal Direct Sunlight';
    }

    // Callout Box
    const boxX = 20;
    const boxY = this.displayHeight - 110;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, 320, 90, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(`North Hemisphere: ${nhSeason}`, boxX + 14, boxY + 24);
    ctx.fillText(`South Hemisphere: ${shSeason}`, boxX + 14, boxY + 48);

    ctx.font = '500 11px Outfit, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Solar Ray Intensity: ${nhDirectness}`, boxX + 14, boxY + 72);
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
window.initSeasonsSim = () => {
  window.seasonsSim = new SeasonsSim('canvas-seasons');
};
