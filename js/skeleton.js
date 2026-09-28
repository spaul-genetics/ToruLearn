/**
 * skeleton.js - Medical-Grade Realistic 3D Human Skeleton Simulator for ToruLearn
 * Built with Three.js & GLTFLoader.
 * Features:
 *  - 100% anatomically authentic human skeleton (564 individual anatomical meshes)
 *  - Interactive 360° orbit rotation, zoom, pan, and auto-turntable spin
 *  - Precision raycasting click & hover detection on all 206+ bones
 *  - Instant scientific detail inspector card rendering with kid-friendly science facts
 *  - Smooth camera focusing interpolation on specific bones
 *  - 3D glowing annotation pins and tooltips
 *  - Works 100% offline on file:// protocol and on GitHub Pages
 */

class SkeletonSim3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.skeletonRoot = null;
    this.annotationPinsGroup = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clickableBones = [];
    this.boneDataMap = {};
    this.selectedBone = null;
    this.hoveredBone = null;
    this.autoRotate = true;

    // Pointer tracking for differentiating click vs drag
    this.pointerDownPos = { x: 0, y: 0, time: 0 };
    this.isDragging = false;

    // Smooth camera transition variables
    this.cameraTransition = {
      active: false,
      targetCamPos: new THREE.Vector3(),
      targetLookAt: new THREE.Vector3(),
      lerpSpeed: 0.08
    };

    // Tooltip DOM element
    this.tooltipEl = null;

    // Materials
    this.boneMaterial = null;
    this.hoverMaterial = null;
    this.selectedMaterial = null;
    this.cartilageMaterial = null;

    this.init();
  }

  init() {
    this.initBoneDatabase();
    this.setupScene();
    this.setupMaterials();
    this.setupLighting();
    this.setupTooltip();
    this.loadSkeletonModel();
    this.setupUIControls();
    this.animate();
  }

  initBoneDatabase() {
    this.boneDatabase = {
      cranium: {
        id: 'cranium',
        name: 'The Skull (Cranium & Facial Bones)',
        latin: 'Cranium • 22 Interlocking Bones',
        category: 'Axial Skeleton • Head',
        function: 'Armor-grade cranial vault shielding the brain, supporting the sensory organs for vision, hearing, balance, and smell.',
        facts: [
          'The skull is not one single bone! It is made of 22 interlocking puzzle-piece bones joined by zigzag joints called sutures.',
          'Babies are born with flexible soft spots called fontanelles so their rapidly expanding brain has plenty of room to grow.',
          'Your skull can withstand forces up to 1,000 pounds of pressure before cracking—nature’s ultimate helmet!'
        ],
        cameraTarget: { x: 0, y: 10.49, z: -0.2, dist: 9.0 },
        color: '#38bdf8'
      },
      mandible: {
        id: 'mandible',
        name: 'The Jawbone (Mandible)',
        latin: 'Mandibula • Only Movable Skull Bone',
        category: 'Axial Skeleton • Facial',
        function: 'Houses the lower 16 teeth; connects at the temporomandibular joint (TMJ) for chewing, talking, smiling, and singing.',
        facts: [
          'The mandible is the strongest, largest, and only movable bone in your entire skull!',
          'The masseter jaw muscle attached to your mandible can clamp down with a biting force of over 200 pounds.',
          'Your chin is unique in the animal kingdom—humans are the only primates with a distinct protruding chin!'
        ],
        cameraTarget: { x: 0, y: 9.62, z: 0.47, dist: 7.5 },
        color: '#fbbf24'
      },
      clavicle: {
        id: 'clavicle',
        name: 'The Collarbone (Clavicle)',
        latin: 'Clavicula (Latin: "Little Key")',
        category: 'Appendicular Skeleton • Pectoral Girdle',
        function: 'Horizontally oriented strut that braces the shoulder blade away from the ribcage, giving arms full 360° swinging freedom.',
        facts: [
          'The collarbone is shaped like a double-curved italic letter "S" so it acts like a shock absorber.',
          'Because it absorbs impact when people fall onto outstretched hands, it is the most commonly fractured bone in the human body.',
          'It is one of the very first bones to start hardening in an embryo, but the last to finish fusing (around age 25)!'
        ],
        cameraTarget: { x: 0, y: 7.78, z: -0.19, dist: 8.5 },
        color: '#f43f5e'
      },
      scapula: {
        id: 'scapula',
        name: 'The Shoulder Blade (Scapula)',
        latin: 'Scapula • Triangular Wing Bone',
        category: 'Appendicular Skeleton • Shoulder',
        function: 'Triangular flat anchor connecting the arm bone (humerus) to back and shoulder muscles for versatile arm reach.',
        facts: [
          'Your shoulder blades do not have rigid bone joints attaching them to your spine! They float across a bed of 17 muscles.',
          'This floating muscular attachment is why humans can throw baseballs, swim, and climb trees so fluidly.',
          'Ancient Roman gladiators called it "scapula" because its shape resembles a small shovel or trowel.'
        ],
        cameraTarget: { x: 0, y: 6.77, z: -0.96, dist: 9.5 },
        color: '#ec4899'
      },
      sternum: {
        id: 'sternum',
        name: 'The Breastbone (Sternum)',
        latin: 'Sternum • Chest Shield',
        category: 'Axial Skeleton • Thorax',
        function: 'Protective flat shield guarding the heart, lungs, and great aorta vessels right at the anterior midline of the thorax.',
        facts: [
          'Resembles an ancient dagger: the handle (manubrium), blade (body), and tip (xiphoid process).',
          'Rich in red bone marrow: doctors can examine sternal marrow to monitor red and white blood cell production.',
          'During CPR chest compressions, pushing down on the sternum physically pumps the heart underneath!'
        ],
        cameraTarget: { x: 0, y: 6.44, z: 0.84, dist: 8.5 },
        color: '#10b981'
      },
      ribcage: {
        id: 'ribcage',
        name: 'The Ribcage (Costae)',
        latin: '12 Pairs (24 Total Ribs) & Costal Cartilage',
        category: 'Axial Skeleton • Thoracic Cage',
        function: 'Flexible protective cage expanding during breathing while shielding delicate lungs and heart from external blows.',
        facts: [
          'Your ribs expand and contract over 20,000 times every day without breaking, thanks to springy costal cartilage.',
          'You have 7 pairs of "true ribs" (directly attached to sternum), 3 pairs of "false ribs", and 2 pairs of "floating ribs".',
          'About 1 in 200 people are born with an extra 13th rib called a cervical rib!'
        ],
        cameraTarget: { x: 0, y: 5.58, z: -0.06, dist: 11.0 },
        color: '#06b6d4'
      },
      spine: {
        id: 'spine',
        name: 'Vertebral Column (The Spine)',
        latin: 'Columna Vertebralis • 33 Vertebrae',
        category: 'Axial Skeleton • Central Axis',
        function: 'Flexible central pillar carrying upper body weight while sheltering the delicate electrical spinal cord in its neural canal.',
        facts: [
          'You are actually about 1 centimeter taller in the morning! Gravity compresses the gel-filled intervertebral discs during the day.',
          'Giraffes have the exact same number of neck vertebrae as humans—exactly 7 cervical vertebrae, just much larger!',
          'Its S-shaped double curve acts like a giant coil spring, absorbing the shock of every step you run or jump.'
        ],
        cameraTarget: { x: 0, y: 4.73, z: -0.75, dist: 15.0 },
        color: '#a855f7'
      },
      humerus: {
        id: 'humerus',
        name: 'Upper Arm (Humerus)',
        latin: 'Humerus • Upper Limb Bone',
        category: 'Appendicular Skeleton • Arm',
        function: 'Long cylindrical bone powering lifting, throwing, pulling, and precision arm positioning through the shoulder joint.',
        facts: [
          'Ever bumped your "funny bone" and felt a tingling shock? It is named as a pun on "humerus" (humorous)!',
          'The tingle is actually your ulnar nerve getting pinched against the lower bone ridge at your elbow.',
          'Its round ball head fits into a shallow shoulder socket, allowing humans the widest range of motion of any mammal.'
        ],
        cameraTarget: { x: 2.5, y: 5.5, z: -0.56, dist: 11.0 },
        color: '#3b82f6'
      },
      radius_ulna: {
        id: 'radius_ulna',
        name: 'Forearm (Radius & Ulna)',
        latin: 'Antebrachium • Dual Forearm Bones',
        category: 'Appendicular Skeleton • Forearm',
        function: 'Cross over each other like scissors to allow your hand to flip palm-up (supination) or palm-down (pronation).',
        facts: [
          'The radius is on the thumb side; the ulna is on the pinky side forming the point of your elbow.',
          'When you turn your key in a door, your radius literally leaps across the ulna in an X-shape!',
          'Ancient architects used the length of a king’s ulna (from elbow to fingertip) as the official unit called a "cubit".'
        ],
        cameraTarget: { x: 3.2, y: 1.78, z: -0.41, dist: 12.0 },
        color: '#6366f1'
      },
      hand: {
        id: 'hand',
        name: 'Hand & Fingers (Carpals & Phalanges)',
        latin: 'Manus • 27 Bones Per Hand (54 Total)',
        category: 'Appendicular Skeleton • Hand',
        function: 'Master tool of human civilization: opposable thumbs, pinch grips, piano playing, and tool making.',
        facts: [
          'Your two hands contain 54 bones—more than a quarter of all the bones in your entire skeleton!',
          'There are actually no muscles in your fingers! Fingers are moved by wire-like tendons pulled by muscles in your forearm.',
          'Human thumbs are opposable and powered by 9 individual muscles, enabling precision writing and smartphone typing.'
        ],
        cameraTarget: { x: 3.8, y: -1.08, z: 0.58, dist: 8.5 },
        color: '#14b8a6'
      },
      pelvis: {
        id: 'pelvis',
        name: 'The Pelvic Girdle (Hip Bones)',
        latin: 'Pelvis (Latin for "Basin") • Coxal Bones',
        category: 'Appendicular Skeleton • Pelvis',
        function: 'Heavy bony basin transferring full upper body weight to legs while protecting digestive and reproductive organs.',
        facts: [
          'Formed by three fused bones: ilium (hip wings), ischium (sit bones), and pubis.',
          'The pelvis is the clearest bone for forensic scientists to determine whether a skeleton was male or female.',
          'Your center of gravity sits right in the middle of your pelvic bowl, keeping you balanced upright on two feet.'
        ],
        cameraTarget: { x: 0, y: 0.67, z: -0.39, dist: 9.0 },
        color: '#f59e0b'
      },
      femur: {
        id: 'femur',
        name: 'The Thigh Bone (Femur)',
        latin: 'Femur • Longest & Strongest Bone',
        category: 'Appendicular Skeleton • Leg',
        function: 'Carries your entire weight through walking, running, and jumping; anchors the massive quadriceps and hamstring muscles.',
        facts: [
          'The femur is the longest, heaviest, and strongest bone in the human body—making up roughly 26% of your height!',
          'It is stronger than reinforced concrete and can withstand up to 30 times an adult’s body weight before bending.',
          'The hollow marrow cavity inside your femur produces billions of fresh red blood cells every single day.'
        ],
        cameraTarget: { x: 1.6, y: -2.83, z: -0.46, dist: 11.0 },
        color: '#ef4444'
      },
      patella: {
        id: 'patella',
        name: 'The Kneecap (Patella)',
        latin: 'Patella • Largest Sesamoid Bone',
        category: 'Appendicular Skeleton • Knee Joint',
        function: 'Fulcrum shield embedded inside quadriceps tendon that magnifies your leg kick leverage by 30% while protecting the knee.',
        facts: [
          'Babies are born without a hard bony kneecap! It starts as soft cartilage and turns into bone between ages 3 and 5.',
          'It floats inside a tendon rather than being connected to other bones, making it a "sesamoid" bone.',
          'Its backside is coated in the thickest articular cartilage in the body (up to 6 mm) to endure jumping shocks.'
        ],
        cameraTarget: { x: 1.5, y: -5.84, z: -0.07, dist: 7.5 },
        color: '#84cc16'
      },
      tibia_fibula: {
        id: 'tibia_fibula',
        name: 'The Shin (Tibia & Fibula)',
        latin: 'Crus • Shinbone & Splint Bone',
        category: 'Appendicular Skeleton • Lower Leg',
        function: 'The thick tibia bears 90% of your body weight; the slender fibula anchors ankle tendons and calf muscles.',
        facts: [
          'The tibia is the second longest and second strongest bone in the body, right behind the femur.',
          'The sharp front ridge of your shin has almost no padding over it, which is why bumping your shin hurts so much!',
          'The fibula does not bear body weight—surgeons can even borrow a piece of fibula to reconstruct jawbones after accidents.'
        ],
        cameraTarget: { x: 1.5, y: -8.68, z: -0.58, dist: 10.5 },
        color: '#0ea5e9'
      },
      foot: {
        id: 'foot',
        name: 'Foot & Toes (Tarsals & Phalanges)',
        latin: 'Pes • 26 Bones Per Foot (52 Total)',
        category: 'Appendicular Skeleton • Foot',
        function: 'Spring-loaded double arches supporting thousands of footsteps daily while sensing ground terrain balance.',
        facts: [
          'Together, your two feet contain 52 bones—another quarter of your entire body’s skeleton!',
          'The heel bone (calcaneus) is the largest bone in the foot, engineered to absorb the shock of your heel striking the ground.',
          'Leonardo da Vinci famously wrote: "The human foot is a masterpiece of engineering and a work of art."'
        ],
        cameraTarget: { x: 1.6, y: -11.46, z: 0.15, dist: 8.5 },
        color: '#d946ef'
      }
    };
  }

  // Identifies which anatomical category a GLB mesh belongs to
  identifyBone(name, parentName) {
    const s = ((name || '') + ' ' + (parentName || '')).toLowerCase();
    if (s.includes('mandib') || s.includes('lower_')) return 'mandible';
    if (s.includes('frontal') || s.includes('parietal') || s.includes('occipital') || s.includes('temporal') || 
        s.includes('sphenoid') || s.includes('ethmoid') || s.includes('nasal') || s.includes('zygomatic') || 
        s.includes('maxilla') || s.includes('lacrimal') || s.includes('palatine') || s.includes('vomer') || 
        s.includes('incus') || s.includes('malleus') || s.includes('stapes') || s.includes('hyoid') || 
        s.includes('cranium') || s.includes('skull') || s.includes('upper_')) {
      return 'cranium';
    }
    if (s.includes('clavicle')) return 'clavicle';
    if (s.includes('scapula')) return 'scapula';
    if (s.includes('sternum') || s.includes('manubrium') || s.includes('xiphoid')) return 'sternum';
    if (s.includes('rib') || s.includes('costal')) return 'ribcage';
    if (s.includes('vertebra') || s.includes('atlas') || s.includes('axis') || s.includes('sacrum') || s.includes('coccyx') || s.includes('spine')) return 'spine';
    if (s.includes('humerus')) return 'humerus';
    if (s.includes('radius') || s.includes('ulna')) return 'radius_ulna';
    if (s.includes('hand') || s.includes('carpal') || s.includes('metacarpal') || s.includes('capitate') || s.includes('hamate') || 
        s.includes('lunate') || s.includes('scaphoid') || s.includes('trapez') || s.includes('triquetrum') || s.includes('pisiform')) {
      return 'hand';
    }
    if (s.includes('hip') || s.includes('ilium') || s.includes('pelvis') || s.includes('ischium') || s.includes('pubis')) return 'pelvis';
    if (s.includes('femur')) return 'femur';
    if (s.includes('patella')) return 'patella';
    if (s.includes('tibia') || s.includes('fibula')) return 'tibia_fibula';
    if (s.includes('foot') || s.includes('tarsal') || s.includes('metatarsal') || s.includes('calcaneus') || s.includes('talus') || 
        s.includes('cuboid') || s.includes('navicular') || s.includes('cuneiform')) {
      return 'foot';
    }
    return 'spine'; // Anatomical fallback
  }

  // Format clean human-readable name for tooltips and headers
  formatBoneName(meshName, parentName, boneId) {
    const raw = (parentName || meshName || '').replace(/_\d+$/, '').replace(/_/g, ' ');
    // Detect side
    let side = '';
    if (raw.endsWith('.l') || raw.endsWith('l')) side = 'Left ';
    if (raw.endsWith('.r') || raw.endsWith('r')) side = 'Right ';
    const cleanName = raw.replace(/\.[lr]$/i, '').replace(/[lr]$/i, '').trim();

    if (cleanName.length > 2 && cleanName !== 'Bones') {
      return side + cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }
    return this.boneDatabase[boneId]?.name || 'Human Bone';
  }

  setupScene() {
    const w = this.container.clientWidth || 600;
    const h = this.container.clientHeight || 550;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060914);

    this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
    this.camera.position.set(0, 1.5, 30);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    if (window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.target.set(0, 0, 0);
      this.controls.minDistance = 4;
      this.controls.maxDistance = 55;
      this.controls.maxPolarAngle = Math.PI * 0.95;
    }
  }

  setupMaterials() {
    // Medical Bone Ivory Material (warm calcium hue, fine micro-roughness)
    this.boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xede4d4,
      roughness: 0.42,
      metalness: 0.04,
      flatShading: false
    });

    // Hover Highlight Material (luminous amber-gold)
    this.hoverMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
      roughness: 0.28,
      metalness: 0.08
    });

    // Selected Bone Highlight Material (glowing celestial cyan)
    this.selectedMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.22,
      metalness: 0.12
    });

    // Cartilage / Intervertebral Material
    this.cartilageMaterial = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.55,
      metalness: 0.0,
      transparent: true,
      opacity: 0.82
    });
  }

  setupLighting() {
    // Soft deep-space ambient light
    const ambient = new THREE.AmbientLight(0x475569, 1.1);
    this.scene.add(ambient);

    // Main Key Light (Warm ivory medical examination illumination)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.35);
    keyLight.position.set(12, 18, 20);
    this.scene.add(keyLight);

    // Fill Light (Cool cyan studio fill from lower opposite side)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.65);
    fillLight.position.set(-15, 6, 12);
    this.scene.add(fillLight);

    // Rim Silhouette Light (Purple backlight to outline bone contours)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 0.85);
    rimLight.position.set(0, 10, -22);
    this.scene.add(rimLight);

    // Ground platform grid
    const grid = new THREE.GridHelper(26, 18, 0x1e293b, 0x0f172a);
    grid.position.y = -13.0;
    this.scene.add(grid);
  }

  setupTooltip() {
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'skeleton-hover-tooltip hidden';
    this.tooltipEl.innerHTML = '<span class="tooltip-icon">🦴</span> <span class="tooltip-text"></span>';
    this.container.appendChild(this.tooltipEl);
  }

  // ================= 3D MODEL LOADING =================
  loadSkeletonModel() {
    this.showLoadingIndicator(true);

    const onModelLoaded = (gltf) => {
      this.skeletonRoot = new THREE.Group();

      // Normalize model size and center at (0, 0, 0)
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const targetHeight = 24.0;
      const scale = targetHeight / (size.y || 1);

      gltf.scene.position.x = -center.x * scale;
      gltf.scene.position.y = -center.y * scale;
      gltf.scene.position.z = -center.z * scale;
      gltf.scene.scale.set(scale, scale, scale);
      gltf.scene.updateMatrixWorld(true);

      // Register all anatomical bone meshes
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const boneId = this.identifyBone(child.name, child.parent ? child.parent.name : '');
          const boneName = this.formatBoneName(child.name, child.parent ? child.parent.name : '', boneId);

          child.material = this.boneMaterial.clone();
          child.castShadow = true;
          child.receiveShadow = true;

          child.userData = {
            boneId: boneId,
            boneName: boneName,
            originalMaterial: child.material
          };

          this.clickableBones.push(child);
          if (!this.boneDataMap[boneId]) this.boneDataMap[boneId] = [];
          this.boneDataMap[boneId].push(child);
        }
      });

      this.skeletonRoot.add(gltf.scene);
      this.scene.add(this.skeletonRoot);

      this.build3DAnnotationPins();
      this.setupEventListeners();
      this.showLoadingIndicator(false);

      // Select femur by default
      this.selectBoneByName('femur');
    };

    const loader = new THREE.GLTFLoader();

    // Check if embedded in window.SKELETON_GLB_BASE64 for 100% offline & file:// support
    if (window.SKELETON_GLB_BASE64) {
      try {
        const binaryString = window.atob(window.SKELETON_GLB_BASE64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        loader.parse(bytes.buffer, '', onModelLoaded, (err) => {
          console.warn('Error parsing embedded skeleton GLB, falling back to fetch:', err);
          loader.load('assets/models/human_skeleton.glb', onModelLoaded);
        });
        return;
      } catch (err) {
        console.warn('Failed base64 parse, attempting standard load:', err);
      }
    }

    // Fallback standard load
    loader.load('assets/models/human_skeleton.glb', onModelLoaded, undefined, (err) => {
      console.error('Failed to load human_skeleton.glb:', err);
      this.showLoadingIndicator(false);
    });
  }

  showLoadingIndicator(show) {
    let loaderEl = document.getElementById('skeleton-3d-loader');
    if (show) {
      if (!loaderEl) {
        loaderEl = document.createElement('div');
        loaderEl.id = 'skeleton-3d-loader';
        loaderEl.className = 'skeleton-loading-overlay';
        loaderEl.innerHTML = `
          <div class="skeleton-spinner"></div>
          <p style="color: #38bdf8; font-size: 0.95rem; font-weight: 600; margin-top: 12px;">
            Loading Realistic 3D Human Skeleton...
          </p>
          <span style="color: #94a3b8; font-size: 0.78rem;">Assembling 206 Medical Anatomical Bones</span>
        `;
        this.container.appendChild(loaderEl);
      }
      loaderEl.style.display = 'flex';
    } else if (loaderEl) {
      loaderEl.style.display = 'none';
    }
  }

  // ================= 3D INTERACTIVE ANNOTATION PINS =================
  build3DAnnotationPins() {
    this.annotationPinsGroup = new THREE.Group();

    const pinCoords = {
      cranium: { x: 0, y: 11.2, z: 0.4 },
      mandible: { x: 0, y: 9.6, z: 0.8 },
      clavicle: { x: 1.8, y: 8.2, z: 0.4 },
      sternum: { x: 0, y: 6.5, z: 0.8 },
      ribcage: { x: -2.2, y: 5.8, z: 0.6 },
      scapula: { x: -2.0, y: 7.2, z: -0.9 },
      spine: { x: 0, y: 4.0, z: -0.9 },
      humerus: { x: 3.2, y: 5.5, z: 0.1 },
      radius_ulna: { x: 3.6, y: 1.8, z: 0.1 },
      hand: { x: 4.2, y: -1.2, z: 0.4 },
      pelvis: { x: 0, y: 0.8, z: 0.5 },
      femur: { x: 1.6, y: -2.8, z: 0.3 },
      patella: { x: 1.5, y: -5.8, z: 0.5 },
      tibia_fibula: { x: 1.5, y: -8.6, z: 0.2 },
      foot: { x: 1.6, y: -11.5, z: 0.7 }
    };

    const pinGeom = new THREE.SphereGeometry(0.24, 16, 16);
    const ringGeom = new THREE.RingGeometry(0.32, 0.44, 20);

    Object.entries(pinCoords).forEach(([boneId, pos]) => {
      const data = this.boneDatabase[boneId];
      if (!data) return;

      const pinGroup = new THREE.Group();
      pinGroup.position.set(pos.x, pos.y, pos.z);

      const pinMat = new THREE.MeshBasicMaterial({ color: data.color || 0x38bdf8 });
      const pinSphere = new THREE.Mesh(pinGeom, pinMat);

      const ringMat = new THREE.MeshBasicMaterial({
        color: data.color || 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);

      pinGroup.add(pinSphere);
      pinGroup.add(ringMesh);

      pinSphere.userData = { boneId: boneId, boneName: data.name, isPin: true };
      ringMesh.userData = { boneId: boneId, boneName: data.name, isPin: true };

      this.clickableBones.push(pinSphere);
      this.clickableBones.push(ringMesh);
      this.annotationPinsGroup.add(pinGroup);
    });

    this.scene.add(this.annotationPinsGroup);
  }

  // ================= INTERACTION: CLICK & HOVER =================
  setupEventListeners() {
    const canvas = this.renderer.domElement;

    // Track pointer down to distinguish true click from drag
    canvas.addEventListener('pointerdown', (e) => {
      this.pointerDownPos = { x: e.clientX, y: e.clientY, time: Date.now() };
      this.isDragging = false;
    });

    canvas.addEventListener('pointermove', (e) => {
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist > 6) {
        this.isDragging = true;
      }

      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.checkHover(e.clientX, e.clientY);
    });

    canvas.addEventListener('pointerup', (e) => {
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      const elapsed = Date.now() - this.pointerDownPos.time;

      // True click / tap (not a drag)
      if (dist < 8 && elapsed < 600) {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableBones, true);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const boneId = hit.userData.boneId;
          const boneName = hit.userData.boneName;
          if (boneId) {
            this.selectBoneByName(boneId, boneName);
            window.cosmicAudio?.playTink();
          }
        }
      }
    });

    canvas.addEventListener('mouseleave', () => {
      if (this.hoveredBone !== null) {
        this.hoveredBone = null;
        this.updateBoneHighlights();
        this.hideTooltip();
      }
    });

    // Handle container resize
    window.addEventListener('resize', () => this.resize());
  }

  checkHover(clientX, clientY) {
    if (this.isDragging) {
      this.hideTooltip();
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableBones, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const boneId = hit.userData.boneId;
      const boneName = hit.userData.boneName;

      if (boneId !== this.hoveredBone) {
        this.hoveredBone = boneId;
        this.updateBoneHighlights();
        this.renderer.domElement.style.cursor = 'pointer';
      }

      this.showTooltip(boneName || this.boneDatabase[boneId]?.name || 'Bone', clientX, clientY);
    } else {
      if (this.hoveredBone !== null) {
        this.hoveredBone = null;
        this.updateBoneHighlights();
        this.renderer.domElement.style.cursor = 'default';
        this.hideTooltip();
      }
    }
  }

  showTooltip(text, clientX, clientY) {
    if (!this.tooltipEl) return;
    const rect = this.container.getBoundingClientRect();
    const x = clientX - rect.left + 14;
    const y = clientY - rect.top - 28;

    this.tooltipEl.querySelector('.tooltip-text').textContent = text;
    this.tooltipEl.style.transform = `translate(${x}px, ${y}px)`;
    this.tooltipEl.classList.remove('hidden');
  }

  hideTooltip() {
    if (this.tooltipEl) {
      this.tooltipEl.classList.add('hidden');
    }
  }

  // ================= BONE SELECTION & DETAIL DISPLAY =================
  selectBoneByName(boneId, specificSubName = null) {
    window.cosmicAudio?.stopSpeaking();
    const data = this.boneDatabase[boneId];
    if (!data) return;

    this.selectedBone = boneId;
    this.updateBoneHighlights();
    this.renderInspectorCard(data, specificSubName);

    // Sync active state on bone quick ribbon
    document.querySelectorAll('.bone-quick-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bone === boneId);
    });

    // Smoothly focus camera onto targeted bone
    if (data.cameraTarget) {
      const ct = data.cameraTarget;
      this.smoothCameraTo(ct.x, ct.y, ct.z, ct.dist);
    }

    // On mobile, ensure inspector card is visible
    if (window.innerWidth < 860) {
      const card = document.getElementById('bone-inspector-card');
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  smoothCameraTo(tx, ty, tz, dist) {
    if (!this.controls) return;
    this.cameraTransition.targetLookAt.set(tx, ty, tz);

    const currentAngle = Math.atan2(this.camera.position.x, this.camera.position.z);
    this.cameraTransition.targetCamPos.set(
      tx + Math.sin(currentAngle) * dist,
      ty + 1.2,
      tz + Math.cos(currentAngle) * dist
    );
    this.cameraTransition.active = true;
  }

  updateBoneHighlights() {
    for (const [boneId, meshes] of Object.entries(this.boneDataMap)) {
      const isSelected = boneId === this.selectedBone;
      const isHovered = boneId === this.hoveredBone;

      meshes.forEach(m => {
        if (isSelected) {
          m.material = this.selectedMaterial;
        } else if (isHovered) {
          m.material = this.hoverMaterial;
        } else {
          m.material = this.boneMaterial;
        }
      });
    }
  }

  renderInspectorCard(data, specificSubName = null) {
    const card = document.getElementById('bone-inspector-card');
    if (!card) return;

    const displayName = specificSubName && specificSubName !== data.name
      ? `${specificSubName} <span style="font-size: 0.95rem; color: #94a3b8; font-weight: 400;">(${data.name})</span>`
      : data.name;

    card.innerHTML = `
      <div class="bone-header-row" style="border-left: 4px solid ${data.color}; padding-left: 14px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          <span class="card-cat-badge" style="background:${data.color}22; border-color:${data.color}55; color:${data.color};">
            ${data.category}
          </span>
          <span style="font-size: 0.78rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 2px 8px; border-radius: 999px;">
            ✨ Medical 3D Mesh Active
          </span>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin: 6px 0 2px;">
          ${displayName}
        </h3>
        <span style="font-size: 0.85rem; color: #94a3b8; font-style: italic;">
          ${data.latin}
        </span>
      </div>

      <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 16px;">
        <strong style="color: #38bdf8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em;">Primary Function:</strong>
        <p style="font-size: 0.92rem; color: #f1f5f9; line-height: 1.5; margin-top: 4px;">
          ${data.function}
        </p>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; gap: 8px;">
          <h4 style="font-size: 0.95rem; color: #ffffff; margin: 0; display: flex; align-items: center; gap: 6px;">
            <span>💡</span> Fascinating Kid Science Facts:
          </h4>
          <button id="skeleton-speak-btn" class="speak-fact-btn" title="Read bone facts aloud" aria-label="Read bone facts aloud">
            <span class="speak-icon">🔊</span>
            <span class="speak-label">Read Aloud</span>
          </button>
        </div>
        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
          ${data.facts.map(f => `
            <li style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5; background: rgba(255, 255, 255, 0.04); padding: 8px 12px; border-radius: var(--radius-sm); border-left: 2px solid ${data.color};">
              ${f}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="glass-panel" style="padding: 10px 14px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: #94a3b8; flex-wrap: wrap; gap: 6px;">
        <span>🔍 Click ANY bone in 3D to inspect • Drag 360° • Pinch to zoom</span>
        <span style="color: #38bdf8; font-weight: 600;">206 Total Adult Bones</span>
      </div>
    `;

    // Bind Read Aloud narration button
    const speakBtn = document.getElementById('skeleton-speak-btn');
    if (speakBtn) {
      const textToRead = `${displayName}. Also known as ${data.latin}. Function: ${data.function}. Fun facts: ${data.facts.join('. ')}`;
      speakBtn.addEventListener('click', () => {
        if (window.cosmicAudio?.isSpeaking()) {
          window.cosmicAudio.stopSpeaking();
          speakBtn.classList.remove('speaking');
          speakBtn.innerHTML = '<span class="speak-icon">🔊</span><span class="speak-label">Read Aloud</span>';
          return;
        }

        speakBtn.classList.add('speaking');
        speakBtn.innerHTML = '<span class="speak-icon">⏹</span><span class="speak-label">Stop</span>';

        window.cosmicAudio?.speakText(
          textToRead,
          () => {},
          () => {
            speakBtn.classList.remove('speaking');
            speakBtn.innerHTML = '<span class="speak-icon">🔊</span><span class="speak-label">Read Aloud</span>';
          },
          () => {
            speakBtn.classList.remove('speaking');
            speakBtn.innerHTML = '<span class="speak-icon">🔊</span><span class="speak-label">Read Aloud</span>';
          }
        );
      });
    }
  }

  setupUIControls() {
    // Quick Bone Ribbon buttons
    document.querySelectorAll('.bone-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectBoneByName(btn.dataset.bone);
        window.cosmicAudio?.playTink();
      });
    });

    // View Preset buttons
    document.getElementById('skeleton-reset-btn')?.addEventListener('click', () => {
      this.resetFullView();
      window.cosmicAudio?.playClick();
    });

    document.getElementById('skeleton-head-btn')?.addEventListener('click', () => {
      this.selectBoneByName('cranium');
    });

    document.getElementById('skeleton-chest-btn')?.addEventListener('click', () => {
      this.selectBoneByName('ribcage');
    });

    document.getElementById('skeleton-arm-btn')?.addEventListener('click', () => {
      this.selectBoneByName('humerus');
    });

    document.getElementById('skeleton-leg-btn')?.addEventListener('click', () => {
      this.selectBoneByName('femur');
    });

    // Auto-Rotate Toggle
    const autoBtn = document.getElementById('skeleton-rotate-btn');
    autoBtn?.addEventListener('click', () => {
      this.autoRotate = !this.autoRotate;
      autoBtn.classList.toggle('active', this.autoRotate);
      autoBtn.textContent = this.autoRotate ? '⏸ Pause Spin' : '🔄 Auto-Spin';
      window.cosmicAudio?.playClick();
    });
  }

  resetFullView() {
    this.selectedBone = null;
    this.updateBoneHighlights();
    this.smoothCameraTo(0, 0, 0, 30);
  }

  resize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w > 0 && h > 0) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Turntable slow rotation
    if (this.autoRotate && this.skeletonRoot) {
      this.skeletonRoot.rotation.y += 0.0032;
      if (this.annotationPinsGroup) {
        this.annotationPinsGroup.rotation.y = this.skeletonRoot.rotation.y;
      }
    }

    // Smooth camera interpolation
    if (this.cameraTransition.active && this.controls) {
      this.camera.position.lerp(this.cameraTransition.targetCamPos, this.cameraTransition.lerpSpeed);
      this.controls.target.lerp(this.cameraTransition.targetLookAt, this.cameraTransition.lerpSpeed);

      if (this.camera.position.distanceTo(this.cameraTransition.targetCamPos) < 0.1 &&
          this.controls.target.distanceTo(this.cameraTransition.targetLookAt) < 0.1) {
        this.cameraTransition.active = false;
      }
    }

    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Global initializer
window.SkeletonSim3D = SkeletonSim3D;
window.initSkeleton3D = (force = false) => {
  const container = document.getElementById('skeleton-3d-canvas-box');
  if (!container) return;
  if (force && window.skeletonSim3D) {
    try { window.skeletonSim3D.destroy(); } catch(e) {}
    window.skeletonSim3D = null;
  }
  if (!window.skeletonSim3D) {
    window.skeletonSim3D = new SkeletonSim3D('skeleton-3d-canvas-box');
  }
};
