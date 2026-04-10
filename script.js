/* ═══════════════════════════════════════════════
   FlowPilot — script.js  (Enhanced v2)
═══════════════════════════════════════════════ */

"use strict";

// ── DOM References ────────────────────────────
const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const siteHeader    = $('#siteHeader');
const menuToggle    = $('#menuToggle');
const navMenu       = $('#navMenu');
const themeToggle   = $('#themeToggle');
const backToTop     = $('#backToTop');
const annBar        = $('#announcementBar');
const annClose      = $('#annClose');
const stickyCta     = $('#stickyCta');
const stickyClose   = $('#stickyCtaClose');
const cookieBanner  = $('#cookieBanner');
const cookieAccept  = $('#cookieAccept');
const cookieDecline = $('#cookieDecline');
const contactForm   = $('#contactForm');
const formSuccess   = $('#formSuccess');
const heroBars      = $$('#heroBars .bar');
const statNumbers   = $$('.stat-card strong[data-count]');
const reveals       = $$('.reveal');
const navLinks      = $$('.nav a');
const sections      = $$('section[id]');
const cursor        = $('#cursor');
const cursorFollower= $('#cursorFollower');

// ── Theme ─────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('fp-theme');
  if (saved === 'light') applyTheme('light');
}
function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  const icon = $('#themeToggle .theme-icon');
  if (icon) icon.textContent = mode === 'light' ? '☀️' : '🌙';
}
themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  const icon    = $('#themeToggle .theme-icon');
  if (icon) icon.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('fp-theme', isLight ? 'light' : 'dark');
});
initTheme();

// ── Custom Cursor ─────────────────────────────
if (cursor && cursorFollower && window.matchMedia('(hover:hover)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    fx += (mx - fx) * .14;
    fy += (my - fy) * .14;
    cursorFollower.style.left = fx + 'px';
    cursorFollower.style.top  = fy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  $$('a, button, .feature-card, .pricing-card, .bar').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// ── Announcement Bar ──────────────────────────
annClose?.addEventListener('click', () => {
  annBar.style.maxHeight = annBar.offsetHeight + 'px';
  requestAnimationFrame(() => {
    annBar.style.transition = 'max-height .4s ease, opacity .3s';
    annBar.style.maxHeight  = '0';
    annBar.style.opacity    = '0';
  });
  setTimeout(() => annBar.remove(), 400);
});

// ── Sticky Header on Scroll ───────────────────
function handleHeader() {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 60);
}

// ── Mobile Menu ───────────────────────────────
menuToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('click', e => {
  if (!siteHeader?.contains(e.target)) {
    navMenu?.classList.remove('open');
    menuToggle?.classList.remove('open');
  }
});

// ── Active Nav ────────────────────────────────
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Scroll Reveal ─────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: .12 });
reveals.forEach(el => revealObserver.observe(el));

// ── Back to Top ───────────────────────────────
function handleBackToTop() {
  backToTop?.classList.toggle('show', window.scrollY > 500);
}
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Sticky CTA ────────────────────────────────
let stickyClosed = false;
function handleStickyCta() {
  if (stickyClosed) return;
  const heroBottom = $('#home')?.offsetHeight ?? 600;
  stickyCta?.classList.toggle('show', window.scrollY > heroBottom);
}
stickyClose?.addEventListener('click', () => {
  stickyClosed = true;
  stickyCta?.classList.remove('show');
});

// ── Cookie Banner ─────────────────────────────
(function initCookie() {
  if (localStorage.getItem('fp-cookie')) return;
  setTimeout(() => cookieBanner?.classList.remove('hide'), 1800);
})();
function dismissCookie() {
  cookieBanner?.classList.add('hide');
  localStorage.setItem('fp-cookie', '1');
}
cookieAccept?.addEventListener('click',  dismissCookie);
cookieDecline?.addEventListener('click', dismissCookie);

// ── Hero Chart Bars (animated on load) ────────
const defaultBarValues = [48, 72, 66, 84, 60, 96, 74];
const barLabels = ['$18k','$29k','$26k','$34k','$24k','$38k','$30k'];

function animateBars(values = defaultBarValues) {
  heroBars.forEach((bar, i) => {
    // inject tooltip (only once)
    if (!bar.querySelector('.bar-tooltip')) {
      const tip = document.createElement('span');
      tip.className = 'bar-tooltip';
      tip.textContent = barLabels[i];
      bar.appendChild(tip);
    }

    setTimeout(() => {
      bar.style.height = values[i] + '%';
      if (i === 5) bar.classList.add('bar-active');
    }, i * 90 + 300);
  });
}

// ── Animated Counters ─────────────────────────
let countersStarted = false;
function animateCounter(el) {
  const target    = Number(el.getAttribute('data-count'));
  const increment = Math.max(1, Math.ceil(target / 80));
  let   current   = 0;

  const tick = () => {
    current = Math.min(current + increment, target);
    if (target === 99)          el.textContent = current + '%';
    else if (target >= 1000)    el.textContent = current.toLocaleString() + (current >= target ? '+' : '');
    else                        el.textContent = current + (current >= target ? '+' : '');
    if (current < target) requestAnimationFrame(tick);
  };
  tick();
}

const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    statNumbers.forEach(animateCounter);
    counterObserver.disconnect();
  }
}, { threshold: .3 });
const metricsSection = $('.metrics-section');
if (metricsSection) counterObserver.observe(metricsSection);

// ── Pricing Toggle ────────────────────────────
const toggleBtn     = $('#toggleBtn');
const billMonthly   = $('#billMonthly');
const billAnnual    = $('#billAnnual');
const priceEls      = $$('.price-val');
let   isAnnual      = false;

