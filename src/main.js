// =============================================
// Portfolio v2 — Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNavigation();
  initScrollAnimations();
  initHeaderScroll();
  initActiveNavOnScroll();
  initCountUp();
});

// --- Mobile Navigation Toggle ---
function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    navList.classList.toggle('is-open');
    const isOpen = navList.classList.contains('is-open');
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  navList.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'メニューを開く');
    });
  });
}

// --- Header background on scroll ---
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Scroll-triggered fade-in animations ---
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll('.animate-on-scroll'))
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = index * 100;

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// --- Active nav link on scroll ---
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '68px'} 0px -40% 0px`,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// --- Count-up animation for result numbers ---
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          animateCountUp(el, target, 1200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCountUp(el, target, duration) {
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.round(eased * target);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}
