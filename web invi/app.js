/* ═══════════════════════════════════════════════════════
   House Warming Invitation — app.js
   Mr. & Mrs. Siva Babu | 27 April 2026
   ═══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── CONFIG ─────────────────────────────────────────── */
const DESIGN_W      = 720;   // internal canvas width
const DESIGN_H      = 1284;  // internal canvas height (544 gif + 740 lower)
const SCROLL_MULT   = 2.5;   // how many screen-heights the scroll lasts
const FRAME_FOLDER  = '../low door/';
const FRAME_TIMEOUT = 10000; // ms before we give up waiting and start anyway

/* ── FRAME FILENAMES (124 frames, .gif extension) ─── */
const framePaths = [
  "frame_000_delay-0.04s.gif","frame_001_delay-0.04s.gif","frame_002_delay-0.05s.gif",
  "frame_003_delay-0.04s.gif","frame_004_delay-0.04s.gif","frame_005_delay-0.04s.gif",
  "frame_006_delay-0.04s.gif","frame_007_delay-0.04s.gif","frame_008_delay-0.05s.gif",
  "frame_009_delay-0.04s.gif","frame_010_delay-0.04s.gif","frame_011_delay-0.04s.gif",
  "frame_012_delay-0.04s.gif","frame_013_delay-0.04s.gif","frame_014_delay-0.05s.gif",
  "frame_015_delay-0.04s.gif","frame_016_delay-0.04s.gif","frame_017_delay-0.04s.gif",
  "frame_018_delay-0.04s.gif","frame_019_delay-0.04s.gif","frame_020_delay-0.05s.gif",
  "frame_021_delay-0.04s.gif","frame_022_delay-0.04s.gif","frame_023_delay-0.04s.gif",
  "frame_024_delay-0.04s.gif","frame_025_delay-0.04s.gif","frame_026_delay-0.05s.gif",
  "frame_027_delay-0.04s.gif","frame_028_delay-0.04s.gif","frame_029_delay-0.04s.gif",
  "frame_030_delay-0.04s.gif","frame_031_delay-0.04s.gif","frame_032_delay-0.05s.gif",
  "frame_033_delay-0.04s.gif","frame_034_delay-0.04s.gif","frame_035_delay-0.04s.gif",
  "frame_036_delay-0.04s.gif","frame_037_delay-0.04s.gif","frame_038_delay-0.05s.gif",
  "frame_039_delay-0.04s.gif","frame_040_delay-0.04s.gif","frame_041_delay-0.04s.gif",
  "frame_042_delay-0.04s.gif","frame_043_delay-0.04s.gif","frame_044_delay-0.05s.gif",
  "frame_045_delay-0.04s.gif","frame_046_delay-0.04s.gif","frame_047_delay-0.04s.gif",
  "frame_048_delay-0.04s.gif","frame_049_delay-0.04s.gif","frame_050_delay-0.05s.gif",
  "frame_051_delay-0.04s.gif","frame_052_delay-0.04s.gif","frame_053_delay-0.04s.gif",
  "frame_054_delay-0.04s.gif","frame_055_delay-0.04s.gif","frame_056_delay-0.05s.gif",
  "frame_057_delay-0.04s.gif","frame_058_delay-0.04s.gif","frame_059_delay-0.04s.gif",
  "frame_060_delay-0.04s.gif","frame_061_delay-0.04s.gif","frame_062_delay-0.05s.gif",
  "frame_063_delay-0.04s.gif","frame_064_delay-0.04s.gif","frame_065_delay-0.04s.gif",
  "frame_066_delay-0.04s.gif","frame_067_delay-0.04s.gif","frame_068_delay-0.05s.gif",
  "frame_069_delay-0.04s.gif","frame_070_delay-0.04s.gif","frame_071_delay-0.04s.gif",
  "frame_072_delay-0.04s.gif","frame_073_delay-0.04s.gif","frame_074_delay-0.05s.gif",
  "frame_075_delay-0.04s.gif","frame_076_delay-0.04s.gif","frame_077_delay-0.04s.gif",
  "frame_078_delay-0.04s.gif","frame_079_delay-0.04s.gif","frame_080_delay-0.05s.gif",
  "frame_081_delay-0.04s.gif","frame_082_delay-0.04s.gif","frame_083_delay-0.04s.gif",
  "frame_084_delay-0.04s.gif","frame_085_delay-0.04s.gif","frame_086_delay-0.05s.gif",
  "frame_087_delay-0.04s.gif","frame_088_delay-0.04s.gif","frame_089_delay-0.04s.gif",
  "frame_090_delay-0.04s.gif","frame_091_delay-0.04s.gif","frame_092_delay-0.05s.gif",
  "frame_093_delay-0.04s.gif","frame_094_delay-0.04s.gif","frame_095_delay-0.04s.gif",
  "frame_096_delay-0.04s.gif","frame_097_delay-0.04s.gif","frame_098_delay-0.05s.gif",
  "frame_099_delay-0.04s.gif","frame_100_delay-0.04s.gif","frame_101_delay-0.04s.gif",
  "frame_102_delay-0.04s.gif","frame_103_delay-0.04s.gif","frame_104_delay-0.05s.gif",
  "frame_105_delay-0.04s.gif","frame_106_delay-0.04s.gif","frame_107_delay-0.04s.gif",
  "frame_108_delay-0.04s.gif","frame_109_delay-0.04s.gif","frame_110_delay-0.05s.gif",
  "frame_111_delay-0.04s.gif","frame_112_delay-0.04s.gif","frame_113_delay-0.04s.gif",
  "frame_114_delay-0.04s.gif","frame_115_delay-0.04s.gif","frame_116_delay-0.05s.gif",
  "frame_117_delay-0.04s.gif","frame_118_delay-0.04s.gif","frame_119_delay-0.04s.gif",
  "frame_120_delay-0.04s.gif","frame_121_delay-0.04s.gif","frame_122_delay-0.05s.gif",
  "frame_123_delay-0.04s.gif"
];

