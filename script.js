// =====================================================
// Typing animation for hero role text
// =====================================================
(function typingEffect() {
  const roles = [
    'Computer Science Engineer',
    'UI/UX Designer',
    'Software Developer'
  ];
  const el = document.getElementById('typedRole');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const HOLD_TIME = 1400;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, HOLD_TIME);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      return setTimeout(tick, 300);
    }
    setTimeout(tick, DELETE_SPEED);
  }

  tick();
})();

// =====================================================
// Mobile nav toggle
// =====================================================
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const tabs = document.getElementById('navTabs');
  if (!toggle || !tabs) return;

  toggle.addEventListener('click', () => {
    const isOpen = tabs.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  tabs.querySelectorAll('a.nav-tab').forEach((link) => {
    link.addEventListener('click', () => {
      tabs.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// =====================================================
// Active nav tab on scroll
// =====================================================
(function activeSectionTracking() {
  const navLinks = Array.from(document.querySelectorAll('.nav-tab'));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

// =====================================================
// Contact form validation (client-side only)
// =====================================================
(function contactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    const el = form.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message || '';
  }

  function validate() {
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    if (!email) {
      setError('email', 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!message) {
      setError('message', 'Please add a short message.');
      valid = false;
    } else {
      setError('message', '');
    }

    return valid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    if (!validate()) {
      status.textContent = 'Please fix the highlighted fields.';
      status.style.color = 'var(--danger)';
      return;
    }

    // No backend is wired up yet — replace this block with a fetch() call
    // to your form endpoint (e.g. Formspree, EmailJS, or a custom API).
    status.style.color = 'var(--accent)';
    status.textContent = `Thanks, ${form.name.value.trim()}! Your message is ready — connect a backend endpoint in script.js to actually deliver it.`;
    form.reset();
  });
})();

// =====================================================
// Hero photo fallback (shows initials if profile.jpg is missing)
// =====================================================
(function heroPhotoFallback() {
  const img = document.getElementById('heroPhoto');
  if (!img) return;

  img.addEventListener('error', () => {
    const ring = img.closest('.portrait-ring');
    if (!ring) return;
    img.remove();
    const fallback = document.createElement('div');
    fallback.className = 'portrait-fallback';
    fallback.textContent = 'SA';
    ring.appendChild(fallback);
  }, { once: true });
})();

// =====================================================
// Footer year
// =====================================================
(function footerYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
