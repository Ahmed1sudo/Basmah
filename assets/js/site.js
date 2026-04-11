const primaryPages = [
  { key: 'index', hrefAr: 'index.html', hrefEn: 'index-en.html', labelAr: 'الرئيسية', labelEn: 'Home' },
  { key: 'about', hrefAr: 'about.html', hrefEn: 'about-en.html', labelAr: 'من نحن', labelEn: 'About Us' },
  { key: 'services', hrefAr: 'services.html', hrefEn: 'services-en.html', labelAr: 'الخدمات', labelEn: 'Services' },
  { key: 'events', hrefAr: 'events.html', hrefEn: 'events-en.html', labelAr: 'فعاليات القمة', labelEn: 'Events' },
  {
    key: 'media-center',
    hrefAr: 'media-center.html',
    hrefEn: 'media-center-en.html',
    labelAr: 'المركز الإعلامي',
    labelEn: 'Media Center'
  },
  { key: 'tickets', hrefAr: 'tickets.html', hrefEn: 'tickets-en.html', labelAr: 'التذاكر', labelEn: 'Tickets' },
  { key: 'team', hrefAr: 'team.html', hrefEn: 'team-en.html', labelAr: 'الفريق', labelEn: 'Team' },
  { key: 'contact', hrefAr: 'contact.html', hrefEn: 'contact-en.html', labelAr: 'اتصل بنا', labelEn: 'Contact Us' }
];

const secondaryPages = [
  { key: 'agenda', hrefAr: 'agenda.html', labelAr: 'الأجندة', labelEn: 'Agenda' },
  { key: 'speakers', hrefAr: 'speakers.html', labelAr: 'المتحدثات', labelEn: 'Speakers' },
  { key: 'awards', hrefAr: 'awards.html', labelAr: 'الجوائز', labelEn: 'Awards' },
  { key: 'sponsors', hrefAr: 'sponsors.html', labelAr: 'الرعاة', labelEn: 'Sponsors' },
  { key: 'archive', hrefAr: 'archive.html', labelAr: 'أرشيف بصمة 1', labelEn: 'Basma 1 Archive' },
  { key: 'gallery', hrefAr: 'gallery.html', labelAr: 'المعرض', labelEn: 'Gallery' },
  { key: 'faq', hrefAr: 'faq.html', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ' }
];

const bilingualBases = new Set(['index', 'about', 'services', 'events', 'media-center', 'tickets', 'team', 'contact']);
const THEME_STORAGE_KEY = 'basma-theme';
const BRAND_LOGO_ASSET_VERSION = '20260411';
const BRAND_LOGO_DARK_FILE = 'assets/img/fingerprint-dark.png';
const BRAND_LOGO_WHITE_FILE = 'assets/img/fingerprint-white.png';

function brandAsset(src) {
  return `${src}?v=${BRAND_LOGO_ASSET_VERSION}`;
}

const BRAND_LOGO_NAV_SRC = brandAsset(BRAND_LOGO_DARK_FILE);
const BRAND_LOGO_NAV_DARK_THEME_SRC = brandAsset(BRAND_LOGO_WHITE_FILE);
const BRAND_LOGO_NAV_LIGHT_THEME_SRC = brandAsset(BRAND_LOGO_DARK_FILE);
const BRAND_LOGO_DARK_THEME_SRC = brandAsset(BRAND_LOGO_WHITE_FILE);
const BRAND_LOGO_LIGHT_THEME_SRC = brandAsset(BRAND_LOGO_DARK_FILE);
const BRAND_FAVICON_DARK_THEME_SRC = brandAsset(BRAND_LOGO_WHITE_FILE);
const BRAND_FAVICON_LIGHT_THEME_SRC = brandAsset(BRAND_LOGO_DARK_FILE);

function currentFile() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function pageBase(file = currentFile()) {
  if (file === '') return 'index';
  return file.replace(/-en\.html$/, '').replace(/\.html$/, '');
}

function currentLanguage() {
  return /-en\.html$/.test(currentFile()) ? 'en' : 'ar';
}

function isEnglish() {
  return currentLanguage() === 'en';
}

function t(ar, en) {
  return isEnglish() ? en : ar;
}

function localizedHref(base, language = currentLanguage()) {
  if (language === 'en' && bilingualBases.has(base)) {
    return `${base}-en.html`;
  }
  return `${base}.html`;
}

function alternateLanguageHref() {
  const base = pageBase();
  const language = currentLanguage();

  if (language === 'ar') {
    return bilingualBases.has(base) ? `${base}-en.html` : 'index-en.html';
  }

  return `${base}.html`;
}

function isCurrent(href) {
  const file = currentFile();
  if (href === 'index.html' && (file === '' || file === 'index.html')) {
    return true;
  }
  return file === href;
}

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

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function brandLogoSrcByTheme(theme = currentTheme()) {
  return theme === 'light' ? BRAND_LOGO_LIGHT_THEME_SRC : BRAND_LOGO_DARK_THEME_SRC;
}

function brandNavbarLogoSrcByTheme(theme = currentTheme()) {
  return theme === 'light' ? BRAND_LOGO_NAV_LIGHT_THEME_SRC : BRAND_LOGO_NAV_DARK_THEME_SRC;
}

function brandFaviconSrcByTheme(theme = currentTheme()) {
  return theme === 'light' ? BRAND_FAVICON_LIGHT_THEME_SRC : BRAND_FAVICON_DARK_THEME_SRC;
}

function syncBrandLogos() {
  // Navbar logo follows theme for clear visibility.
  const navSrc = brandNavbarLogoSrcByTheme();
  document.querySelectorAll('img[data-brand-role="navbar"], .brand > .brand-logo').forEach((logo) => {
    if (logo.getAttribute('src') !== navSrc) {
      logo.setAttribute('src', navSrc);
    }
  });

  // In-page logos must follow the active theme.
  const contentSrc = brandLogoSrcByTheme();
  document
    .querySelectorAll('img[data-theme-content-logo], .footer-logo, .modal-brand-logo, img[data-inpage-logo], img[data-brand-role="content"]')
    .forEach((logo) => {
      if (logo.getAttribute('src') !== contentSrc) {
        logo.setAttribute('src', contentSrc);
      }
    });
}

function persistTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (_) {
    // Ignore storage access issues.
  }
}

