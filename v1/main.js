/* =========================================================
   NORTHSTAR — shared behaviour
   1. Ambient starfield canvas (restrained: slow drift + soft
      twinkle, respects prefers-reduced-motion)
   2. Mobile nav toggle
   3. Contact form -> mailto fallback (ready to swap for a
      form endpoint like Formspree, see contact.html comment)
   ========================================================= */

/* =========================================================
   NORTHSTAR — shared behaviour
   1. Pseudo-3D warp starfield: continuous forward drift, with
      scroll bursts accelerating it into streaks (canvas, 2D
      perspective projection — no WebGL dependency)
   2. Story spine: a glowing trajectory line woven through the
      page behind the content, drawn in as you scroll
   3. Hero warp: the homepage star grows and the hero dissolves
      as you leave it, like flying through
   4. Scroll storytelling reveal engine + pinned process sequence
   5. Mobile nav toggle
   6. Contact form -> mailto fallback
   ========================================================= */

(function starfield(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let stars = [], w, h, dpr, cx, cy;
  const MAX_Z = 1000, FOCAL = 300;
  let boost = 0, lastScrollY = window.scrollY || 0;

  function resetStar(s){
    s.x = (Math.random()-0.5) * w * 1.7;
    s.y = (Math.random()-0.5) * h * 1.7;
    s.z = MAX_Z;
    s.pz = MAX_Z;
    return s;
  }

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    cx = w/2; cy = h/2;
    canvas.width = w*dpr; canvas.height = h*dpr;
    canvas.style.width = w+'px'; canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.min(320, Math.max(120, Math.floor((w*h)/5400)));
    stars = new Array(count).fill(0).map(() => {
      const s = resetStar({});
      s.z = Math.random()*MAX_Z; // scatter initial depth so it's populated on load
      s.pz = s.z;
      return s;
    });
  }

  function onScroll(){
    const y = window.scrollY || 0;
    boost = Math.min(16, boost + Math.abs(y - lastScrollY) * 0.4);
    lastScrollY = y;
  }

  function drawStatic(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      const sx = cx + (s.x/s.z)*FOCAL, sy = cy + (s.y/s.z)*FOCAL;
      const d = 1 - Math.min(1, s.z/MAX_Z);
      ctx.beginPath();
      ctx.fillStyle = `rgba(244,241,233,${0.15+d*0.55})`;
      ctx.arc(sx, sy, 0.4+d*1.6, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function drawMoving(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      s.pz = s.z;
      s.z -= (0.9 + boost);
      if(s.z <= 1){ resetStar(s); continue; }
      const sx = cx + (s.x/s.z)*FOCAL, sy = cy + (s.y/s.z)*FOCAL;
      if(sx < -60 || sx > w+60 || sy < -60 || sy > h+60) continue;
      const psx = cx + (s.x/s.pz)*FOCAL, psy = cy + (s.y/s.pz)*FOCAL;
      const d = 1 - Math.min(1, s.z/MAX_Z);
      ctx.strokeStyle = `rgba(244,241,233,${0.12+d*0.72})`;
      ctx.lineWidth = 0.35+d*1.7;
      ctx.beginPath();
      ctx.moveTo(psx,psy);
      ctx.lineTo(sx,sy);
      ctx.stroke();
    }
    boost *= 0.90;
    requestAnimationFrame(drawMoving);
  }

  window.addEventListener('resize', resize);
  resize();

  if(reduceMotion){
    drawStatic();
  } else {
    window.addEventListener('scroll', onScroll, { passive:true });
    drawMoving();
  }
})();

(function progressBar(){
  const bar = document.getElementById('progress-bar');
  if(!bar) return;
  let ticking = false;
  function update(){
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    bar.style.width = (progress*100) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive:true });
  window.addEventListener('resize', update);
  update();
})();

/* ---------- scroll storytelling: reveal engine ----------
   words  -> headline splits into words, each masked, rising in
             staggered by reading order (feels narrated, not just faded)
   rise   -> a block fades + lifts in as a whole
   cascade-> each direct child of the container staggers in behind it
   Hero elements fire immediately on load (they're already on screen);
   everything else fires the first time it scrolls into view. */
