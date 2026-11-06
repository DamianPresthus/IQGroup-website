// IQ Group v4 — small progressive enhancements. Everything works without JS except the roster caption.
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
  spy($$('.nav-links a'));

  // Roster: show role and practice for the hovered or focused name.
  const detail = $('.roster-detail'), idle = detail?.textContent;
  $$('.names li').forEach(li => {
    const show = () => { detail.innerHTML = `<b>${li.childNodes[1].textContent.trim()}</b> — ${li.dataset.role}`; };
    li.addEventListener('mouseenter', show); li.addEventListener('focus', show);
    li.addEventListener('mouseleave', () => { detail.textContent = idle; });
  });

  // Preview switches (hero visual, palette): keep both choices in the query string.
  const q = new URLSearchParams(location.search);
  $$('.palette-switch [data-set]').forEach(a => {
    const [k, v] = a.dataset.set.split('=');
    const cur = k === 'hero' ? (q.get('hero') === 'team' ? 'team' : 'map') : (q.get('palette') === 'navy' ? 'navy' : 'plum');
    if (cur === v) a.setAttribute('aria-current', 'true');
    const next = new URLSearchParams(q); next.set(k, v); a.href = '?' + next.toString();
  });
})();
