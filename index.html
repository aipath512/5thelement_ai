document.documentElement.classList.add('js');
for (const a of document.querySelectorAll('a[href^="#"]')) {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  });
}

const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
if (siteHeader && menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteHeader.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}
