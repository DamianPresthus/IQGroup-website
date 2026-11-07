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

  // Roster: show role and sectors for the hovered or focused name.
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

    // Bottom sheet (phones): drag down to dismiss. Starts from the header at any time, or from the
    // body when it is scrolled to the top; a long or fast enough pull closes, anything else snaps back.
    const sheetMode = matchMedia('(max-width: 560px)');
    const inner = $('.enquiry-inner', dlg);
    let drag = null;
    const settle = (to, then) => {
      dlg.style.transition = 'transform 0.26s cubic-bezier(0.2, 0.7, 0.2, 1)';
      dlg.style.transform = to;
      let done = false;
      const finish = () => { if (done) return; done = true; then?.(); dlg.style.transition = ''; dlg.style.transform = ''; };   // close first so the sheet never flashes back up
      dlg.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 320);                                                    // reduced motion / no transition
    };
    dlg.addEventListener('touchstart', e => {
      if (!sheetMode.matches || e.touches.length !== 1 || e.target.closest('textarea')) return;
      const fromHead = !!e.target.closest('.enquiry-head');
      if (!fromHead && inner.scrollTop > 0) return;
      drag = { y0: e.touches[0].clientY, t0: performance.now(), dy: 0, active: false };
    }, { passive: true });
    dlg.addEventListener('touchmove', e => {
      if (!drag) return;
      const dy = e.touches[0].clientY - drag.y0;
      if (!drag.active) {
        if (dy < 6) { if (dy < -6) drag = null; return; }                         // upward: let the body scroll
        drag.active = true;
        dlg.style.transition = 'none';
      }
      e.preventDefault();
      drag.dy = Math.max(0, dy);
      dlg.style.transform = `translateY(${drag.dy}px)`;
    }, { passive: false });
    const endDrag = () => {
      if (!drag) return;
      const { dy, t0, active } = drag; drag = null;
      if (!active) return;
      const fast = dy / (performance.now() - t0) > 0.5;
      if (dy > Math.min(140, dlg.offsetHeight * 0.25) || (fast && dy > 40)) settle('translateY(100%)', close);
      else settle('translateY(0)');
    };
    dlg.addEventListener('touchend', endDrag);
    dlg.addEventListener('touchcancel', endDrag);
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
})();
