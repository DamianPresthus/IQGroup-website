// IQ Group v4: small progressive enhancements. Everything works without JS except the roster caption.
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
    const show = () => { detail.innerHTML = `<b>${li.childNodes[1].textContent.trim()}</b>, ${li.dataset.role}`; };
    li.addEventListener('mouseenter', show); li.addEventListener('focus', show);
    li.addEventListener('mouseleave', () => { detail.textContent = idle; });
  });

  // Enquiry sheet: one dialog, two short forms. Submitting composes an email to the firm's address
  // (subject depends on the form) and opens the visitor's mail app; a form backend can replace this later.
  const TO = 'ashmita@iqgroup.co.in';
  const dlg = $('#enquiry');
  if (dlg && typeof dlg.showModal === 'function') {
    const forms = $$('.enquiry-form', dlg), done = $('.enquiry-done', dlg), tabs = $$('.enquiry-switch [data-mode]', dlg);
    let lastTrigger = null, lastMessage = '';
    const setMode = (mode) => {
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.mode === mode));
      forms.forEach(f => { f.hidden = f.dataset.mode !== mode; });
      done.hidden = true;
      dlg.querySelector('.enquiry-switch').hidden = false;
      const form = forms.find(f => f.dataset.mode === mode);
      dlg.setAttribute('aria-labelledby', (form.querySelector('h2').id ||= 'enquiry-title-' + mode));
      return form;
    };
    const open = (mode, trigger) => {
      lastTrigger = trigger; const form = setMode(mode);
      if (!dlg.open) dlg.showModal();
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => form.querySelector('input').focus({ preventScroll: true }));
    };
    const close = () => dlg.close();
    dlg.addEventListener('close', () => { document.body.style.overflow = ''; lastTrigger?.focus({ preventScroll: true }); });
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });            // backdrop
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', close));
    tabs.forEach(t => t.addEventListener('click', () => { const f = setMode(t.dataset.mode); f.querySelector('input').focus(); }));
    $$('[data-enquiry]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); open(el.dataset.enquiry, el); }));

    const check = (input) => {
      const ok = input.checkValidity() && input.value.trim() !== '' || !input.required;
      input.closest('.field')?.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', !ok);
      return ok;
    };
    forms.forEach(form => {
      $$('input[required]', form).forEach(i => {
        i.addEventListener('blur', () => { if (i.value) check(i); });
        i.addEventListener('input', () => { if (i.closest('.field').classList.contains('invalid')) check(i); });
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        const bad = $$('input[required]', form).filter(i => !check(i));
        if (bad.length) { bad[0].focus(); return; }
        const v = Object.fromEntries([...new FormData(form)].map(([k, x]) => [k, String(x).trim()]));
        let subject, lines;
        if (form.dataset.mode === 'search') {
          subject = `Search enquiry: ${v.role}${v.org ? ', ' + v.org : ''}`;
          lines = [`Name: ${v.name}`, `Email: ${v.email}`, v.org && `Organisation: ${v.org}`, `Role to fill: ${v.role}`, v.tel && `Phone: ${v.tel}`, v.note && `\n${v.note}`];
        } else {
          subject = `Confidential profile: ${v.name}, ${v.role}`;
          lines = [`Name: ${v.name}`, `Email: ${v.email}`, `Current role: ${v.role}`, v.url && `LinkedIn: ${v.url}`, v.note && `\n${v.note}`];
        }
        const body = lines.filter(Boolean).join('\n');
        lastMessage = `To: ${TO}\nSubject: ${subject}\n\n${body}`;
        const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        $('[data-direct]', done).href = href;
        $('[data-copied]', done).hidden = true;
        location.href = href;
        forms.forEach(f => { f.hidden = true; });
        dlg.querySelector('.enquiry-switch').hidden = true;
        done.hidden = false; done.querySelector('h2').focus();
        form.reset();
      });
    });
    $('[data-copy]', done).addEventListener('click', async () => {
      const note = $('[data-copied]', done);
      try { await navigator.clipboard.writeText(lastMessage); note.textContent = `Copied. Paste it into an email to ${TO}.`; }
      catch { note.textContent = `Couldn’t copy automatically. Please email ${TO}.`; }
      note.hidden = false;
    });
  }

  // Preview switches (hero visual, palette): keep both choices in the query string.
  const q = new URLSearchParams(location.search);
  $$('.palette-switch [data-set]').forEach(a => {
    const [k, v] = a.dataset.set.split('=');
    const cur = k === 'hero' ? (q.get('hero') === 'team' ? 'team' : 'map') : (q.get('palette') === 'navy' ? 'navy' : 'plum');
    if (cur === v) a.setAttribute('aria-current', 'true');
    const next = new URLSearchParams(q); next.set(k, v); a.href = '?' + next.toString();
  });
})();
