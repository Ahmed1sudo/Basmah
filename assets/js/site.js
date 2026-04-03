const pages = [
  { href: 'index.html', label: 'الرئيسية' },
  { href: 'about.html', label: 'عن بصمة' },
  { href: 'archive.html', label: 'أرشيف بصمة 1' },
  { href: 'agenda.html', label: 'الأجندة' },
  { href: 'speakers.html', label: 'المتحدثات' },
  { href: 'awards.html', label: 'الجوائز' },
  { href: 'tickets.html', label: 'التذاكر' },
  { href: 'sponsors.html', label: 'الرعاة' },
  { href: 'gallery.html', label: 'المعرض' },
  { href: 'team.html', label: 'الفريق' },
  { href: 'contact.html', label: 'تواصل معنا' },
  { href: 'faq.html', label: 'الأسئلة الشائعة' }
];

const THEME_STORAGE_KEY = 'basma-theme';

function getPreferredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (_) {
    // Ignore storage access issues and use default theme.
  }
  return 'dark';
}

function applyTheme(theme) {
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', safeTheme);
  return safeTheme;
}

function persistTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (_) {
    // Ignore storage access issues.
  }
}

function syncThemeToggleButton() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const icon = button.querySelector('.theme-toggle-icon');
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  if (icon) {
    icon.textContent = isLight ? '☾' : '☀';
  }

  button.setAttribute('aria-label', isLight ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح');
  button.setAttribute('title', isLight ? 'الوضع الداكن' : 'الوضع الفاتح');
}

function currentFile() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function isCurrent(href) {
  const file = currentFile();
  if (href === 'index.html' && (file === '' || file === 'index.html')) {
    return true;
  }
  return file === href;
}

function buildHeader() {
  const headerSlot = document.querySelector('[data-site-header]');
  if (!headerSlot) return;

  const navLinks = pages
    .map(
      (page) =>
        `<a href="${page.href}" ${isCurrent(page.href) ? 'aria-current="page"' : ''}>${page.label}</a>`
    )
    .join('');

  headerSlot.innerHTML = `
    <a class="skip-link" href="#main-content">تخطي إلى المحتوى</a>
    <header class="top-nav" role="banner">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Basma Summit home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>بصمة | Basma Summit</span>
        </a>

        <button class="mobile-toggle" type="button" aria-expanded="false" aria-label="فتح القائمة" data-mobile-toggle>
          ☰
        </button>

        <nav class="nav-links" aria-label="التنقل الرئيسي" data-nav-links>
          ${navLinks}
        </nav>

        <div class="nav-tools">
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="تفعيل الوضع الفاتح" title="الوضع الفاتح">
            <span class="theme-toggle-icon" aria-hidden="true">☀</span>
          </button>

          <div class="nav-cta">
            <a class="btn btn-ghost" href="tickets.html">استكشف التذاكر</a>
            <a class="btn btn-secondary" href="sponsors.html">كن راعياً</a>
          </div>
        </div>
      </div>
    </header>
  `;

  const toggle = headerSlot.querySelector('[data-mobile-toggle]');
  const links = headerSlot.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }
}

function initThemeToggle() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  syncThemeToggleButton();

  button.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    const applied = applyTheme(next);
    persistTheme(applied);
    syncThemeToggleButton();
  });
}

