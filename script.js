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

const graphDark = 'https://activity-graph.vercel.app/graph?username=ulsreall&bg_color=0d1117&color=58a6ff&line=58a6ff&point=ffffff&area=true&area_color=58a6ff&hide_border=true';
const graphLight = 'https://activity-graph.vercel.app/graph?username=ulsreall&bg_color=ffffff&color=0969da&line=0969da&point=1f2328&area=true&area_color=0969da&hide_border=true';

function updateGraph(theme) {
  const img = document.getElementById('github-graph');
  if (img) img.src = theme === 'dark' ? graphDark : graphLight;
}

updateGraph(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '◐' : '◑';
  updateGraph(next);
});

// Typing animation
const typingPhrases = [
  'Web3 Builder',
  'AI Agent Architect',
  'Security Researcher',
  'Full-Stack Dev',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
  if (!typingEl) return;
  const phrase = typingPhrases[phraseIdx];
  if (isDeleting) {
    typingEl.textContent = phrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingEl.textContent = phrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === phrase.length) {
    delay = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % typingPhrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

// Start typing after loading screen
setTimeout(typeLoop, 1200);

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

// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    if (!target) return;
    let current = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + '+';
    }, 16);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// Skill bar animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const fills = entry.target.querySelectorAll('.skill-bar-fill');
    fills.forEach((fill, i) => {
      setTimeout(() => {
        fill.style.width = fill.dataset.level + '%';
      }, i * 80);
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

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
