/**
 * portal.js - ToruLearn Discovery Portal & Multi-Domain Learning Labs
 * Powers the Home Portal, Human Body Systems (Digestive, Breathing, Heart),
 * Immunology Army, Cell Biology, Math Patterns, Psychology Illusions,
 * and Philosophy Thought Experiments.
 */

class ToruPortal {
  constructor() {
    this.currentView = 'home';
    this.currentFilter = 'all';
    this.bodySystemTab = 'skeleton';
    this.digestiveStep = 0;
    this.breathingState = 'inhale';
    this.heartBpm = 75;
    this.fibonacciCount = 34;
    this.init();
  }

  init() {
    this.setupViewRouting();
    this.setupFilterPills();
    this.setupBodySystemsLab();
    this.setupImmunologyLab();
    this.setupCellLab();
    this.setupMathCanvas();
    this.setupPsychologyLab();
    this.setupPhilosophyLab();
    window.addEventListener("toru:langchange", (e) => this.onLanguageChanged(e.detail?.lang));
  }

  // ================= VIEW ROUTING =================
  setupViewRouting() {
    // Brand title click returns to home
    const brand = document.getElementById('brand-home-link');
    brand?.addEventListener('click', () => {
      this.switchMainView('home');
    });

    // Navigation links with data-view
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.dataset.viewTarget;
        this.switchMainView(target);
      });
    });

    // Back to home buttons
    document.querySelectorAll('.back-to-home-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchMainView('home');
      });
    });

    // Check URL hash on load
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(`view-${hash}`)) {
        this.switchMainView(hash, false);
      }
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(`view-${initialHash}`)) {
      this.switchMainView(initialHash, false);
    }
  }

  switchMainView(viewId, updateHash = true) {
    this.currentView = viewId;
    if (updateHash) {
      window.location.hash = viewId === 'home' ? '' : viewId;
    }

    // Toggle active view sections
    document.querySelectorAll('.app-main-view').forEach(v => {
      v.classList.toggle('active', v.id === `view-${viewId}`);
    });

    // Toggle active top navigation pills
    document.querySelectorAll('.main-nav-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.viewTarget === viewId);
    });

    // Audio chime
    window.cosmicAudio?.playWhoosh();

    // Specific subsystem initializations when opened
    if (viewId === 'cosmic-explorer') {
      // Re-trigger cosmic explorer resize if needed
      window.solarSystemSim?.resize();
    } else if (viewId === 'math-patterns') {
      this.drawFibonacci();
    } else if (viewId === 'body-systems') {
      if (window.initSkeleton3D) window.initSkeleton3D(true);
      setTimeout(() => window.skeletonSim3D?.resize(), 60);
      if (this.bodySystemTab === 'respiratory') this.renderBreathing();
    }

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= HOME FILTER PILLS =================
  setupFilterPills() {
    const pills = document.querySelectorAll('.topic-filter-pill');
    const cards = document.querySelectorAll('.portal-topic-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        this.currentFilter = filter;
        window.cosmicAudio?.playClick();

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ================= DOMAIN 1: HUMAN BODY SYSTEMS =================
  setupBodySystemsLab() {
    // Sub-tab switching (Digestive, Respiratory, Circulatory)
    const tabs = document.querySelectorAll('.body-sys-tab');
    const panels = document.querySelectorAll('.body-sys-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const sys = tab.dataset.system;
        this.bodySystemTab = sys;
        document.getElementById(`sys-panel-${sys}`)?.classList.add('active');
        window.cosmicAudio?.playClick();

        if (sys === 'skeleton') {
          if (window.initSkeleton3D) window.initSkeleton3D(true);
          setTimeout(() => window.skeletonSim3D?.resize(), 60);
        }
        if (sys === 'respiratory') this.renderBreathing();
        if (sys === 'circulatory') this.updateHeartRate(this.heartBpm);
      });
    });

    // --- Digestive Step-Through ---
    this.digestiveStagesEn = [
      {
        step: 1,
        organ: "👄 The Mouth & Teeth",
        role: "Mechanical Crushing & Chemical Start",
        description: "Your sharp incisors and flat molars crush food into tiny pieces, while saliva pumps in amylase enzymes that instantly start turning starches into sweet glucose sugars.",
        detail: "Fun fact: You produce about 1.5 liters of saliva every single day—enough to fill two water bottles!",
        color: "#fbbf24"
      },
      {
        step: 2,
        organ: "🧬 The Esophagus (Food Elevator)",
        role: "Peristalsis Waves",
        description: "A 10-inch muscular tube that doesn't just let food drop by gravity—it uses coordinated wave contractions called peristalsis. You could swallow food while doing a handstand!",
        detail: "A little trapdoor called the epiglottis snaps shut over your windpipe so food never enters your lungs.",
        color: "#f43f5e"
      },
      {
        step: 3,
        organ: "🧪 The Stomach Acid Churner",
        role: "Chemical Breakdown & Sterilization",
        description: "A muscular elastic pouch containing hydrochloric acid (pH 1.5–2.0), as acidic as battery acid! It churns food into a soupy liquid called chyme while killing harmful bacteria.",
        detail: "Why doesn't the stomach digest itself? A thick mucus lining renews every 3 days to protect its walls!",
        color: "#a855f7"
      },
      {
        step: 4,
        organ: "🌱 The Small Intestine (Nutrient Absorber)",
        role: "The Real Magic of Digestion",
        description: "Despite its name, it is over 20 feet long! Millions of microscopic hair-like folds called villi absorb vitamins, amino acids, and fats straight into your bloodstream to power your muscles.",
        detail: "If you flattened all the villi and microvilli in your small intestine, it would cover an entire tennis court!",
        color: "#10b981"
      },
      {
        step: 5,
        organ: "💧 The Large Intestine & Microbiome",
        role: "Water Recovery & Bacterial Friends",
        description: "Reclaims 90% of water and electrolytes, while trillions of friendly bacteria (your gut microbiome) produce essential vitamin K and protect your immune health before waste exits.",
        detail: "You have more friendly bacteria cells living in your digestive tract than human cells in your entire body!",
        color: "#38bdf8"
      }
    ];

    const stageEl = document.getElementById('digestive-stage-info');
    const updateDigestiveUI = () => {
      const stages = window.toruI18n?.getDigestiveStages(this.digestiveStagesEn) || this.digestiveStagesEn;
      const stage = stages[this.digestiveStep];
      const isBn = window.currentLang === 'bn';
      if (!stageEl || !stage) return;

      stageEl.innerHTML = `
        <div class="stage-badge" style="background:${stage.color}22; border-color:${stage.color}; color:${stage.color};">
          ${isBn ? `ধাপ ${stage.step}/৫: ${stage.role}` : `Step ${stage.step} of 5: ${stage.role}`}
        </div>
        <h3 class="stage-title">${stage.organ}</h3>
        <p class="stage-desc">${stage.description}</p>
        <div class="stage-fact glass-panel">
          <span class="fact-icon">💡</span>
          <span class="fact-text">${stage.detail}</span>
        </div>
      `;

      // Update organ indicator nodes
      document.querySelectorAll('.digest-node').forEach((node, idx) => {
        node.classList.toggle('active', idx === this.digestiveStep);
        node.classList.toggle('passed', idx < this.digestiveStep);
      });
    };

    document.getElementById('digest-prev-btn')?.addEventListener('click', () => {
      if (this.digestiveStep > 0) {
        this.digestiveStep--;
        updateDigestiveUI();
        window.cosmicAudio?.playTink();
      }
    });

    document.getElementById('digest-next-btn')?.addEventListener('click', () => {
      if (this.digestiveStep < digestiveStages.length - 1) {
        this.digestiveStep++;
        updateDigestiveUI();
        window.cosmicAudio?.playTink();
      }
    });

    document.querySelectorAll('.digest-node').forEach((node, idx) => {
      node.addEventListener('click', () => {
        this.digestiveStep = idx;
        updateDigestiveUI();
        window.cosmicAudio?.playTink();
      });
    });

    this.updateDigestiveUI = updateDigestiveUI;
    updateDigestiveUI();

    // --- Respiratory Simulator ---
    const breathBtn = document.getElementById('breathe-toggle-btn');
    breathBtn?.addEventListener('click', () => {
      this.breathingState = this.breathingState === 'inhale' ? 'exhale' : 'inhale';
      this.renderBreathing();
      window.cosmicAudio?.playChime(this.breathingState === 'inhale' ? 440 : 330);
    });

    // --- Circulatory Heart Rate Controller ---
    const hrSlider = document.getElementById('heart-bpm-slider');
    const hrVal = document.getElementById('heart-bpm-val');
    hrSlider?.addEventListener('input', (e) => {
      const bpm = parseInt(e.target.value);
      this.heartBpm = bpm;
      if (hrVal) hrVal.textContent = `${bpm} BPM`;
      this.updateHeartRate(bpm);
    });
  }

  renderBreathing() {
    const lungs = document.getElementById('animated-lungs-graphic');
    const diag = document.getElementById('animated-diaphragm-graphic');
    const airFlow = document.getElementById('air-flow-indicator');
    const statusText = document.getElementById('breathing-status-text');

    if (!lungs || !diag) return;

    const bn = window.toruI18n?.getBreathingData(this.breathingState);
    if (this.breathingState === 'inhale') {
      lungs.style.transform = 'scale(1.15)';
      diag.style.transform = 'translateY(18px)';
      if (airFlow) airFlow.textContent = bn ? bn.airFlow : '⬇ Oxygen (O₂) Flowing In Through Trachea';
      if (statusText) statusText.textContent = bn ? bn.status : 'Inhaling: Diaphragm contracts downwards, chest expands, creating low pressure that pulls fresh air in.';
    } else {
      lungs.style.transform = 'scale(0.92)';
      diag.style.transform = 'translateY(0px)';
      if (airFlow) airFlow.textContent = bn ? bn.airFlow : '⬆ Carbon Dioxide (CO₂) Flowing Out';
      if (statusText) statusText.textContent = bn ? bn.status : 'Exhaling: Diaphragm relaxes upwards, compressing chest cavity to gently push waste carbon dioxide out.';
    }
  }

  updateHeartRate(bpm) {
    const heart = document.getElementById('pulsing-heart-graphic');
    if (!heart) return;
    const duration = (60 / bpm).toFixed(2);
    heart.style.animationDuration = `${duration}s`;
  }

  // ================= DOMAIN 2: IMMUNOLOGY DEFENDERS =================
  setupImmunologyLab() {
    this.defenderProfilesEn = {
      macrophage: {
        name: "Giant Macrophage",
        badge: "The Voracious Sentinel",
        icon: "🛡️",
        quote: "I spot foreign invaders, swallow them whole, and clean up cellular debris!",
        power: "Phagocytosis (Engulfment)",
        speed: "Medium Patrol (Tissues)",
        mission: "Stationed in lungs, skin, and organs. When bacteria enter, macrophages engulf up to 100 microbes each before signaling for backup.",
        color: "#10b981"
      },
      neutrophil: {
        name: "Neutrophil Scout",
        badge: "The Rapid First Responder",
        icon: "⚡",
        quote: "We arrive within minutes by the millions, neutralizing threats with deadly precision nets!",
        power: "NETs (Neutrophil Extracellular Traps)",
        speed: "Ultra-Fast (Bloodstream)",
        mission: "Makes up 60% of all your white blood cells. They rush to wound sites, swarm bacteria, and sacrifice themselves to protect healthy cells.",
        color: "#f59e0b"
      },
      dendritic: {
        name: "Dendritic Messenger",
        badge: "The Intelligence Scout",
        icon: "📡",
        quote: "I analyze the enemy's molecular signature and present it to our generals in the lymph nodes.",
        power: "Antigen Presentation",
        speed: "Migratory Messenger",
        mission: "Collects pieces of digested viruses and travels to lymph nodes to activate matching Helper T-Cells, turning a local fight into an organized army response.",
        color: "#38bdf8"
      },
      tcell: {
        name: "Helper & Killer T-Cells",
        badge: "The Strategic Generals & Snipers",
        icon: "🎯",
        quote: "We command the army with chemical signals, and eliminate virus-infected host cells directly.",
        power: "Cytotoxic Perforin & Granenzymes",
        speed: "Targeted Lock-On",
        mission: "Helper T-Cells unleash chemical alarms (cytokines) that rally the whole body. Killer T-Cells find cells hijacked by viruses and command them to safely self-destruct.",
        color: "#a855f7"
      },
      bcell: {
        name: "B-Cell & Plasma Factory",
        badge: "The Antibody Precision Forge",
        icon: "🏷️",
        quote: "I forge 2,000 custom Y-shaped antibody keys every single second to disarm the enemy!",
        power: "Antibody Mass Production & Memory",
        speed: "Systemic Defense (Blood & Lymph)",
        mission: "Releases precision antibodies that clamp onto viruses like handcuffs so they cannot enter cells. Some B-Cells become Memory Cells that protect you from the same disease for decades!",
        color: "#f43f5e"
      }
    };

    const buttons = document.querySelectorAll('.defender-card-btn');
    const infoContainer = document.getElementById('defender-detail-card');

    const renderDefender = (key) => {
      this.currentDefenderKey = key;
      const profiles = window.toruI18n?.getDefenderProfiles(this.defenderProfilesEn) || this.defenderProfilesEn;
      const d = profiles[key] || this.defenderProfilesEn[key];
      if (!infoContainer || !d) return;
      const isBn = window.currentLang === 'bn';

      infoContainer.innerHTML = `
        <div class="defender-hero-header" style="border-left: 4px solid ${d.color};">
          <div class="hero-left">
            <span class="defender-icon">${d.icon}</span>
            <div>
              <span class="badge-role" style="color:${d.color};">${d.badge}</span>
              <h3 class="defender-title">${d.name}</h3>
            </div>
          </div>
        </div>
        <p class="defender-quote">“${d.quote}”</p>
        <div class="defender-stats-grid">
          <div class="stat-pill glass-panel">
            <span class="stat-label">${isBn ? 'বিশেষ শক্তি' : 'Special Power'}</span>
            <span class="stat-val">${d.power}</span>
          </div>
          <div class="stat-pill glass-panel">
            <span class="stat-label">${isBn ? 'কার্যকর গতি' : 'Deployment Speed'}</span>
            <span class="stat-val">${d.speed}</span>
          </div>
        </div>
        <div class="defender-mission glass-panel">
          <span class="mission-title">${isBn ? 'দেহের অভ্যন্তরে সামরিক মিশন:' : 'Tactical Mission in Your Body:'}</span>
          <p>${d.mission}</p>
        </div>
      `;
    };
    this.renderDefender = renderDefender;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDefender(btn.dataset.defender);
        window.cosmicAudio?.playTink();
      });
    });

    renderDefender('macrophage');
  }

  // ================= DOMAIN 3: CELL BIOLOGY =================
  setupCellLab() {
    this.organellesEn = {
      nucleus: {
        title: "The Nucleus (City Hall & DNA Library)",
        role: "Master Blueprint Storage",
        info: "Contains your 46 chromosomes made of tightly coiled DNA. It holds the complete genetic recipe to build every protein, hormone, and cell in your body.",
        fact: "If stretched out straight, the DNA inside just one single microscopic cell would measure 6 feet (2 meters) long!"
      },
      mitochondria: {
        title: "Mitochondria (The Power Generators)",
        role: "ATP Energy Powerhouse",
        info: "Converts glucose from your food and oxygen from your lungs into ATP (adenosine triphosphate)—the universal energy currency that makes your muscles flex and brain think.",
        fact: "Mitochondria have their own unique circular DNA inherited exclusively from your mother!"
      },
      ribosome: {
        title: "Ribosomes (The Nanoscale Factories)",
        role: "Protein Assembly Lines",
        info: "Reads messenger RNA copies of DNA like a ticker tape, stitching together amino acids into enzymes, hair keratin, antibodies, and muscle fibers at 20 building blocks per second.",
        fact: "A single liver cell contains as many as 10 million active ribosomes working non-stop."
      },
      membrane: {
        title: "The Cell Membrane (Smart Border Control)",
        role: "Selective Barrier & Sensors",
        info: "A fluid phospholipid bilayer packed with protein channels and receptors. It decides exactly what enters (glucose, water, ions) and blocks dangerous chemicals.",
        fact: "The membrane is only two molecules thick (around 7 nanometers)—so thin that 10,000 membranes stacked together equal the thickness of a piece of paper."
      }
    };

    const organelleBtns = document.querySelectorAll('.organelle-nav-btn');
    const displayBox = document.getElementById('organelle-detail-box');

    const showOrganelle = (key) => {
      this.currentOrganelleKey = key;
      const allOrganelles = window.toruI18n?.getOrganelles(this.organellesEn) || this.organellesEn;
      const o = allOrganelles[key] || this.organellesEn[key];
      if (!displayBox || !o) return;
      displayBox.innerHTML = `
        <span class="badge-role">${o.role}</span>
        <h3 class="stage-title">${o.title}</h3>
        <p class="stage-desc">${o.info}</p>
        <div class="stage-fact glass-panel">
          <span class="fact-icon">🧬</span>
          <span class="fact-text">${o.fact}</span>
        </div>
      `;
    };
    this.showOrganelle = showOrganelle;

    organelleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        organelleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showOrganelle(btn.dataset.organelle);
        window.cosmicAudio?.playClick();
      });
    });

    showOrganelle('nucleus');
  }

  // ================= DOMAIN 4: MATHEMATICS & LOGIC =================
  setupMathCanvas() {
    const canvas = document.getElementById('canvas-fibonacci');
    if (!canvas) return;

    const slider = document.getElementById('fibo-count-slider');
    const valText = document.getElementById('fibo-count-val');

    slider?.addEventListener('input', (e) => {
      this.fibonacciCount = parseInt(e.target.value);
      if (valText) valText.textContent = `${this.fibonacciCount} Seeds`;
      this.drawFibonacci();
    });

    window.addEventListener('resize', () => {
      if (this.currentView === 'math-patterns') this.drawFibonacci();
    });

    this.drawFibonacci();
  }

  drawFibonacci() {
    const canvas = document.getElementById('canvas-fibonacci');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const w = (canvas.width = canvas.parentElement.clientWidth || 500);
    const h = (canvas.height = canvas.parentElement.clientHeight || 400);

    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

    const n = this.fibonacciCount;
    const scale = Math.min(w, h) / (Math.sqrt(n) * 4.8);

    for (let i = 0; i < n; i++) {
      const r = scale * Math.sqrt(i);
      const theta = i * goldenAngle;
      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);

      const hue = (i * 2.4 + 190) % 360;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(2, scale * 0.42), 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
      ctx.shadowColor = `hsl(${hue}, 85%, 50%)`;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  // ================= DOMAIN 5: PSYCHOLOGY & PERCEPTION =================
  setupPsychologyLab() {
    // Cafe wall guide line toggle
    const guideToggle = document.getElementById('toggle-cafe-guides');
    const cafeCanvas = document.getElementById('cafe-wall-visual');

    guideToggle?.addEventListener('change', (e) => {
      cafeCanvas?.classList.toggle('show-guides', e.target.checked);
      window.cosmicAudio?.playClick();
    });

    // Illusions switcher
    const illusionTabs = document.querySelectorAll('.illusion-tab');
    const illusionPanels = document.querySelectorAll('.illusion-panel');

    illusionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        illusionTabs.forEach(t => t.classList.remove('active'));
        illusionPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const id = tab.dataset.illusion;
        document.getElementById(`illusion-${id}`)?.classList.add('active');
        window.cosmicAudio?.playClick();
      });
    });
  }

  // ================= DOMAIN 6: PHILOSOPHY & BIG QUESTIONS =================

  onLanguageChanged(lang) {
    if (this.updateDigestiveUI) this.updateDigestiveUI();
    if (this.renderBreathing) this.renderBreathing();
    if (this.renderDefender && this.currentDefenderKey) this.renderDefender(this.currentDefenderKey);
    if (this.showOrganelle && this.currentOrganelleKey) this.showOrganelle(this.currentOrganelleKey);
    if (this.updateTheseusUI && this.theseusVal !== undefined) this.updateTheseusUI(this.theseusVal);
  }

  setupPhilosophyLab() {
    // Ship of Theseus interactive slider
    const shipSlider = document.getElementById('theseus-slider');
    const shipPercent = document.getElementById('theseus-percent');
    const shipStatus = document.getElementById('theseus-status-text');

    const updateTheseusUI = (val) => {
      this.theseusVal = val;
      if (shipPercent) {
        shipPercent.textContent = window.currentLang === 'bn' ? `${val}% পরিবর্তিত` : `${val}% Replaced`;
      }
      if (shipStatus) {
        shipStatus.innerHTML = window.toruI18n?.getTheseusStatus(val) || "";
      }
    };
    this.updateTheseusUI = updateTheseusUI;

    shipSlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateTheseusUI(val);
    });

    // Dilemma interactive voting buttons
    document.querySelectorAll('.poll-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.dilemma-poll');
        if (!parent) return;

        parent.querySelectorAll('.poll-choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const feedback = parent.querySelector('.poll-response-box');
        if (feedback) {
          feedback.classList.remove('hidden');
        }
        window.cosmicAudio?.playChime(600);
      });
    });
  }
}

// Global portal instance
window.initToruPortal = () => {
  window.toruPortal = new ToruPortal();
};
