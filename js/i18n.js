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
      'bone.hands': 'Hands & Feet'
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
      'bone.hands': 'হাত ও পায়ের হাড়'
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
  }

  // Expose global instance
  window.toruI18n = new ToruI18n();
  window.t = (k, f) => window.toruI18n.t(k, f);
})();
