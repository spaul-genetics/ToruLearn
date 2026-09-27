/**
 * quiz.js - Cosmic Master Quiz Engine
 * 10 engaging scientific questions with instant feedback, explanations, and ranks.
 */

class CosmicQuiz {
  constructor() {
    this.score = 0;
    this.currentIndex = 0;
    this.selectedOption = null;

    this.questions = [
      {
        category: 'Planetary Rotation',
        question: 'Why does the Sun seem to rise in the east and set in the west every day?',
        options: [
          'Because the Sun circles around Earth once every 24 hours',
          'Because Earth spins toward the east on its axis, rotating us into and out of sunlight',
          'Because Earth speeds up and slows down as it orbits the Sun',
          'Because the Moon pushes the Sun across the sky'
        ],
        correct: 1,
        explanation: 'The Sun stays in place at the center of the solar system! It only looks like it moves across the sky because Earth spins toward the east at roughly 1,000 mph (1,600 km/h) at the equator.'
      },
      {
        category: 'Earth Seasons',
        question: 'What is the real reason Earth experiences four seasons (Spring, Summer, Autumn, Winter)?',
        options: [
          'Earth is closer to the Sun in the summer and farther in the winter',
          'Earth’s distance from the Sun changes dramatically every three months',
          'Earth is tilted 23.5° on its axis, so different hemispheres receive more direct sunlight as Earth orbits the Sun',
          'Giant cloud systems block sunlight from reaching one half of Earth'
        ],
        correct: 2,
        explanation: 'Seasons are caused entirely by Earth\'s 23.5° axial tilt! In fact, Earth is actually closest to the Sun in early January (perihelion), right in the middle of Northern Hemisphere winter!'
      },
      {
        category: 'Earth Seasons',
        question: 'When it is hot summer in the Northern Hemisphere (like in the United States or Europe), what season is it in the Southern Hemisphere (like in Australia)?',
        options: [
          'Summer as well, because Earth heats up all at once',
          'Winter, because the Southern Hemisphere is tilted away from the Sun',
          'Autumn, because it is three months behind',
          'Spring, because the equator divides heat evenly'
        ],
        correct: 1,
        explanation: 'Because Earth\'s axis points toward Polaris, when the Northern Hemisphere tilts toward the Sun, the Southern Hemisphere tilts away—experiencing shallow sunlight and winter!'
      },
      {
        category: 'Moon Phases',
        question: 'How much of the Moon is illuminated by sunlight at any given moment in deep space?',
        options: [
          'It changes every night depending on the Moon\'s mood',
          'Exactly half (50%) of the Moon is always lit by the Sun',
          'Only the side that faces people on Earth',
          '100% during Full Moon, and 0% during New Moon'
        ],
        correct: 1,
        explanation: 'In deep space, exactly 50% of the Moon is ALWAYS illuminated by the Sun (the day side). The phases we see happen only because we view that illuminated half from different angles as the Moon orbits Earth!'
      },
      {
        category: 'Moon Phases',
        question: 'Why do humans on Earth always see the exact same face of the Moon, never seeing the "Far Side" from our backyards?',
        options: [
          'The Moon does not rotate on its axis at all',
          'The Moon is tidally locked: its rotation period matches its orbital period exactly (27.3 days)',
          'Earth’s gravity stops the Moon from turning',
          'The other side of the Moon is completely flat'
        ],
        correct: 1,
        explanation: 'The Moon is tidally locked (synchronous rotation)! Over billions of years, Earth\'s gravitational pull slowed the Moon\'s spin until its rotation time matched its orbital period to perfection.'
      },
      {
        category: 'Solar & Lunar Eclipses',
        question: 'What celestial alignment causes a Total Solar Eclipse?',
        options: [
          'The Earth passes between the Sun and the Moon (Sun - Earth - Moon)',
          'The Moon passes directly between the Sun and Earth (Sun - Moon - Earth)',
          'Jupiter blocks the Sun from reaching Earth',
          'The Moon falls into the Sun’s core'
        ],
        correct: 1,
        explanation: 'During a Solar Eclipse, the Moon passes directly between Earth and the Sun during a New Moon. The Moon casts its narrow dark shadow cone (the umbra) onto Earth\'s surface.'
      },
      {
        category: 'Solar & Lunar Eclipses',
        question: 'Why does the Moon turn a deep "Blood Red" color during a Total Lunar Eclipse instead of disappearing completely?',
        options: [
          'The surface of the Moon is made of red volcanic lava that glows at night',
          'Sunlight bending through Earth’s atmosphere scatters blue light and projects all world sunrises and sunsets onto the Moon',
          'Mars reflects its red color onto the shadowed Moon',
          'The Moon heats up to thousands of degrees inside Earth\'s shadow'
        ],
        correct: 1,
        explanation: 'Rayleigh scattering! As sunlight passes through the ring of Earth\'s atmosphere, blue light is scattered away, while red wavelengths bend into Earth’s shadow. A Blood Moon is illuminated by every sunset and sunrise happening on Earth at that exact moment!'
      },
      {
        category: 'Solar & Lunar Eclipses',
        question: 'Why don’t we get a Solar Eclipse and a Lunar Eclipse every single month?',
        options: [
          'The Moon’s orbit is tilted by 5.1° relative to Earth’s orbit around the Sun, so shadows usually miss',
          'The Moon moves too fast for shadows to catch up',
          'The Sun only produces eclipses when solar flares erupt',
          'Eclipses only occur on leap years'
        ],
        correct: 0,
        explanation: 'Because the Moon’s orbital plane is tilted 5.1° relative to the ecliptic (Earth\'s orbit), the Moon usually passes slightly above or below the Sun. Eclipses only happen when the Moon crosses the orbital plane at points called "nodes".'
      },
      {
        category: 'Solar System Mechanics',
        question: 'Why does innermost planet Mercury orbit the Sun in only 88 days, while distant Neptune takes 165 Earth years?',
        options: [
          'Mercury has giant rocket engines that speed it up',
          'Planets closer to the Sun experience much stronger solar gravity and must travel faster to stay in orbit (Kepler’s 3rd Law)',
          'Neptune is frozen solid and moves through sticky space dust',
          'Mercury is much lighter, so it floats faster'
        ],
        correct: 1,
        explanation: 'Kepler\'s Third Law of Planetary Motion! The closer a planet is to the Sun, the stronger the gravitational pull, requiring a much higher orbital velocity (Mercury speeds at 47 km/s; Neptune cruises at just 5.4 km/s).'
      },
      {
        category: 'The Solar System',
        question: 'Approximately how much of all the mass in the entire solar system is contained inside our Sun alone?',
        options: [
          'About 50% (half the mass)',
          'About 75%',
          'About 90%',
          'About 99.8% — almost everything!'
        ],
        correct: 3,
        explanation: 'Our Sun contains 99.8% of all the mass in the entire Solar System! Jupiter holds most of the remaining 0.2%, leaving all other planets, moons, asteroids, and comets as tiny specks in comparison.'
      }
    ];

    this.setupEvents();
    this.renderQuestion();
  }

