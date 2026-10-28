/* ============================================================
   SACHIN KUMAR PORTFOLIO — script.js
   Features: Particles · Scroll Reveal · Typing · Filter · Modal
   ============================================================ */

/* ───── PARTICLES BACKGROUND ───── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const PARTICLE_COUNT = 80;
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 120) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
})();

/* ───── TYPING EFFECT ───── */
window.addEventListener('load', () => {
  const el = document.getElementById('typing');
  if (!el) return;

  const texts  = ["Hi, I'm Sachin 👋", "Data Scientist 📊", "Full Stack Dev 💻", "ML Enthusiast 🤖"];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = texts[tIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 55 : 85);
  }
  type();
});

/* ───── NAVBAR: SCROLL SHRINK + ACTIVE LINKS ───── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* Shrink nav */
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  /* Back-to-top button */
  const btn = document.getElementById('back-to-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);

  /* Active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ───── HAMBURGER MENU ───── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

/* ───── SCROLL REVEAL ───── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ───── PROJECT FILTER ───── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    /* Update active button */
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;

      if (show) {
        card.style.display = 'flex';
        // Force visible after display set
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ───── CERTIFICATE MODAL ───── */
const modal      = document.getElementById('cert-modal');
const modalImg   = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalOrg   = document.getElementById('modal-org');
const modalVerify = document.getElementById('modal-verify');

function openCertModal(card) {
  const img    = card.querySelector('.cert-img');
  const title  = card.querySelector('h3');
  const org    = card.querySelector('.org');
  const verify = card.querySelector('.cert-btn');

  if (!modal) return;

  modalImg.src        = img  ? img.src  : '';
  modalTitle.textContent = title ? title.textContent : '';
  modalOrg.textContent   = org   ? org.textContent   : '';

  if (verify) {
    modalVerify.href = verify.href;
    modalVerify.style.display = 'inline-flex';
  } else {
    modalVerify.style.display = 'none';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close modal on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});

/* Expose to global scope (used in HTML onclick) */
window.openCertModal  = openCertModal;
window.closeCertModal = closeCertModal;

/* ───── CONTACT FORM ───── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(res => {
      if (res.ok) {
        document.getElementById('success-msg').style.display = 'flex';
        form.reset();
      } else {
        alert('❌ Error sending message. Please try again.');
      }
    })
    .catch(() => alert('❌ Network error. Please try again.'))
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  });
}

/* ───── SMOOTH NUMBERS COUNTER ───── */
function animateCounter(el, target, duration = 1500) {
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(tick);
  };
  tick();
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count || el.textContent);
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