(function revealEngine(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function splitWords(el){
    if(el.dataset.split === 'done') return;
    const text = el.textContent.trim();
    const words = text.split(/\s+/).filter(Boolean);
    el.innerHTML = words.map((w,i) =>
      `<span class="word" style="transition-delay:${i*42}ms"><span class="word-inner">${w}</span></span>`
    ).join(' ');
    el.dataset.split = 'done';
  }

  const all = Array.from(document.querySelectorAll('[data-reveal]'));
  all.forEach(el => { if(el.getAttribute('data-reveal') === 'words') splitWords(el); });

  if(reduceMotion || !('IntersectionObserver' in window)){
    all.forEach(el => el.classList.add('is-in'));
    return;
  }

  const heroEls = all.filter(el => el.closest('.hero'));
  const restEls = all.filter(el => !el.closest('.hero'));

  // hero: cinematic entrance on load, not scroll-triggered
  window.setTimeout(() => {
    heroEls.forEach(el => el.classList.add('is-in'));
  }, 120);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.18, rootMargin:'0px 0px -6% 0px' });
  restEls.forEach(el => io.observe(el));
})();

/* ---------- process story: pinned scroll-scrub sequence ----------
   ".process-story" sections contain a tall (.process-pin-wrap) with
   a sticky (.process-pin) inner view. As the user scrolls through
   the tall wrapper, scroll position maps to a stage index, and that
   stage's text becomes active while the rail fills toward it — the
   "How We Work" steps play out one at a time instead of sitting in
   a static grid. Falls back to a plain stacked list under 860px
   (handled in CSS) where every stage is simply visible at once. */
(function processStory(){
  const stories = document.querySelectorAll('.process-story');
  if(!stories.length) return;

  stories.forEach(story => {
    const wrap = story.querySelector('.process-pin-wrap');
    const stages = Array.from(story.querySelectorAll('.process-stage'));
    const nums = Array.from(story.querySelectorAll('.process-stage-nums li'));
    const fill = story.querySelector('.process-rail-fill');
    if(!wrap || !stages.length) return;

    let active = -1;
    function update(){
      if(window.innerWidth <= 860){
        stages.forEach(s => s.classList.add('is-active'));
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total,1));
      const progress = total > 0 ? scrolled/total : 0;
      let idx = Math.min(stages.length-1, Math.floor(progress * stages.length));
      if(progress >= 0.995) idx = stages.length-1;
      if(idx !== active){
        active = idx;
        stages.forEach((s,i) => s.classList.toggle('is-active', i===idx));
        nums.forEach((n,i) => n.classList.toggle('is-active', i<=idx));
      }
      if(fill) fill.style.width = (Math.min(1,progress)*100) + '%';
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if(!ticking){ requestAnimationFrame(() => { update(); ticking=false; }); ticking = true; }
    }, { passive:true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });
})();

/* ---------- story spine: trajectory line woven through the page ----------
   Builds one long, softly glowing path that winds down through the
   document behind the content, passing through each [data-way]
   section as a waypoint. It draws itself in as the page scrolls
   and each waypoint lights up as you reach it — ambient background
   art, not a navigation control. Skips pages with <2 waypoints. */
