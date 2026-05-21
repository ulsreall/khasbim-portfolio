// Loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader?.classList.add('hide'), 400);
  setTimeout(() => { if (loader) loader.style.display = 'none'; }, 900);
});

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const toTop = document.querySelector('.to-top');
const terminalTrigger = document.querySelector('.terminal-trigger');
const modal = document.querySelector('.command-modal');
const closeCommand = document.querySelector('.close-command');
const toast = document.querySelector('.toast');
const soundButton = document.querySelector('.sound-button');
const themeToggle = document.querySelector('.theme-toggle');
let soundEnabled = false;

// Theme toggle
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '◐' : '◑';

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '◐' : '◑';
});

// Fade-in on scroll (IntersectionObserver)
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Click sound
const clickSound = () => {
  if (!soundEnabled) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 520;
  gain.gain.value = 0.025;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.045);
};

document.querySelectorAll('a, button').forEach((el) => el.addEventListener('click', clickSound));

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  toTop?.classList.toggle('show', window.scrollY > 600);
});

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const openModal = () => {
  modal.hidden = false;
  modal.querySelector('a')?.focus();
};
const closeModal = () => {
  modal.hidden = true;
  terminalTrigger?.focus();
};

terminalTrigger?.addEventListener('click', openModal);
closeCommand?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
modal?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openModal();
  }
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

soundButton?.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = soundEnabled ? '♪ ON' : '♪';
});

document.querySelector('.copy-email')?.addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email copied: ' + email;
  } catch {
    window.location.href = 'mailto:' + email;
    return;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#year').textContent = new Date().getFullYear();