toggleBtn?.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggleBtn.setAttribute('aria-checked', String(isAnnual));
  billMonthly.classList.toggle('active-label', !isAnnual);
  billAnnual.classList.toggle('active-label',   isAnnual);

  priceEls.forEach(el => {
    const monthly = el.dataset.monthly;
    const annual  = el.dataset.annual;
    if (!monthly || !annual) return;
    const val = isAnnual ? annual : monthly;
    el.innerHTML = `$${val}<span>/mo</span>`;
    // pulse animation
    el.style.opacity = '.3';
    el.style.transform = 'scale(.96)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    });
  });
});

// ── FAQ Accordion + Search ────────────────────
const faqItems    = $$('.faq-item');
const faqSearch   = $('#faqSearch');
const faqClear    = $('#faqClear');
const faqNoRes    = $('#faqNoResults');
const faqSearchTerm = $('#faqSearchTerm');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-btn');
  btn?.addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    faqItems.forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

faqSearch?.addEventListener('input', () => {
  const q = faqSearch.value.trim().toLowerCase();
  faqClear?.classList.toggle('show', q.length > 0);
  let visible = 0;
  faqItems.forEach(item => {
    const text   = item.dataset.q || '';
    const qText  = item.querySelector('.faq-btn span')?.textContent.toLowerCase() || '';
    const match  = !q || text.includes(q) || qText.includes(q);
    item.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  if (faqNoRes && faqSearchTerm) {
    faqNoRes.style.display = visible === 0 ? 'block' : 'none';
    faqSearchTerm.textContent = q;
  }
});

faqClear?.addEventListener('click', () => {
  if (faqSearch) faqSearch.value = '';
  faqClear.classList.remove('show');
  faqItems.forEach(i => i.classList.remove('hidden'));
  if (faqNoRes) faqNoRes.style.display = 'none';
  faqSearch?.focus();
});

// ── Testimonials Carousel ─────────────────────
const track    = $('#testimonialsTrack');
const prevBtn  = $('#prevBtn');
const nextBtn  = $('#nextBtn');
const dotsWrap = $('#carouselDots');
const cards    = $$('.testimonial-card');

let   currentSlide  = 0;
let   autoplayTimer = null;
const total = cards.length;

function buildDots() {
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(d);
  });
}
function goTo(idx) {
  currentSlide = (idx + total) % total;
  if (track) track.style.transform = `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 20}px))`;
  $$('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
function startAutoplay() {
  autoplayTimer = setInterval(() => goTo(currentSlide + 1), 4500);
}
function stopAutoplay() {
  clearInterval(autoplayTimer);
}

prevBtn?.addEventListener('click', () => { stopAutoplay(); goTo(currentSlide - 1); startAutoplay(); });
nextBtn?.addEventListener('click', () => { stopAutoplay(); goTo(currentSlide + 1); startAutoplay(); });

// Touch swipe
let touchStartX = 0;
track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track?.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    stopAutoplay();
    goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1);
    startAutoplay();
  }
}, { passive: true });

// Pause on hover
track?.addEventListener('mouseenter', stopAutoplay);
track?.addEventListener('mouseleave', startAutoplay);

buildDots();
startAutoplay();

// ── Multi-step Form ───────────────────────────
const panels = $$('.form-panel');
const steps  = $$('.form-step');
const lines  = $$('.step-line');

function showPanel(num) {
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === String(num)));
  steps.forEach((s, i) => {
    s.classList.toggle('active', i + 1 === num);
    s.classList.toggle('done',   i + 1 < num);
  });
  lines.forEach((l, i) => l.classList.toggle('done', i + 1 < num));
}

// Next buttons
$$('.form-next').forEach(btn => {
  btn.addEventListener('click', () => {
    const nextPanel = Number(btn.dataset.next);
    const current   = nextPanel - 1;
    const panel     = $(`.form-panel[data-panel="${current}"]`);
    const inputs    = $$('input, select, textarea', panel).filter(el => el.hasAttribute('required'));
    let valid = true;

    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.borderColor = '#ef4444';
        inp.addEventListener('input', () => inp.style.borderColor = '', { once: true });
        valid = false;
      }
    });
    if (valid) showPanel(nextPanel);
  });
});

// Back buttons
$$('.form-back').forEach(btn => {
  btn.addEventListener('click', () => showPanel(Number(btn.dataset.back)));
});

// Submit
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  panels.forEach(p => p.style.display = 'none');
  if (formSuccess) formSuccess.style.display = 'block';
});

// ── Scroll Listener ───────────────────────────
window.addEventListener('scroll', () => {
  handleHeader();
  handleBackToTop();
  updateActiveNav();
  handleStickyCta();
}, { passive: true });

// ── Fetch Dashboard Data from JSON ─────────────
async function loadDashboardData() {
  try {
    const res  = await fetch('data.json');
    const data = await res.json();

    // Revenue & growth badge
    const dashVal = document.querySelector('.dash-value');
    if (dashVal) dashVal.textContent = `$${data.revenue.toLocaleString()}`;

    const badge = document.querySelector('.badge-success');
    if (badge) badge.textContent = `↑ ${data.growth}%`;

    // Metric cards
    const metrics = document.querySelectorAll('.dash-metric-card strong');
    if (metrics.length >= 3) {
      metrics[0].textContent = data.leads.toLocaleString();
      metrics[1].textContent = data.conversions;
      metrics[2].textContent = data.churn + '%';
    }

    // Animate bars using weeklyData from JSON
    animateBars(data.weeklyData);

  } catch (err) {
    console.error("Failed to load data.json — falling back to defaults:", err);
    animateBars(); // fallback: use defaultBarValues
  }
}

window.addEventListener('load', loadDashboardData);

// ── Initial Run ───────────────────────────────
handleHeader();
handleBackToTop();
updateActiveNav();