(function storySpine(){
  const targets = Array.from(document.querySelectorAll('[data-way]'));
  if(targets.length < 2) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wrap = document.createElement('div');
  wrap.className = 'story-spine';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<svg preserveAspectRatio="none">' +
      '<defs>' +
        '<linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#D6A854" stop-opacity="0.04"/>' +
          '<stop offset="14%" stop-color="#D6A854" stop-opacity="0.55"/>' +
          '<stop offset="50%" stop-color="#5FA8A0" stop-opacity="0.4"/>' +
          '<stop offset="86%" stop-color="#D6A854" stop-opacity="0.55"/>' +
          '<stop offset="100%" stop-color="#D6A854" stop-opacity="0.04"/>' +
        '</linearGradient>' +
        '<filter id="spineGlow" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur stdDeviation="2.2" result="blur"/>' +
          '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
        '</filter>' +
      '</defs>' +
      '<path class="spine-path" fill="none" stroke="url(#spineGrad)" stroke-width="1.4" filter="url(#spineGlow)"/>' +
    '</svg>' +
    '<div class="spine-nodes"></div>';
  document.body.prepend(wrap);

  const svg = wrap.querySelector('svg');
  const path = wrap.querySelector('.spine-path');
  const nodeLayer = wrap.querySelector('.spine-nodes');
  const xPattern = [50, 20, 76, 28, 68, 40, 60];

  let nodeEls = [], pathLen = 0;

  function build(){
    const docHeight = document.documentElement.scrollHeight;
    wrap.style.height = docHeight + 'px';
    svg.setAttribute('viewBox', `0 0 100 ${docHeight}`);
    svg.setAttribute('height', docHeight);

    const pts = targets.map((t,i) => {
      const rect = t.getBoundingClientRect();
      const y = rect.top + window.scrollY + rect.height/2;
      return { x: xPattern[i % xPattern.length], y };
    });

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for(let i=0; i<pts.length-1; i++){
      const p0 = pts[i], p1 = pts[i+1];
      const mx = (p0.x+p1.x)/2, my = (p0.y+p1.y)/2;
      d += ` Q ${p0.x} ${p0.y} ${mx} ${my}`;
    }
    const last = pts[pts.length-1];
    d += ` T ${last.x} ${last.y}`;
    path.setAttribute('d', d);

    nodeLayer.innerHTML = '';
    nodeEls = pts.map(p => {
      const dot = document.createElement('div');
      dot.className = 'spine-node';
      dot.style.left = p.x + '%';
      dot.style.top = p.y + 'px';
      nodeLayer.appendChild(dot);
      return dot;
    });

    if(!reduceMotion){
      pathLen = path.getTotalLength();
      path.style.strokeDasharray = String(pathLen);
      path.style.strokeDashoffset = String(pathLen);
    }
  }

  function update(){
    if(reduceMotion) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY/docHeight)) : 0;
    path.style.strokeDashoffset = String(Math.max(0, pathLen - pathLen*progress));
    nodeEls.forEach((el,i) => {
      const pos = targets[i].getBoundingClientRect().top + window.scrollY;
      el.classList.toggle('is-lit', window.scrollY > pos - window.innerHeight*0.6);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(() => { update(); ticking=false; }); ticking=true; }
  }, { passive:true });
  window.addEventListener('resize', () => { build(); update(); });
  window.addEventListener('load', () => { build(); update(); });
  build();
  update();
})();

/* ---------- hero warp: fly through the star into the site ----------
   Homepage only. As the visitor scrolls out of the hero, the star
   mark grows and dissolves and the hero copy is "left behind" —
   instead of the hero just being the first stacked section. */
(function heroWarp(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const content = hero.querySelector('.container');
  const markWrap = hero.querySelector('.hero-mark');
  if(!content) return;

  window.setTimeout(() => {
    if(markWrap) markWrap.style.transition = 'opacity .1s linear';
  }, 1700);

  function update(){
    const hH = hero.offsetHeight;
    const progress = Math.min(1, Math.max(0, window.scrollY / (hH*0.85)));
    content.style.opacity = String(Math.max(0, 1 - progress*1.2));
    content.style.transform = `translateY(${progress*-64}px)`;
    if(markWrap){
      markWrap.style.transform = `scale(${1 + progress*1.7})`;
      markWrap.style.opacity = String(Math.max(0, 1 - progress*1.05));
    }
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(() => { update(); ticking=false; }); ticking=true; }
  }, { passive:true });
  window.addEventListener('resize', update);
  update();
})();


(function nav(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
  }));
})();

(function contactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const company = data.get('company') || '';
    const email = data.get('email') || '';
    const service = data.get('service') || '';
    const message = data.get('message') || '';

    const subject = encodeURIComponent(`New enquiry from ${name}${company ? ' — ' + company : ''}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nArea of interest: ${service}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:burhanuddin.motiwala7@gmail.com?subject=${subject}&body=${body}`;

    const status = document.getElementById('form-status');
    if(status){
      status.textContent = 'Opening your email client to send this through — if it doesn\'t open, email us directly at burhanuddin.motiwala7@gmail.com.';
    }
  });
})();