/* ── DOM REFS ────────────────────────────────────────── */
const loadingScreen   = document.getElementById('loading-screen');
const loadingProgress = document.getElementById('loading-progress');
const videoLayer      = document.getElementById('video-layer');
const vid1            = document.getElementById('vid1');
const vid2            = document.getElementById('vid2');
const tapHint         = document.getElementById('tap-hint');
const stickyCanvas    = document.getElementById('sticky-canvas');
const upperGifCanvas  = document.getElementById('upper-gif-canvas');
const lowerDoorCanvas = document.getElementById('lower-door-canvas');
const textLayer       = document.getElementById('text-layer');
const blockHeader     = document.getElementById('block-header');
const scrollWrapper   = document.getElementById('scroll-wrapper');

/* ── SCALE: fit 720px design into phone viewport ─────── */
let currentScale = 1;

function applyScale() {
  const vw = Math.min(window.innerWidth, 480);
  currentScale = vw / DESIGN_W;

  const scaledH = DESIGN_H * currentScale;
  let topOffset = 0;
  if (scaledH < window.innerHeight) {
    topOffset = (window.innerHeight - scaledH) / 2;
  }

  /* Scale and center every direct child of sticky-canvas */
  Array.from(stickyCanvas.children).forEach(el => {
    el.style.left = '50%';
    el.style.top = topOffset + 'px';
    el.style.transform = `translateX(-50%) scale(${currentScale})`;
  });

  /* sticky-canvas takes full viewport height */
  stickyCanvas.style.height = window.innerHeight + 'px';

  /* scroll-wrapper height = visible canvas height × scroll multiplier */
  scrollWrapper.style.height = Math.max(scaledH * SCROLL_MULT, window.innerHeight * SCROLL_MULT) + 'px';

  ScrollTrigger.refresh();
}

window.addEventListener('resize', applyScale);
applyScale();

/* ── ASSET LOADING ───────────────────────────────────── */
const frames = [];
let loadedCount  = 0;
const totalAssets = framePaths.length + 1; /* frames + updoor gif */
let loadingDone  = false;

function onAssetLoaded() {
  loadedCount++;
  const pct = Math.floor((loadedCount / totalAssets) * 100);
  if (loadingProgress) loadingProgress.textContent = pct + '%';
  if (loadedCount >= totalAssets && !loadingDone) {
    loadingDone = true;
    beginExperience();
  }
}

/* Preload lower door frames */
framePaths.forEach(name => {
  const img = new Image();
  img.onload  = onAssetLoaded;
  img.onerror = onAssetLoaded; /* count even if missing so we don't stall */
  img.src = FRAME_FOLDER + name;
  frames.push(img);
});

