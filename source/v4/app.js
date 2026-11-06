// IQ Group v4 — small progressive enhancements. Everything works without JS except the stepper detail and roster caption.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Nav: elevate once the page scrolls.
  const onScroll = () => document.body.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mobile menu sheet.
  const sheet = $('#sheet'), openBtn = $('.nav .nav-menu'), closeBtn = $('.sheet-close');
  const setSheet = (open) => { sheet.classList.toggle('is-open', open); openBtn.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; (open ? closeBtn : openBtn).focus(); };
  openBtn.addEventListener('click', () => setSheet(true));
  closeBtn.addEventListener('click', () => setSheet(false));
  $$('#sheet a').forEach(a => a.addEventListener('click', () => setSheet(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) setSheet(false); });

  // Scrollspy: services index + primary nav.
  const spy = (links, attr = 'aria-current') => {
    const map = new Map(links.map(a => [document.getElementById(a.hash.slice(1)), a]).filter(([el]) => el));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { links.forEach(l => l.removeAttribute(attr)); map.get(en.target).setAttribute(attr, 'true'); } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, el) => io.observe(el));
  };
  spy($$('.svc-index a'));
  spy($$('.nav-links a'));

  // Methodology stepper (WAI-ARIA tabs pattern).
  const steps = $$('.step'), panel = $('#step-panel'), track = $('.steps');
  const select = (i, focus) => {
    steps.forEach((s, j) => { const on = j === i; s.setAttribute('aria-selected', on); s.tabIndex = on ? 0 : -1; s.classList.toggle('is-done', j < i); });
    const s = steps[i];
    panel.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b><strong>${s.dataset.title}</strong><p>${s.dataset.text}</p>`;
    track.style.setProperty('--progress', steps.length > 1 ? i / (steps.length - 1) : 0);
    if (focus) s.focus();
  };
  steps.forEach((s, i) => {
    s.addEventListener('click', () => select(i));
    s.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); select((i + k + steps.length) % steps.length, true); }
      if (e.key === 'Home') { e.preventDefault(); select(0, true); }
      if (e.key === 'End') { e.preventDefault(); select(steps.length - 1, true); }
    });
  });

  // Roster: show role and practice for the hovered or focused name.
  const detail = $('.roster-detail'), idle = detail?.textContent;
  $$('.names li').forEach(li => {
    const show = () => { detail.innerHTML = `<b>${li.childNodes[1].textContent.trim()}</b> — ${li.dataset.role}`; };
    li.addEventListener('mouseenter', show); li.addEventListener('focus', show);
    li.addEventListener('mouseleave', () => { detail.textContent = idle; });
  });

  // Preview palette switch state.
  const p = document.documentElement.dataset.palette === 'navy' ? 'navy' : 'plum';
  $(`.palette-switch [data-p="${p}"]`)?.setAttribute('aria-current', 'true');
})();