function activateNavState() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > 14);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function buildFooter() {
  const footerSlot = document.querySelector('[data-site-footer]');
  if (!footerSlot) return;

  footerSlot.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="stack">
            <h3 class="footer-title">Basma — Women Future Cities Summit & Awards</h3>
            <p>
              منصة إقليمية تقودها C3 (Communities Connect Cities) لتسريع المشاركة النسائية في تصميم مدن
              أكثر ذكاءً وشمولاً واستدامة.
            </p>
            <div class="badge-row" aria-label="الجهات المؤسسة">
              <span class="badge">C3</span>
              <span class="badge">Women Future Cities</span>
              <span class="badge">Global Summit Standard</span>
            </div>
          </div>

          <div>
            <h3 class="footer-title">روابط سريعة</h3>
            <div class="footer-links">
              <a href="about.html">عن بصمة</a>
              <a href="archive.html">أرشيف بصمة 1</a>
              <a href="agenda.html">الأجندة الكاملة</a>
              <a href="awards.html">الجوائز</a>
              <a href="tickets.html">التذاكر</a>
            </div>
          </div>

          <div>
            <h3 class="footer-title">للتواصل والشراكات</h3>
            <div class="footer-links">
              <a href="mailto:partnerships@basmasummit.com">partnerships@basmasummit.com</a>
              <a href="mailto:info@basmasummit.com">info@basmasummit.com</a>
              <a href="tel:+96800000000">+968 0000 0000</a>
              <a href="contact.html">نموذج التواصل</a>
            </div>
          </div>
        </div>

        <div class="footer-meta">
          <span>© 2026 Basma Summit. All rights reserved.</span>
          <span>Designed for a global, future-focused audience.</span>
        </div>
      </div>
    </footer>
  `;
}

function activateReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((el) => observer.observe(el));
}

function activateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = Number(el.dataset.counter || '0');
    if (prefersReduced) {
      el.textContent = target.toLocaleString('en-US');
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString('en-US');

      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function ensureSpeakerModal() {
  if (document.getElementById('speaker-modal')) return;

  const template = document.createElement('div');
  template.innerHTML = `
    <div id="speaker-modal" class="modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="speaker-title">
      <div class="modal-backdrop" data-close-modal></div>
      <div class="modal-panel">
        <button type="button" class="icon-btn modal-close" data-close-modal aria-label="إغلاق">✕</button>
        <div class="modal-content" id="speaker-modal-content"></div>
      </div>
    </div>
  `;

  document.body.appendChild(template.firstElementChild);
}

function activateSpeakerModal() {
  const triggerCards = document.querySelectorAll('[data-speaker]');
  if (!triggerCards.length) return;

  ensureSpeakerModal();
  const modal = document.getElementById('speaker-modal');
  const content = document.getElementById('speaker-modal-content');
  const closeBtns = modal.querySelectorAll('[data-close-modal]');
  let lastActive = null;

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActive) lastActive.focus();
  };

  const openModal = (card) => {
    lastActive = card;
    const name = card.dataset.name || '';
    const role = card.dataset.role || '';
    const bio = card.dataset.bio || '';
    const topics = (card.dataset.topics || '').split('|').filter(Boolean);

    content.innerHTML = `
      <h2 id="speaker-title">${name}</h2>
      <p class="muted">${role}</p>
      <p>${bio}</p>
      <div class="tag-row">
        ${topics.map((topic) => `<span class="tag">${topic}</span>`).join('')}
      </div>
      <a class="btn btn-secondary" href="agenda.html">عرض الجلسات ذات الصلة</a>
    `;

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();
  };

  triggerCards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtns.forEach((btn) => btn.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
}

function activateAgendaFilters() {
  const filterWrap = document.querySelector('[data-agenda-filters]');
  if (!filterWrap) return;

  const chips = filterWrap.querySelectorAll('[data-filter]');
  const sessions = document.querySelectorAll('[data-session-track]');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((btn) => btn.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;

      sessions.forEach((session) => {
        const matches = filter === 'all' || session.dataset.sessionTrack === filter;
        session.hidden = !matches;
      });
    });
  });
}

function activateTickets() {
  const cards = document.querySelectorAll('[data-ticket-tier]');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((other) => {
        other.classList.remove('selected');
        other.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('selected');
      card.setAttribute('aria-pressed', 'true');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
}

function activateCarousel() {
  const carousels = document.querySelectorAll('[data-carousel]');
  if (!carousels.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');

    if (!track || !prev || !next) return;

    const scrollByAmount = () => Math.min(track.clientWidth * 0.8, 420);

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollByAmount(), behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: scrollByAmount(), behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });
}

function ensureLightbox() {
  if (document.getElementById('gallery-lightbox')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="gallery-lightbox" class="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="معرض الصور">
      <div class="lightbox-backdrop" data-close-lightbox></div>
      <div class="lightbox-panel">
        <button type="button" class="icon-btn lightbox-close" data-close-lightbox aria-label="إغلاق">✕</button>
        <img id="lightbox-image" src="" alt="" />
        <p id="lightbox-caption" style="margin-top: 0.8rem;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper.firstElementChild);
}

function activateLightbox() {
  const items = document.querySelectorAll('[data-lightbox-item]');
  if (!items.length) return;

  ensureLightbox();
  const lightbox = document.getElementById('gallery-lightbox');
  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  let lastActive = null;

  const close = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActive) lastActive.focus();
  };

  const open = (item) => {
    const img = item.querySelector('img');
    if (!img) return;

    lastActive = item;
    image.src = img.src;
    image.alt = img.alt;
    caption.textContent = item.dataset.caption || img.alt;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  items.forEach((item) => {
    item.addEventListener('click', () => open(item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(item);
      }
    });
  });

  lightbox.querySelectorAll('[data-close-lightbox]').forEach((node) => {
    node.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      close();
    }
  });
}

function activateFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector('button');
    const panel = item.querySelector('.faq-panel');
    if (!button || !panel) return;

    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });
}

function activateAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
}

function init() {
  applyTheme(getPreferredTheme());
  buildHeader();
  initThemeToggle();
  activateNavState();
  buildFooter();
  activateReveal();
  activateCounters();
  activateSpeakerModal();
  activateAgendaFilters();
  activateTickets();
  activateCarousel();
  activateLightbox();
  activateFaq();
  activateAnchorScroll();
}

document.addEventListener('DOMContentLoaded', init);
