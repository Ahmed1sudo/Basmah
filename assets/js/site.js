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
const SOCIAL_ICON_MARKUP = {
  instagram:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.8" r="1.1" fill="currentColor"/></svg>',
  linkedin:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3.6" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="8.05" cy="8.7" r="1.15" fill="currentColor"/><path d="M6.95 11.2V16.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M11.2 16.8V11.2M11.2 13.3C11.2 11.9 12.25 11.1 13.35 11.1C14.85 11.1 16 12.03 16 13.9V16.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.05 4.3H8.9L12.9 9.56L17.22 4.3H19.3L13.9 10.9L19.95 19.7H16.1L11.92 13.7L6.96 19.7H4.88L10.91 12.38L5.05 4.3Z" fill="currentColor"/></svg>'
};

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

const logoCache = { nav: null, content: null };

function syncBrandLogos() {
  const navSrc = brandNavbarLogoSrcByTheme();
  if (logoCache.nav !== navSrc) {
    logoCache.nav = navSrc;
    document.querySelectorAll('img[data-brand-role="navbar"], .brand > .brand-logo').forEach((logo) => {
      logo.src = navSrc;
    });
  }

  const contentSrc = brandLogoSrcByTheme();
  if (logoCache.content !== contentSrc) {
    logoCache.content = contentSrc;
    document
      .querySelectorAll('img[data-theme-content-logo], .footer-logo, .modal-brand-logo, img[data-inpage-logo], img[data-brand-role="content"]')
      .forEach((logo) => {
        logo.src = contentSrc;
      });
  }
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

  const linkTypes = ['icon', 'shortcut icon', 'apple-touch-icon'];
  let existing = head.querySelector('link[rel="icon"]');

  if (existing && existing.href.includes('fingerprint')) {
    existing.href = faviconSrc;
    return;
  }

  const fragment = document.createDocumentFragment();
  linkTypes.forEach((rel) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.type = 'image/png';
    link.href = faviconSrc;
    fragment.appendChild(link);
  });
  head.appendChild(fragment);
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

function refreshThemeBranding() {
  ensureBrandAssets();
  syncBrandLogos();
  syncThemeToggleButton();
}

function getFocusableElements(container) {
  if (!container) return [];

  const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll(selector)).filter((element) => {
    if (element.getAttribute('aria-hidden') === 'true') return false;
    if (element.closest('[hidden], [aria-hidden="true"]')) return false;
    return true;
  });
}

