const nav = document.querySelector('.nav');
const revealItems = document.querySelectorAll('.reveal');
const navToggle = document.querySelector('.nav-toggle');
const navToggleIcon = document.querySelector('.nav-toggle-icon');
const currentYear = document.querySelector('#current-year');
const mobileMenu = document.querySelector('.mobile-menu');

const setNavState = () => {
  if (!nav) {
    return;
  }
  nav.classList.toggle('nav--scrolled', window.scrollY > 40);
};

const closeMenu = () => {
  if (!mobileMenu || !navToggle) {
    return;
  }
  mobileMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  if (navToggleIcon) {
    navToggleIcon.classList.remove('fa-xmark');
    navToggleIcon.classList.add('fa-bars');
  }
};

const toggleMenu = () => {
  if (!mobileMenu || !navToggle) {
    return;
  }
  const isOpen = mobileMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (navToggleIcon) {
    navToggleIcon.classList.toggle('fa-bars', !isOpen);
    navToggleIcon.classList.toggle('fa-xmark', isOpen);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener('scroll', setNavState);
window.addEventListener('load', setNavState);

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) {
    closeMenu();
  }
});
