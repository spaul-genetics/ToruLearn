/**
 * solar_system.js - Interactive Solar System Orrery Simulation
 * Visualizes the Sun and planets with interactive zoom, pan, orbits, and planetary data.
 */

class SolarSystemSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    this.isRunning = true;
    this.speedMultiplier = 1;
    this.showLabels = true;
    this.isTrueScale = false;
    
    // Camera Transform (pan and zoom)
    this.camera = {
      x: 0,
      y: 0,
      zoom: 1,
      targetX: 0,
      targetY: 0,
      targetZoom: 1
    };
    
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.hoveredPlanet = null;
    this.selectedPlanet = null;
    
    // Orbital Time in simulated days
    this.timeDays = 0;
    
    // Asteroid belt particles
    this.asteroids = [];
    this.initAsteroids();

    // Planet Astronomical Data with Authentic NASA Images
    this.planets = [
      {
        name: 'Mercury',
        image: 'assets/images/mercury.jpg',
        caption: 'Planet Mercury • Photographed by NASA MESSENGER Spacecraft',
        color: '#b5b5b5',
        accentColor: '#939393',
        radiusDisplay: 5.0,
        radiusTrueScale: 2.5,
        orbitDistance: 70,
        orbitPeriodDays: 87.97,
        angle: Math.random() * Math.PI * 2,
        type: 'Terrestrial (Rocky)',
        diameter: '4,879 km (0.38x Earth)',
        distanceSun: '57.9 million km (0.39 AU)',
        dayLength: '59 Earth days',
        yearLength: '88 Earth days',
        temp: '-180°C to +430°C',
        moons: 0,
        gravity: '3.7 m/s² (0.38g)',
        description: 'Mercury is the smallest and fastest planet in our solar system! Because it has virtually no atmosphere to trap heat, daytime surfaces reach an oven-hot 430°C, while nighttime plunges to a freezing -180°C.',
        fact: 'A year on Mercury (88 days) is shorter than one of its full day-night cycles (176 Earth days from sunrise to sunrise)!'
      },
      {
        name: 'Venus',
        image: 'assets/images/venus.jpg',
        caption: 'Planet Venus • NASA Magellan & Atmospheric Probe',
        color: '#eab308',
        accentColor: '#ca8a04',
        radiusDisplay: 9.0,
        radiusTrueScale: 6.0,
        orbitDistance: 110,
        orbitPeriodDays: 224.7,
        angle: Math.random() * Math.PI * 2,
        type: 'Terrestrial (Runaway Greenhouse)',
        diameter: '12,104 km (0.95x Earth)',
        distanceSun: '108.2 million km (0.72 AU)',
        dayLength: '243 Earth days (Retrograde)',
        yearLength: '225 Earth days',
        temp: '465°C (Hottest Planet!)',
        moons: 0,
        gravity: '8.87 m/s² (0.91g)',
        description: 'Often called Earth\'s "evil twin", Venus is blanketed in thick clouds of suffocating carbon dioxide and sulfuric acid. Its extreme greenhouse effect traps heat, making it hotter than an oven day and night.',
        fact: 'Venus spins backward (retrograde rotation) compared to most other planets, so the Sun rises in the west and sets in the east!'
      },
      {
        name: 'Earth',
        image: 'assets/images/earth.jpg',
        caption: 'Planet Earth • The Blue Marble (NASA Apollo 17)',
        color: '#3b82f6',
        accentColor: '#10b981',
        radiusDisplay: 9.5,
        radiusTrueScale: 6.3,
        orbitDistance: 160,
        orbitPeriodDays: 365.25,
        angle: 0,
        type: 'Terrestrial (Water World)',
        diameter: '12,742 km',
        distanceSun: '149.6 million km (1.0 AU)',
        dayLength: '24 hours',
        yearLength: '365.25 days',
        temp: 'Average 15°C',
        moons: 1,
        gravity: '9.81 m/s² (1.0g)',
        description: 'Our home oasis! Earth is the only known world in the universe confirmed to harbor liquid water, a protective magnetic field, an oxygen-rich atmosphere, and abundant life.',
        fact: 'Earth\'s atmosphere protects us from meteoroids, burning up thousands of space rocks every single day as "shooting stars"!'
      },
      {
        name: 'Mars',
        image: 'assets/images/mars.jpg',
        caption: 'Planet Mars • True Color (ESA Rosetta & NASA OSIRIS)',
        color: '#ef4444',
        accentColor: '#b91c1c',
        radiusDisplay: 6.0,
        radiusTrueScale: 3.4,
        orbitDistance: 215,
        orbitPeriodDays: 687.0,
        angle: Math.random() * Math.PI * 2,
        type: 'Terrestrial (The Red Planet)',
        diameter: '6,779 km (0.53x Earth)',
        distanceSun: '227.9 million km (1.52 AU)',
        dayLength: '24h 37m ("Sol")',
        yearLength: '687 Earth days',
        temp: 'Average -63°C',
        moons: 2,
        gravity: '3.72 m/s² (0.38g)',
        description: 'Mars gets its rusty red hue from iron oxide (rust) covering its surface. It hosts the largest volcano in the entire solar system: Olympus Mons, standing 3 times taller than Mount Everest!',
        fact: 'Mars has two tiny, potato-shaped moons named Phobos and Deimos, which may be captured asteroids!'
      },
      {
        name: 'Jupiter',
        image: 'assets/images/jupiter.jpg',
        caption: 'Planet Jupiter & Great Red Spot • NASA Hubble Space Telescope',
        color: '#f97316',
        accentColor: '#fdba74',
        radiusDisplay: 23.0,
        radiusTrueScale: 20.0,
        orbitDistance: 310,
        orbitPeriodDays: 4332.6,
        angle: Math.random() * Math.PI * 2,
        type: 'Gas Giant (King of Planets)',
        diameter: '139,820 km (11x Earth)',
        distanceSun: '778.5 million km (5.2 AU)',
        dayLength: '9h 56m (Fastest Spin)',
        yearLength: '11.86 Earth years',
        temp: '-110°C (Cloud tops)',
        moons: 95,
        gravity: '24.79 m/s² (2.53g)',
        description: 'Jupiter is more than twice as massive as all other solar system planets combined! Its famous "Great Red Spot" is a mammoth anticyclonic storm larger than Earth that has raged for over 300 years.',
        fact: 'Jupiter acts as a cosmic vacuum cleaner! Its immense gravity pulls in or deflects many dangerous comets and asteroids, shielding Earth.'
      },
      {
        name: 'Saturn',
        image: 'assets/images/saturn.jpg',
        caption: 'Planet Saturn & Rings • NASA Cassini Spacecraft Equinox Portrait',
        color: '#facc15',
        accentColor: '#d97706',
        radiusDisplay: 19.0,
        radiusTrueScale: 16.5,
        orbitDistance: 395,
        orbitPeriodDays: 10759.2,
        angle: Math.random() * Math.PI * 2,
        hasRings: true,
        ringInner: 24,
        ringOuter: 38,
        type: 'Gas Giant (Ringed Wonder)',
        diameter: '116,460 km (9x Earth)',
        distanceSun: '1.43 billion km (9.5 AU)',
        dayLength: '10h 33m',
        yearLength: '29.45 Earth years',
        temp: '-140°C',
        moons: 146,
        gravity: '10.44 m/s² (1.06g)',
        description: 'Saturn is crowned with the most magnificent ring system in space. Although spanning 282,000 km across, the main rings are razor-thin—only about 10 to 30 meters thick—composed of billions of chunks of water ice and rock!',
        fact: 'Saturn is the only planet in our solar system less dense than water! If you had a bathtub big enough, Saturn would literally float!'
      },
      {
        name: 'Uranus',
        image: 'assets/images/uranus.jpg',
        caption: 'Planet Uranus • NASA Voyager 2 Spacecraft',
        color: '#38bdf8',
        accentColor: '#0284c7',
        radiusDisplay: 12.5,
        radiusTrueScale: 10.0,
        orbitDistance: 480,
        orbitPeriodDays: 30685.4,
        angle: Math.random() * Math.PI * 2,
        hasFaintRings: true,
        type: 'Ice Giant (The Sideways Planet)',
        diameter: '50,724 km (4x Earth)',
        distanceSun: '2.87 billion km (19.2 AU)',
        dayLength: '17h 14m',
        yearLength: '84 Earth years',
        temp: '-195°C (Coldest Atmosphere)',
        moons: 28,
        gravity: '8.69 m/s² (0.89g)',
        description: 'Uranus is an icy world made of water, ammonia, and methane ice crystals that scatter sunlight to give it a stunning aquamarine glow. It rotates completely sideways with an extreme axial tilt of 98 degrees!',
        fact: 'Because Uranus rolls on its side, each pole experiences 42 continuous years of uninterrupted sunlight followed by 42 years of freezing darkness.'
      },
      {
        name: 'Neptune',
        image: 'assets/images/neptune.jpg',
        caption: 'Planet Neptune • NASA Voyager 2 Spacecraft',
        color: '#6366f1',
        accentColor: '#4338ca',
        radiusDisplay: 12.0,
        radiusTrueScale: 9.8,
        orbitDistance: 560,
        orbitPeriodDays: 60189.0,
        angle: Math.random() * Math.PI * 2,
        type: 'Ice Giant (The Windy World)',
        diameter: '49,244 km (3.9x Earth)',
        distanceSun: '4.5 billion km (30.1 AU)',
        dayLength: '16h 06m',
        yearLength: '164.8 Earth years',
        temp: '-200°C',
        moons: 16,
        gravity: '11.15 m/s² (1.14g)',
        description: 'Deep azure Neptune is the most distant major planet in our solar system. It whips up the fastest atmospheric winds recorded anywhere in the solar system, gusting at up to 2,100 km/h (1,300 mph)!',
        fact: 'Neptune was the first planet discovered through pure mathematical prediction rather than direct telescope observation!'
      },
      {
        name: 'Pluto',
        image: 'assets/images/pluto.jpg',
        caption: 'Dwarf Planet Pluto • NASA New Horizons Spacecraft',
        color: '#cbd5e1',
        accentColor: '#94a3b8',
        radiusDisplay: 4.0,
        radiusTrueScale: 1.5,
        orbitDistance: 640,
        orbitPeriodDays: 90560.0,
        angle: Math.random() * Math.PI * 2,
        type: 'Dwarf Planet (Kuiper Belt King)',
        diameter: '2,377 km (0.18x Earth)',
        distanceSun: '5.9 billion km (39.5 AU)',
        dayLength: '153 hours (6.4 Earth days)',
        yearLength: '248 Earth years',
        temp: '-230°C',
        moons: 5,
        gravity: '0.62 m/s² (0.06g)',
        description: 'Reclassified as a Dwarf Planet in 2006, Pluto is a captivating world in the icy Kuiper Belt. In 2015, NASA\'s New Horizons spacecraft revealed a towering nitrogen glacier shaped like a giant Valentine\'s heart (Tombaugh Regio)!',
        fact: 'Pluto\'s largest moon, Charon, is so huge relative to Pluto that the two actually orbit a common center of gravity out in the space between them!'
      }
    ];

    // Preload authentic NASA planetary photographs
    this.planetImages = {};
    for (const p of this.planets) {
      const img = new Image();
      img.src = p.image;
      this.planetImages[p.name] = img;
    }
    const sunImg = new Image();
    sunImg.src = 'assets/images/sun.jpg';
    this.sunImage = sunImg;

    this.setupEvents();
    this.resize();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initAsteroids() {
    this.asteroids = [];
    const count = 350;
    for (let i = 0; i < count; i++) {
      const dist = 245 + Math.random() * 45;
      const angle = Math.random() * Math.PI * 2;
      const size = Math.random() * 1.5 + 0.5;
      const speed = (Math.random() * 0.4 + 0.8) / (dist * 0.05);
      this.asteroids.push({ dist, angle, size, speed });
    }
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

    // Mouse drag for pan
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStart = { x: e.clientX - this.camera.x, y: e.clientY - this.camera.y };
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.camera.x = e.clientX - this.dragStart.x;
        this.camera.y = e.clientY - this.dragStart.y;
        this.camera.targetX = this.camera.x;
        this.camera.targetY = this.camera.y;
      } else {
        this.handleHover(e);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch events for mobile/tablet panning and pinch-to-zoom
    let touchStartDist = 0;
    let touchStartZoom = 1;
    let isTouchDragging = false;
    let touchPanStart = { x: 0, y: 0 };
    let touchStartTime = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isTouchDragging = true;
        touchPanStart = {
          x: e.touches[0].clientX - this.camera.x,
          y: e.touches[0].clientY - this.camera.y
        };
        touchStartTime = Date.now();
      } else if (e.touches.length === 2) {
        isTouchDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchStartZoom = this.camera.zoom;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isTouchDragging) {
        this.camera.x = e.touches[0].clientX - touchPanStart.x;
        this.camera.y = e.touches[0].clientY - touchPanStart.y;
        this.camera.targetX = this.camera.x;
        this.camera.targetY = this.camera.y;
        e.preventDefault();
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / touchStartDist;
        const newZoom = Math.max(0.3, Math.min(3.5, touchStartZoom * factor));
        this.camera.zoom = newZoom;
        this.camera.targetZoom = newZoom;
        e.preventDefault();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      if (isTouchDragging && Date.now() - touchStartTime < 300) {
        // Tap to select planet or sun on mobile
        if (e.changedTouches && e.changedTouches.length > 0) {
          const rect = this.canvas.getBoundingClientRect();
          const mouseX = e.changedTouches[0].clientX - rect.left;
          const mouseY = e.changedTouches[0].clientY - rect.top;
          const worldPos = this.screenToWorld(mouseX, mouseY);

          const distSun = Math.hypot(worldPos.x, worldPos.y);
          if (distSun < 35) {
            this.selectSun();
          } else {
            for (const p of this.planets) {
              const px = Math.cos(p.angle) * p.orbitDistance;
              const py = Math.sin(p.angle) * p.orbitDistance * 0.75;
              const hitRadius = Math.max(22, p.radiusDisplay * 2.0);
              if (Math.hypot(worldPos.x - px, worldPos.y - py) < hitRadius) {
                this.selectPlanet(p);
                break;
              }
            }
          }
        }
      }
      if (e.touches.length === 0) {
        isTouchDragging = false;
        touchStartDist = 0;
      }
    });

    // Zoom on wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newZoom = Math.max(0.3, Math.min(3.5, this.camera.zoom * zoomFactor));
      this.camera.targetZoom = newZoom;
    }, { passive: false });

    // Click to select
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const worldPos = this.screenToWorld(mouseX, mouseY);

      // Check click on Sun
      const distSun = Math.hypot(worldPos.x, worldPos.y);
      if (distSun < 30) {
        this.selectSun();
        return;
      }

      // Check planets
      let clicked = null;
      for (const p of this.planets) {
        const px = Math.cos(p.angle) * p.orbitDistance;
        const py = Math.sin(p.angle) * p.orbitDistance * 0.75; // Slight orbital inclination perspective
        const hitRadius = Math.max(14, p.radiusDisplay * 1.5);
        if (Math.hypot(worldPos.x - px, worldPos.y - py) < hitRadius) {
          clicked = p;
          break;
        }
      }

      if (clicked) {
        this.selectPlanet(clicked);
      }
    });

    // UI Buttons
    document.getElementById('ss-play-btn')?.addEventListener('click', (e) => {
      this.isRunning = !this.isRunning;
      e.target.textContent = this.isRunning ? '⏸ Pause' : '▶ Play';
      window.cosmicAudio?.playClick();
    });

    document.getElementById('ss-reset-btn')?.addEventListener('click', () => {
      this.resetCamera();
      window.cosmicAudio?.playClick();
    });

    document.getElementById('ss-speed-slider')?.addEventListener('input', (e) => {
      this.speedMultiplier = parseFloat(e.target.value);
      document.getElementById('ss-speed-val').textContent = `${this.speedMultiplier.toFixed(1)}x`;
    });

    document.getElementById('ss-labels-toggle')?.addEventListener('change', (e) => {
      this.showLabels = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    document.getElementById('ss-scale-toggle')?.addEventListener('change', (e) => {
      this.isTrueScale = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    // Planet Quick Selector Ribbon Buttons
    document.querySelectorAll('.planet-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.planet-quick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.planet;
        if (target === 'sun') {
          this.selectSun();
        } else {
          const p = this.planets.find(pl => pl.name.toLowerCase() === target.toLowerCase());
          if (p) this.selectPlanet(p);
        }
      });
    });

    // Preset buttons in inspector
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const planetName = btn.dataset.planet;
        const p = this.planets.find(pl => pl.name === planetName);
        if (p) this.selectPlanet(p);
      });
    });
  }

  handleHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const worldPos = this.screenToWorld(mouseX, mouseY);

    let found = null;
    for (const p of this.planets) {
      const px = Math.cos(p.angle) * p.orbitDistance;
      const py = Math.sin(p.angle) * p.orbitDistance * 0.75;
      const hitRadius = Math.max(12, p.radiusDisplay * 1.5);
      if (Math.hypot(worldPos.x - px, worldPos.y - py) < hitRadius) {
        found = p;
        break;
      }
    }
    this.hoveredPlanet = found;
    this.canvas.style.cursor = found ? 'pointer' : 'grab';
  }

  screenToWorld(sx, sy) {
    const cx = this.displayWidth / 2 + this.camera.x;
    const cy = this.displayHeight / 2 + this.camera.y;
    return {
      x: (sx - cx) / this.camera.zoom,
      y: (sy - cy) / this.camera.zoom
    };
  }

  resetCamera() {
    this.camera.targetX = 0;
    this.camera.targetY = 0;
    this.camera.targetZoom = 1;
    this.selectedPlanet = null;
    document.querySelectorAll('.planet-quick-btn').forEach(b => b.classList.remove('active'));

    const heroImg = document.getElementById('ss-hero-image');
    if (heroImg) {
      heroImg.src = 'assets/images/solar_system_hero.jpg';
      heroImg.alt = 'Our Solar System Overview';
      heroImg.dataset.caption = 'Our Solar System • Click Any Planet to Inspect Real Photos';
    }
    const captionTag = document.querySelector('#ss-planet-card .image-caption-tag');
    if (captionTag) {
      captionTag.textContent = 'Click photo to zoom • Real NASA Photographs';
    }
    const titleEl = document.getElementById('ss-inspector-title');
    if (titleEl) titleEl.textContent = 'Our Solar System';
  }

  selectSun() {
    this.selectedPlanet = null;
    this.camera.targetX = 0;
    this.camera.targetY = 0;
    this.camera.targetZoom = 1.3;
    window.cosmicAudio?.playChime(660);
    document.querySelectorAll('.planet-quick-btn').forEach(b => b.classList.toggle('active', b.dataset.planet === 'sun'));

    const heroImg = document.getElementById('ss-hero-image');
    if (heroImg) {
      heroImg.src = 'assets/images/sun.jpg';
      heroImg.alt = 'The Sun - NASA Solar Dynamics Observatory';
      heroImg.dataset.caption = 'Our Sun (Sol) • NASA Solar Dynamics Observatory (SDO)';
    }
    const captionTag = document.querySelector('#ss-planet-card .image-caption-tag');
    if (captionTag) {
      captionTag.textContent = 'Our Sun • NASA Solar Dynamics Observatory (SDO)';
    }

    const titleEl = document.getElementById('ss-inspector-title');
    const contentEl = document.getElementById('ss-detail-content');
    if (!titleEl || !contentEl) return;

    titleEl.textContent = 'The Sun (Sol)';
    contentEl.innerHTML = `
      <h3>The Heart of Our Solar System</h3>
      <p>The Sun is a blazing <strong>Yellow Dwarf star (G-type main-sequence)</strong> at the center of everything. Through nuclear fusion at its core, it fuses 600 million tons of hydrogen into helium every second, generating the radiant light and warmth that makes life on Earth possible.</p>
      
      <div class="planet-stats-grid">
        <div class="stat-item"><span class="stat-label">Diameter</span><span class="stat-value">1,392,700 km</span></div>
        <div class="stat-item"><span class="stat-label">Mass</span><span class="stat-value">333,000x Earth</span></div>
        <div class="stat-item"><span class="stat-label">Core Temp</span><span class="stat-value">15,000,000°C</span></div>
        <div class="stat-item"><span class="stat-label">Surface Temp</span><span class="stat-value">5,500°C</span></div>
      </div>
      
      <div class="fun-fact-box">
        <span class="fact-icon">☀️</span>
        <div class="fact-text"><strong>Speed of Sunlight:</strong> Light travels at 300,000 km per second! Even at that unfathomable speed, sunlight takes <strong>8 minutes and 20 seconds</strong> to travel across space to reach Earth.</div>
      </div>
    `;
  }

  selectPlanet(p) {
    this.selectedPlanet = p;
    window.cosmicAudio?.playChime(500);
    document.querySelectorAll('.planet-quick-btn').forEach(b => b.classList.toggle('active', b.dataset.planet.toLowerCase() === p.name.toLowerCase()));

    // Smoothly pan camera toward planet
    const px = Math.cos(p.angle) * p.orbitDistance;
    const py = Math.sin(p.angle) * p.orbitDistance * 0.75;
    this.camera.targetX = -px * 1.5;
    this.camera.targetY = -py * 1.5;
    this.camera.targetZoom = 1.6;

    const heroImg = document.getElementById('ss-hero-image');
    if (heroImg) {
      heroImg.src = p.image;
      heroImg.alt = `${p.name} - Real NASA Photograph`;
      heroImg.dataset.caption = p.caption;
    }
    const captionTag = document.querySelector('#ss-planet-card .image-caption-tag');
    if (captionTag) {
      captionTag.textContent = p.caption;
    }

    const titleEl = document.getElementById('ss-inspector-title');
    const contentEl = document.getElementById('ss-detail-content');
    if (!titleEl || !contentEl) return;

    titleEl.textContent = `${p.name}`;
    contentEl.innerHTML = `
      <h3>${p.type}</h3>
      <p>${p.description}</p>

      <div class="planet-stats-grid">
        <div class="stat-item"><span class="stat-label">Diameter</span><span class="stat-value">${p.diameter}</span></div>
        <div class="stat-item"><span class="stat-label">Distance from Sun</span><span class="stat-value">${p.distanceSun}</span></div>
        <div class="stat-item"><span class="stat-label">Length of Year</span><span class="stat-value">${p.yearLength}</span></div>
        <div class="stat-item"><span class="stat-label">Length of Day</span><span class="stat-value">${p.dayLength}</span></div>
        <div class="stat-item"><span class="stat-label">Surface Temp</span><span class="stat-value">${p.temp}</span></div>
        <div class="stat-item"><span class="stat-label">Moons</span><span class="stat-value">${p.moons}</span></div>
      </div>

      <div class="fun-fact-box">
        <span class="fact-icon">🚀</span>
        <div class="fact-text"><strong>Cosmic Fact:</strong> ${p.fact}</div>
      </div>

      <div class="interactive-prompt">
        <h4>Gravity Comparison:</h4>
        <p>Surface gravity is <strong>${p.gravity}</strong>. If you weigh 70 lbs on Earth, you would weigh approximately <strong>${(70 * (parseFloat(p.gravity) / 9.81)).toFixed(1)} lbs</strong> on ${p.name}!</p>
      </div>
    `;
  }

  update(dt) {
    if (this.isRunning) {
      // Advance time (1 second = dt * speedMultiplier Earth days)
      const dayStep = dt * 10 * this.speedMultiplier;
      this.timeDays += dayStep;

      for (const p of this.planets) {
        // Orbit speed = 2 * PI / orbitalPeriodDays
        const angularVelocity = (Math.PI * 2) / p.orbitPeriodDays;
        p.angle += angularVelocity * dayStep;
      }

      for (const a of this.asteroids) {
        a.angle += a.speed * 0.005 * dayStep;
      }
    }

    // Camera smoothing (lerp)
    this.camera.x += (this.camera.targetX - this.camera.x) * 0.1;
    this.camera.y += (this.camera.targetY - this.camera.y) * 0.1;
    this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * 0.1;
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    ctx.save();
    // Center origin + camera transform
    ctx.translate(this.displayWidth / 2 + this.camera.x, this.displayHeight / 2 + this.camera.y);
    ctx.scale(this.camera.zoom, this.camera.zoom);

    // 1. Draw Orbit Lines
    for (const p of this.planets) {
      ctx.beginPath();
      ctx.ellipse(0, 0, p.orbitDistance, p.orbitDistance * 0.75, 0, 0, Math.PI * 2);
      ctx.strokeStyle = (p === this.hoveredPlanet || p === this.selectedPlanet) 
        ? 'rgba(56, 189, 248, 0.45)' 
        : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = (p === this.hoveredPlanet || p === this.selectedPlanet) ? 1.5 : 1;
      ctx.stroke();
    }

    // 2. Draw Asteroid Belt
    for (const a of this.asteroids) {
      const ax = Math.cos(a.angle) * a.dist;
      const ay = Math.sin(a.angle) * a.dist * 0.75;
      ctx.beginPath();
      ctx.arc(ax, ay, a.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.fill();
    }

    // 3. Draw The Sun (Glowing Corona & Photosphere with Real SDO Image)
    const sunGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 52);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.2, '#fef08a');
    sunGrad.addColorStop(0.5, '#f59e0b');
    sunGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.4)');
    sunGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    // Central Sun Photosphere (Realistic SDO Sun Photo)
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.clip();
    if (this.sunImage && this.sunImage.complete && this.sunImage.naturalWidth > 0) {
      ctx.drawImage(this.sunImage, -24, -24, 48, 48);
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
    }
    ctx.restore();

    // Sun corona rim highlight
    ctx.beginPath();
    ctx.arc(0, 0, 24.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Draw Planets & Features
    for (const p of this.planets) {
      const px = Math.cos(p.angle) * p.orbitDistance;
      const py = Math.sin(p.angle) * p.orbitDistance * 0.75;
      const rad = this.isTrueScale ? p.radiusTrueScale : p.radiusDisplay;

      // Glow effect for selected/hovered planet
      if (p === this.selectedPlanet || p === this.hoveredPlanet) {
        ctx.beginPath();
        ctx.arc(px, py, rad + 7, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Saturn Rings - Back Half (behind the planet body)
      if (p.hasRings) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(px, py, p.ringOuter, p.ringOuter * 0.38, Math.PI / 8, Math.PI, Math.PI * 2);
        ctx.strokeStyle = 'rgba(224, 187, 120, 0.75)';
        ctx.lineWidth = 4.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(px, py, p.ringInner + 5, (p.ringInner + 5) * 0.38, Math.PI / 8, Math.PI, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Planet Body (Authentic NASA photograph texture with 3D sphere clipping)
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.clip();

      const pImg = this.planetImages[p.name];
      if (pImg && pImg.complete && pImg.naturalWidth > 0) {
        ctx.drawImage(pImg, px - rad, py - rad, rad * 2, rad * 2);
      } else {
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Day/Night 3D sphere shading facing away from the Sun
      const lightAngle = Math.atan2(py, px);
      const shadeGrad = ctx.createRadialGradient(
        px - Math.cos(lightAngle) * (rad * 0.4),
        py - Math.sin(lightAngle) * (rad * 0.4),
        rad * 0.1,
        px,
        py,
        rad
      );
      shadeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      shadeGrad.addColorStop(0.45, 'rgba(0, 0, 0, 0)');
      shadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.82)');

      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fillStyle = shadeGrad;
      ctx.fill();
      ctx.restore();

      // Saturn Rings - Front Half (in front of the planet body)
      if (p.hasRings) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(px, py, p.ringOuter, p.ringOuter * 0.38, Math.PI / 8, 0, Math.PI);
        ctx.strokeStyle = 'rgba(224, 187, 120, 0.85)';
        ctx.lineWidth = 4.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(px, py, p.ringInner + 5, (p.ringInner + 5) * 0.38, Math.PI / 8, 0, Math.PI);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Earth's Moon (with realistic moon texture or bright lunar sphere)
      if (p.name === 'Earth') {
        const moonDist = rad + 12;
        const moonAngle = this.timeDays * 0.23; // Moon completes orbit ~27.3 days
        const mx = px + Math.cos(moonAngle) * moonDist;
        const my = py + Math.sin(moonAngle) * moonDist * 0.7;

        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f1f5f9';
        ctx.fill();
      }

      // Planet Label
      if (this.showLabels) {
        ctx.font = '600 11px Outfit, sans-serif';
        ctx.fillStyle = (p === this.selectedPlanet || p === this.hoveredPlanet) ? '#38bdf8' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py + rad + 14);
      }
    }

    ctx.restore();
  }

  animate(currentTime) {
    if (!this.lastTime) this.lastTime = currentTime;
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    // Only update and draw if active
    if (this.canvas.offsetParent !== null) {
      this.update(dt);
      this.draw();
    }

    requestAnimationFrame(this.animate);
  }
}

// Global initializer
window.initSolarSystemSim = () => {
  window.solarSystemSim = new SolarSystemSim('canvas-solar-system');
};