/* Preload upper GIF (just needs to be in browser cache) */
const gifPreload = new Image();
gifPreload.onload  = onAssetLoaded;
gifPreload.onerror = onAssetLoaded;
gifPreload.src = '../compos/updoor.gif';

/* Safety timeout — start anyway after FRAME_TIMEOUT ms */
setTimeout(() => {
  if (!loadingDone) {
    loadingDone = true;
    beginExperience();
  }
}, FRAME_TIMEOUT);

/* ── PHASE 0 → 1: Hide loader, show videos ───────────── */
function beginExperience() {
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    startPhase1();
  }, 650);
}

/* ── PHASE 1: Video 1 ────────────────────────────────── */
let tapHintTimer = null;

function startPhase1() {
  document.body.style.overflow = 'hidden';
  videoLayer.style.display = 'block';

  vid1.play().catch(() => {
    /* If autoplay blocked (e.g. desktop), just wait for tap */
  });

  tapHintTimer = setTimeout(() => {
    tapHint.style.opacity = '1';
  }, 6000);

  document.addEventListener('pointerdown', handleFirstTap, { once: true });
}

function handleFirstTap() {
  clearTimeout(tapHintTimer);
  tapHint.style.opacity = '0';
  startPhase2();
}

/* ── PHASE 2: Crossfade vid1 → vid2 ─────────────────── */
function startPhase2() {
  vid2.play().catch(() => {});

  gsap.to(vid1, { opacity: 0, duration: 0.6, ease: 'power1.inOut' });
  gsap.to(vid2, { opacity: 1, duration: 0.6, ease: 'power1.inOut' });

  vid2.addEventListener('ended', startPhase3, { once: true });

  /* Fallback if video doesn't fire 'ended' (e.g. no video file yet) */
  setTimeout(() => {
    if (videoLayer.style.display !== 'none') startPhase3();
  }, 15000);
}

/* ── PHASE 3: Lock last frame, reveal canvas ─────────── */
function startPhase3() {
  vid2.pause();

  /* Fade out video layer */
  gsap.to(videoLayer, {
    opacity: 0, duration: 0.5, ease: 'power1.inOut',
    onComplete: () => { videoLayer.style.display = 'none'; }
  });

  /* Show sticky canvas */
  stickyCanvas.style.display = 'block';
  document.body.style.overflow = '';

  /* Draw first lower-door frame immediately so canvas isn't blank */
  const lCtx = lowerDoorCanvas.getContext('2d');
  if (frames[0] && frames[0].complete) {
    lCtx.drawImage(frames[0], 0, 544, 720, 740);
  }

  /* Play upper GIF once then lock — use <img> swap trick:
     show gif, after its natural duration replace with last frame via canvas */
  playUpperGifOnce();

  /* Reveal header text */
  gsap.to(blockHeader, {
    opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out'
  });

  /* Build scroll animations after a tick */
  setTimeout(initScrollAnimations, 100);
}

/* ── UPPER GIF: play once, lock on last frame ────────── */
function playUpperGifOnce() {
  /*
   * Strategy: We load the GIF as a normal <img> which will loop.
   * We measure the GIF's total duration from the frame delays we already know
   * (124 frames × ~0.04s average ≈ 5s), then after that duration we
   * capture the final frame to a canvas and hide the img.
   *
   * For even better control, swap to canvas-decoded approach below if
   * gifuct-js is available and frames are in a decodable format.
   */

  const gifDuration = framePaths.length * 0.04 * 1000; /* approx ms */

  /* Create a temporary img to show the GIF */
  const gifImg = document.createElement('img');
  gifImg.src = '../compos/updoor.gif';
  /* Calculate current top offset to match the rest of the canvas */
  const scaledH = DESIGN_H * currentScale;
  let topOffset = 0;
  if (scaledH < window.innerHeight) {
    topOffset = (window.innerHeight - scaledH) / 2;
  }

  gifImg.style.cssText = `
    position: absolute;
    top: ${topOffset}px; left: 50%;
    width: 720px; height: 544px;
    transform-origin: top center;
    transform: translateX(-50%) scale(${currentScale});
    z-index: 2;
    opacity: 0;
  `;
  document.getElementById('sticky-canvas').appendChild(gifImg);

  /* Fade in */
  gsap.to(gifImg, { opacity: 1, duration: 0.5 });

  /* The GIF will stay on the screen natively, avoiding any silent Canvas cross-origin bugs that made it disappear. */
}

