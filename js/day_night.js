/**
 * day_night.js - Photorealistic Oblate Spheroid Earth Simulation
 * Renders Earth as its TRUE shape: an Oblate Spheroid (Geoid) with an equatorial
 * bulge and flattened poles caused by 24-hour centrifugal rotation, featuring
 * real satellite surface imagery, 3D orthographic projection, and dynamic day/night terminator.
 */

class DayNightSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.isRunning = true;
    this.timeOfDay = 12.0; // 0.0 to 24.0 hours (12 = Noon)
    this.rotationSpeed = 0.5; // hours per real second
    
    // Oblate Spheroid shape parameters
    this.isOblateShape = true;
    this.bulgeExaggeration = 1.0;
    this.showCalipers = true;
    this.showSphereCompare = false;

    // Earth Orbit & Dynamic Tilt relative to incoming sunlight
    this.orbitMonth = 0.0; // 0.0 = June Solstice (Arctic 24h day), 3 = Sept, 6 = Dec (Antarctica 24h day), 9 = March
    this.isAutoOrbit = false;
    this.showOrbitMiniMap = true;
    this.orbitSpeed = 0.25; // months per real second
    this.isOrbitDragging = false;
    this.isTimeDragging = false;

    // Load Photorealistic Satellite Texture
    this.earthImage = new Image();
    this.earthImage.src = 'assets/images/earth_map.jpg';
    this.imageLoaded = false;
    this.earthImage.onload = () => {
      this.imageLoaded = true;
    };

    // Observer Cities Catalog (Extensible with custom city pins)
    this.cityCatalog = {
      dhaka: { name: 'Dhaka, Bangladesh', lat: 23.8103, lon: 90.4125, flag: '🇧🇩', color: '#10b981' },
      newyork: { name: 'New York, USA', lat: 40.7128, lon: -74.0060, flag: '🇺🇸', color: '#ef4444' },
      tromso: { name: 'Tromsø, Norway (Arctic 24h)', lat: 69.65, lon: 18.96, flag: '🇳🇴', color: '#06b6d4' },
      mcmurdo: { name: 'McMurdo Station, Antarctica (24h)', lat: -77.85, lon: 166.67, flag: '🇦🇶', color: '#a855f7' },
      london: { name: 'London, UK', lat: 51.5074, lon: -0.1278, flag: '🇬🇧', color: '#38bdf8' },
      tokyo: { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, flag: '🇯🇵', color: '#f59e0b' },
      sydney: { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093, flag: '🇦🇺', color: '#a855f7' },
      cairo: { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357, flag: '🇪🇬', color: '#eab308' },
      paris: { name: 'Paris, France', lat: 48.8566, lon: 2.3522, flag: '🇫🇷', color: '#6366f1' },
      dubai: { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, flag: '🇦🇪', color: '#14b8a6' },
      saopaulo: { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333, flag: '🇧🇷', color: '#22c55e' },
      beijing: { name: 'Beijing, China', lat: 39.9042, lon: 116.4074, flag: '🇨🇳', color: '#f43f5e' },
      losangeles: { name: 'Los Angeles, USA', lat: 34.0522, lon: -118.2437, flag: '🇺🇸', color: '#fb923c' },
      mumbai: { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777, flag: '🇮🇳', color: '#ea580c' },
      singapore: { name: 'Singapore', lat: 1.3521, lon: 103.8198, flag: '🇸🇬', color: '#ec4899' },
      reykjavik: { name: 'Reykjavik, Iceland', lat: 64.1466, lon: -21.9426, flag: '🇮🇸', color: '#06b6d4' },
      northpole: { name: 'North Pole (Arctic)', lat: 88.0, lon: 0, flag: '❄️', color: '#93c5fd' },
      southpole: { name: 'South Pole (Antarctica)', lat: -88.0, lon: 0, flag: '🐧', color: '#cbd5e1' }
    };
    
    // Default pinned cities: Dhaka, New York, and Tromsø (Arctic 24h)
    this.pinnedCityKeys = ['dhaka', 'newyork', 'tromso'];
    this.currentCityKey = 'dhaka';
    this.visiblePins = [];

    this.cityLights = this.generateRealisticCityLights();
    this.clouds = this.generateAtmosphericClouds();

    this.setupEvents();
    this.resize();
    this.updateSeasonDisplay();
    this.renderPinnedChips();
    this.updateWorldClock();
    this.updateTimeDisplay();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  generateRealisticCityLights() {
    const lights = [];
    const metroClusters = [
      { lon: -74, lat: 40.7, count: 40, radius: 14 }, // US Megalopolis (Boston-NY-DC)
      { lon: -87, lat: 41.8, count: 20, radius: 10 }, // Chicago / Midwest
      { lon: -118, lat: 34, count: 24, radius: 12 },  // California Coast
      { lon: 2, lat: 48, count: 50, radius: 16 },    // Western Europe
      { lon: 90.4, lat: 23.8, count: 35, radius: 8 }, // Dhaka / Bengal Megacity
      { lon: 77, lat: 28, count: 45, radius: 15 },   // India Gangetic Plain
      { lon: 121, lat: 31, count: 45, radius: 15 },  // Shanghai / Yangtze Delta
      { lon: 139, lat: 35.7, count: 35, radius: 10 },// Tokyo / Japan
      { lon: 31, lat: 30, count: 25, radius: 7 },    // Nile River Delta
      { lon: -46, lat: -23.5, count: 25, radius: 10 },// São Paulo / Rio
      { lon: 151, lat: -33.8, count: 20, radius: 8 }  // Sydney / Melbourne
    ];

    for (const cluster of metroClusters) {
      for (let i = 0; i < cluster.count; i++) {
        const offsetLon = (Math.random() - 0.5) * cluster.radius;
        const offsetLat = (Math.random() - 0.5) * (cluster.radius * 0.7);
        lights.push({
          lon: cluster.lon + offsetLon,
          lat: cluster.lat + offsetLat,
          size: Math.random() * 1.5 + 0.6,
          brightness: Math.random() * 0.5 + 0.5
        });
      }
    }

    for (let i = 0; i < 120; i++) {
      lights.push({
        lon: (Math.random() - 0.5) * 320,
        lat: (Math.random() - 0.25) * 85,
        size: Math.random() * 1.0 + 0.4,
        brightness: Math.random() * 0.4 + 0.3
      });
    }

    return lights;
  }

  generateAtmosphericClouds() {
    const clouds = [];
    for (let i = 0; i < 35; i++) {
      clouds.push({
        lon: Math.random() * 360 - 180,
        lat: (Math.random() - 0.5) * 130,
        rx: Math.random() * 26 + 14,
        ry: Math.random() * 11 + 5,
        opacity: Math.random() * 0.25 + 0.12,
        speed: (Math.random() * 0.25 + 0.95)
      });
    }
    return clouds;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.displayWidth = rect.width;
    this.displayHeight = rect.height;
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());

    document.getElementById('dn-play-btn')?.addEventListener('click', (e) => {
      this.isRunning = !this.isRunning;
      e.target.textContent = this.isRunning ? '⏸ Pause' : '▶ Play';
      window.cosmicAudio?.playClick();
    });

    document.getElementById('dn-reset-btn')?.addEventListener('click', () => {
      this.timeOfDay = 12.0;
      this.updateTimeDisplay(false);
      window.cosmicAudio?.playClick();
    });

    const timeSlider = document.getElementById('dn-time-slider');
    timeSlider?.addEventListener('input', (e) => {
      this.isTimeDragging = true;
      this.timeOfDay = parseFloat(e.target.value);
      this.updateTimeDisplay(false);
    });
    timeSlider?.addEventListener('change', () => {
      this.isTimeDragging = false;
      this.updateTimeDisplay(false);
    });
    timeSlider?.addEventListener('pointerdown', () => { this.isTimeDragging = true; });

    const citySelect = document.getElementById('dn-city-select');
    citySelect?.addEventListener('change', (e) => {
      this.selectObserverCity(e.target.value);
    });

    // Orbit & Season Controls
    const orbitSlider = document.getElementById('dn-orbit-slider');
    orbitSlider?.addEventListener('input', (e) => {
      this.isOrbitDragging = true;
      this.orbitMonth = parseFloat(e.target.value);
      this.updateSeasonDisplay();
      this.updateTimeDisplay(false);
    });
    orbitSlider?.addEventListener('change', () => {
      this.isOrbitDragging = false;
      this.updateSeasonDisplay();
      this.updateTimeDisplay(false);
    });
    orbitSlider?.addEventListener('pointerdown', () => { this.isOrbitDragging = true; });

    window.addEventListener('pointerup', () => {
      this.isOrbitDragging = false;
      this.isTimeDragging = false;
    });

    document.querySelectorAll('.dn-orbit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const month = parseFloat(btn.dataset.month);
        this.orbitMonth = month;
        if (orbitSlider) orbitSlider.value = month;
        this.updateSeasonDisplay();
        this.updateTimeDisplay(false);
        window.cosmicAudio?.playClick();
      });
    });

    const autoOrbitBtn = document.getElementById('dn-auto-orbit-btn');
    autoOrbitBtn?.addEventListener('click', () => {
      this.isAutoOrbit = !this.isAutoOrbit;
      autoOrbitBtn.textContent = this.isAutoOrbit ? '⏸ Pause Orbit' : '🔄 Orbit Play';
      autoOrbitBtn.classList.toggle('active', this.isAutoOrbit);
      window.cosmicAudio?.playClick();
    });

    document.getElementById('dn-orbit-map-toggle')?.addEventListener('change', (e) => {
      this.showOrbitMiniMap = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    // Interactive Demo Buttons for 24h phenomena
    document.getElementById('demo-arctic-midnight')?.addEventListener('click', () => {
      this.orbitMonth = 0.0; // June Solstice
      this.selectObserverCity('tromso');
      if (orbitSlider) orbitSlider.value = 0;
      this.updateSeasonDisplay();
      this.updateTimeDisplay();
      this.playFeedbackSound('select');
    });

    document.getElementById('demo-antarctic-midnight')?.addEventListener('click', () => {
      this.orbitMonth = 6.0; // Dec Solstice
      this.selectObserverCity('mcmurdo');
      if (orbitSlider) orbitSlider.value = 6;
      this.updateSeasonDisplay();
      this.updateTimeDisplay();
      this.playFeedbackSound('select');
    });

    document.getElementById('demo-arctic-night')?.addEventListener('click', () => {
      this.orbitMonth = 6.0; // Dec Solstice
      this.selectObserverCity('tromso');
      if (orbitSlider) orbitSlider.value = 6;
      this.updateSeasonDisplay();
      this.updateTimeDisplay();
      this.playFeedbackSound('select');
    });

    document.getElementById('demo-equinox')?.addEventListener('click', () => {
      this.orbitMonth = 3.0; // Sept Equinox
      this.selectObserverCity('dhaka');
      if (orbitSlider) orbitSlider.value = 3;
      this.updateSeasonDisplay();
      this.updateTimeDisplay();
      this.playFeedbackSound('select');
    });

    // Multi-Pin City Adder Events
    const addPinBtn = document.getElementById('dn-add-pin-btn');
    const cityInput = document.getElementById('dn-city-input');

    const handleAddPin = () => {
      if (!cityInput) return;
      const query = cityInput.value.trim();
      if (!query) return;
      this.addCityPin(query);
      cityInput.value = '';
    };

    addPinBtn?.addEventListener('click', handleAddPin);
    cityInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAddPin();
    });

    // Preset quick pin buttons
    document.querySelectorAll('.quick-pin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cityKey = btn.dataset.city;
        if (cityKey) this.addCityPin(cityKey);
      });
    });

    // Interactive Dragging & Clicking for Canvas Orbit Mini-Map
    let isDraggingMiniMap = false;

    this.getMiniMapParams = () => {
      const isMobile = this.displayWidth < 600;
      const miniR = isMobile ? 38 : 56;
      const miniX = this.displayWidth - (isMobile ? 54 : 92);
      const miniY = isMobile ? 52 : 96;
      return { miniX, miniY, miniR, isMobile };
    };

    const handleMiniMapOrbit = (clickX, clickY) => {
      const { miniX, miniY, miniR } = this.getMiniMapParams();
      const dist = Math.hypot(clickX - miniX, clickY - miniY);
      if (dist <= miniR + 25) {
        const dx = clickX - miniX;
        const dy = clickY - miniY;
        let clickAngle = Math.atan2(dy, -dx);
        if (clickAngle < 0) clickAngle += Math.PI * 2;
        this.orbitMonth = (clickAngle / (Math.PI * 2)) * 12;
        if (orbitSlider) orbitSlider.value = this.orbitMonth.toFixed(2);
        this.updateSeasonDisplay();
        this.updateTimeDisplay();
        return true;
      }
      return false;
    };

    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      if (this.showOrbitMiniMap && handleMiniMapOrbit(clickX, clickY)) {
        isDraggingMiniMap = true;
        this.playFeedbackSound('select');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingMiniMap) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      handleMiniMapOrbit(clickX, clickY);
    });

    window.addEventListener('mouseup', () => {
      isDraggingMiniMap = false;
    });

    // Touch event listeners for mobile devices
    this.canvas.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = this.canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const touchY = e.touches[0].clientY - rect.top;
      if (this.showOrbitMiniMap && handleMiniMapOrbit(touchX, touchY)) {
        isDraggingMiniMap = true;
        this.playFeedbackSound('select');
        e.preventDefault();
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingMiniMap || !e.touches || e.touches.length === 0) return;
      const rect = this.canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const touchY = e.touches[0].clientY - rect.top;
      handleMiniMapOrbit(touchX, touchY);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
      isDraggingMiniMap = false;
    });

    // Canvas click to select pinned city
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if mini-map handled it
      const { miniX, miniY, miniR } = this.getMiniMapParams();
      if (this.showOrbitMiniMap && Math.hypot(clickX - miniX, clickY - miniY) <= miniR + 25) {
        return;
      }

      for (const pin of this.visiblePins) {
        const dist = Math.hypot(clickX - pin.x, clickY - pin.y);
        if (dist <= 28) {
          this.selectObserverCity(pin.key);
          break;
        }
      }
    });

    // Mobile touch tap for pinned cities
    this.canvas.addEventListener('touchend', (e) => {
      if (isDraggingMiniMap) return;
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const rect = this.canvas.getBoundingClientRect();
      const touchX = e.changedTouches[0].clientX - rect.left;
      const touchY = e.changedTouches[0].clientY - rect.top;

      const { miniX, miniY, miniR } = this.getMiniMapParams();
      if (this.showOrbitMiniMap && Math.hypot(touchX - miniX, touchY - miniY) <= miniR + 25) {
        return;
      }

      for (const pin of this.visiblePins) {
        const dist = Math.hypot(touchX - pin.x, touchY - pin.y);
        if (dist <= 32) {
          this.selectObserverCity(pin.key);
          break;
        }
      }
    });

    // Oblate Spheroid Toggles
    document.getElementById('dn-shape-toggle')?.addEventListener('change', (e) => {
      this.isOblateShape = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    document.getElementById('dn-calipers-toggle')?.addEventListener('change', (e) => {
      this.showCalipers = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    document.getElementById('dn-compare-toggle')?.addEventListener('change', (e) => {
      this.showSphereCompare = e.target.checked;
      window.cosmicAudio?.playClick();
    });

    document.getElementById('dn-bulge-slider')?.addEventListener('input', (e) => {
      this.bulgeExaggeration = parseFloat(e.target.value);
      const valEl = document.getElementById('dn-bulge-val');
      if (valEl) valEl.textContent = `${this.bulgeExaggeration.toFixed(1)}x`;
    });
  }

  playFeedbackSound(type = 'select') {
    try {
      if (type === 'select' && typeof window.cosmicAudio?.playPlanetSelect === 'function') {
        window.cosmicAudio.playPlanetSelect();
      } else if (typeof window.cosmicAudio?.playClick === 'function') {
        window.cosmicAudio.playClick();
      }
    } catch (e) {
      // Audio fallback
    }
  }

  addCityPin(cityQuery) {
    if (!cityQuery) return;
    const lower = cityQuery.toLowerCase().trim();
    
    // Look for exact key match or substring in city name
    let foundKey = Object.keys(this.cityCatalog).find(k => 
      k === lower || 
      this.cityCatalog[k].name.toLowerCase().includes(lower)
    );

    if (foundKey) {
      if (!this.pinnedCityKeys.includes(foundKey)) {
        this.pinnedCityKeys.push(foundKey);
      }
      this.currentCityKey = foundKey;
    } else {
      // Create custom pin for arbitrary user search
      const customKey = 'city_' + Date.now();
      const colors = ['#10b981', '#38bdf8', '#f59e0b', '#ec4899', '#a855f7', '#06b6d4'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      this.cityCatalog[customKey] = {
        name: cityQuery,
        lat: (Math.random() * 80) - 20,
        lon: (Math.random() * 360) - 180,
        flag: '📍',
        color: randomColor
      };
      this.pinnedCityKeys.push(customKey);
      this.currentCityKey = customKey;
    }

    // Sync dropdown if option exists
    const citySelect = document.getElementById('dn-city-select');
    if (citySelect && foundKey && citySelect.querySelector(`option[value="${foundKey}"]`)) {
      citySelect.value = foundKey;
    }

    this.renderPinnedChips();
    this.updateWorldClock();
    this.updateTimeDisplay();
    this.playFeedbackSound('select');
  }

  removeCityPin(key) {
    this.pinnedCityKeys = this.pinnedCityKeys.filter(k => k !== key);
    if (this.pinnedCityKeys.length === 0) {
      this.pinnedCityKeys = ['dhaka'];
    }
    if (this.currentCityKey === key) {
      this.currentCityKey = this.pinnedCityKeys[0];
    }
    this.renderPinnedChips();
    this.updateWorldClock();
    this.updateTimeDisplay();
    this.playFeedbackSound('click');
  }

  selectObserverCity(key) {
    if (!this.cityCatalog[key]) return;
    this.currentCityKey = key;
    if (!this.pinnedCityKeys.includes(key)) {
      this.pinnedCityKeys.push(key);
    }
    const citySelect = document.getElementById('dn-city-select');
    if (citySelect && citySelect.querySelector(`option[value="${key}"]`)) {
      citySelect.value = key;
    }

    this.renderPinnedChips();
    this.updateWorldClock();
    this.updateTimeDisplay();
    this.playFeedbackSound('select');
  }

  getCitySolarInfo(city) {
    const orbitAngle = (this.orbitMonth / 12) * Math.PI * 2;
    // Solar declination: +23.44° in June (orbitAngle = 0), -23.44° in Dec (orbitAngle = PI)
    const declinationDeg = 23.44 * Math.cos(orbitAngle);
    const declinationRad = (declinationDeg * Math.PI) / 180;
    const latRad = (city.lat * Math.PI) / 180;

    const utcHours = (this.timeOfDay) % 24;
    const localHourFloat = (utcHours + (city.lon / 15) + 24) % 24;
    const hours = Math.floor(localHourFloat);
    const minutes = Math.floor((localHourFloat - hours) * 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const minuteStr = minutes.toString().padStart(2, '0');

    // Hour angle H from solar noon (12:00)
    const hourAngleRad = ((localHourFloat - 12) * 15 * Math.PI) / 180;

    // Solar elevation: sin(h) = sin(phi)*sin(delta) + cos(phi)*cos(delta)*cos(H)
    const sinAltitude = Math.sin(latRad) * Math.sin(declinationRad) + 
                        Math.cos(latRad) * Math.cos(declinationRad) * Math.cos(hourAngleRad);
    const altitudeDeg = Math.asin(Math.max(-1, Math.min(1, sinAltitude))) * (180 / Math.PI);

    // Noon altitude (H = 0) and Midnight altitude (H = 180 deg)
    const sinNoonAlt = Math.sin(latRad) * Math.sin(declinationRad) + Math.cos(latRad) * Math.cos(declinationRad);
    const noonAltDeg = Math.asin(Math.max(-1, Math.min(1, sinNoonAlt))) * (180 / Math.PI);

    const sinMidnightAlt = Math.sin(latRad) * Math.sin(declinationRad) - Math.cos(latRad) * Math.cos(declinationRad);
    const midnightAltDeg = Math.asin(Math.max(-1, Math.min(1, sinMidnightAlt))) * (180 / Math.PI);

    const isMidnightSun = midnightAltDeg >= -0.83; // Sun stays above horizon all 24 hours!
    const isPolarNight = noonAltDeg <= -0.83;       // Sun never rises all 24 hours!

    let phaseName = 'Daytime';
    let icon = '☀️';
    let isDay = true;

    if (isMidnightSun) {
      phaseName = '24h Midnight Sun (Polar Day)';
      icon = '☀️';
      isDay = true;
    } else if (isPolarNight) {
      phaseName = '24h Polar Night (Deep Shadow)';
      icon = '🌌';
      isDay = false;
    } else {
      if (altitudeDeg > 3) {
        phaseName = 'Daytime';
        icon = '☀️';
        isDay = true;
      } else if (altitudeDeg >= -4 && altitudeDeg <= 3) {
        if (localHourFloat < 12) {
          phaseName = 'Sunrise / Dawn';
          icon = '🌅';
          isDay = true;
        } else {
          phaseName = 'Sunset / Dusk';
          icon = '🌇';
          isDay = false;
        }
      } else {
        phaseName = 'Nighttime';
        icon = '🌙';
        isDay = false;
      }
    }

    return {
      localHourFloat,
      timeString: `${displayHour}:${minuteStr} ${ampm}`,
      phaseName,
      icon,
      isDay,
      altitudeDeg,
      isMidnightSun,
      isPolarNight
    };
  }

  updateSeasonDisplay() {
    const slider = document.getElementById('dn-orbit-slider');
    if (slider && !this.isOrbitDragging && document.activeElement !== slider) {
      slider.value = this.orbitMonth;
    }

    // Highlight milestone button with clean active check
    document.querySelectorAll('.dn-orbit-btn').forEach(btn => {
      const bMonth = parseFloat(btn.dataset.month);
      const isNearby = Math.abs(bMonth - this.orbitMonth) < 0.8 || (bMonth === 0 && this.orbitMonth > 11.2);
      btn.classList.toggle('active', isNearby);
    });

    const displayEl = document.getElementById('dn-season-display');
    if (!displayEl) return;

    const m = this.orbitMonth;
    let seasonDesc = '';
    if (m >= 11.5 || m < 1.0) {
      seasonDesc = '☀️ June Solstice (Arctic 24h Midnight Sun | Antarctica 24h Night)';
    } else if (m >= 1.0 && m < 2.5) {
      seasonDesc = '☀️ July (Northern Summer, Midnight Sun at High Latitudes)';
    } else if (m >= 2.5 && m < 4.0) {
      seasonDesc = '🍂 September Equinox (Equal 12h Day & 12h Night Everywhere)';
    } else if (m >= 4.0 && m < 5.5) {
      seasonDesc = '🍁 October / November (Northern Days Shortening)';
    } else if (m >= 5.5 && m < 7.0) {
      seasonDesc = '❄️ December Solstice (Antarctica 24h Midnight Sun | Arctic 24h Night)';
    } else if (m >= 7.0 && m < 8.5) {
      seasonDesc = '❄️ January / February (Southern Summer, Antarctica Lit)';
    } else if (m >= 8.5 && m < 10.0) {
      seasonDesc = '🌱 March Equinox (Equal 12h Day & 12h Night Everywhere)';
    } else {
      seasonDesc = '🌸 April / May (Northern Days Lengthening)';
    }
    displayEl.textContent = seasonDesc;
  }

  renderPinnedChips() {
    const container = document.getElementById('dn-pinned-chips');
    const countBadge = document.getElementById('dn-pin-count');
    if (countBadge) countBadge.textContent = `${this.pinnedCityKeys.length} Pinned`;
    if (!container) return;

    container.innerHTML = '';
    this.pinnedCityKeys.forEach(key => {
      const city = this.cityCatalog[key];
      if (!city) return;
      const info = this.getCitySolarInfo(city);
      const isActive = (key === this.currentCityKey);

      const chip = document.createElement('div');
      chip.className = `city-chip ${isActive ? 'active-observer' : ''}`;
      chip.dataset.key = key;
      chip.title = `Click to observe sky from ${city.name}`;
      chip.innerHTML = `
        <span class="chip-dot" style="background: ${city.color || '#38bdf8'}"></span>
        <span>${city.flag} ${city.name.split(',')[0]}</span>
        <span class="chip-time">${info.timeString} ${info.icon}</span>
        <span class="chip-remove" title="Remove pin" data-remove="${key}">&times;</span>
      `;

      chip.addEventListener('click', (e) => {
        if (e.target.dataset.remove) {
          e.stopPropagation();
          this.removeCityPin(key);
        } else {
          this.selectObserverCity(key);
        }
      });

      container.appendChild(chip);
    });
  }

  updateWorldClock() {
    const container = document.getElementById('dn-world-clock-list');
    if (!container) return;

    container.innerHTML = '';
    this.pinnedCityKeys.forEach(key => {
      const city = this.cityCatalog[key];
      if (!city) return;
      const info = this.getCitySolarInfo(city);
      const isActive = (key === this.currentCityKey);

      const card = document.createElement('div');
      card.className = `world-clock-card ${info.isDay ? 'day' : 'night'} ${isActive ? 'active' : ''}`;
      card.dataset.key = key;
      card.title = `Click to focus sky on ${city.name}`;
      card.innerHTML = `
        <div class="world-clock-card-top">
          <span>${city.flag} ${city.name.split(',')[0]}</span>
          <span class="card-time-text">${info.icon} ${info.timeString}</span>
        </div>
        <div class="world-clock-card-bottom">
          <span class="card-phase-text">${info.phaseName}</span>
          <span class="card-status-text" style="color: ${city.color}">${info.isDay ? 'Sun Lit ☀️' : 'In Shadow 🌙'}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectObserverCity(key);
      });

      container.appendChild(card);
    });
  }

  updatePinnedDisplays() {
    // Zero-DOM-allocation in-place text update for maximum 60/120fps slider smoothness
    const chipContainer = document.getElementById('dn-pinned-chips');
    if (chipContainer) {
      const chips = chipContainer.querySelectorAll('.city-chip');
      chips.forEach(chip => {
        const key = chip.dataset.key;
        const city = this.cityCatalog[key];
        if (!city) return;
        const info = this.getCitySolarInfo(city);
        const timeEl = chip.querySelector('.chip-time');
        if (timeEl) timeEl.textContent = `${info.timeString} ${info.icon}`;
        if (key === this.currentCityKey) {
          chip.classList.add('active-observer');
        } else {
          chip.classList.remove('active-observer');
        }
      });
    }

    const clockContainer = document.getElementById('dn-world-clock-list');
    if (clockContainer) {
      const cards = clockContainer.querySelectorAll('.world-clock-card');
      cards.forEach(card => {
        const key = card.dataset.key;
        const city = this.cityCatalog[key];
        if (!city) return;
        const info = this.getCitySolarInfo(city);
        card.className = `world-clock-card ${info.isDay ? 'day' : 'night'} ${key === this.currentCityKey ? 'active' : ''}`;
        const timeSpan = card.querySelector('.card-time-text');
        if (timeSpan) timeSpan.textContent = `${info.icon} ${info.timeString}`;
        const phaseSpan = card.querySelector('.card-phase-text');
        if (phaseSpan) phaseSpan.textContent = info.phaseName;
        const statusSpan = card.querySelector('.card-status-text');
        if (statusSpan) statusSpan.textContent = info.isDay ? 'Sun Lit ☀️' : 'In Shadow 🌙';
      });
    }
  }

  updateTimeDisplay(rebuildDOM = false) {
    const slider = document.getElementById('dn-time-slider');
    if (slider && !this.isTimeDragging && document.activeElement !== slider) {
      slider.value = this.timeOfDay;
    }

    const city = this.cityCatalog[this.currentCityKey] || this.cityCatalog['dhaka'];
    const info = this.getCitySolarInfo(city);

    const timeDisplayEl = document.getElementById('dn-time-display');
    if (timeDisplayEl) {
      timeDisplayEl.textContent = `${info.timeString} (${info.phaseName} in ${city.name.split(',')[0]})`;
    }

    // Update Ground Sky Window
    const locLabel = document.getElementById('ground-sky-location');
    if (locLabel) locLabel.textContent = `${city.flag} ${city.name}`;

    const skyWindow = document.getElementById('ground-sky-view');
    const skyBody = document.getElementById('sky-sun-moon');
    const skyStatus = document.getElementById('ground-sky-phase');

    if (skyWindow && skyBody && skyStatus) {
      skyStatus.textContent = `${info.phaseName} in ${city.name}`;

      if (info.isMidnightSun) {
        skyWindow.className = 'sky-window midnightsun';
        skyBody.textContent = '☀️';
        skyBody.style.transform = 'translateY(5px)';
      } else if (info.isPolarNight) {
        skyWindow.className = 'sky-window polarnight';
        skyBody.textContent = '🌌';
        skyBody.style.transform = 'translateY(-10px)';
      } else if (info.phaseName.includes('Sunrise')) {
        skyWindow.className = 'sky-window sunrise';
        skyBody.textContent = '🌅';
        skyBody.style.transform = 'translateY(15px)';
      } else if (info.phaseName.includes('Sunset')) {
        skyWindow.className = 'sky-window sunset';
        skyBody.textContent = '🌇';
        skyBody.style.transform = 'translateY(15px)';
      } else if (info.phaseName.includes('Night')) {
        skyWindow.className = 'sky-window night';
        skyBody.textContent = '🌙';
        skyBody.style.transform = 'translateY(-10px)';
      } else {
        skyWindow.className = 'sky-window noon';
        skyBody.textContent = '☀️';
        skyBody.style.transform = 'translateY(-15px)';
      }
    }

    if (rebuildDOM) {
      this.renderPinnedChips();
      this.updateWorldClock();
    } else {
      this.updatePinnedDisplays();
    }
  }

  update(dt) {
    if (this.isRunning) {
      this.timeOfDay = (this.timeOfDay + this.rotationSpeed * dt) % 24;
      this.updateTimeDisplay(false);
    }
    if (this.isAutoOrbit) {
      this.orbitMonth = (this.orbitMonth + this.orbitSpeed * dt) % 12;
      this.updateSeasonDisplay();
      this.updateTimeDisplay(false);
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    const cx = this.displayWidth / 2;
    const cy = this.displayHeight / 2;
    
    // Balanced high-resolution base radius (scaled for crisp high-DPI viewing)
    const baseRadius = Math.min(this.displayWidth * 0.28, this.displayHeight * 0.32);
    
    // TRUE SHAPE OF EARTH: OBLATE SPHEROID (GEOID)
    // Equatorial diameter: 12,756 km vs Polar diameter: 12,714 km
    let radiusEquator = baseRadius;
    let radiusPolar = baseRadius;

    if (this.isOblateShape) {
      const factor = this.bulgeExaggeration || 1.0;
      // 10% wider equator, 8% flatter poles
      radiusEquator = baseRadius * (1.0 + 0.10 * factor);
      radiusPolar = baseRadius * (1.0 - 0.08 * factor);
    }

    // 1. Draw Streaming Sunlight Beams from the Left
    const sunGrad = ctx.createLinearGradient(0, cy, cx - radiusEquator, cy);
    sunGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
    sunGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
    sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, cy - radiusPolar * 1.5, cx - radiusEquator + 10, radiusPolar * 3.0);

    // Glowing Sun on far left edge
    const sunEdgeGrad = ctx.createRadialGradient(0, cy, 10, 0, cy, 100);
    sunEdgeGrad.addColorStop(0, '#ffffff');
    sunEdgeGrad.addColorStop(0.3, '#fef08a');
    sunEdgeGrad.addColorStop(0.7, '#f59e0b');
    sunEdgeGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    ctx.beginPath();
    ctx.arc(0, cy, 95, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = sunEdgeGrad;
    ctx.fill();

    // 2. Axial Tilt & Rotation Transform
    ctx.save();
    ctx.translate(cx, cy);

    // Dynamic Axial Tilt relative to incoming sunlight based on Earth's orbital position!
    // Month 0 (June): North Pole tilts toward Sun (leftward: -23.44°) -> Arctic 24h Midnight Sun!
    // Month 6 (Dec): North Pole tilts away from Sun (rightward: +23.44°) -> Antarctica 24h Midnight Sun!
    // Month 3 & 9 (Sept & March Equinoxes): Tilt perpendicular to Sun line (0°) -> Equal 12h day/night!
    const orbitAngle = (this.orbitMonth / 12) * Math.PI * 2;
    const currentTiltDeg = -23.44 * Math.cos(orbitAngle);
    const tiltRad = (currentTiltDeg * Math.PI) / 180;
    ctx.rotate(tiltRad);

    // Draw Earth Axis Line (through flattened poles)
    ctx.beginPath();
    ctx.moveTo(0, -radiusPolar * 1.25);
    ctx.lineTo(0, radiusPolar * 1.25);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Axis Pole Labels
    ctx.font = '600 11px Outfit, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('North Pole (Flattened)', 0, -radiusPolar * 1.18);
    ctx.fillText('South Pole (Flattened)', 0, radiusPolar * 1.20);

    // Atmospheric Rayleigh Scattering Glow around Oblate Spheroid
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusEquator * 1.08, radiusPolar * 1.08, 0, 0, Math.PI * 2);
    const atmoGrad = ctx.createRadialGradient(0, 0, radiusPolar * 0.95, 0, 0, radiusEquator * 1.08);
    atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
    atmoGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.22)');
    atmoGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = atmoGrad;
    ctx.fill();
    ctx.restore();

    // 3. Draw Earth Surface onto Oblate Spheroid
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusEquator, radiusPolar, 0, 0, Math.PI * 2);
    ctx.clip(); // CLIPPED STRICTLY TO OBLATE SPHEROID

    // Deep Ocean Base
    const oceanGrad = ctx.createRadialGradient(
      -radiusEquator * 0.35,
      -radiusPolar * 0.25,
      10,
      0,
      0,
      radiusEquator
    );
    oceanGrad.addColorStop(0, '#1d4ed8');
    oceanGrad.addColorStop(0.65, '#1e3a8a');
    oceanGrad.addColorStop(0.95, '#0b1329');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(-radiusEquator * 1.2, -radiusPolar * 1.2, radiusEquator * 2.4, radiusPolar * 2.4);

    // Rotation angle based on timeOfDay (24h = 2PI)
    const rotAngle = (this.timeOfDay / 24) * Math.PI * 2;

    // 4. Draw Photorealistic Satellite Surface Map
    if (this.imageLoaded && this.earthImage.width > 0) {
      // High-density sub-pixel strips (380+) for razor-sharp continuous photographic sphere
      const strips = Math.max(380, Math.floor(radiusEquator * 2.5));
      const imgW = this.earthImage.width;
      const imgH = this.earthImage.height;

      for (let i = 0; i < strips; i++) {
        const xNorm1 = (i / strips) * 2 - 1;
        const xNorm2 = ((i + 1) / strips) * 2 - 1;

        const x1 = xNorm1 * radiusEquator;
        const x2 = xNorm2 * radiusEquator;
        const stripW = x2 - x1 + 0.55; // sub-pixel overlap eliminates vertical lines

        // Precise orthographic spherical longitude projection
        const lonAngle1 = Math.asin(Math.max(-1, Math.min(1, xNorm1)));
        const lonAngle2 = Math.asin(Math.max(-1, Math.min(1, xNorm2)));
        
        let u1 = (lonAngle1 / Math.PI * 0.5 + 0.5 - (rotAngle / (Math.PI * 2))) % 1.0;
        if (u1 < 0) u1 += 1.0;
        let u2 = (lonAngle2 / Math.PI * 0.5 + 0.5 - (rotAngle / (Math.PI * 2))) % 1.0;
        if (u2 < 0) u2 += 1.0;

        let srcX = u1 * imgW;
        let srcX2 = u2 * imgW;
        if (srcX2 < srcX) srcX2 += imgW;
        const srcW = Math.max(0.6, srcX2 - srcX);

        const stripH = radiusPolar * 2.06;
        const yTop = -stripH / 2;

        if (srcX + srcW > imgW) {
          const w1 = imgW - srcX;
          const w2 = srcW - w1;
          const stripW1 = stripW * (w1 / srcW);
          const stripW2 = stripW - stripW1;
          ctx.drawImage(this.earthImage, srcX, 0, w1, imgH, x1, yTop, stripW1, stripH);
          ctx.drawImage(this.earthImage, 0, 0, w2, imgH, x1 + stripW1, yTop, stripW2, stripH);
        } else {
          ctx.drawImage(this.earthImage, srcX, 0, srcW, imgH, x1, yTop, stripW, stripH);
        }
      }
    }

    // 5. Draw Translucent Atmospheric Cloud Swirls
    ctx.fillStyle = '#ffffff';
    for (const c of this.clouds) {
      const cloudLonRad = ((c.lon * Math.PI) / 180) + rotAngle * c.speed;
      const cloudLatRad = (c.lat * Math.PI) / 180;
      const z = Math.cos(cloudLonRad) * Math.cos(cloudLatRad);

      if (z > 0) {
        const cxPos = Math.sin(cloudLonRad) * Math.cos(cloudLatRad) * radiusEquator;
        const cyPos = -Math.sin(cloudLatRad) * radiusPolar;

        ctx.save();
        ctx.translate(cxPos, cyPos);
        ctx.beginPath();
        ctx.ellipse(0, 0, c.rx, c.ry, Math.PI / 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // 6. Draw Equator Line on Globe
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusEquator, radiusEquator * 0.15, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Restore Earth surface clip
    ctx.restore();

    // 7. Comparison Outline (Hypothetical Perfect Round Sphere vs Oblate Spheroid)
    if (this.showSphereCompare) {
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '600 10px Outfit, sans-serif';
      ctx.fillStyle = '#fda4af';
      ctx.textAlign = 'right';
      ctx.fillText('Hypothetical Round Sphere', -baseRadius - 10, 0);
    }

    ctx.restore(); // back to world coordinates

    // 8. Calipers & Geoid Measurement Badges
    if (this.showCalipers && this.isOblateShape) {
      ctx.save();
      
      // Equatorial Caliper (Cyan) - Horizontal measurement bracket below globe
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      const eqSpan = radiusEquator;
      const eqBarY = cy + radiusPolar * 1.18;

      // Leader guidelines from equator edges down to caliper bar
      ctx.beginPath();
      ctx.moveTo(cx - eqSpan, cy);
      ctx.lineTo(cx - eqSpan, eqBarY);
      ctx.moveTo(cx + eqSpan, cy);
      ctx.lineTo(cx + eqSpan, eqBarY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Caliper bar & end ticks
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(cx - eqSpan, eqBarY);
      ctx.lineTo(cx + eqSpan, eqBarY);
      ctx.moveTo(cx - eqSpan, eqBarY - 6);
      ctx.lineTo(cx - eqSpan, eqBarY + 6);
      ctx.moveTo(cx + eqSpan, eqBarY - 6);
      ctx.lineTo(cx + eqSpan, eqBarY + 6);
      ctx.stroke();

      // Capsule Badge for Equatorial Width
      const eqText = '↔ Equatorial Diameter: 12,756 km (Bulging Equator)';
      ctx.font = '700 11px Outfit, sans-serif';
      const textW = ctx.measureText(eqText).width;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - textW / 2 - 10, eqBarY + 8, textW + 20, 24, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(eqText, cx, eqBarY + 24);

      // Polar Caliper (Coral Pink) - Vertical measurement bracket on right
      const polX = cx + radiusEquator * 1.08;
      const polSpan = radiusPolar;

      // Leader guidelines from poles across to caliper bar
      ctx.beginPath();
      ctx.moveTo(cx, cy - polSpan);
      ctx.lineTo(polX, cy - polSpan);
      ctx.moveTo(cx, cy + polSpan);
      ctx.lineTo(polX, cy + polSpan);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.25)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Caliper bar & end ticks
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(polX, cy - polSpan);
      ctx.lineTo(polX, cy + polSpan);
      ctx.moveTo(polX - 6, cy - polSpan);
      ctx.lineTo(polX + 6, cy - polSpan);
      ctx.moveTo(polX - 6, cy + polSpan);
      ctx.lineTo(polX + 6, cy + polSpan);
      ctx.stroke();

      // Capsule Badge for Polar Diameter (auto-align inside if near right border)
      const polText = '↕ Polar: 12,714 km (-42.8 km Flattened)';
      const polW = ctx.measureText(polText).width;
      const fitRight = (polX + polW + 28 <= this.displayWidth);
      const capsuleX = fitRight ? (polX + 10) : (polX - polW - 24);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(capsuleX, cy - 12, polW + 18, 24, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fda4af';
      ctx.textAlign = 'left';
      ctx.fillText(polText, capsuleX + 9, cy + 4);

      ctx.restore();
    }

    // 9. Day / Night Terminator & Shadow Mask on Oblate Spheroid
    ctx.save();
    ctx.translate(cx, cy);

    // Clip strictly to tilted oblate spheroid shape
    ctx.save();
    ctx.rotate(tiltRad);
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusEquator, radiusPolar, 0, 0, Math.PI * 2);
    ctx.clip(); // CLIPPED!
    ctx.rotate(-tiltRad); // Rotate back inside clip to align shadow with Sun

    // Shadow gradient (Sun is on left, night shadow on right)
    const shadowGrad = ctx.createLinearGradient(-radiusEquator * 0.15, 0, radiusEquator * 0.35, 0);
    shadowGrad.addColorStop(0, 'rgba(3, 7, 18, 0)');
    shadowGrad.addColorStop(0.35, 'rgba(3, 7, 18, 0.75)');
    shadowGrad.addColorStop(1, 'rgba(3, 7, 18, 0.96)');

    ctx.fillStyle = shadowGrad;
    ctx.fillRect(-radiusEquator * 0.15, -radiusPolar * 1.5, radiusEquator * 2.5, radiusPolar * 3.0);

    // Warm Sunset/Sunrise Rayleigh atmospheric scatter along the terminator
    const termGlow = ctx.createLinearGradient(-15, 0, 15, 0);
    termGlow.addColorStop(0, 'rgba(249, 115, 22, 0)');
    termGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.4)');
    termGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = termGlow;
    ctx.fillRect(-15, -radiusPolar * 1.5, 30, radiusPolar * 3.0);

    // City Night Lights on the dark hemisphere
    ctx.fillStyle = '#fef08a';
    for (const light of this.cityLights) {
      const lonRad = ((light.lon * Math.PI) / 180) + rotAngle;
      const latRad = (light.lat * Math.PI) / 180;
      const z = Math.cos(lonRad) * Math.cos(latRad);

      if (z > 0) {
        const rawX = Math.sin(lonRad) * Math.cos(latRad) * radiusEquator;
        const rawY = -Math.sin(latRad) * radiusPolar;

        const worldX = rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad);
        const worldY = rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad);

        // Only show if in night shadow
        if (worldX > 6) {
          ctx.beginPath();
          ctx.arc(worldX, worldY, light.size, 0, Math.PI * 2);
          ctx.globalAlpha = Math.min(1, (worldX / (radiusEquator * 0.35))) * light.brightness;
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1.0;
    ctx.restore(); // Restore clipping of shadow mask

    // 10. Multi-City Observer Pins (Dhaka, New York, and all user pins)
    this.visiblePins = [];
    for (const key of this.pinnedCityKeys) {
      const city = this.cityCatalog[key];
      if (!city) continue;

      const cityLonRad = ((city.lon * Math.PI) / 180) + rotAngle;
      const cityLatRad = (city.lat * Math.PI) / 180;
      const cityZ = Math.cos(cityLonRad) * Math.cos(cityLatRad);

      if (cityZ > 0) {
        const rawX = Math.sin(cityLonRad) * Math.cos(cityLatRad) * radiusEquator;
        const rawY = -Math.sin(cityLatRad) * radiusPolar;

        const pinX = rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad);
        const pinY = rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad);

        // Store screen position for canvas click detection
        this.visiblePins.push({ key, x: cx + pinX, y: cy + pinY });

        const isActive = (key === this.currentCityKey);
        const info = this.getCitySolarInfo(city);
        const pinColor = city.color || '#38bdf8';

        // Animated Beacon Pulse Ring
        const pulse = ((Date.now() / 700) + (city.lon / 40)) % 1.5;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 5 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = pinColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = Math.max(0, 1 - pulse / 1.5);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Solid Pin Core
        ctx.beginPath();
        ctx.arc(pinX, pinY, isActive ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = pinColor;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // City Tag Badge
        const cityName = city.name.split(',')[0];
        const labelText = `${city.flag} ${cityName}: ${info.timeString} ${info.icon}`;
        ctx.font = isActive ? '700 11px Outfit, sans-serif' : '600 10px Outfit, sans-serif';
        const labelW = ctx.measureText(labelText).width;

        // If near right edge of Earth, flip badge to left
        const badgeX = (pinX + labelW + 20 > radiusEquator * 1.1) ? (pinX - labelW - 14) : (pinX + 10);
        const badgeY = pinY - 11;

        // Pill Capsule background
        ctx.fillStyle = isActive ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = isActive ? pinColor : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.beginPath();
        ctx.roundRect(badgeX - 4, badgeY, labelW + 12, 21, 5);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = isActive ? '#ffffff' : (info.isDay ? '#fde047' : '#93c5fd');
        ctx.textAlign = 'left';
        ctx.fillText(labelText, badgeX + 2, badgeY + 14);
      }
    }

    ctx.restore();

    // 11. World-Space Annotations
    // Day Side indicator
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('☀️ Sunlight Incoming (Day Side)', cx - radiusEquator * 0.85, cy - radiusPolar * 0.88);

    // Night Side indicator
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('🌙 Night Side (Shadow)', cx + radiusEquator * 0.88, cy - radiusPolar * 0.88);

    // Terminator Line
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - radiusPolar * 1.15);
    ctx.lineTo(cx, cy + radiusPolar * 1.05);
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#fda4af';
    ctx.font = '600 11px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('The Terminator Line (Sunrise & Sunset)', cx, cy - radiusPolar * 1.22);

    // 12. Earth Orbit Mini-Map Inset (Shows Earth traveling around Sun with fixed space tilt pointing to Polaris)
    if (this.showOrbitMiniMap) {
      this.drawOrbitMiniMap(ctx);
    }
  }

  drawOrbitMiniMap(ctx) {
    const { miniX, miniY, miniR, isMobile } = this.getMiniMapParams();
    const rx = miniR * 0.95;
    const ry = miniR * 0.62;

    ctx.save();

    // 1. Semi-transparent Glass Container Card
    ctx.beginPath();
    ctx.roundRect(miniX - miniR - 18, miniY - miniR - 22, (miniR + 18) * 2, (miniR + 24) * 2, 12);
    ctx.fillStyle = 'rgba(10, 15, 30, 0.88)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inset Title
    ctx.font = '700 10px Outfit, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('🌍 Orbit & Polaris Tilt', miniX, miniY - miniR - 9);

    // 2. Orbit Ellipse Path
    ctx.beginPath();
    ctx.ellipse(miniX, miniY, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Central Glowing Sun
    const sunGlow = ctx.createRadialGradient(miniX, miniY, 2, miniX, miniY, 14);
    sunGlow.addColorStop(0, '#ffffff');
    sunGlow.addColorStop(0.4, '#fde047');
    sunGlow.addColorStop(0.8, '#f59e0b');
    sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(miniX, miniY, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(miniX, miniY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    // 4. Milestone Markers on Orbit
    const milestones = [
      { angle: 0, label: 'Jun' },
      { angle: Math.PI / 2, label: 'Sep' },
      { angle: Math.PI, label: 'Dec' },
      { angle: (3 * Math.PI) / 2, label: 'Mar' }
    ];

    ctx.font = '600 8.5px Outfit, sans-serif';
    for (const m of milestones) {
      const mx = miniX - Math.cos(m.angle) * rx;
      const my = miniY + Math.sin(m.angle) * ry;

      ctx.beginPath();
      ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      // Label offset
      const ox = (m.angle === 0) ? -13 : (m.angle === Math.PI ? 13 : 0);
      const oy = (m.angle === Math.PI / 2) ? 10 : (m.angle === (3 * Math.PI) / 2 ? -8 : 3);
      ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
      ctx.textAlign = 'center';
      ctx.fillText(m.label, mx + ox, my + oy);
    }

    // 5. Current Earth Node on Orbit
    const orbitAngle = (this.orbitMonth / 12) * Math.PI * 2;
    const earthX = miniX - Math.cos(orbitAngle) * rx;
    const earthY = miniY + Math.sin(orbitAngle) * ry;

    // Glowing Earth Halo
    ctx.beginPath();
    ctx.arc(earthX, earthY, 9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.fill();

    // Earth Sphere
    ctx.beginPath();
    ctx.arc(earthX, earthY, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Fixed Axial Tilt Arrow pointing toward Polaris (upper-left in space: angle ~ -65 deg)
    const fixedTiltAngle = -Math.PI * 0.40;
    const axisLen = 13;
    const ax1 = earthX - Math.cos(fixedTiltAngle) * axisLen;
    const ay1 = earthY - Math.sin(fixedTiltAngle) * axisLen;
    const ax2 = earthX + Math.cos(fixedTiltAngle) * axisLen;
    const ay2 = earthY + Math.sin(fixedTiltAngle) * axisLen;

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(ax2, ay2);
    ctx.lineTo(ax1, ay1);
    ctx.stroke();

    // North arrow tip pointing to Polaris
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ax1, ay1, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Helper text at bottom
    ctx.font = '500 8px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
    ctx.textAlign = 'center';
    ctx.fillText('Click / Drag Orbit Month', miniX, miniY + miniR + 15);

    ctx.restore();
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
window.initDayNightSim = () => {
  window.dayNightSim = new DayNightSim('canvas-day-night');
};
