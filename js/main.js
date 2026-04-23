// Add .js class immediately so reveal CSS only kicks in when JS runs
document.documentElement.classList.add('js');

// mobile nav
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on link click (mobile)
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // active link by pathname
  const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll. Robust fallback: anything that hasn't triggered after a few seconds, show anyway.
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.04, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  }
  // Ultimate fallback — force-show anything still hidden after 2.5s (print, headless, slow viewports, etc.)
  setTimeout(() => reveals.forEach(el => el.classList.add('in')), 2500);

  // Simple contact form — client-only demo
  const form = document.querySelector('form[data-demo]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-feedback');
      if (note) {
        note.textContent = 'Thank you — our team will be in touch within one business day. For urgent questions, please call your nearest office directly.';
        note.style.display = 'block';
      }
      form.reset();
    });
  }
});
