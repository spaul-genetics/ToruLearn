/**
 * i18n.js - ToruLearn Bilingual Localization Engine (English & Bengali / বাংলা)
 * Seamlessly manages translation, typography, localized science facts,
 * and Bengali speech synthesis.
 */

(function () {
  const STORAGE_KEY = 'toru_lang';

  const translations = {
    en: {
      // Header & Navigation
      'brand.title': 'ToruLearn',
      'brand.tagline': 'Curious Minds • Science, Mind & Philosophy',
      'lang.toggle': 'বাংলা',
      'lang.tooltip': 'Switch language to Bengali (বাংলা)',
      'nav.home': 'Home',
      'nav.cosmic': 'Cosmic Explorer',
      'nav.body': 'Body Systems',
      'nav.immunology': 'Immunology',
      'nav.cell': 'Cell Biology',
      'nav.math': 'Math & Logic',
      'nav.psychology': 'Mind & Brain',
      'nav.philosophy': 'Big Questions',

      // Home View
      'home.hero.badge': '✨ ToruLearn • Wonder. Think. Discover.',
      'home.hero.title': 'Where Curious Kids Explore Big Questions',
      'home.hero.subtitle': 'From the cosmic dance of distant planets to how your stomach turns apples into energy, how white blood cells defend your body, and the greatest philosophical mysteries of existence.',
      'home.hero.btn.cosmic': 'Launch Cosmic Explorer',
      'home.hero.btn.body': 'The Human Machine',
      'home.hero.btn.immune': 'The Immune Army',

      // Filter Bar
      'filter.all': 'All Topics (7)',
      'filter.astronomy': '🌌 Space & Astronomy',
      'filter.body': '🫀 Human Body Systems',
      'filter.immunology': '🛡️ Immunology',
      'filter.cell': '🧬 Cell Biology',
      'filter.math': '📐 Math & Logic',
      'filter.psychology': '🧠 Mind & Brain',
      'filter.philosophy': '💭 Big Questions',

      // Home Cards
      'card.cosmic.cat': 'Astronomy & Astrophysics',
      'card.cosmic.title': 'Cosmic Explorer',
      'card.cosmic.tagline': 'Planets, Day & Night, and The Seasons',
      'card.cosmic.q': '“Why is it night in Dhaka when it\'s bright daytime in New York? What makes Saturn\'s icy rings?”',
      'card.cosmic.btn': 'Launch Cosmic Explorer ➔',

      'card.body.cat': 'Human Anatomy & Physiology',
      'card.body.title': 'The Human Machine',
      'card.body.tagline': 'Body & Living Systems in Action',
      'card.body.q': '“How do your 206 bones support your body? Where does food go after you chew it? How do your lungs breathe?”',
      'card.body.btn': 'Explore 3D Skeleton & Systems ➔',

      'card.immune.cat': 'Immunology & Health',
      'card.immune.title': 'The Immune Army',
      'card.immune.tagline': 'Microscopic Defenders Fighting For You',
      'card.immune.q': '“What happens when you get a scrape? Who are the microscopic soldiers protecting your cells 24/7?”',
      'card.immune.btn': 'Meet the Defenders ➔',

      'card.cell.cat': 'Cell Biology & Genetics',
      'card.cell.title': 'The Secret Life of Cells',
      'card.cell.tagline': 'Inside the Nanoscopic Living City',
      'card.cell.q': '“If every human is made of 37 trillion cells, what does a single cell look like inside?”',
      'card.cell.btn': 'Enter the Cell City ➔',

      'card.math.cat': 'Mathematics & Patterns',
      'card.math.title': 'Math Secrets',
      'card.math.tagline': 'Hidden Codes of Nature & Cosmos',
      'card.math.q': '“Why do sunflowers pack seeds in Fibonacci spirals? Can numbers describe the shapes of nature?”',
      'card.math.btn': 'Discover Math Patterns ➔',

      'card.psych.cat': 'Cognitive Science & Psychology',
      'card.psych.title': 'Mind & Brain Tricks',
      'card.psych.tagline': 'Perception, Memory & Optical Illusions',
      'card.psych.q': '“Can your eyes play tricks on your brain? Why does your brain sometimes see movement where none exists?”',
      'card.psych.btn': 'Test Your Perception ➔',

      'card.phil.cat': 'Philosophy & Ethics for Kids',
      'card.phil.title': 'Big Philosophical Questions',
      'card.phil.tagline': 'Thought Experiments & Wonder',
      'card.phil.q': '“If you replace every wooden plank in a ship, is it still the same ship? What makes you, you?”',
      'card.phil.btn': 'Ponder Big Questions ➔',

      'nav.back_home': '← Back to ToruLearn Home',

      // Cosmic Explorer Tabs
      'cosmic.tab.solar': 'Solar System',
      'cosmic.tab.daynight': 'Day & Night',
      'cosmic.tab.seasons': 'The Seasons',
      'cosmic.tab.moon': 'Moon Phases',
      'cosmic.tab.eclipses': 'Eclipses Lab',
      'cosmic.tab.quiz': 'Cosmic Quiz',

      // Solar System Controls & Labels
      'ss.quick.sun': 'Sun',
      'ss.quick.mercury': 'Mercury',
      'ss.quick.venus': 'Venus',
      'ss.quick.earth': 'Earth',
      'ss.quick.mars': 'Mars',
      'ss.quick.jupiter': 'Jupiter',
      'ss.quick.saturn': 'Saturn',
      'ss.quick.uranus': 'Uranus',
      'ss.quick.neptune': 'Neptune',
      'ss.quick.pluto': 'Pluto',

      'ss.ctrl.play': 'Play',
      'ss.ctrl.pause': 'Pause',
      'ss.ctrl.reset': 'Reset View',
      'ss.ctrl.speed': 'Orbit Speed:',
      'ss.ctrl.labels': 'Show Orbit Labels',
      'ss.ctrl.truescale': 'True Planet Scale',

      'ss.stat.diameter': 'Diameter',
      'ss.stat.distance': 'Distance from Sun',
      'ss.stat.year': 'Length of Year',
      'ss.stat.day': 'Length of Day',
      'ss.stat.temp': 'Surface Temp',
      'ss.stat.moons': 'Moons',
      'ss.stat.notable_moons': 'Notable Moons',
      'ss.stat.no_moons': '🌙 No natural satellites or moons',
      'ss.stat.gravity': 'Surface Gravity',

      'ss.speak.read': 'Read Aloud',
      'ss.speak.stop': 'Stop',
      'ss.voice.label': 'Voice',

      // 3D Skeleton Module
      'skel.back': 'Back to ToruLearn Home',
      'skel.title': '🫀 The Human Machine: Living Systems',
      'skel.subtitle': 'Explore How Organs, Blood & Oxygen Power You Every Second',
      'skel.tab.skeleton': 'The Skeleton (3D Framework)',
      'skel.tab.digestive': 'The Digestive Journey',
      'skel.tab.breathing': 'The Breathing Engine (Lungs)',
      'skel.tab.heart': 'The Living Pump (Heart & Blood)',

      'skel.ctrl.reset': 'Full Skeleton View',
      'skel.ctrl.head': 'Skull & Neck',
      'skel.ctrl.chest': 'Chest & Spine',
      'skel.tag.active': '✨ Medical 3D Mesh Active',
      'skel.primary_function': 'Primary Function:',
      'skel.kid_facts': 'Fascinating Kid Science Facts:',
      'skel.adult_bones': '206 Total Adult Bones',
      'skel.instructions': '🔍 Click ANY bone in 3D to inspect • Drag 360° • Pinch to zoom',

      // Skeleton Quick Ribbon
      'bone.skull': 'Skull (Cranium)',
      'bone.ribcage': 'Ribcage',
      'bone.spine': 'Spine (Vertebrae)',
      'bone.pelvis': 'Pelvis (Hips)',
      'bone.femur': 'Femur (Thigh)',
      'bone.humerus': 'Humerus (Arm)',
      'bone.clavicle': 'Clavicle (Collarbone)',
      'bone.scapula': 'Scapula (Shoulder)',
      'bone.patella': 'Patella (Kneecap)',
      'bone.hands': 'Hands & Feet',
      // Home Manifesto Strip
      'manifesto.why.title': 'Never Stop Asking "Why?"',
      'manifesto.why.desc': 'Every breakthrough in science and philosophy began with a child asking an innocent, brilliant question.',
      'manifesto.discovery.title': 'Hands-On Discovery',
      'manifesto.discovery.desc': 'Instead of memorizing definitions, we build interactive simulations where you manipulate the variables directly.',
      'manifesto.connected.title': 'Everything Is Connected',
      'manifesto.connected.desc': 'The atoms in your body were forged inside exploding ancient stars, and your thoughts are electrical patterns governed by physics.',

      // Skeletal Trivia Strip
      'skel.trivia.title': 'The Marvel of Your 206 Bones',
      'skel.trivia.1.title': 'From 270 Down to 206:',
      'skel.trivia.1.desc': 'You were born with about 270 soft cartilage bones! As you grew during childhood, many bones fused together (like your skull plates and sacrum) until you reach exactly 206 adult bones.',
      'skel.trivia.2.title': 'Living, Self-Healing Steel:',
      'skel.trivia.2.desc': 'Bones are NOT dry sticks—they are active living organs with blood vessels and nerves! Osteoclasts break down old bone and osteoblasts rebuild fresh bone every day, completely replacing your skeleton every 10 years.',
      'skel.trivia.3.title': 'The Blood Cell Factory:',
      'skel.trivia.3.desc': 'Inside the spongy marrow cavity of your long bones (femur, pelvis, sternum), stem cells generate over 2 million brand-new red blood cells every second!',

      // Digestive System static cards
      'digest.btn.prev': '◀ Previous Station',
      'digest.btn.next': 'Next Station ▶',
      'digest.apple.title': '🍎 Follow an Apple\'s Journey',
      'digest.apple.desc': 'Every bite of food travels through a 30-foot continuous digestive tube. Your body takes around 24 to 72 hours to completely extract every drop of water, protein building block, and sugar fuel from your meals!',
      'digest.villus.title': 'The Villus Superpower:',
      'digest.villus.desc': 'Inside the small intestine, millions of microscopic finger-like villi increase your absorption surface area to over 250 square meters—equal to the size of a tennis court!',
      'digest.microbiome.title': 'Gut Microbiome Friends:',
      'digest.microbiome.desc': 'Over 100 trillion friendly bacteria live in your gut. They help you digest fibrous foods, produce vitamin K, and even release chemicals that talk to your brain to influence your mood!',

      // Respiratory Simulator static cards
      'resp.badge': 'Interactive Breathing Simulator',
      'resp.btn.toggle': '🌬️ Toggle Inhale / Exhale',
      'resp.alveoli.title': '🫁 300 Million Tiny Air Sacks (Alveoli)',
      'resp.alveoli.desc': 'Air enters your nose, travels down your windpipe (trachea), splits into left and right bronchi, and branches into hundreds of thousands of tiny bronchioles like an upside-down tree!',
      'resp.gas.title': 'The Gas Exchange Magic:',
      'resp.gas.desc': 'At the tips of bronchioles are grape-like bunches called alveoli. Oxygen molecules slip directly through walls only one cell thick into red blood cells, while waste carbon dioxide (CO₂) slips back out to be exhaled.',
      'resp.yawn.title': 'Why Do You Yawn or Hiccup?',
      'resp.yawn.desc': 'A hiccup is a sudden, involuntary spasm of your diaphragm muscle! When it jerks, your vocal cords snap shut with a "hic" sound.',

      // Circulatory Engine static cards
      'circ.badge': 'Interactive Heart Rate Engine',
      'circ.slider.label': 'Slide to adjust heart rate: resting, sprinting, or sleeping!',
      'circ.vessels.title': '❤️ 60,000 Miles of Blood Vessels',
      'circ.vessels.desc': 'If laid out in a straight line, all the blood vessels in one human body could circle the entire Earth more than twice!',
      'circ.double.title': 'The Double Loop Pump:',
      'circ.double.desc': 'The right side of your heart pumps oxygen-poor blood to the lungs to pick up fresh O₂. The left side pumps high-pressure oxygenated blood through the aorta to your brain and toes!',
      'circ.veins.title': 'Why Do Veins Look Blue?',
      'circ.veins.desc': 'Your blood is ALWAYS red! Veins look blue or greenish under your skin because of an optical illusion: red light penetrates deep into tissue, while shorter blue wavelengths scatter back to your eyes from shallow veins.',

      // Immunology
      'immune.title': '🛡️ The Immune Army: Microscopic Defenders',
      'immune.subtitle': 'Meet the Cellular Warriors Protecting Your Body 24 Hours a Day',
      'immune.btn.macrophage': '🛡️ Macrophage',
      'immune.btn.neutrophil': '⚡ Neutrophil',
      'immune.btn.dendritic': '📡 Dendritic Cell',
      'immune.btn.tcell': '🎯 Helper & Killer T-Cells',
      'immune.btn.bcell': '🏷️ B-Cell & Antibodies',

      // Cell Biology
      'cell.title': '🧬 The Secret Life of Cells',
      'cell.subtitle': 'Explore the Nanoscopic City Inside Every Living Organism',
      'cell.btn.nucleus': '🏛️ Nucleus & DNA',
      'cell.btn.mitochondria': '⚡ Mitochondria',
      'cell.btn.ribosome': '🏭 Ribosomes',
      'cell.btn.membrane': '🛡️ Cell Membrane',
      'cell.scale.title': '🔬 How Small Is "Small"? A Journey Through Scale',
      'cell.scale.hair': 'Human Hair Width',
      'cell.scale.cell': 'Skin / Liver Cell',
      'cell.scale.bacteria': 'Bacterium (E. coli)',
      'cell.scale.virus': 'Flu / COVID Virus',
      'cell.scale.dna': 'DNA Double Helix',

      // Mathematics & Logic
      'math.title': '📐 Math Secrets: Nature\'s Hidden Code',
      'math.subtitle': 'Interactive Fibonacci Spirals, Golden Ratios & Sacred Geometry',
      'math.fibo.title': 'The Golden Spiral: 137.5° Angle of Life',
      'math.fibo.desc': 'Why do sunflower seeds and pinecones arrange in spirals? If plant seeds grow at any random angle, they bunch together and waste space. But at exactly the Golden Angle (~137.5°), seeds pack together in maximum mathematical efficiency!',
      'math.fibo.slider': 'Pack Seed Count:',
      'math.pinecone.title': '🌲 Pinecone Spirals',
      'math.pinecone.desc': 'Count the spirals turning left and right on a pinecone—you will almost always get consecutive Fibonacci numbers like 8 and 13!',
      'math.cicada.title': '🦗 Prime Number Cicadas',
      'math.cicada.desc': 'Periodical cicadas stay underground for exactly 13 or 17 years (both prime numbers!) so that predators cannot sync their life cycles with them!',

      // Mind & Psychology
      'psych.title': '🧠 Mind, Brain & Perception: The Illusion Lab',
      'psych.subtitle': 'See How Your Visual Cortex Reconstructs Light Signals Into Reality',
      'psych.tab.cafe': '🧱 The Cafe Wall',
      'psych.tab.hermann': '🏁 The Hermann Grid',
      'psych.tab.growth': '🌱 Growth Mindset',
      'psych.cafe.q': 'Are the horizontal mortar lines straight and parallel?',
      'psych.cafe.desc': 'Your eyes will tell you the lines are crooked, slanted, or wedge-shaped. Toggle the guide lines below!',
      'psych.cafe.toggle': 'Show Straight Parallel Guides',
      'psych.hermann.title': 'The Ghostly Dots',
      'psych.hermann.desc': 'Look around this grid. Do you see faint gray dots flickering at the white intersections? Try looking directly at one!',
      'psych.hermann.expl': 'Why? It is caused by lateral inhibition in your retina! Cells processing the bright intersections receive inhibition from four sides, making your brain perceive them as slightly darker.',
      'psych.growth.title': '🌱 The Brain Is a Muscle: Neuroplasticity',
      'psych.growth.desc': 'Whenever you struggle with a hard math problem, a tricky game, or a musical instrument, you are not failing—your neurons are physically sprouting new dendrites and wrapping axons in myelin insulation!',
      'psych.growth.fixed.title': 'Fixed Mindset Trap:',
      'psych.growth.fixed.desc': '“I made a mistake, so I am not good at this.”',
      'psych.growth.grow.title': 'Growth Mindset Superpower:',
      'psych.growth.grow.desc': '“I made a mistake, which means my brain just learned something new that it didn\'t know 5 minutes ago!”',

      // Philosophy & Big Questions
      'phil.title': '💭 Big Questions: Philosophy for Young Thinkers',
      'phil.subtitle': 'Thought Experiments, Dilemmas & The Art of Wonder',
      'phil.theseus.badge': 'Thought Experiment #1: Personal Identity',
      'phil.theseus.title': 'The Ship of Theseus ⛵',
      'phil.theseus.intro': 'Imagine a brave hero named Theseus sails home on a famous wooden ship. Over 30 years of sailing, each wooden plank rots one by one and is replaced with a new plank of timber.',
      'phil.theseus.slider': 'Replace Planks on the Ship:',
      'phil.dilemma.title': 'Thought Experiment #2: The Invisibility Ring 💍',
      'phil.dilemma.q': 'If you found a magical ring that made you completely invisible, would you still follow the rules and be kind when nobody could ever catch you?',
      'phil.dilemma.opt1': 'Yes! Doing good is about who you are inside, not about getting caught.',
      'phil.dilemma.opt2': 'I might be tempted to pull harmless pranks or eat extra cookies!',
      'phil.dilemma.opt3': 'It makes me wonder why laws exist in the first place.',

      // Day & Night section
      'dn.badge': 'Planetary Geodesy & Rotation',
      'dn.title': 'Earth\'s True Shape & Day/Night',
      'dn.shape.title': 'Earth is NOT a Perfect Sphere!',
      'dn.shape.p1': 'From faraway space pictures, Earth looks like a perfectly round marble. But in reality, Earth is an Oblate Spheroid (a Geoid)!',
      'dn.shape.p2': 'Because Earth spins rapidly on its axis once every 24 hours, centrifugal force flings rocks, magma, and oceans outward, creating an equatorial bulge while flattening the poles!',
      'dn.stat.eq_diam': 'Equatorial Diameter',
      'dn.stat.pol_diam': 'Polar Diameter',
      'dn.stat.bulge': 'Equatorial Bulge',
      'dn.stat.class': 'True Classification',
      'dn.carousel.title': 'The 24-Hour Cosmic Carousel',
      'dn.carousel.desc': 'As our oblate Earth rotates on its 23.44° tilted axis, the stationary Sun can only illuminate one half at any instant:',
      'dn.carousel.day': 'Day Side: Facing the Sun, bathed in light and thermal energy.',
      'dn.carousel.night': 'Night Side: Facing into space, sparkling with city night lights!',
      'dn.carousel.term': 'The Terminator Line: The glowing sunset/sunrise band separating day from night.',
      'dn.chimborazo.title': 'Mind-Blowing Geography Secret:',
      'dn.chimborazo.desc': 'Because of Earth\'s equatorial bulge, the summit of Mount Chimborazo in Ecuador is actually the farthest point on the planet\'s surface from Earth\'s center—over 2 kilometers farther into space than Mount Everest!',

      // Seasons section
      'sea.badge': 'Axial Tilt & Orbital Mechanics',
      'sea.title': 'The 23.5° Secret of Seasons',
      'sea.desc': 'Earth does NOT have seasons because it gets closer or farther from the Sun. Earth\'s seasons happen entirely because our planet is tilted 23.44° on its rotational axis!',
      'sea.north': 'Northern Hemisphere',
      'sea.south': 'Southern Hemisphere',
      'sea.june.title': '☀️ June: Summer Solstice',
      'sea.june.desc': 'Tilted toward the Sun. Sun climbs high; direct rays deliver maximum heat energy and long daylight hours.',
      'sea.dec.title': '❄️ December: Winter Solstice',
      'sea.dec.desc': 'Tilted away from Sun. Sunlight arrives at a shallow angle and daylight hours are short.',
      'sea.flashlight.title': 'Flashlight Angle Experiment:',
      'sea.flashlight.desc': 'Shine a flashlight straight down at paper: the circle is small, bright, and intense (Summer). Tilt the flashlight: the beam spreads wide and dim (Winter).'

    },

    bn: {
      // Header & Navigation
      'brand.title': 'তরু লার্ন',
      'brand.tagline': 'কৌতূহলী মন • বিজ্ঞান, মনস্তত্ত্ব ও দর্শন',
      'lang.toggle': 'English',
      'lang.tooltip': 'Switch language to English',
      'nav.home': 'হোম',
      'nav.cosmic': 'মহাকাশ অনুসন্ধান',
      'nav.body': 'মানবদেহ ও কঙ্কাল',
      'nav.immunology': 'রোগ প্রতিরোধ',
      'nav.cell': 'কোষ বিজ্ঞান',
      'nav.math': 'গণিত ও যুক্তি',
      'nav.psychology': 'মন ও মস্তিষ্ক',
      'nav.philosophy': 'দর্শনের প্রশ্ন',

      // Home View
      'home.hero.badge': '✨ তরু লার্ন • চিন্তা করো, আবিষ্কার করো',
      'home.hero.title': 'যেখানে কৌতূহলী শিশুরা মহাবিশ্বের বড় প্রশ্ন খোঁজে',
      'home.hero.subtitle': 'গ্রহদের মহাজাগতিক নৃত্য থেকে শুরু করে পাকস্থলীর খাবার হজম, শ্বেত রক্তকণিকার রোগ প্রতিরোধ, এবং অস্তিত্বের গভীরতম দার্শনিক রহস্য অনুসন্ধান করো।',
      'home.hero.btn.cosmic': 'মহাকাশ ভ্রমণ শুরু করো',
      'home.hero.btn.body': 'মানবদেহ যন্ত্র',
      'home.hero.btn.immune': 'প্রতিরোধক সেনা',

      // Filter Bar
      'filter.all': 'সব বিষয় (৭)',
      'filter.astronomy': '🌌 মহাকাশ ও জ্যোতির্বিজ্ঞান',
      'filter.body': '🫀 মানবদেহ ব্যবস্থা',
      'filter.immunology': '🛡️ রোগ প্রতিরোধ বিজ্ঞান',
      'filter.cell': '🧬 কোষ ও জেনেটিক্স',
      'filter.math': '📐 গণিত ও রহস্য',
      'filter.psychology': '🧠 মন ও মস্তিষ্ক',
      'filter.philosophy': '💭 বড় প্রশ্ন ও দর্শন',

      // Home Cards
      'card.cosmic.cat': 'জ্যোতির্বিজ্ঞান ও মহাকাশ',
      'card.cosmic.title': 'মহাকাশ অনুসন্ধান',
      'card.cosmic.tagline': 'সৌরজগতের গ্রহ, দিন-রাত এবং ঋতু পরিবর্তন',
      'card.cosmic.q': '“নিউ ইয়র্কে যখন ভরদুপুর, ঢাকায় তখন কেন নিঝুম রাত? শনির বরফে তৈরি উজ্জ্বল বলয় কীভাবে এলো?”',
      'card.cosmic.btn': 'মহাকাশ ভ্রমণ শুরু করো ➔',

      'card.body.cat': 'মানবদেহের অঙ্গসংস্থান ও বিজ্ঞান',
      'card.body.title': 'মানবদেহ যন্ত্র',
      'card.body.tagline': '২০৬টি হাড়, পরিপাক ও হৃদপিণ্ডের জীবন্ত কাজ',
      'card.body.q': '“২০৬টি হাড় কীভাবে তোমার শরীর সোজা রাখে? খাওয়ার পর খাবার কোথায় যায়? ফুসফুস কীভাবে বাতাস টানে?”',
      'card.body.btn': '৩ডি কঙ্কাল ও শরীর দেখো ➔',

      'card.immune.cat': 'রোগ প্রতিরোধ ও স্বাস্থ্য',
      'card.immune.title': 'প্রতিরোধক সেনা',
      'card.immune.tagline': 'জীবাণুর বিরুদ্ধে লড়াকু অণুজীব সৈনিক',
      'card.immune.q': '“হাত কেটে গেলে শরীর কীভাবে সারিয়ে তোলে? ২৪ ঘণ্টা কারা দিনরাত তোমার কোষদের পাহারা দেয়?”',
      'card.immune.btn': 'সেনাদের সাথে পরিচিত হও ➔',

      'card.cell.cat': 'কোষ জীববিজ্ঞান ও জিনতত্ত্ব',
      'card.cell.title': 'কোষের গোপন জগত',
      'card.cell.tagline': 'অণুবীক্ষণিক এক জীবন্ত শহরের ভেতর',
      'card.cell.q': '“প্রতিটি মানুষ যদি ৩৭ ট্রিলিয়ন কোষ দিয়ে তৈরি হয়, তাহলে একটি একক কোষ দেখতে কেমন?”',
      'card.cell.btn': 'কোষের শহরে প্রবেশ করো ➔',

      'card.math.cat': 'গণিত ও প্রকৃতির নকশা',
      'card.math.title': 'গণিতের জাদু',
      'card.math.tagline': 'প্রকৃতি ও মহাবিশ্বের গোপন গাণিতিক সংকেত',
      'card.math.q': '“সূর্যমুখীর বীজে কেন ফিবোনাচ্চি প্যাটার্ন থাকে? সংখ্যা কি প্রকৃতির রূপ আঁকতে পারে?”',
      'card.math.btn': 'গাণিতিক প্যাটার্ন খোঁজো ➔',

      'card.psych.cat': 'মনস্তত্ত্ব ও জ্ঞান বিজ্ঞান',
      'card.psych.title': 'মস্তিষ্ক ও চোখের ধাঁধা',
      'card.psych.tagline': 'অনুভূতি, স্মৃতি ও অপটিক্যাল ইলিউশন',
      'card.psych.q': '“চোখ কি মস্তিষ্ককে বোকা বানাতে পারে? স্থির ছবিতেও কেন আমাদের চোখ নড়াচড়া দেখে?”',
      'card.psych.btn': 'নিজের মস্তিষ্ক পরীক্ষা করো ➔',

      'card.phil.cat': 'শিশুদের জন্য দর্শন ও নীতিবিজ্ঞান',
      'card.phil.title': 'দর্শনের বড় প্রশ্ন',
      'card.phil.tagline': 'চিন্তার পরীক্ষা ও বিস্ময়',
      'card.phil.q': '“একটি জাহাজের প্রতিটি তক্তা বদলে দিলে সেটি কি আর আগের জাহাজ থাকে? তোমার আসল পরিচয় কী?”',
      'card.phil.btn': 'গভীর প্রশ্ন নিয়ে ভাবো ➔',

      'nav.back_home': '← তরুলার্ন হোমে ফিরে যান',

      // Cosmic Explorer Tabs
      'cosmic.tab.solar': 'সৌরজগতের মডেল',
      'cosmic.tab.daynight': 'দিন ও রাত',
      'cosmic.tab.seasons': 'ঋতু পরিবর্তন',
      'cosmic.tab.moon': 'চাঁদের কলা',
      'cosmic.tab.eclipses': 'গ্রহণ পরীক্ষা',
      'cosmic.tab.quiz': 'মহাজাগতিক কুইজ',

      // Solar System Controls & Labels
      'ss.quick.sun': 'সূর্য',
      'ss.quick.mercury': 'বুধ',
      'ss.quick.venus': 'শুক্র',
      'ss.quick.earth': 'পৃথিবী',
      'ss.quick.mars': 'মঙ্গল',
      'ss.quick.jupiter': 'বৃহস্পতি',
      'ss.quick.saturn': 'শনি',
      'ss.quick.uranus': 'ইউরেনাস',
      'ss.quick.neptune': 'নেপচুন',
      'ss.quick.pluto': 'প্লুটো',

      'ss.ctrl.play': 'চালান',
      'ss.ctrl.pause': 'থামান',
      'ss.ctrl.reset': 'আসল দৃশ্য',
      'ss.ctrl.speed': 'ঘূর্ণন গতি:',
      'ss.ctrl.labels': 'গ্রহের নাম দেখান',
      'ss.ctrl.truescale': 'বাস্তব অনুপাত',

      'ss.stat.diameter': 'ব্যাস',
      'ss.stat.distance': 'সূর্য থেকে দূরত্ব',
      'ss.stat.year': 'বছরের দৈর্ঘ্য',
      'ss.stat.day': 'দিনের দৈর্ঘ্য',
      'ss.stat.temp': 'পৃষ্ঠের তাপমাত্রা',
      'ss.stat.moons': 'চাঁদ ও উপগ্রহ',
      'ss.stat.notable_moons': 'উল্লেখযোগ্য উপগ্রহসমূহ',
      'ss.stat.no_moons': '🌙 কোনো প্রাকৃতিক চাঁদ নেই',
      'ss.stat.gravity': 'পৃষ্ঠের অভিকর্ষ',

      'ss.speak.read': 'শুনুন',
      'ss.speak.stop': 'থামুন',
      'ss.voice.label': 'কণ্ঠস্বর',

      // 3D Skeleton Module
      'skel.back': 'হোমে ফিরে যান',
      'skel.title': '🫀 মানবদেহ ইঞ্জিন: জীবন্ত শারীরিক তন্ত্র',
      'skel.subtitle': 'অঙ্গপ্রত্যঙ্গ, রক্ত ও অক্সিজেন কীভাবে প্রতিক্ষণ আপনাকে সচল রাখে জানুন',
      'skel.tab.skeleton': 'কঙ্কালতন্ত্র (৩ডি ফ্রেমওয়ার্ক)',
      'skel.tab.digestive': 'পরিপাকতন্ত্রের পথ',
      'skel.tab.breathing': 'শ্বাসতন্ত্র (ফুসফুস)',
      'skel.tab.heart': 'রক্ত সংবহন ও হৃৎপিণ্ড',

      'skel.ctrl.reset': 'সম্পূর্ণ কঙ্কাল দৃশ্য',
      'skel.ctrl.head': 'মাথার খুলি ও ঘাড়',
      'skel.ctrl.chest': 'বুকের খাঁচা ও মেরুদণ্ড',
      'skel.tag.active': '✨ মেডিকেল ৩ডি মডেল সক্রিয়',
      'skel.primary_function': 'প্রধান কাজ:',
      'skel.kid_facts': 'শিশুদের জন্য মজার বৈজ্ঞানিক তথ্য:',
      'skel.adult_bones': '২০৬টি প্রাপ্তবয়স্ক হাড়',
      'skel.instructions': '🔍 ৩ডি মডেলে যেকোনো হাড়ে ক্লিক করুন • ৩৬০° ঘোরান • জুম করুন',

      // Skeleton Quick Ribbon
      'bone.skull': 'মাথার খুলি (করোটি)',
      'bone.ribcage': 'বুকের খাঁচা',
      'bone.spine': 'মেরুদণ্ড',
      'bone.pelvis': 'শ্রোণিচক্র (কোমর)',
      'bone.femur': 'ফিমার (ঊর্বস্থি)',
      'bone.humerus': 'হিউমেরাস (হাত)',
      'bone.clavicle': 'ক্ল্যাভিকল (কলারবোন)',
      'bone.scapula': 'স্ক্যাপুলা (কাঁধ)',
      'bone.patella': 'প্যাটেলা (হাঁটু)',
      'bone.hands': 'হাত ও পায়ের হাড়',
      // Home Manifesto Strip
      'manifesto.why.title': 'প্রশ্ন করা কখনো থামিও না',
      'manifesto.why.desc': 'বিজ্ঞান ও দর্শনের প্রতিটি যুগান্তকারী আবিষ্কার শুরু হয়েছিল কোনো শিশুর নিষ্পাপ ও বুদ্ধিদীপ্ত প্রশ্ন দিয়ে।',
      'manifesto.discovery.title': 'হাতে-কলমে আবিষ্কার',
      'manifesto.discovery.desc': 'সংজ্ঞা মুখস্থ করার বদলে আমরা তৈরি করি এমন সিমুলেশন, যেখানে তুমি নিজেই বিষয়গুলো নিয়ন্ত্রণ করতে পারবে।',
      'manifesto.connected.title': 'সবকিছু পরস্পরের সাথে যুক্ত',
      'manifesto.connected.desc': 'তোমার দেহের পরমাণুগুলো তৈরি হয়েছিল প্রাচীন নক্ষত্র বিস্ফোরণে, আর তোমার চিন্তা হলো পদার্থবিজ্ঞান নিয়ন্ত্রিত বৈদ্যুতিক সংকেত।',

      // Skeletal Trivia Strip
      'skel.trivia.title': 'আপনার ২০৬টি হাড়ের বিস্ময়',
      'skel.trivia.1.title': '২৭০ থেকে কমে ২০৬:',
      'skel.trivia.1.desc': 'জন্মের সময় প্রায় ২৭০টি নরম তরুণাস্থির হাড় থাকে! বড় হওয়ার সাথে সাথে অনেকগুলো হাড় জোড়া লেগে প্রাপ্তবয়স্ক শরীরে ঠিক ২০৬টিতে পরিণত হয়।',
      'skel.trivia.2.title': 'জীবন্ত ও স্ব-নিরাময়কারী ইস্পাত:',
      'skel.trivia.2.desc': 'হাড় কোনো শুকনা লাঠি নয়—রক্তনালী ও স্নায়ুযুক্ত জীবন্ত অঙ্গ! প্রতিদিন পুরানো কোষ ভেঙে নতুন হাড় তৈরি হয়, ফলে প্রতি ১০ বছরে পুরো কঙ্কালটাই নতুন হয়ে যায়।',
      'skel.trivia.3.title': 'রক্তকণিকা তৈরির কারখানা:',
      'skel.trivia.3.desc': 'আপনার দীর্ঘ হাড়ের নরম মজ্জার ভেতর স্টেম সেল প্রতি সেকেন্ডে ২০ লক্ষেরও বেশি নতুন লোহিত রক্তকণিকা তৈরি করে!',

      // Digestive System static cards
      'digest.btn.prev': '◀ পূর্ববর্তী স্টেশন',
      'digest.btn.next': 'পরবর্তী স্টেশন ▶',
      'digest.apple.title': '🍎 একটি আপেলের হজম যাত্রা',
      'digest.apple.desc': 'খাবারের প্রতিটি গ্রাস প্রায় ৩০ ফুট লম্বা একটি নালী পাড়ি দেয়। শরীর খাবার থেকে সম্পূর্ণ পুষ্টি, প্রোটিন ও শক্তি শুষে নিতে ২৪ থেকে ৭২ ঘণ্টা সময় নেয়!',
      'digest.villus.title': 'ভিলাইর মহাক্ষমতা:',
      'digest.villus.desc': 'ক্ষুদ্রান্ত্রের ভেতরের লক্ষ লক্ষ মাইক্রোস্কোপিক আঙুলের মতো ভাঁজ শোষণক্ষেত্রকে ২৫০ বর্গমিটার পর্যন্ত বাড়িয়ে দেয়—যা একটি টেনিস কোর্টের সমান!',
      'digest.microbiome.title': 'অন্ত্রের বন্ধু ব্যাকটেরিয়া:',
      'digest.microbiome.desc': 'তোমার অন্ত্রে ১০০ ট্রিলিয়নেরও বেশি উপকারী ব্যাকটেরিয়া বাস করে। তারা আঁশযুক্ত খাবার হজমে সাহায্য করে এবং ভিটামিন কে তৈরি করে।',

      // Respiratory Simulator static cards
      'resp.badge': 'ইন্টারেক্টিভ শ্বাসপ্রশ্বাস সিমুলেটর',
      'resp.btn.toggle': '🌬️ শ্বাস নিন / শ্বাস ছাড়ুন',
      'resp.alveoli.title': '🫁 ৩০ কোটি ক্ষুদ্র বায়ুথলি (অ্যালভিওলাই)',
      'resp.alveoli.desc': 'বাতাস নাক দিয়ে ঢুকে শ্বাসনালী বেয়ে বাম ও ডান ব্রঙ্কাসে ভাগ হয়ে উল্টানো গাছের ডালপালার মতো ছড়িয়ে পড়ে!',
      'resp.gas.title': 'গ্যাস বিনিময়ের জাদু:',
      'resp.gas.desc': 'অ্যালভিওলাইর প্রাচীর মাত্র এক কোষ পুরু! অক্সিজেন সরাসরি রক্তকণিকায় মিশে যায় এবং ক্ষতিকর কার্বন ডাই-অক্সাইড বেরিয়ে আসে।',
      'resp.yawn.title': 'আমরা হাই তুলি বা হেঁচকি আসে কেন?',
      'resp.yawn.desc': 'হেঁচকি হলো মধ্যচ্ছদা (ডায়াফ্রাম) পেশির হঠাৎ অনৈচ্ছিক সংকোচন! এতে স্বরতন্ত্র হঠাৎ বন্ধ হয়ে "হিক" শব্দ তৈরি হয়।',

      // Circulatory Engine static cards
      'circ.badge': 'ইন্টারেক্টিভ হৃৎস্পন্দন ইঞ্জিন',
      'circ.slider.label': 'হৃৎস্পন্দন পরিবর্তন করতে স্লাইডার টানুন: বিশ্রাম, দৌড় বা ঘুম!',
      'circ.vessels.title': '❤️ ৬০,০০০ মাইল দীর্ঘ রক্তনালী',
      'circ.vessels.desc': 'একটি মানবদেহের সব রক্তনালী সোজা করে জুড়লে তা পৃথিবীকে দুইবারেরও বেশি ঘুরে আসতে পারবে!',
      'circ.double.title': 'দ্বৈত চক্রাকার পাম্প:',
      'circ.double.desc': 'হৃদপিণ্ডের ডান পাশ অক্সিজেনবিহীন রক্ত ফুসফুসে পাঠায়। আর বাম পাশ অক্সিজেনসমৃদ্ধ রক্ত সারা শরীরে পাম্প করে!',
      'circ.veins.title': 'শিরার রঙ নীল দেখায় কেন?',
      'circ.veins.desc': 'তোমার রক্ত সবসময়ই লাল! ত্বক ভেদ করে নীল আলো সহজে প্রতিফলিত হয়ে ফিরে আসে বলেই শিরাগুলোকে নীলচে দেখায়।',

      // Immunology
      'immune.title': '🛡️ রোগ প্রতিরোধ সেনা: আণুবীক্ষণিক রক্ষক',
      'immune.subtitle': 'চিনে নাও সেই কোষযোদ্ধাদের যারা ২৪ ঘণ্টা তোমার শরীর পাহারা দিচ্ছে',
      'immune.btn.macrophage': '🛡️ ম্যাক্রোফেজ',
      'immune.btn.neutrophil': '⚡ নিউট্রোফিল',
      'immune.btn.dendritic': '📡 ডেনড্রাইটিক কোষ',
      'immune.btn.tcell': '🎯 টি-কোষ (টি-সেল)',
      'immune.btn.bcell': '🏷️ বি-কোষ ও অ্যান্টিবডি',

      // Cell Biology
      'cell.title': '🧬 কোষের গোপন জীবন',
      'cell.subtitle': 'প্রতিটি জীবন্ত প্রাণীর ভেতরের আণুবীক্ষণিক শহরটি ঘুরে দেখো',
      'cell.btn.nucleus': '🏛️ নিউক্লিয়াস ও ডিএনএ',
      'cell.btn.mitochondria': '⚡ মাইটোকন্ড্রিয়া',
      'cell.btn.ribosome': '🏭 রাইবোজোম',
      'cell.btn.membrane': '🛡️ কোষঝিল্লি',
      'cell.scale.title': '🔬 কত ছোট হতে পারে "ক্ষুদ্র"? আকারের এক আশ্চর্য যাত্রা',
      'cell.scale.hair': 'মানুষের চুলের প্রস্থ',
      'cell.scale.cell': 'ত্বক বা যকৃতের কোষ',
      'cell.scale.bacteria': 'ব্যাকটেরিয়া (ই. কোলাই)',
      'cell.scale.virus': 'ফ্লু বা করোনা ভাইরাস',
      'cell.scale.dna': 'ডিএনএ ডাবল হেলিক্স',

      // Mathematics & Logic
      'math.title': '📐 গণিতের রহস্য: প্রকৃতির গোপন সংকেত',
      'math.subtitle': 'ইন্টারেক্টিভ ফিবোনাচ্চি স্পাইরাল ও গোল্ডেন রেশিও',
      'math.fibo.title': 'স্বর্ণিল সর্পিল: জীবনের ১৩৭.৫° কোণ',
      'math.fibo.desc': 'সূর্যমুখীর বীজ কেন নিখুঁত সর্পিলাকারে সাজানো থাকে? কারণ গোল্ডেন অ্যাঙ্গেলে (১৩৭.৫°) বীজ সাজালে প্রতিটি বীজের জন্য সর্বোচ্চ জায়গা নিশ্চিত হয়!',
      'math.fibo.slider': 'বীজের সংখ্যা নিয়ন্ত্রণ:',
      'math.pinecone.title': '🌲 পাইনকোনের সর্পিল',
      'math.pinecone.desc': 'পাইনকোনের দুই দিকের প্যাটার্ন গুনলে সবসময় ৮ ও ১৩ এর মতো ফিবোনাচ্চি সংখ্যা পাওয়া যায়!',
      'math.cicada.title': '🦗 মৌলিক সংখ্যার ঝিঁঝিঁ পোকা',
      'math.cicada.desc': 'কিছু ঝিঁঝিঁ পোকা ঠিক ১৩ বা ১৭ বছর মাটির নিচে থাকে, কারণ এগুলো মৌলিক সংখ্যা হওয়ায় শিকারীরা এদের জীবনচক্রের সাথে খাপ খাওয়াতে পারে না!',

      // Mind & Psychology
      'psych.title': '🧠 মন, মস্তিষ্ক ও দৃষ্টিবিভ্রম: ইলিউশন ল্যাব',
      'psych.subtitle': 'তোমার ভিজ্যুয়াল কর্টেক্স কীভাবে আলোক সংকেত থেকে বাস্তব রূপ দেয় তা দেখো',
      'psych.tab.cafe': '🧱 ক্যাফে দেওয়াল',
      'psych.tab.hermann': '🏁 হারম্যান গ্রিড',
      'psych.tab.growth': '🌱 গ্রোথ মাইন্ডসেট',
      'psych.cafe.q': 'অনুভূমিক রেখাগুলো কি সম্পূর্ণ সোজা ও সমান্তরাল?',
      'psych.cafe.desc': 'চোখের মনে হবে রেখাগুলো বাঁকা! নিচের সুইচটি চেপে লাল সোজা রেখা মিলিয়ে দেখো।',
      'psych.cafe.toggle': 'সমান্তরাল লাল গাইড রেখা দেখান',
      'psych.hermann.title': 'ভৌতিক বিন্দুর খেলা',
      'psych.hermann.desc': 'গ্রিডের দিকে তাকাও। সাদা সংযোগস্থলে কি ধূসর ছোপ ছোপ বিন্দু দেখতে পাচ্ছ? কোনো একটার দিকে সরাসরি তাকালে সেটা মিলিয়ে যায়!',
      'psych.hermann.expl': 'কারণ তোমার চোখের রেটিনার পার্শ্বীয় বাধা (ল্যাটারাল ইনহিবিশন)! মস্তিষ্ক সংযোগস্থলগুলোকে কিছুটা অন্ধকার ধরে নেয়।',
      'psych.growth.title': '🌱 মস্তিষ্কও একটি পেশির মতো: নিউরোপ্লাস্টিসিটি',
      'psych.growth.desc': 'কঠিন গণিত বা নতুন কিছু শেখার সময় যে পরিশ্রম হয়, তাতে তুমি ব্যর্থ হচ্ছো না—বরং তোমার মস্তিষ্কের নিউরন নতুন ডেনড্রাইট তৈরি করে আরও শক্তিশালী হচ্ছে!',
      'psych.growth.fixed.title': 'স্থবির চিন্তা (ফিক্সড মাইন্ডসেট):',
      'psych.growth.fixed.desc': '“আমি ভুল করেছি, তাই আমি এটা পারি না।”',
      'psych.growth.grow.title': 'উন্নয়নমুখী চিন্তা (গ্রোথ মাইন্ডসেট):',
      'psych.growth.grow.desc': '“আমি ভুল করেছি, যার মানে আমার মস্তিষ্ক এমন কিছু শিখল যা ৫ মিনিট আগেও জানত না!”',

      // Philosophy & Big Questions
      'phil.title': '💭 বড় প্রশ্ন: ক্ষুদে চিন্তাবিদদের দর্শন',
      'phil.subtitle': 'চিন্তার পরীক্ষা, নীতিগত দ্বন্দ্ব ও বিস্ময়ের আনন্দ',
      'phil.theseus.badge': 'চিন্তার পরীক্ষা ১: আত্মপরিচয়',
      'phil.theseus.title': 'থিসিয়াসের জাহাজ ⛵',
      'phil.theseus.intro': 'কল্পনা করো, বীর থিসিয়াস একটি কাঠের জাহাজে বাড়ি ফিরছে। ৩০ বছর যাত্রাপথে প্রতিটি তক্তা নষ্ট হয়ে যায় এবং নতুন তক্তা দিয়ে বদলে ফেলা হয়।',
      'phil.theseus.slider': 'জাহাজের তক্তা পরিবর্তন করুন:',
      'phil.dilemma.title': 'চিন্তার পরীক্ষা ২: অদৃশ্য হওয়ার আংটি 💍',
      'phil.dilemma.q': 'তুমি যদি এমন একটি জাদুকরী আংটি পাও যা তোমাকে অদৃশ্য করে দেয়, কেউ তোমাকে ধরতে না পারলেও তুমি কি ভালো কাজ করবে?',
      'phil.dilemma.opt1': 'হ্যাঁ! ভালো কাজ করা মনের ব্যাপার, শাস্তির ভয়ে নয়।',
      'phil.dilemma.opt2': 'হয়তো নিরীহ দুষ্টুমি করব বা লুকিয়ে মিষ্টি খাব!',
      'phil.dilemma.opt3': 'আমাকে ভাবায় আইন কেন তৈরি হয়েছে।',

      // Day & Night section
      'dn.badge': 'গ্রহের আকার ও ঘূর্ণন',
      'dn.title': 'পৃথিবীর আসল আকার এবং দিন ও রাত',
      'dn.shape.title': 'পৃথিবী নিখুঁত গোলক নয়!',
      'dn.shape.p1': 'মহাকাশ থেকে দেখলে পৃথিবীকে গোল মার্বেলের মতো মনে হয়। কিন্তু আসলে পৃথিবী একটি উপবৃত্তাকার গোলক (অবলেট স্ফেরয়েড)!',
      'dn.shape.p2': '২৪ ঘণ্টায় একবার তীব্র গতিতে ঘূর্ণনের কারণে কেন্দ্রাতিগ বল বিষুবরেখাকে বাইরের দিকে ফুলিয়ে দেয় এবং দুই মেরু কিছুটা চ্যাপ্টা করে দেয়!',
      'dn.stat.eq_diam': 'বিষুবীয় ব্যাস',
      'dn.stat.pol_diam': 'মেরু ব্যাস',
      'dn.stat.bulge': 'বিষুবীয় স্ফীতি',
      'dn.stat.class': 'প্রকৃত রূপ',
      'dn.carousel.title': '২৪ ঘণ্টার মহাজাগতিক ঘূর্ণন',
      'dn.carousel.desc': 'পৃথিবী তার ২৩.৪৪° হেলে থাকা অক্ষে ঘোরার সময় সূর্য সবসময় কেবল একটি অর্ধাংশকে আলোকিত করে:',
      'dn.carousel.day': 'দিনের দিক: সূর্যের মুখোমুখি, আলো ও তাপে ভরা।',
      'dn.carousel.night': 'রাতের দিক: মহাকাশের দিকে মুখ করা, শহরের আলোয় উজ্জ্বল!',
      'dn.carousel.term': 'ছায়াবৃত্ত (টারমিনেটর): দিন ও রাতের সীমারেখা।',
      'dn.chimborazo.title': 'বিস্ময়কর ভৌগোলিক তথ্য:',
      'dn.chimborazo.desc': 'পৃথিবীর বিষুবীয় স্ফীতির কারণে ইকুয়েডরের মাউন্ট চিম্বোরাজো চূড়াটি পৃথিবীর কেন্দ্র থেকে সবচেয়ে দূরবর্তী স্থান—মাউন্ট এভারেস্টের চেয়েও মহাকাশের ২ কিমি বেশি কাছে!',

      // Seasons section
      'sea.badge': 'অক্ষের হেলন ও কক্ষপথ',
      'sea.title': 'ঋতু পরিবর্তনের ২৩.৫° গোপন রহস্য',
      'sea.desc': 'সূর্য থেকে দূরত্বের কারণে ঋতু বদলায় না! ঋতু পরিবর্তনের একমাত্র কারণ হলো পৃথিবীর অক্ষ ২৩.৪৪° হেলে থাকা!',
      'sea.north': 'উত্তর গোলার্ধ',
      'sea.south': 'দক্ষিণ গোলার্ধ',
      'sea.june.title': '☀️ জুন: কর্কট সংক্রান্তি (গ্রীষ্মকাল)',
      'sea.june.desc': 'সূর্যের দিকে হেলে থাকে। খাড়া কিরণে সর্বোচ্চ তাপ পৌঁছায় এবং দিন বড় হয়।',
      'sea.dec.title': '❄️ ডিসেম্বর: মকর সংক্রান্তি (শীতকাল)',
      'sea.dec.desc': 'সূর্য থেকে দূরে হেলে থাকে। তীর্যক আলো পৌঁছায় এবং দিন ছোট হয়।',
      'sea.flashlight.title': 'টর্চের কোণ পরীক্ষা:',
      'sea.flashlight.desc': 'কাগজে সোজা টর্চ মারলে আলো গোল ও উজ্জ্বল হয় (গ্রীষ্ম)। কাত করে মারলে আলো ছড়িয়ে যায় ও ম্লান হয় (শীতকাল)।'

    }
  };

  // Planetary Educational Data in Bengali
  const planetBengaliData = {
    'Sun': {
      name: 'সূর্য (Sol)',
      type: 'হলুদ বামন নক্ষত্র (Yellow Dwarf Star)',
      description: 'আমাদের সৌরজগতের কেন্দ্রস্থলে রয়েছে সূর্য! এর ভেতরে প্রতি সেকেন্ডে ৬০ কোটি টন হাইড্রোজেন হিলিয়ামে রূপান্তরিত হয়ে প্রচণ্ড আলো ও উত্তাপ তৈরি করছে, যার কারণে পৃথিবীতে জীবন বেঁচে আছে।',
      fact: 'আলো প্রতি সেকেন্ডে ৩ লক্ষ কিলোমিটার গতিতে চলে! তবুও সেই বিপুল গতিতে সূর্যের আলো মহাকাশ পাড়ি দিয়ে পৃথিবীতে পৌঁছাতে ৮ মিনিট ২০ সেকেন্ড সময় নেয়।',
      speech: 'সূর্যের আলো প্রতি সেকেন্ডে তিন লক্ষ কিলোমিটার গতিতে চলে! তবুও সেই আলো পৃথিবীতে পৌঁছাতে সময় নেয় আট মিনিট কুড়ি সেকেন্ড।'
    },
    'Mercury': {
      name: 'বুধ (Mercury)',
      type: 'পাথুরে গ্রহ (ক্ষুদ্রতম ও দ্রুততম)',
      description: 'বুধ সৌরজগতের সবচেয়ে ছোট এবং সূর্যের সবচেয়ে কাছের গ্রহ! এখানে কোনো বায়ুমণ্ডল না থাকায় দিনের বেলা তাপমাত্রা ৪৩০ ডিগ্রি সেলসিয়াস পর্যন্ত ওঠে, আর রাতে নেমে যায় হিমাঙ্কের নিচে ১৮০ ডিগ্রিতে!',
      fact: 'বুধের এক বছর (৮৮ দিন) তার একটি পূর্ণ দিন-রাতের চেয়েও ছোট! কারণ এটি সূর্যের চারদিকে খুব দ্রুত ঘোরে কিন্তু নিজের অক্ষে ঘোরে অত্যন্ত ধীরগতিতে।',
      speech: 'বুধ গ্রহের এক বছর মাত্র আঠাশী দিনে পূর্ণ হয়! এটি সূর্যের সবচেয়ে কাছের এবং সবচেয়ে দ্রুতগামী গ্রহ।'
    },
    'Venus': {
      name: 'শুক্র (Venus)',
      type: 'পাথুরে গ্রহ (সৌরজগতের উষ্ণতম)',
      description: 'শুক্রকে পৃথিবীর "দুষ্টু যমজ" বলা হয়। এর চারপাশ ঘন বিষাক্ত কার্বন ডাই-অক্সাইড এবং সালফিউরিক অ্যাসিডের মেঘে ঢাকা। প্রচণ্ড গ্রিনহাউস প্রতিক্রিয়ার কারণে এটি যেকোনো ওভেনের চেয়েও বেশি গরম!',
      fact: 'শুক্র গ্রহ উল্টো দিকে ঘোরে (পশ্চিমে সূর্য ওঠে এবং পূর্বে অস্ত যায়)! সৌরজগতের গ্রহদের মধ্যে এটি সম্পূর্ণ ব্যতিক্রমী।',
      speech: 'শুক্র গ্রহ উল্টো দিকে পাক খায়! তাই শুক্র গ্রহে সূর্য ওঠে পশ্চিম দিকে, আর অস্ত যায় পূর্ব দিকে।'
    },
    'Earth': {
      name: 'পৃথিবী (Earth)',
      type: 'জলজ গ্রহ (আমাদের প্রিয় বাসস্থান)',
      description: 'আমাদের অপূর্ব নীলাভ বাড়ি! পৃথিবী মহাবিশ্বের একমাত্র জানা গ্রহ যেখানে তরল পানি, সুরক্ষাকারী বায়ুমণ্ডল, অক্সিজেন এবং অফুরন্ত প্রাণের সমাহার রয়েছে।',
      fact: 'পৃথিবীর বায়ুমণ্ডল আমাদের প্রতি মুহূর্তে মহাকাশের পাথর থেকে রক্ষা করে! প্রতিদিন হাজার হাজার উল্কাপিণ্ড বায়ুমণ্ডলে পুড়ে উজ্জ্বল "তারা খসা" হয়ে বিলীন হয়ে যায়।',
      speech: 'পৃথিবীর বায়ুমণ্ডল আমাদের রক্ষা করে! প্রতিদিন হাজার হাজার মহাকাশের উল্কাপিণ্ড বাতাসের ঘর্ষণে পুড়ে নিঃশেষ হয়ে যায়।'
    },
    'Mars': {
      name: 'মঙ্গল (Mars)',
      type: 'পাথুরে গ্রহ (লাল গ্রহ)',
      description: 'মঙ্গল গ্রহের মাটিতে প্রচুর আয়রন অক্সাইড (মরিচা) থাকায় একে রক্তিম দেখায়। এখানে রয়েছে সৌরজগতের বৃহত্তম আগ্নেয়গিরি "অলিম্পাস মনস", যা মাউন্ট এভারেস্টের চেয়েও তিনগুণ উঁচু!',
      fact: 'মঙ্গলের দুটি ছোট্ট আলুর মতো দেখতে চাঁদ রয়েছে—ফোবোস ও ডিমোস! ধারণা করা হয় এগুলো আসলে গ্রহাণু বেল্ট থেকে মঙ্গলের মাধ্যাকর্ষণে ধরা পড়া গ্রহাণু।',
      speech: 'মঙ্গল গ্রহের দুটি চমৎকার ছোট চাঁদ আছে—যাদের নাম ফোবোস এবং ডিমোস! এরা দেখতে অনেকটা আলুর মতো।'
    },
    'Jupiter': {
      name: 'বৃহস্পতি (Jupiter)',
      type: 'গ্যাস দানব (গ্রহদের রাজা)',
      description: 'বৃহস্পতি সৌরজগতের সমস্ত গ্রহকে একত্রিত করলেও তার চেয়ে দ্বিগুণেরও বেশি ভারী! এর বিখ্যাত "গ্রেট রেড স্পট" হলো পৃথিবীর চেয়েও বড় এক প্রচণ্ড ঘূর্ণিঝড়, যা গত ৩০০ বছর ধরে চলছে।',
      fact: 'বৃহস্পতি মহাকাশের ভ্যাকুয়াম ক্লিনারের মতো কাজ করে! এর প্রচণ্ড মাধ্যাকর্ষণ অনেক বিপদজনক ধূমকেতু ও গ্রহাণুকে টেনে নিয়ে পৃথিবীকে রক্ষা করে।',
      speech: 'বৃহস্পতি সৌরজগতের সবচেয়ে বড় গ্রহ! এর বিশাল মাধ্যাকর্ষণ অনেক বিপদজনক ধূমকেতুকে নিজের দিকে টেনে পৃথিবীকে রক্ষা করে।'
    },
    'Saturn': {
      name: 'শনি (Saturn)',
      type: 'গ্যাস দানব (বলয়যুক্ত সুন্দর গ্রহ)',
      description: 'শনি তার অপরূপ বরফের বলয়ের জন্য বিখ্যাত। ২৮২,০০০ কিলোমিটার চওড়া হলেও এই বলয়গুলো মাত্র ১০ থেকে ৩০ মিটার পাতলা—যা কোটি কোটি বরফ ও পাথরের টুকরো দিয়ে তৈরি!',
      fact: 'শনি সৌরজগতের একমাত্র গ্রহ যার ঘনত্ব পানির চেয়েও কম! যদি কোনো বিরাট বালতি বা সুইমিং পুলে পানি রাখা যেত, শনি গ্রহ তাতে জাহাজের মতো ভেসে থাকত!',
      speech: 'শনি গ্রহের ঘনত্ব পানির চেয়েও কম! বিরাট কোনো পানির জলাশয় পেলে শনি গ্রহ সত্যি সত্যিই তাতে ভেসে থাকত!'
    },
    'Uranus': {
      name: 'ইউরেনাস (Uranus)',
      type: 'বরফ দানব (কাত হয়ে ঘোরা গ্রহ)',
      description: 'ইউরেনাস জল, অ্যামোনিয়া এবং মিথেন বরফে তৈরি একটি স্নিগ্ধ নীলাভ-সবুজ গ্রহ। এটি নিজের অক্ষের ওপর প্রায় ৯৮ ডিগ্রি কাত হয়ে পুরো একপাশে শুয়ে শুয়ে সূর্যকে প্রদক্ষিণ করে!',
      fact: 'একপাশে কাত হয়ে ঘোরার কারণে ইউরেনাসের প্রতিটি মেরু একটানা ৪২ বছর একটানা সূর্যের আলো পায়, এবং পরবর্তী ৪২ বছর থাকে জমাট বাঁধা অন্ধকারে!',
      speech: 'ইউরেনাস গ্রহ সম্পূর্ণ কাত হয়ে ঘোরে! তাই এর উত্তর ও দক্ষিণ মেরুতে টানা বিয়াল্লিশ বছর দিন আর বিয়াল্লিশ বছর রাত থাকে।'
    },
    'Neptune': {
      name: 'নেপচুন (Neptune)',
      type: 'বরফ দানব (ঝড়ো হাওয়াদের রাজ্য)',
      description: 'গাঢ় নীল রঙের নেপচুন সৌরজগতের সবচেয়ে দূরের প্রধান গ্রহ। এখানে সৌরজগতের সবচেয়ে তীব্র বাতাস বয়ে যায়, যার গতি ঘণ্টায় ২,১০০ কিলোমিটার (শব্দের চেয়েও দ্রুত)!',
      fact: 'নেপচুনই একমাত্র গ্রহ যা সরাসরি দূরবীন দিয়ে দেখার আগে বিশুদ্ধ গণিত ও পদার্থবিজ্ঞানের হিসাব দিয়ে খুঁজে পাওয়া গিয়েছিল!',
      speech: 'নেপচুন গ্রহ দূরবীনে দেখার আগেই বিজ্ঞানীরা শুধু গণিতের হিসাব কষে এর অস্তিত্ব আবিষ্কার করেছিলেন!'
    },
    'Pluto': {
      name: 'প্লুটো (Pluto)',
      type: 'বামন গ্রহ (কাইপার বেল্টের রাজা)',
      description: 'বরফশীতল কাইপার বেল্টে অবস্থিত এক রহস্যময় ক্ষুদ্র জগৎ। ২০১৫ সালে নাসার নিউ হরাইজনস মহাকাশযান প্লুটোর বুকে নাইট্রোজেন বরফে তৈরি একটি দানবীয় ভালোবাসার চিহ্নের (হৃদয়) সন্ধান পায়!',
      fact: 'প্লুটোর সবচেয়ে বড় চাঁদ শ্যারন প্লুটোর তুলনায় এতোটাই বড় যে তারা দুজন কোনো সাধারণ কেন্দ্র নয়, বরং মহাশূন্যের মাঝের একটি বিন্দুকে কেন্দ্র করে পরস্পর নাচতে থাকে!',
      speech: 'প্লুটোর বুকে নাইট্রোজেন বরফের তৈরি বিরাট একটি ভালোবাসার হৃদয় আঁকা আছে!'
    }
  };

  // Bone Educational Data in Bengali
  const boneBengaliData = {
    'cranium': {
      name: 'মাথার খুলি (করোটি)',
      latin: 'Cranium / Neurocranium',
      category: 'অক্ষীয় কঙ্কাল',
      function: 'আমাদের সবচেয়ে মূল্যবান অঙ্গ মস্তিষ্ক ও চোখ-কানকে শক্ত সুরক্ষা কবচ দিয়ে আবৃত করে রাখে।',
      facts: [
        'জন্মের সময় একটি শিশুর খুলিতে ৪৪টি আলাদা হাড়ের টুকরো থাকে, যা বড় হওয়ার সাথে সাথে জোড়া লেগে ২২টি হাড়ে পরিণত হয়!',
        'এটি দেখতে পাতলা মনে হলেও একটি হেলমেটের মতো শক্ত এবং খুলির একমাত্র নড়াচড়া করতে পারা হাড় হলো নিচের চোয়াল (ম্যান্ডিবল)।'
      ]
    },
    'ribcage': {
      name: 'বুকের খাঁচা (পাঁজড়)',
      latin: 'Thoracic Cage / Costae',
      category: 'অক্ষীয় কঙ্কাল',
      function: 'হৃদপিণ্ড এবং ফুসফুসকে সুরক্ষিত রাখে এবং শ্বাস নেওয়ার সময় ওঠানামা করে ফুসফুসে বাতাস ঢুকতে সাহায্য করে।',
      facts: [
        'তোমার বুকের খাঁচা দিনে ২০,০০০ বারেরও বেশি প্রসারিত ও সংকুচিত হয় যখন তুমি শ্বাস নাও ও ছাড়ো!',
        'মানুষের শরীরে সাধারণত ১২ জোড়া অর্থাৎ মোট ২৪টি পাঁজড়ের হাড় থাকে।'
      ]
    },
    'spine': {
      name: 'মেরুদণ্ড (কশেরুকা)',
      latin: 'Vertebral Column',
      category: 'অক্ষীয় কঙ্কাল',
      function: 'দেহকে সোজা রাখে, নড়াচড়া করতে দেয় এবং সুষুম্নাকাণ্ডকে (Spinal Cord) সুরক্ষা দেয়।',
      facts: [
        'তুমি সকালে ঘুম থেকে উঠলে রাতে ঘুমানোর সময়ের চেয়ে প্রায় ১ সেন্টিমিটার লম্বা থাকো! কারণ সারা দিনে মাধ্যাকর্ষণে মেরুদণ্ডের ডিস্ক কিছুটা চেপে যায়।',
        'জিরাফের লম্বা গলা আর মানুষের ছোট্ট গলায় ঠিক একই সংখ্যায়—৭টি করে কশেরুকা হাড় রয়েছে!'
      ]
    },
    'pelvis': {
      name: 'শ্রোণিচক্র (কোমর ও নিতম্বের হাড়)',
      latin: 'Pelvic Girdle',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'শরীরের ওপরের অংশের সমস্ত ভার দুই পায়ে ছড়িয়ে দেয় এবং ভেতরের অঙ্গগুলোকে নিরাপদ রাখে।',
      facts: [
        'শ্রোণিচক্র মানবদেহের সবচেয়ে শক্তিশালী ও প্রশস্ত হাড়ের সংযোগগুলোর একটি।',
        'এটি পেটের নিচের অঙ্গগুলোকে একটি বাটির মতো ধরে রাখে যাতে আমরা নিরাপদে হাঁটতে ও দৌড়াতে পারি।'
      ]
    },
    'femur': {
      name: 'ফিমার (ঊর্বস্থি বা উরুর হাড়)',
      latin: 'Femur',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'শরীরের ওজন বহন করে হাঁটা, দৌড়ানো ও লাফ দেওয়ার শক্তি জোগায়।',
      facts: [
        'ফিমার মানবদেহের সবচেয়ে দীর্ঘ, ভারী এবং সবচেয়ে শক্তিশালী হাড়!',
        'একটি ফিমার হাড় ভাঙার আগে তোমার শরীরের মোট ওজনের প্রায় ৩০ গুণ ওজন সহ্য করতে পারে—এটি কংক্রিটের চেয়েও বেশি মজবুত!'
      ]
    },
    'humerus': {
      name: 'হিউমেরাস (বাহুর হাড়)',
      latin: 'Humerus',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'কাঁধ থেকে কনুই পর্যন্ত সংযোগ স্থাপন করে হাতকে বিভিন্ন দিকে ঘোরানোর শক্তি দেয়।',
      facts: [
        'কনুইয়ের যে অংশটিতে টোকা লাগলে এক ধরণের ঝনঝন অনুভূতি হয়, তাকে বলা হয় "ফানি বোন" (Funny bone)!',
        'হিউমেরাসের সাথে শক্তিশালী বাইসেপ ও ট্রাইসেপ পেশি যুক্ত হয়ে আমাদের ভারি জিনিস তুলতে সাহায্য করে।'
      ]
    },
    'clavicle': {
      name: 'ক্ল্যাভিকল (কলারবোন)',
      latin: 'Clavicula',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'হাতকে শরীরের মূল কাঠামোর সাথে যুক্ত রাখে এবং হাতকে স্বাধীনভাবে নড়াচড়া করতে দেয়।',
      facts: [
        'ক্ল্যাভিকল হলো মানবদেহের একমাত্র লম্বা হাড় যা অনুভূমিকভাবে (আড়াআড়ি) থাকে!',
        'খেলাধুলা বা পড়ে যাওয়ার সময় মানবদেহের সবচেয়ে বেশি ফ্র্যাকচার হওয়া হাড়গুলোর মধ্যে এটি অন্যতম।'
      ]
    },
    'scapula': {
      name: 'স্ক্যাপুলা (কাঁধের পাখা হাড়)',
      latin: 'Scapula',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'বাহুর হাড়কে পিঠের পেশির সাথে যুক্ত করে এবং হাতকে ৩৬০ ডিগ্রি ঘুরাতে সাহায্য করে।',
      facts: [
        'স্ক্যাপুলা দেখতে অনেকটা ত্রিকোণাকার ডানার মতো, তাই একে অনেক সময় কাঁধের ডানা বলা হয়।',
        'এটি ১৭টিরও বেশি পেশির সাথে যুক্ত থেকে হাত দিয়ে বল ছুড়তে বা সাঁতার কাটতে সাহায্য করে।'
      ]
    },
    'patella': {
      name: 'প্যাটেলা (হাঁটুর মালাইচাকি)',
      latin: 'Patella',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'হাঁটুর সন্ধিকে সুরক্ষা দেয় এবং পা সোজা করার সময় লিভারের মতো কাজ করে শক্তি বাড়ায়।',
      facts: [
        'শিশুরা যখন জন্মায়, তখন তাদের শক্ত প্যাটেলা হাড় থাকে না! এটি প্রথমে নরম তরুণাস্থি (Cartilage) থাকে এবং ৩ থেকে ৫ বছর বয়সে গিয়ে শক্ত হাড়ে রূপ নেয়।',
        'এটি মানবদেহের সবচেয়ে বড় তিলের দানার মতো হাড় (Sesamoid bone)।'
      ]
    },
    'hand_bones': {
      name: 'হাত ও পায়ের হাড়',
      latin: 'Carpals, Tarsals & Phalanges',
      category: 'উপাঙ্গীয় কঙ্কাল',
      function: 'পেন্সিল ধরা, ছবি আঁকা এবং ভারসাম্য বজায় রেখে হাঁটা-দৌড়ানো নিশ্চিত করে।',
      facts: [
        'তোমার শরীরের মোট ২০৬টি হাড়ের অর্ধেকেরও বেশি (১০৬টি হাড়) কেবল তোমার দুই হাত আর দুই পায়েই রয়েছে!',
        'মানুষের বুড়ো আঙুলে রয়েছে একটি বিশেষ জোড়া, যার কারণে আমরা কোনো সূক্ষ্ম জিনিস নিখুঁতভাবে মুঠো করে ধরতে পারি।'
      ]
    }
  };

  
  // Digestive Educational Data (Bengali)
  const digestiveBengaliStages = [
    {
      step: 1,
      organ: "👄 মুখ ও দাঁত (Mouth & Teeth)",
      role: "যান্ত্রিক চর্বণ ও এনজাইম প্রক্রিয়া",
      description: "তোমার ধারালো সামনের দাঁত ও চর্বণকারী মাড়ির দাঁত খাবারকে ছোট টুকরোয় পরিণত করে, আর লালার অ্যামাইলেজ এনজাইম শ্বেতসারকে মিষ্টি গ্লুকোজে রূপান্তর শুরু করে।",
      detail: "মজার তথ্য: তুমি প্রতিদিন প্রায় ১.৫ লিটার লালা তৈরি করো—যা দিয়ে দুটি বড় পানির বোতল ভরে ফেলা যায়!",
      color: "#fbbf24"
    },
    {
      step: 2,
      organ: "🧬 খাদ্যনালী (The Esophagus)",
      role: "পেরিস্তালসিস পেশিতরঙ্গ",
      description: "এটি একটি ১০ ইঞ্চি দীর্ঘ পেশীবহুল নালী। খাবার শুধু মাধ্যাকর্ষণে নিচে পড়ে না—বরং তরঙ্গায়িত পেশি সংকোচনের (পেরিস্তালসিস) মাধ্যমে নিচে নেমে যায়। এমনকি উল্টো হয়ে দাঁড়ালেও তুমি খাবার গিলতে পারবে!",
      detail: "এপিগ্লোটিস নামের একটি ছোট ঢাকনা শ্বাসনালী ঢেকে রাখে, যাতে খাবার কখনোই ফুসফুসে ঢুকতে না পারে।",
      color: "#f43f5e"
    },
    {
      step: 3,
      organ: "🧪 পাকস্থলী অ্যাসিড আলোড়ক (Stomach Acid)",
      role: "রাসায়নিক ভাঙন ও জীবাণুমুক্তকরণ",
      description: "একটি শক্তিশালী স্থিতিস্থাপক থলি যাতে হাইড্রোক্লোরিক অ্যাসিড (pH 1.5–2.0) থাকে—যা ব্যাটারির অ্যাসিডের মতোই অম্লীয়! এটি ক্ষতিকর ব্যাকটেরিয়া মেরে খাবারকে তরল স্যুপ বা 'কাইম'-এ পরিণত করে।",
      detail: "পাকস্থলী নিজে কেন অ্যাসিডে গলে যায় না? কারণ এর ভেতরের পুরু শ্লেষ্মা স্তর প্রতি ৩ দিন পর পর নতুন করে তৈরি হয়!",
      color: "#a855f7"
    },
    {
      step: 4,
      organ: "🌱 ক্ষুদ্রান্ত্র (Small Intestine)",
      role: "পুষ্টি শোষণের আসল জাদু",
      description: "নামে ক্ষুদ্র হলেও এটি ২০ ফুটের বেশি লম্বা! এর প্রাচীরের লক্ষ লক্ষ মাইক্রোস্কোপিক আঙুলের মতো ভাঁজ (ভিলাই) ভিটামিন, অ্যামিনো অ্যাসিড ও পুষ্টি সরাসরি রক্তে শোষণ করে তোমার পেশিগুলোকে শক্তি জোগায়।",
      detail: "তোমার ক্ষুদ্রান্ত্রের সব ভিলাই ও মাইক্রোভিলাইকে সমতল করলে তা একটি আস্ত টেনিস কোর্টের সমান হবে!",
      color: "#10b981"
    },
    {
      step: 5,
      organ: "💧 বৃহদান্ত্র ও মাইক্রোবায়োম (Large Intestine)",
      role: "পানি শোষণ ও বন্ধু ব্যাকটেরিয়া",
      description: "এটি খাবারের ৯০% পানি ও প্রয়োজনীয় খনিজ শোষণ করে নেয়, আর ট্রিলিয়ন ট্রিলিয়ন বন্ধু ব্যাকটেরিয়া ভিটামিন কে তৈরি করে এবং বর্জ্য নিষ্কাশনের আগে রোগ প্রতিরোধ ব্যবস্থা সুরক্ষিত রাখে।",
      detail: "তোমার পুরো শরীরে যতগুলো মানব কোষ রয়েছে, তার চেয়ে বেশি বন্ধু ব্যাকটেরিয়া বাস করে তোমার পরিপাকতন্ত্রে!",
      color: "#38bdf8"
    }
  ];

  // Immunology Profiles in Bengali
  const defenderBengaliProfiles = {
    macrophage: {
      name: "বিশাল ম্যাক্রোফেজ (Giant Macrophage)",
      badge: "ক্ষুধার্ত পাহারাদার",
      icon: "🛡️",
      quote: "আমি অচেনা জীবাণুদের খুঁজে বের করি, আস্ত গিলে ফেলি এবং মৃত কোষ পরিষ্কার করি!",
      power: "ফ্যাগোসাইটোসিস (আস্ত গিলে ফেলা)",
      speed: "মাঝারি টহল (কলা বা টিস্যুতে)",
      mission: "ফুসফুস, ত্বক ও অঙ্গে মোতায়েন থাকে। ব্যাকটেরিয়া ঢুকলেই ম্যাক্রোফেজ ১০০টি পর্যন্ত জীবাণু গিলে ফেলে এবং অতিরিক্ত সৈন্যের সংকেত পাঠায়।",
      color: "#10b981"
    },
    neutrophil: {
      name: "দ্রুতগতির নিউট্রোফিল (Neutrophil Scout)",
      badge: "প্রথম জরুরি সাড়াদানকারী",
      icon: "⚡",
      quote: "আমরা কোটি কোটি সৈন্য নিয়ে কয়েক মিনিটে হাজির হই এবং মরণ ফাঁদ ফেলে জীবাণু ধ্বংস করি!",
      power: "NETs (নিউক্লিক অ্যাসিডের মরণ ফাঁদ)",
      speed: "অতি দ্রুত (রক্তপ্রবাহের মাধ্যমে)",
      mission: "তোমার রক্তকণিকার ৬০% হলো নিউট্রোফিল। ক্ষতস্থানে ছুটে গিয়ে এরা ব্যাকটেরিয়া ধ্বংস করে এবং সুস্থ কোষ বাঁচাতে নিজের জীবন উৎসর্গ করে।",
      color: "#f59e0b"
    },
    dendritic: {
      name: "ডেনড্রাইটিক বার্তা প্রেরক (Dendritic Messenger)",
      badge: "গোয়েন্দা ও বার্তাবাহক",
      icon: "📡",
      quote: "আমি শত্রুর বৈশিষ্ট্য বিশ্লেষণ করে লিম্ফ নোডে আমাদের সেনা প্রধানদের কাছে পৌঁছে দিই!",
      power: "অ্যান্টিজেন প্রেজেন্টেশন (শত্রুর পরিচয় তুলে ধরা)",
      speed: "পরিযায়ী বার্তাবাহক",
      mission: "ধ্বংসপ্রাপ্ত ভাইরাসের অংশবিশেষ সংগ্রহ করে লিম্ফ নোডে নিয়ে যায় এবং হেল্পার টি-কোষকে সক্রিয় করে বড় সামরিক অভিযান পরিচালনা করায়।",
      color: "#38bdf8"
    },
    tcell: {
      name: "টি-কোষ সেনাপতি ও ঘাতক (Helper & Killer T-Cells)",
      badge: "কৌশলী সেনাপতি ও স্নাইপার",
      icon: "🎯",
      quote: "আমরা রাসায়নিক সংকেতে বাহিনীকে পরিচালনা করি এবং ভাইরাসে আক্রান্ত কোষ ধ্বংস করি!",
      power: "সাইটোটক্সিক পারফোরিন ও গ্র্যানজাইম",
      speed: "লক্ষ্যভেদী আক্রমণ",
      mission: "হেল্পার টি-কোষ রাসায়নিক সংকেত দিয়ে পুরো শরীরকে সতর্ক করে। আর কিলার টি-কোষ ভাইরাসে জিম্মি হওয়া কোষ খুঁজে বের করে তাদের নিরাপদে আত্মধ্বংসের নির্দেশ দেয়।",
      color: "#a855f7"
    },
    bcell: {
      name: "বি-কোষ ও অ্যান্টিবডি কারখানা (B-Cell & Antibodies)",
      badge: "অ্যান্টিবডির নিখুঁত কারখানা",
      icon: "🏷️",
      quote: "আমি শত্রুর বিরুদ্ধে প্রতি সেকেন্ডে ২,০০০টি নিখুঁত ওয়াই-আকারের অ্যান্টিবডি তৈরি করি!",
      power: "অ্যান্টিবডি উৎপাদন ও দীর্ঘমেয়াদী স্মৃতি",
      speed: "সিস্টেমিক প্রতিরক্ষা (রক্ত ও লসিকায়)",
      mission: "তৈরি করে কাস্টম অ্যান্টিবডি যা ভাইরাসের উপর হাতকড়ার মতো আটকে যায় যাতে ভাইরাস কোষে ঢুকতে না পারে। কিছু বি-কোষ মেমোরি কোষে পরিণত হয়ে বহু বছর ধরে তোমাকে রক্ষা করে!",
      color: "#f43f5e"
    }
  };

  // Organelle Profiles in Bengali
  const organelleBengaliData = {
    nucleus: {
      title: "নিউক্লিয়াস (কোষের নিয়ন্ত্রণ কেন্দ্র ও ডিএনএ লাইব্রেরি)",
      role: "মূল নকশার ভাণ্ডার",
      info: "এর ভেতরে ডিএনএ দিয়ে তৈরি ৪৬টি ক্রোমোজোম থাকে। তোমার শরীরের প্রতিটি প্রোটিন, হরমোন এবং কোষ তৈরির সম্পূর্ণ বংশগত রেসিপি এখানে সুরক্ষিত রয়েছে।",
      fact: "মাত্র একটি আণুবীক্ষণিক কোষের ডিএনএ সোজা করে টানলে তা প্রায় ৬ ফুট (২ মিটার) লম্বা হবে!"
    },
    mitochondria: {
      title: "মাইটোকন্ড্রিয়া (কোষের শক্তিঘর)",
      role: "এটিপি শক্তি উৎপাদন কারখানা",
      info: "খাবারের গ্লুকোজ ও ফুসফুসের অক্সিজেনকে এটিপিতে (ATP) রূপান্তরিত করে—যা দিয়ে তোমার পেশি নড়াচড়া করে আর মস্তিষ্ক চিন্তা করে।",
      fact: "মাইটোকন্ড্রিয়ার নিজস্ব বৃত্তাকার ডিএনএ রয়েছে যা মানুষ শুধুমাত্র মায়ের কাছ থেকে লাভ করে!"
    },
    ribosome: {
      title: "রাইবোজোম (প্রোটিন তৈরির কারখানা)",
      role: "প্রোটিন সংযোজন লাইন",
      info: "ডিএনএ-এর বার্তাবাহক আরএনএ পড়ে প্রতি সেকেন্ডে ২০টি অ্যামিনো অ্যাসিড জোড়া লাগিয়ে এনজাইম, চুল, অ্যান্টিবডি ও পেশিতন্তু তৈরি করে।",
      fact: "একটিমাত্র যকৃতের কোষে এক কোটি পর্যন্ত সক্রিয় রাইবোজোম দিনরাত অবিরাম কাজ করে যায়!"
    },
    membrane: {
      title: "কোষঝিল্লি (স্মার্ট সীমান্ত পাহারা)",
      role: "নির্বাচনী বাধা ও সেন্সর",
      info: "ফসফোলিপিড ও প্রোটিন দ্বারা গঠিত একটি তরল পর্দা। এটি ঠিক করে কোন পুষ্টি ভেতরে ঢুকবে (গ্লুকোজ, পানি, আয়ন) আর ক্ষতিকর পদার্থ আটকে দেয়।",
      fact: "কোষঝিল্লি মাত্র দুটি অণু পরিমাণ পুরু (প্রায় ৭ ন্যানোমিটার)—এমন ১০,০০০ ঝিল্লি একসাথে রাখলে একটি কাগজের সমান পুরু হবে।"
    }
  };

  const breathingBengaliData = {
    inhale: {
      airFlow: '⬇ অক্সিজেন (O₂) শ্বাসনালী দিয়ে ভেতরে ঢুকছে',
      status: 'শ্বাস গ্রহণ: ডায়াফ্রাম নিচের দিকে সংকুচিত হয়, বুক প্রসারিত হয়ে চাপ কমে এবং তাজা বাতাস ভেতরে টেনে নেয়।'
    },
    exhale: {
      airFlow: '⬆ কার্বন ডাই-অক্সাইড (CO₂) বাইরে বেরিয়ে যাচ্ছে',
      status: 'শ্বাস ত্যাগ: ডায়াফ্রাম শিথিল হয়ে উপরের দিকে ওঠে, বুকের ভেতর চাপ বৃদ্ধি পায় এবং দূষিত গ্যাস আলতোভাবে বেরিয়ে যায়।'
    }
  };

  class ToruI18n {
    constructor() {
      const saved = localStorage.getItem(STORAGE_KEY);
      this.currentLang = (saved === 'bn' || saved === 'en') ? saved : 'en';
      window.currentLang = this.currentLang;
      this.translations = translations;
      this.planetBengaliData = planetBengaliData;
      this.boneBengaliData = boneBengaliData;
      this.init();
    }

    init() {
      document.documentElement.lang = this.currentLang;
      this.updateToggleButton();
      this.applyTranslations();

      // Hook up language toggle button
      const btn = document.getElementById('lang-toggle-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          this.toggleLanguage();
        });
      }
    }

    toggleLanguage() {
      const newLang = this.currentLang === 'en' ? 'bn' : 'en';
      this.setLanguage(newLang);
    }

    setLanguage(lang) {
      if (lang !== 'en' && lang !== 'bn') return;
      this.currentLang = lang;
      window.currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;

      // Stop any running text-to-speech to prevent cross-language audio
      window.cosmicAudio?.stopSpeaking();
      window.cosmicAudio?.playClick();

      this.updateToggleButton();
      this.applyTranslations();

      // Notify simulations & components
      if (window.solarSystemSim && typeof window.solarSystemSim.onLanguageChanged === 'function') {
        window.solarSystemSim.onLanguageChanged(lang);
      }
      if (window.skeletonSim3D && typeof window.skeletonSim3D.onLanguageChanged === 'function') {
        window.skeletonSim3D.onLanguageChanged(lang);
      }
      if (window.toruPortal && typeof window.toruPortal.onLanguageChanged === 'function') {
        window.toruPortal.onLanguageChanged(lang);
      }
      if (window.cosmicQuiz && typeof window.cosmicQuiz.renderQuestion === 'function') {
        window.cosmicQuiz.renderQuestion();
      }

      // Dispatch custom window event
      window.dispatchEvent(new CustomEvent('toru:langchange', { detail: { lang } }));
    }

    updateToggleButton() {
      const label = document.getElementById('lang-toggle-label');
      const btn = document.getElementById('lang-toggle-btn');
      if (label) {
        label.textContent = this.currentLang === 'en' ? 'বাংলা' : 'English';
      }
      if (btn) {
        btn.title = this.currentLang === 'en' 
          ? 'Switch language to Bengali (বাংলায় দেখুন)' 
          : 'Switch language to English (ইংরেজিতে দেখুন)';
      }
    }

    t(key, fallback = '') {
      const dict = this.translations[this.currentLang] || this.translations.en;
      return dict[key] || this.translations.en[key] || fallback || key;
    }

    applyTranslations() {
      // 1. Text elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = this.t(key);
        if (translated) {
          el.textContent = translated;
        }
      });

      // 2. HTML elements
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const translated = this.t(key);
        if (translated) {
          el.innerHTML = translated;
        }
      });

      // 3. Title attributes
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translated = this.t(key);
        if (translated) {
          el.title = translated;
        }
      });
    }

    getPlanetDetails(planetName) {
      if (this.currentLang === 'bn' && this.planetBengaliData[planetName]) {
        return this.planetBengaliData[planetName];
      }
      return null;
    }

    getBoneDetails(boneId) {
      if (this.currentLang === 'bn' && this.boneBengaliData[boneId]) {
        return this.boneBengaliData[boneId];
      }
      return null;
    }

    getDigestiveStages(enStages) {
      if (this.currentLang === 'bn') {
        return digestiveBengaliStages;
      }
      return enStages;
    }

    getDefenderProfiles(enProfiles) {
      if (this.currentLang === 'bn') {
        return defenderBengaliProfiles;
      }
      return enProfiles;
    }

    getOrganelles(enOrganelles) {
      if (this.currentLang === 'bn') {
        return organelleBengaliData;
      }
      return enOrganelles;
    }

    getBreathingData(state) {
      if (this.currentLang === 'bn' && breathingBengaliData[state]) {
        return breathingBengaliData[state];
      }
      return null;
    }

    getTheseusStatus(val) {
      if (this.currentLang === 'bn') {
        if (val === 0) return "১০০% আসল কাঠ। সবাই একমত: এটি নিঃসন্দেহে আসল জাহাজ।";
        if (val < 50) return "ক্ষয়ে যাওয়ার কারণে কয়েকটি কাঠের তক্তা বদলানো হয়েছে। ক্ষুদ্র অংশ বদলালে কি মূল পরিচয় বদলে যায়?";
        if (val === 50) return "ঠিক অর্ধেক আসল কাঠ, আর অর্ধেক সম্পূর্ণ নতুন কাঠ। এটা কি এখন অর্ধেক আসল জাহাজ, নাকি আগের জাহাজই?";
        if (val < 100) return "অধিকাংশ পুরানো তক্তা বদলে গেছে। তবুও নাবিকেরা এক মুহূর্তের জন্যও থামা ছাড়া একটানা যাত্রা করেছে!";
        return "<strong>জাহাজের ১০০% তক্তাই বদলে নতুন করা হয়েছে।</strong> কেউ যদি পুরানো ফেলে দেওয়া তক্তাগুলো জড়ো করে বন্দরে আরেকটি জাহাজ বানায়, তবে এদের মধ্যে কোনটি হবে থিসিয়াসের আসল জাহাজ?";
      }
      if (val === 0) return "100% original wood. Everyone agrees: this is unquestionably the original ship.";
      if (val < 50) return "A few wooden planks have been replaced due to weathering. Does changing a small part change who you are?";
      if (val === 50) return "Exactly half original wood, half brand new timber. Is it half the original ship, or still the same ship?";
      if (val < 100) return "Most original timber is gone. Yet the crew sailed it continuously without ever stopping!";
      return "<strong>100% of all planks have been replaced.</strong> If someone collected the discarded old planks and rebuilt them into a second ship in a harbor, which of the two is the REAL Ship of Theseus?";
    }
  }

  // Expose global instance
  window.toruI18n = new ToruI18n();
  window.t = (k, f) => window.toruI18n.t(k, f);
})();