/* ── SCROLL ANIMATIONS ───────────────────────────────── */
function initScrollAnimations() {
  applyScale(); /* refresh after canvas is visible */

  /* ── Split text helper ── */
  function splitToChars(el) {
    const text = el.innerText;
    el.innerHTML = '';
    [...text].forEach(ch => {
      if (ch === '\n') {
        el.appendChild(document.createElement('br'));
        return;
      }
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });
    return el.querySelectorAll('.char');
  }

  /* ── Header fade-out on scroll ── */
  /* We iterate over the text divs inside the header so they don't lose their font classes */
  blockHeader.querySelectorAll('div').forEach(el => {
    const chars = splitToChars(el);
    gsap.fromTo(chars,
      { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1 },
      {
        opacity: 0, yPercent: -120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%',
        ease: 'back.inOut(2)', stagger: 0.03,
        scrollTrigger: {
          trigger: scrollWrapper,
          start: 'top top',
          end: '8% top',
          scrub: true,
          immediateRender: false
        }
      }
    );
  });
  
  /* Also fade out the line-divider perfectly */
  gsap.fromTo(blockHeader.querySelectorAll('.line-divider'),
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: scrollWrapper,
        start: 'top top',
        end: '8% top',
        scrub: true,
        immediateRender: false
      }
    }
  );

  /* ── Unified Sequence: Date/Time Block (12% to 36%) ── */
  const blockDateTime = document.getElementById('block-date-time');
  blockDateTime.querySelectorAll('.scroll-float').forEach((el, i) => {
    const chars = splitToChars(el);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollWrapper,
        start: '12% top',
        end: '36% top',
        scrub: true
      }
    });

    // Animate IN (12% to ~20%)
    tl.fromTo(chars,
      { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
      { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, ease: 'back.inOut(2)', stagger: 0.03, duration: 1 }
    )
    // Hold visible
    .to(chars, { opacity: 1, duration: 1 })
    // Animate OUT (~28% to 36%)
    .to(chars,
      { opacity: 0, yPercent: -120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%', ease: 'back.inOut(2)', stagger: 0.03, duration: 1 }
    );
  });

  const tlD = gsap.timeline({
    scrollTrigger: { trigger: scrollWrapper, start: '18% top', end: '38% top', scrub: true }
  });
  const rels = blockDateTime.querySelectorAll('.reveal-el');
  tlD.fromTo(rels, { opacity: 0 }, { opacity: 1, duration: 1 })
     .to(rels, { opacity: 1, duration: 1 })
     .to(rels, { opacity: 0, duration: 1 });

  /* ── Fade IN: Venue Block (40% to 50%) ── */
  const blockVenue = document.getElementById('block-venue');
  blockVenue.querySelectorAll('.scroll-float').forEach((el, i) => {
    const chars = splitToChars(el);
    gsap.fromTo(chars,
      { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
      {
        opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1,
        ease: 'back.inOut(2)', stagger: 0.03,
        scrollTrigger: {
          trigger: scrollWrapper,
          start: '40% top',
          end: '48% top',
          scrub: true
        }
      }
    );
  });
  gsap.fromTo(blockVenue.querySelectorAll('.reveal-el'), { opacity: 0 }, {
    opacity: 1,
    scrollTrigger: { trigger: scrollWrapper, start: '46% top', end: '52% top', scrub: true }
  });

  /* ── Lower door frame-by-frame ── */
  const lCtx = lowerDoorCanvas.getContext('2d');

  ScrollTrigger.create({
    trigger: scrollWrapper,
    start: '12% top',     /* frames start changing early */
    end:   '58% top',     /* finish before absolute bottom of page limit */
    scrub: true,
    onUpdate: (self) => {
      const idx = Math.min(
        Math.floor(self.progress * frames.length),
        frames.length - 1
      );
      const img = frames[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        lCtx.clearRect(0, 544, 720, 740);
        lCtx.drawImage(img, 0, 544, 720, 740);
      }
    }
  });

  /* Guaranteed Anti-Flash: Unlock opacity wrappers safely after GSAP renders its first tick */
  setTimeout(() => {
    const bdt = document.getElementById('block-date-time');
    const bv = document.getElementById('block-venue');
    if (bdt) bdt.style.opacity = '1';
    if (bv) bv.style.opacity = '1';
    document.querySelectorAll('.scroll-float').forEach(el => el.style.opacity = '1');
  }, 100);
}