function applyLanguageFromPage() {
  const lang = currentLanguage();
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ar');
  document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
}

function ensureBrandAssets() {
  const head = document.head;
  if (!head) return;
  const faviconSrc = brandFaviconSrcByTheme();

  const links = [
    { rel: 'icon', type: 'image/png' },
    { rel: 'shortcut icon', type: 'image/png' },
    { rel: 'apple-touch-icon' }
  ];

  links.forEach(({ rel, type }) => {
    let link = head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      head.appendChild(link);
    }

    link.href = faviconSrc;
    if (type) link.type = type;
  });
}

function syncThemeToggleButton() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const icon = button.querySelector('.theme-toggle-icon');
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  if (icon) {
    icon.textContent = isLight ? '☾' : '☀';
  }

  button.setAttribute('aria-label', isLight ? t('تفعيل الوضع الداكن', 'Enable dark mode') : t('تفعيل الوضع الفاتح', 'Enable light mode'));
  button.setAttribute('title', isLight ? t('الوضع الداكن', 'Dark mode') : t('الوضع الفاتح', 'Light mode'));
}

function buildHeader() {
  const headerSlot = document.querySelector('[data-site-header]');
  if (!headerSlot) return;

  const language = currentLanguage();

  const navLinks = primaryPages
    .map((page) => {
      const href = language === 'en' ? page.hrefEn : page.hrefAr;
      const label = language === 'en' ? page.labelEn : page.labelAr;
      return `<a href="${href}" ${isCurrent(href) ? 'aria-current="page"' : ''}>${label}</a>`;
    })
    .join('');

  headerSlot.innerHTML = `
    <a class="skip-link" href="#main-content">${t('تخطي إلى المحتوى', 'Skip to content')}</a>
    <header class="top-nav" role="banner">
      <div class="container nav-inner">
        <a class="brand" href="${localizedHref('index')}" aria-label="${t('العودة للصفحة الرئيسية', 'Back to homepage')}">
          <img
            class="brand-logo"
            data-brand-role="navbar"
            src="${brandNavbarLogoSrcByTheme()}"
            alt="${t('شعار بصمة', 'Basma logo')}"
            width="30"
            height="42"
            decoding="async"
          />
          <span class="brand-text">${t('بصمة | Basma Summit', 'Basma Summit | بصمة')}</span>
        </a>

        <button class="mobile-toggle" type="button" aria-expanded="false" aria-label="${t('فتح القائمة', 'Open menu')}" data-mobile-toggle>
          ☰
        </button>

        <nav class="nav-links" aria-label="${t('التنقل الرئيسي', 'Primary navigation')}" data-nav-links>
          ${navLinks}
        </nav>

        <div class="nav-tools">
          <a
            class="icon-btn lang-toggle"
            href="${alternateLanguageHref()}"
            aria-label="${language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}"
            title="${language === 'ar' ? 'English' : 'العربية'}"
            data-lang-toggle
          >
            <span class="lang-toggle-label">${language === 'ar' ? 'EN' : 'AR'}</span>
          </a>

          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="${t('تفعيل الوضع الفاتح', 'Enable light mode')}" title="${t('الوضع الفاتح', 'Light mode')}">
            <span class="theme-toggle-icon" aria-hidden="true">☀</span>
          </button>

          <div class="nav-cta">
            <a class="btn btn-ghost" href="${localizedHref('tickets')}">${t('التذاكر', 'Tickets')}</a>
            <a class="btn btn-secondary" href="${localizedHref('contact')}">${t('شارك معنا', 'Join Us')}</a>
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
    ensureBrandAssets();
    syncBrandLogos();
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

  const language = currentLanguage();

  const quickLinks = primaryPages
    .map((page) => {
      const href = language === 'en' ? page.hrefEn : page.hrefAr;
      const label = language === 'en' ? page.labelEn : page.labelAr;
      return `<a href="${href}">${label}</a>`;
    })
    .join('');

  const supportLinks = secondaryPages
    .map((page) => {
      const href = page.hrefAr;
      const label = language === 'en' ? page.labelEn : page.labelAr;
      return `<a href="${href}">${label}</a>`;
    })
    .join('');

  footerSlot.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="stack">
            <div class="footer-brand">
              <img
                class="footer-logo"
                data-brand-role="content"
                data-theme-content-logo
                src="${brandLogoSrcByTheme()}"
                alt="${t('شعار بصمة', 'Basma logo')}"
                width="44"
                height="61"
                loading="lazy"
                decoding="async"
              />
              <h3 class="footer-title">${t('بصمة — قمة وجوائز نساء مدن المستقبل', 'Basma — Women Future Cities Summit & Awards')}</h3>
            </div>
            <p>
              ${t(
                'منصة استراتيجية تحت مظلة C3 تعكس حصاد عام كامل من الإنجازات الملموسة في مسيرة بناء مدن المستقبل، وتحتفي بالدور المحوري للمرأة في قيادة التغيير والابتكار.',
                'A strategic platform under C3 celebrating a full year of measurable progress in future city building and spotlighting women leading change and innovation.'
              )}
            </p>
            <div class="badge-row" aria-label="${t('الجهات المرجعية', 'Reference entities')}">
              <span class="badge">C3</span>
              <span class="badge">Women Future Cities</span>
              <span class="badge">cccities.net</span>
            </div>
          </div>

          <div>
            <h3 class="footer-title">${t('روابط رئيسية', 'Main Pages')}</h3>
            <div class="footer-links">
              ${quickLinks}
            </div>
          </div>

          <div>
            <h3 class="footer-title">${t('روابط داعمة', 'Supporting Pages')}</h3>
            <div class="footer-links">
              ${supportLinks}
              <a href="mailto:info@cccities.net">info@cccities.net</a>
              <a href="tel:+96822000000">+968 2200 0000</a>
            </div>
          </div>
        </div>

        <div class="footer-meta">
          <span>© 2026 Basma Summit</span>
          <span>${t('النسخة الرسمية عبر', 'Official domain:')} <a href="https://cccities.net" target="_blank" rel="noopener">cccities.net</a></span>
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
        <div class="modal-brand" aria-hidden="true">
          <img class="modal-brand-logo" data-brand-role="content" data-theme-content-logo src="${brandLogoSrcByTheme()}" alt="" width="16" height="23" decoding="async" />
        </div>
        <button type="button" class="icon-btn modal-close" data-close-modal aria-label="${t('إغلاق', 'Close')}">✕</button>
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
    syncBrandLogos();
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
      <a class="btn btn-secondary" href="${localizedHref('events')}">${t('عرض الجلسات ذات الصلة', 'View Related Sessions')}</a>
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
    <div id="gallery-lightbox" class="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="${t('معرض الصور', 'Image gallery')}">
      <div class="lightbox-backdrop" data-close-lightbox></div>
      <div class="lightbox-panel">
        <button type="button" class="icon-btn lightbox-close" data-close-lightbox aria-label="${t('إغلاق', 'Close')}">✕</button>
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
  applyLanguageFromPage();
  ensureBrandAssets();
  buildHeader();
  initThemeToggle();
  activateNavState();
  buildFooter();
  activateReveal();
  activateCounters();
  activateSpeakerModal();
  syncBrandLogos();
  activateAgendaFilters();
  activateTickets();
  activateCarousel();
  activateLightbox();
  activateFaq();
  activateAnchorScroll();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('pageshow', () => {
  ensureBrandAssets();
  syncBrandLogos();
});
