/* =========================================================
   NORTHSTAR — shared behaviour (v2, restrained)
   1. Sticky nav shadow/border on scroll
   2. Mobile nav toggle
   3. A single quiet fade+rise reveal on scroll (once per element)
   4. Contact form -> mailto fallback
   ========================================================= */

(function navScroll(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  function update(){ nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', update, { passive:true });
  update();
})();

(function navToggle(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
  }));
})();

(function revealOnScroll(){
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  if(!els.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion || !('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
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
      status.classList.add('is-visible');
    }
  });
})();
