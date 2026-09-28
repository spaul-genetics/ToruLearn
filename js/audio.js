/**
 * audio.js - Web Audio API Procedural Sound Synthesizer
 * Generates space soundscapes and interactive UI effects without external assets.
 */

class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // start muted by default (browser policy requires user gesture)
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.initialized = false;

    // Kid-Friendly Speech Synthesis Engine
    this.voices = [];
    this.selectedVoice = null;
    this.isNarrating = false;
    this.currentPersona = 'sunny'; // 'sunny' (Playful Kid), 'nova' (Cosmic Explorer), 'paws' (Warm Teacher)
    this.personas = {
      sunny: {
        id: 'sunny',
        name: 'Sunny 🌟',
        label: 'Playful Kid Guide',
        pitch: 1.25,
        rate: 0.95,
        greeting: "Hi space explorer! I'm Sunny! Let's discover amazing things together!"
      },
      nova: {
        id: 'nova',
        name: 'Nova 🚀',
        label: 'Cosmic Explorer',
        pitch: 1.10,
        rate: 0.96,
        greeting: "Greetings explorer! I'm Nova, your stellar science guide!"
      },
      paws: {
        id: 'paws',
        name: 'Prof. Paws 🦉',
        label: 'Wise Storyteller',
        pitch: 0.98,
        rate: 0.88,
        greeting: "Hello young scholar! I'm Professor Paws! Ready for a wonderful discovery?"
      }
    };

    this.initVoiceEngine();
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime(520);
    }
    return !this.isMuted;
  }

  startAmbient() {
    if (!this.ctx || this.isMuted) return;
    if (this.ambientOsc1) return; // already running

    const now = this.ctx.currentTime;
    
    // Low deep cosmic drone
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientFilter = this.ctx.createBiquadFilter();
    this.ambientGain = this.ctx.createGain();

    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(55, now); // A1 note

    this.ambientOsc2.type = 'triangle';
    this.ambientOsc2.frequency.setValueAtTime(82.4, now); // E2 note

    this.ambientFilter.type = 'lowpass';
    this.ambientFilter.frequency.setValueAtTime(180, now);

    this.ambientGain.gain.setValueAtTime(0.001, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 3);

    this.ambientOsc1.connect(this.ambientFilter);
    this.ambientOsc2.connect(this.ambientFilter);
    this.ambientFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start(now);
    this.ambientOsc2.start(now);
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        try {
          if (this.ambientOsc1) {
            this.ambientOsc1.stop();
            this.ambientOsc1.disconnect();
            this.ambientOsc1 = null;
          }
          if (this.ambientOsc2) {
            this.ambientOsc2.stop();
            this.ambientOsc2.disconnect();
            this.ambientOsc2 = null;
          }
        } catch (e) {}
      }, 1000);
    }
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playChime(freq = 440) {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.35);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playPlanetSelect() {
    this.playChime(587.33); // D5 chime
  }

  playTink() {
    this.playChime(783.99); // G5 chime
  }

  // ================= KID-FRIENDLY VOICE SYNTHESIS ENGINE =================
  initVoiceEngine() {
    if (!('speechSynthesis' in window)) return;

    const cacheVoices = () => {
      try {
        const available = window.speechSynthesis.getVoices() || [];
        if (available.length > 0) {
          this.voices = available;
          this.pickBestVoice();
        }
      } catch (e) {
        console.warn('Could not retrieve speech voices:', e);
      }
    };

    cacheVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = cacheVoices;
    }
  }

  pickBestVoice() {
    if (!this.voices || this.voices.length === 0) {
      if ('speechSynthesis' in window) {
        this.voices = window.speechSynthesis.getVoices() || [];
      }
    }
    if (!this.voices || this.voices.length === 0) return null;

    // If current language is Bengali, prioritize natural Bengali voices
    if (window.currentLang === 'bn') {
      const bnVoice = this.voices.find(v => 
        (v.lang && (v.lang.startsWith('bn') || v.lang.includes('bn-BD') || v.lang.includes('bn-IN'))) ||
        /bangla|bengali/i.test(v.name)
      );
      if (bnVoice) {
        this.selectedVoice = bnVoice;
        return bnVoice;
      }
    }

    const enVoices = this.voices.filter(v => v.lang && v.lang.startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : this.voices;

    // 1. Natural Child or Youthful Voices (e.g. Microsoft Ana is specifically a young girl voice)
    const childMatch = pool.find(v =>
      /\b(ana|child|kid|junior|young|maisie)\b/i.test(v.name) &&
      !/compact|espeak|robot/i.test(v.name)
    );
    if (childMatch) {
      this.selectedVoice = childMatch;
      return childMatch;
    }

    // 2. High-fidelity Natural / Neural Female voices that sound warm & maternal/teacher-like
    const warmMatch = pool.find(v =>
      /(jenny|aria|zoe|ava|samantha.*enhanced|samantha|allison|sonia|victoria|karen|fiona|tessa)/i.test(v.name) &&
      !/compact|espeak|robot|bad/i.test(v.name)
    );
    if (warmMatch) {
      this.selectedVoice = warmMatch;
      return warmMatch;
    }

    // 3. Any Natural / Neural / Premium online voices
    const naturalMatch = pool.find(v =>
      /(natural|neural|premium|enhanced|online)/i.test(v.name) &&
      !/compact|espeak|robot/i.test(v.name)
    );
    if (naturalMatch) {
      this.selectedVoice = naturalMatch;
      return naturalMatch;
    }

    // 4. Google US English or UK Female
    const googleMatch = pool.find(v =>
      /google us english|google uk english female/i.test(v.name)
    );
    if (googleMatch) {
      this.selectedVoice = googleMatch;
      return googleMatch;
    }

    // 5. Friendly non-robotic fallback (explicitly avoiding robotic synths)
    const cleanFallback = pool.find(v =>
      !/compact|espeak|croak|klatt|whisper|cellos|bad|bells|boing|bubbles/i.test(v.name)
    );
    this.selectedVoice = cleanFallback || pool[0];
    return this.selectedVoice;
  }

  cyclePersona() {
    const keys = ['sunny', 'nova', 'paws'];
    const currentIdx = keys.indexOf(this.currentPersona);
    const nextIdx = (currentIdx + 1) % keys.length;
    this.currentPersona = keys[nextIdx];
    const newPersona = this.personas[this.currentPersona];
    
    // Play cheerful chime and preview greeting
    this.playTink();
    this.speakText(newPersona.greeting);
    return newPersona;
  }

  setPersona(personaKey) {
    if (this.personas[personaKey]) {
      this.currentPersona = personaKey;
      return this.personas[personaKey];
    }
  }

  getPersona() {
    return this.personas[this.currentPersona] || this.personas.sunny;
  }

  prepareKidFriendlyText(text) {
    if (!text) return '';

    let clean = text
      .replace(/<[^>]*>/g, ' ') // Strip HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, ' and ')
      .replace(/\s+/g, ' ')
      .trim();

    // Natural child-friendly pronunciations for scientific symbols, units, and jargon
    clean = clean
      .replace(/\b300,000\s*km\s*per\s*second\b/gi, 'three hundred thousand kilometers every single second')
      .replace(/\b(\d+[\d,.]*)\s*km\/s\b/gi, '$1 kilometers per second')
      .replace(/\b(\d+[\d,.]*)\s*km\/h\b/gi, '$1 kilometers per hour')
      .replace(/\b(\d+[\d,.]*)\s*mph\b/gi, '$1 miles per hour')
      .replace(/\b(\d+[\d,.]*)\s*km\b/gi, '$1 kilometers')
      .replace(/\b(\d+[\d,.]*)\s*AU\b/gi, '$1 astronomical units')
      .replace(/\b-(\d+)\s*°C\b/gi, 'minus $1 degrees Celsius')
      .replace(/\b\+(\d+)\s*°C\b/gi, 'plus $1 degrees Celsius')
      .replace(/\b(\d+)\s*°C\b/gi, '$1 degrees Celsius')
      .replace(/\b(\d+[\d,.]*)\s*m\/s²\b/gi, '$1 meters per second squared')
      .replace(/\b(\d+[\d,.]*)\s*lbs\b/gi, '$1 pounds')
      .replace(/\b(\d+[\d,.]*)\s*x Earth\b/gi, '$1 times the size of Earth')
      .replace(/\b3D\b/gi, 'three-D')
      .replace(/\bapprox\./gi, 'approximately')
      .replace(/\be\.g\.,?\b/gi, 'for example,')
      .replace(/\bi\.e\.,?\b/gi, 'that is,')
      .replace(/\bvs\.?\b/gi, 'versus')
      .replace(/\bSol\b/g, 'Sole')
      .replace(/•/g, ', ')
      .replace(/[\(\)]/g, ', ')
      .replace(/"/g, '')
      .replace(/\s*:\s*/g, ': ');

    // Add lively greeting pauses to educational headers
    clean = clean
      .replace(/^Cosmic Fact:\s*/i, 'Fun cosmic fact! ')
      .replace(/^Did You Know\?\s*/i, 'Did you know? ')
      .replace(/^Speed of Sunlight:\s*/i, 'Fun fact about sunlight! ');

    // Smooth out consecutive commas or spaces
    clean = clean.replace(/,\s*,/g, ',').replace(/\s+/g, ' ').trim();

    return clean;
  }

  playSpeechChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      // Cheerful sparkling 2-tone melodic chime: G5 (784Hz) -> C6 (1046.5Hz)
      [783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.09, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.28);
      });
    } catch (e) {}
  }

  speakText(text, onStart, onEnd, onError) {
    if (!('speechSynthesis' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      if (onError) onError('Speech synthesis not supported');
      return;
    }

    // Cancel any active utterance
    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') {
      if (onEnd) onEnd();
      return;
    }

    // Play sparkling chime to grab child's attention
    this.playSpeechChime();

    // Prepare natural kid-friendly phonetics and phrasing
    const cleanText = this.prepareKidFriendlyText(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Apply voice persona settings (elevated pitch and friendly pacing)
    const persona = this.getPersona();
    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate;
    utterance.volume = 1.0;

    // Assign top natural/child voice
    const voice = this.pickBestVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = window.currentLang === 'bn' ? 'bn-BD' : 'en-US';

    utterance.onstart = () => {
      this.isNarrating = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isNarrating = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isNarrating = false;
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('Speech synthesis error:', e);
      }
      if (onEnd) onEnd();
    };

    // Small delay so sparkling chime rings cleanly before voice speaks
    setTimeout(() => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error on speak:', err);
      }
    }, 160);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isNarrating = false;
    }
  }

  isSpeaking() {
    return 'speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending);
  }
}

// Global sound manager instance
window.cosmicAudio = new CosmicAudio();
