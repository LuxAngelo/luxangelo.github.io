const header = document.querySelector('.site-header');
const button = document.querySelector('.menu-button');

const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 15);
  const marker = window.scrollY + window.innerHeight * 0.36;
  let current = sections[0];
  sections.forEach(section => {
    if (section.offsetTop <= marker) current = section;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal:not(.hero)').forEach(section => observer.observe(section));


button?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen);
  button.textContent = isOpen ? 'Stäng' : 'Meny';
});

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  navLinks.forEach(navLink => navLink.classList.toggle('active', navLink === link));
  header.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
  if (button) button.textContent = 'Meny';
}));

document.querySelector('nav a[href="#about"]')?.addEventListener('click', event => {
  const about = document.querySelector('#about');
  if (!about) return;
  event.preventDefault();
  window.scrollTo({
    top: about.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
    behavior: 'smooth'
  });
  history.replaceState(null, '', '#about');
});

document.querySelector('nav a[href="#top"]')?.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#top');
});
