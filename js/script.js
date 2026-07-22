/* ==========================================================================
   Samrudhi Dube — Portfolio
   Vanilla JS: typing animation, background + hero network graphs,
   scroll reveals, animated skill meters, nav toggle, contact form UI.
   ========================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

/* -------------------------------------------------------------------------
   Sticky nav background on scroll
------------------------------------------------------------------------- */
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('is-scrolled', window.scrollY > 12);
});

/* -------------------------------------------------------------------------
   Mobile nav toggle
------------------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => nav.classList.remove('is-open'))
);

/* -------------------------------------------------------------------------
   Typing animation — cycles through roles in the hero terminal line
------------------------------------------------------------------------- */
const roles = [
  'AI/ML Intern Aspirant',
  'Machine Learning Enthusiast',
  'Cybersecurity Learner',
  'Python & Flask Developer'
];
const typedEl = document.getElementById('typed');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}

if (prefersReducedMotion) {
  typedEl.textContent = roles[0];
} else {
  typeLoop();
}

/* -------------------------------------------------------------------------
   Scroll reveal — fades/rises sections into view
------------------------------------------------------------------------- */
const revealTargets = document.querySelectorAll(
  '.section__head, .about__text, .about__card, .skill-panel, .project-card, .timeline__item, .achieve-card, .contact__info, .contact__form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

/* -------------------------------------------------------------------------
   Animated skill meters — fill to their data-value once visible
------------------------------------------------------------------------- */
const meters = document.querySelectorAll('.meter');
const meterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const meter = entry.target;
      const value = meter.getAttribute('data-value') || 0;
      const fill = meter.querySelector('.meter__fill');
      requestAnimationFrame(() => { fill.style.width = value + '%'; });
      meterObserver.unobserve(meter);
    }
  });
}, { threshold: 0.4 });

meters.forEach(m => meterObserver.observe(m));

/* -------------------------------------------------------------------------
   Contact form — front-end only UI feedback (no backend wired up)
------------------------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'Sending…';
  setTimeout(() => {
    formStatus.textContent = `Thanks! I'll get back to you soon.`;
    contactForm.reset();
  }, 900);
});

/* ==========================================================================
   HERO NETWORK GRAPH (SVG)
   A small, deliberate node graph representing a neural network that also
   reads as a security topology — one node is marked "secured" with a
   lock glyph. Nodes drift gently and re-link to nearby nodes over time.
   ========================================================================== */
(function heroGraph() {
  const svg = document.getElementById('hero-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const W = 480, H = 480;
  const NODE_COUNT = 16;

  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: 40 + Math.random() * (W - 80),
    y: 40 + Math.random() * (H - 80),
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: i === 4 ? 9 : 3 + Math.random() * 3,
    secured: i === 4
  }));

  const linesGroup = document.createElementNS(NS, 'g');
  const nodesGroup = document.createElementNS(NS, 'g');
  svg.appendChild(linesGroup);
  svg.appendChild(nodesGroup);

  const circles = nodes.map(n => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', n.r);
    c.setAttribute('fill', n.secured ? '#e8a33d' : '#4fd1c5');
    c.setAttribute('opacity', n.secured ? '0.95' : '0.75');
    nodesGroup.appendChild(c);

    if (n.secured) {
      const ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('r', n.r + 5);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', '#e8a33d');
      ring.setAttribute('stroke-width', '1');
      ring.setAttribute('opacity', '0.5');
      nodesGroup.appendChild(ring);
      n.ring = ring;
    }
    return c;
  });

  const MAX_DIST = 140;

  function step() {
    if (!prefersReducedMotion) {
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > W - 20) n.vx *= -1;
        if (n.y < 20 || n.y > H - 20) n.vy *= -1;
      });
    }

    // redraw connections between nearby nodes
    while (linesGroup.firstChild) linesGroup.removeChild(linesGroup.firstChild);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < MAX_DIST) {
          const line = document.createElementNS(NS, 'line');
          line.setAttribute('x1', a.x);
          line.setAttribute('y1', a.y);
          line.setAttribute('x2', b.x);
          line.setAttribute('y2', b.y);
          const isSecuredLink = a.secured || b.secured;
          line.setAttribute('stroke', isSecuredLink ? '#e8a33d' : '#4fd1c5');
          line.setAttribute('stroke-opacity', (1 - d / MAX_DIST) * (isSecuredLink ? 0.45 : 0.28));
          line.setAttribute('stroke-width', '1');
          linesGroup.appendChild(line);
        }
      }
    }

    nodes.forEach((n, i) => {
      circles[i].setAttribute('cx', n.x);
      circles[i].setAttribute('cy', n.y);
      if (n.ring) {
        n.ring.setAttribute('cx', n.x);
        n.ring.setAttribute('cy', n.y);
      }
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  step();
})();

/* ==========================================================================
   AMBIENT BACKGROUND NETWORK (full-page canvas)
   Subtle, slow-moving particle graph behind all content.
   ========================================================================== */
(function backgroundNetwork() {
  const canvas = document.getElementById('net-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }

  function init() {
    resize();
    const count = Math.min(70, Math.floor((w * h) / 45000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const viewTop = window.scrollY;
    const viewBottom = viewTop + window.innerHeight;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      if (a.y < viewTop - 100 || a.y > viewBottom + 100) continue;
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(79, 209, 197, ${0.12 * (1 - d / 130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(79, 209, 197, 0.35)';
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  if (!prefersReducedMotion) {
    draw();
  } else {
    // static single frame for reduced motion users
    draw = function () {};
    ctx.clearRect(0, 0, w, h);
  }
})();