  setupEvents() {
    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
      this.currentIndex++;
      if (this.currentIndex < this.questions.length) {
        this.renderQuestion();
      } else {
        this.renderResults();
      }
      window.cosmicAudio?.playClick();
    });

    document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
      this.score = 0;
      this.currentIndex = 0;
      document.getElementById('quiz-results-box')?.classList.add('hidden');
      document.getElementById('quiz-question-box')?.classList.remove('hidden');
      this.renderQuestion();
      window.cosmicAudio?.playClick();
    });
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    this.selectedOption = null;

    // Update scoreboard
    const scoreEl = document.getElementById('quiz-score');
    const progTextEl = document.getElementById('quiz-progress-text');
    const progFillEl = document.getElementById('quiz-progress-fill');
    const categoryEl = document.getElementById('quiz-category');
    const questionEl = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options-container');
    const explanationBox = document.getElementById('quiz-explanation-box');

    if (scoreEl) scoreEl.textContent = this.score;
    if (progTextEl) progTextEl.textContent = `${this.currentIndex + 1} / ${this.questions.length}`;
    if (progFillEl) progFillEl.style.width = `${((this.currentIndex + 1) / this.questions.length) * 100}%`;
    if (categoryEl) categoryEl.textContent = `Category: ${q.category}`;
    if (questionEl) questionEl.textContent = q.question;

    if (explanationBox) explanationBox.classList.add('hidden');

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="quiz-option-letter">${letters[idx]}</span>
          <span class="quiz-option-text">${optText}</span>
        `;
        btn.addEventListener('click', () => this.handleAnswer(idx, btn));
        optionsContainer.appendChild(btn);
      });
    }
  }

  handleAnswer(selectedIdx, clickedBtn) {
    if (this.selectedOption !== null) return; // already answered
    this.selectedOption = selectedIdx;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === q.correct;
    const optionButtons = document.querySelectorAll('.quiz-option-btn');

    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      this.score++;
      const scoreEl = document.getElementById('quiz-score');
      if (scoreEl) scoreEl.textContent = this.score;
      window.cosmicAudio?.playSuccess();
    } else {
      window.cosmicAudio?.playChime(300);
    }

    // Show Explanation
    const explanationBox = document.getElementById('quiz-explanation-box');
    const expTitle = document.getElementById('explanation-title');
    const expText = document.getElementById('explanation-text');

    if (explanationBox && expTitle && expText) {
      expTitle.textContent = isCorrect ? '🌟 Brilliant! Scientific Fact:' : '🔍 Learning Moment:';
      expTitle.style.color = isCorrect ? 'var(--accent-emerald)' : 'var(--accent-gold)';
      expText.textContent = q.explanation;
      explanationBox.classList.remove('hidden');
    }
  }

  renderResults() {
    const questionBox = document.getElementById('quiz-question-box');
    const resultsBox = document.getElementById('quiz-results-box');
    const badgeIcon = document.getElementById('results-badge-icon');
    const titleEl = document.getElementById('results-title');
    const summaryEl = document.getElementById('results-score-summary');
    const rankAward = document.getElementById('results-rank-award');
    const msgEl = document.getElementById('results-message');

    if (questionBox) questionBox.classList.add('hidden');
    if (resultsBox) resultsBox.classList.remove('hidden');

    if (summaryEl) summaryEl.textContent = `You scored ${this.score} out of ${this.questions.length}!`;

    window.cosmicAudio?.playSuccess();

    if (this.score === 10) {
      if (badgeIcon) badgeIcon.textContent = '👑';
      if (titleEl) titleEl.textContent = 'Grand Cosmic Master!';
      if (rankAward) rankAward.innerHTML = 'Rank: <strong>Grand Astrophysicist Genius</strong> 🌟';
      if (msgEl) msgEl.textContent = 'Incredible mastery! You understand planetary orbits, axial tilts, lunar waltzes, and eclipse alignments like a seasoned astronomer at NASA!';
    } else if (this.score >= 8) {
      if (badgeIcon) badgeIcon.textContent = '🚀';
      if (titleEl) titleEl.textContent = 'Cosmic Mission Commander!';
      if (rankAward) rankAward.innerHTML = 'Rank: <strong>Senior Planetary Scientist</strong> 🛸';
      if (msgEl) msgEl.textContent = 'Outstanding job! You have a brilliant scientific intuition and an eagle eye for celestial mechanics.';
    } else if (this.score >= 6) {
      if (badgeIcon) badgeIcon.textContent = '🛰️';
      if (titleEl) titleEl.textContent = 'Orbital Navigator!';
      if (rankAward) rankAward.innerHTML = 'Rank: <strong>Flight Scientist</strong> 🔭';
      if (msgEl) msgEl.textContent = 'Great effort! You clearly grasp how day, night, seasons, and eclipses work. Give it another spin to score a perfect 10!';
    } else {
      if (badgeIcon) badgeIcon.textContent = '🔭';
      if (titleEl) titleEl.textContent = 'Junior Stargazer!';
      if (rankAward) rankAward.innerHTML = 'Rank: <strong>Apprentice Astronomer</strong> ✨';
      if (msgEl) msgEl.textContent = 'Science is an endless voyage of discovery. Explore the simulation tabs again, then try the quiz to level up your score!';
    }
  }
}

// Global initializer
window.initCosmicQuiz = () => {
  window.cosmicQuiz = new CosmicQuiz();
};