function trapFocusInside(container, event) {
  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements(container);
  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey) {
    if (activeElement === first || !container.contains(activeElement)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (activeElement === last || !container.contains(activeElement)) {
    event.preventDefault();
    first.focus();
  }
}

function focusTargetElement(target) {
  if (!(target instanceof HTMLElement)) return;

  const hadTabIndex = target.hasAttribute('tabindex');
  if (!hadTabIndex) {
    target.setAttribute('tabindex', '-1');
  }

  target.focus({ preventScroll: true });

  if (!hadTabIndex) {
    target.addEventListener(
      'blur',
      () => {
        target.removeAttribute('tabindex');
      },
      { once: true }
    );
  }
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
      <div class="container">
        <div class="nav-inner">
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
      </div>
    </header>
  `;

  const toggle = headerSlot.querySelector('[data-mobile-toggle]');
  const links = headerSlot.querySelector('[data-nav-links]');
  if (toggle && links) {
    const openMenuLabel = t('فتح القائمة', 'Open menu');
    const closeMenuLabel = t('إغلاق القائمة', 'Close menu');
    const navId = links.id || `site-nav-links-${language}`;
    links.id = navId;
    toggle.setAttribute('aria-controls', navId);

    const setMenuState = (isOpen) => {
      links.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? closeMenuLabel : openMenuLabel);
      toggle.setAttribute('title', isOpen ? closeMenuLabel : openMenuLabel);
      toggle.textContent = isOpen ? '✕' : '☰';
    };

    const closeMenu = () => {
      setMenuState(false);
    };

    setMenuState(false);

    toggle.addEventListener('click', () => {
      setMenuState(!links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    let menuListenersAdded = false;
    const addMenuListeners = () => {
      if (menuListenersAdded) return;
      menuListenersAdded = true;

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && links.classList.contains('open')) {
          closeMenu();
          toggle.focus();
        }
      });

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!links.classList.contains('open')) return;
        if (!(target instanceof Element)) return;
        if (links.contains(target) || toggle.contains(target)) return;
        closeMenu();
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeMenu();
      });
    };

    toggle.addEventListener('click', addMenuListeners, { once: true });
    links.addEventListener('click', addMenuListeners, { once: true });
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
    refreshThemeBranding();
  });
}

function activateThemeSync() {
  window.addEventListener('storage', (event) => {
    if (event.key && event.key !== THEME_STORAGE_KEY) return;
    applyTheme(getPreferredTheme());
    refreshThemeBranding();
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

  const footerSocialLinks = [
    {
      label: 'Instagram',
      icon: 'instagram',
      href: 'https://www.instagram.com/wfcsummit/',
      ariaAr: 'بصمة على Instagram',
      ariaEn: 'Basma Summit on Instagram'
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/company/women-future-cities/',
      ariaAr: 'Women Future Cities على LinkedIn',
      ariaEn: 'Women Future Cities on LinkedIn'
    },
    {
      label: 'X',
      icon: 'x',
      href: 'https://x.com/wfcglobal',
      ariaAr: 'Women Future Cities على X',
      ariaEn: 'Women Future Cities on X'
    }
  ];

  const socialLinks = footerSocialLinks
    .map((link) => {
      const ariaLabel = language === 'en' ? link.ariaEn : link.ariaAr;
      return `<a class="footer-social-chip" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${ariaLabel}" title="${link.label}">${SOCIAL_ICON_MARKUP[link.icon]}<span class="sr-only">${link.label}</span></a>`;
    })
    .join('');

  footerSlot.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-col-brand stack">
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

          <div class="footer-col footer-col-links">
            <h3 class="footer-title">${t('روابط رئيسية', 'Main Pages')}</h3>
            <div class="footer-links">
              ${quickLinks}
            </div>
          </div>

          <div class="footer-col footer-col-contact">
            <h3 class="footer-title">${t('التواصل', 'Contact')}</h3>
            <div class="footer-contact-card">
              <div class="footer-contact">
                <div class="footer-contact-item">
                  <span class="footer-contact-label">${t('البريد الإلكتروني', 'Email')}</span>
                  <a class="footer-contact-link" href="mailto:info@cccities.net">info@cccities.net</a>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-label">${t('الهاتف', 'Phone')}</span>
                  <a class="footer-contact-link" href="tel:77324367">77324367</a>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-label">${t('تابعنا', 'Follow Us')}</span>
                  <div class="footer-contact-social" dir="ltr" aria-label="${t('قنوات التواصل الاجتماعي', 'Social media channels')}">
                    ${socialLinks}
                  </div>
                </div>
              </div>
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
    if (modal.getAttribute('aria-hidden') === 'true') return;
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
    const focusable = getFocusableElements(modal);
    focusable[0]?.focus();
  };

  triggerCards.forEach((card) => {
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-controls', 'speaker-modal');

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
    if (modal.getAttribute('aria-hidden') !== 'false') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    trapFocusInside(modal, event);
  });
}

function activateAgendaFilters() {
  const filterWrap = document.querySelector('[data-agenda-filters]');
  if (!filterWrap) return;

  const chips = filterWrap.querySelectorAll('[data-filter]');
  const sessions = document.querySelectorAll('[data-session-track]');

  chips.forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
  });
  sessions.forEach((session) => {
    session.setAttribute('aria-hidden', String(session.hidden));
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((btn) => {
        const isActive = btn === chip;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      const filter = chip.dataset.filter;

      sessions.forEach((session) => {
        const matches = filter === 'all' || session.dataset.sessionTrack === filter;
        session.hidden = !matches;
        session.setAttribute('aria-hidden', String(!matches));
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
    if (lightbox.getAttribute('aria-hidden') === 'true') return;
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
    const focusable = getFocusableElements(lightbox);
    focusable[0]?.focus();
  };

  items.forEach((item) => {
    item.setAttribute('aria-haspopup', 'dialog');
    item.setAttribute('aria-controls', 'gallery-lightbox');

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
    if (lightbox.getAttribute('aria-hidden') !== 'false') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    trapFocusInside(lightbox, event);
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
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      focusTargetElement(target);

      if (window.history && window.history.pushState && window.location.hash !== targetId) {
        window.history.pushState(null, '', targetId);
      }
    });
  });
}

function init() {
  applyTheme(getPreferredTheme());
  applyLanguageFromPage();
  ensureBrandAssets();
  buildHeader();
  initThemeToggle();
  activateThemeSync();
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
  applyTheme(getPreferredTheme());
  refreshThemeBranding();
});
