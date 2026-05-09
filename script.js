/* ===================================
   HARINI M – PORTFOLIO SCRIPTS
   EmailJS Integration included
=================================== */

// ============================================================
// ✅ EMAILJS CONFIGURATION — REPLACE THESE PLACEHOLDERS
// ------------------------------------------------------------
// 1. Go to https://emailjs.com → Account → API Keys
//    Replace 'YOUR_PUBLIC_KEY' with your actual Public Key
//
// 2. Go to Email Services → Copy your Service ID
//    Replace 'YOUR_SERVICE_ID' below
//
// 3. Go to Email Templates → Copy your Template ID
//    Replace 'YOUR_TEMPLATE_ID' below
// ============================================================
const EMAILJS_PUBLIC_KEY  = '1mx0tCHCMxLNeKpFw';   // ← Replace this
const EMAILJS_SERVICE_ID  = 'service_8pqgeje';   // ← Replace this
const EMAILJS_TEMPLATE_ID = 'template_jlqwxgr';  // ← Replace this

// ---- EMAILJS INIT ----
// EmailJS is loaded via CDN in index.html. This initializes it with your public key.
(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();


// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ---- SCROLL ANIMATIONS (IntersectionObserver) ----
const animatedEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

animatedEls.forEach(el => observer.observe(el));

// ---- SMOOTH SCROLL FOR NAV LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- ACTIVE NAV LINK HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
});

const style = document.createElement('style');
style.textContent = `.active-nav { color: var(--cyan) !important; background: var(--cyan-dim) !important; }`;
document.head.appendChild(style);


// ============================================================
// ---- CONTACT FORM — EMAILJS HANDLER ----
// ============================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');

    // --- Loading state ---
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.style.background = '#1a3a5c';
    btn.style.cursor = 'not-allowed';
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }

    // --- Send via EmailJS ---
    // emailjs.sendForm() reads the name attributes from form inputs automatically.
    // The variable names (from_name, from_email, subject, message) must match
    // the template variables you set up in your EmailJS template.
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(
        function () {
          // ✅ Success
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
          btn.style.background = '#16a34a';
          btn.style.cursor = 'default';

          if (formStatus) {
            formStatus.textContent = '✅ Your message was sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status form-status--success';
          }

          contactForm.reset();

          // Reset button after 4 seconds
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.style.cursor = '';
            btn.disabled = false;
            if (formStatus) formStatus.textContent = '';
          }, 4000);
        },
        function (error) {
          // ❌ Error
          console.error('EmailJS error:', error);
          btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Failed to Send';
          btn.style.background = '#dc2626';
          btn.style.cursor = 'default';

          if (formStatus) {
            formStatus.textContent = '❌ Something went wrong. Please try emailing me directly at harinimuthukumar0@gmail.com';
            formStatus.className = 'form-status form-status--error';
          }

          // Reset button after 5 seconds
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.style.cursor = '';
            btn.disabled = false;
          }, 5000);
        }
      );
  });
}


// ---- STAT NUMBER COUNTER ANIMATION ----
const stats = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const hasPlus = text.includes('+');
      const num = parseFloat(text.replace('+', '').replace(',', ''));

      if (!isNaN(num)) {
        animateCounter(el, 0, num, 1500, hasPlus, text.includes('.'));
      }
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(el, start, end, duration, plusSign, isDecimal) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    el.textContent = isDecimal
      ? current.toFixed(2) + (plusSign ? '+' : '')
      : Math.floor(current) + (plusSign ? '+' : '');
  }, 16);
}

// ---- TYPING EFFECT FOR HERO TAGLINE ----
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.borderRight = 'none';
}

// ---- SKILL PILL HOVER RIPPLE ----
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mousemove', (e) => {
    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pill.style.setProperty('--x', `${x}px`);
    pill.style.setProperty('--y', `${y}px`);
  });
});

console.log('%c🤖 Portfolio by Harini M', 'color:#00c8ff;font-size:1.2rem;font-weight:700;');
console.log('%cAI/ML Enthusiast | Data Science Intern | CSE Student', 'color:#8899b4;font-size:0.9rem;');