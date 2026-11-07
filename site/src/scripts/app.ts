// Cloudflare Turnstile widget API (present only when PUBLIC_TURNSTILE_SITE_KEY is set; see EnquiryDialog.astro).
interface Window { turnstile?: { reset(): void } }

// Small progressive enhancements. Everything works without JS except the roster caption.
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

// Nav: elevate once the page scrolls.
const onScroll = () => document.body.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu sheet.
const sheet = $('#sheet')!;
const openBtn = $<HTMLButtonElement>('.nav .nav-menu')!;
const closeBtn = $<HTMLButtonElement>('.sheet-close')!;
const setSheet = (open: boolean) => {
  sheet.classList.toggle('is-open', open);
  openBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  (open ? closeBtn : openBtn).focus();
};
openBtn.addEventListener('click', () => setSheet(true));
closeBtn.addEventListener('click', () => setSheet(false));
$$('#sheet a').forEach((a) => a.addEventListener('click', () => setSheet(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) setSheet(false); });

// Roster (About): show role and sectors for the hovered or focused name.
const detail = $('.roster-detail');
if (detail) {
  const idle = detail.textContent;
  $$('.names li').forEach((li) => {
    const show = () => { detail.innerHTML = `<b>${li.dataset.name}</b>, ${li.dataset.role}`; };
    li.addEventListener('mouseenter', show);
    li.addEventListener('focus', show);
    li.addEventListener('mouseleave', () => { detail.textContent = idle; });
  });
}

// Sector strip (desktop): the hovered icon tilts a few degrees about the axis facing the pointer (CSS var --tilt,
// read by the icon's `rotate`). Precise pointers on wide screens only, never with reduced motion.
const tiltable = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px) and (prefers-reduced-motion: no-preference)');
$$('.sectors-strip .tile').forEach((tile) => {
  const icon = $('.tile-icon', tile);
  if (!icon) return;
  tile.addEventListener('pointermove', (e) => {
    if (!tiltable.matches) return;
    const box = tile.getBoundingClientRect();
    const dx = (e.clientX - box.left) / box.width - 0.5; // -0.5 … 0.5 across the tile
    const dy = (e.clientY - box.top) / box.height - 0.5;
    const degrees = Math.min(Math.hypot(dx, dy) * 10, 6);
    icon.style.setProperty('--tilt', `${(-dy).toFixed(3)} ${dx.toFixed(3)} 0 ${degrees.toFixed(2)}deg`);
  });
  tile.addEventListener('pointerleave', () => icon.style.removeProperty('--tilt'));
});

// Page transition Home → Sectors: only the clicked tile's icon and title get the names its section on /sectors/
// carries (sectors.astro), so exactly one tile flies across; everything else cross-fades.
$$<HTMLAnchorElement>('.sectors-strip a.tile[href^="/sectors/"]').forEach((tile) => {
  tile.addEventListener('click', () => {
    $('.tile-icon', tile)!.style.viewTransitionName = `icon-${tile.dataset.sector}`;
    $('h3', tile)!.style.viewTransitionName = `title-${tile.dataset.sector}`;
  });
});

// Enquiry sheet: one dialog, two short forms. Submitting sends the enquiry through the site (functions/api/enquiry.ts);
// if that is unavailable it composes the same email in the visitor's mail app.
const dlg = $<HTMLDialogElement>('#enquiry');
if (dlg && typeof dlg.showModal === 'function') {
  const TO = dlg.dataset.to!;
  const forms = $$<HTMLFormElement>('.enquiry-form', dlg);
  const done = $('.enquiry-done', dlg)!;
  const tabs = $$<HTMLButtonElement>('.enquiry-switch [data-mode]', dlg);
  const switcher = $('.enquiry-switch', dlg)!;
  let lastTrigger: HTMLElement | null = null;
  let lastMessage = '';

  const setMode = (mode: string) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.mode === mode)));
    forms.forEach((f) => { f.hidden = f.dataset.mode !== mode; });
    done.hidden = true;
    switcher.hidden = false;
    const form = forms.find((f) => f.dataset.mode === mode)!;
    const heading = form.querySelector('h2')!;
    heading.id ||= `enquiry-title-${mode}`;
    dlg.setAttribute('aria-labelledby', heading.id);
    return form;
  };
  const open = (mode: string, trigger: HTMLElement) => {
    lastTrigger = trigger;
    const form = setMode(mode);
    if (!dlg.open) dlg.showModal();
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => form.querySelector('input')!.focus({ preventScroll: true }));
  };
  const close = () => dlg.close();
  dlg.addEventListener('close', () => { document.body.style.overflow = ''; lastTrigger?.focus({ preventScroll: true }); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); }); // backdrop
  $$('[data-close]', dlg).forEach((b) => b.addEventListener('click', close));

  // Bottom sheet (phones): drag down to dismiss. Starts from the header at any time, or from the body when it is
  // scrolled to the top; a long or fast enough pull closes, anything else snaps back.
  const sheetMode = matchMedia('(max-width: 560px)');
  const inner = $('.enquiry-inner', dlg)!;
  let drag: { y0: number; t0: number; dy: number; active: boolean } | null = null;
  const settle = (to: string, then?: () => void) => {
    dlg.style.transition = 'transform 0.26s cubic-bezier(0.2, 0.7, 0.2, 1)';
    dlg.style.transform = to;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      then?.(); // close first so the sheet never flashes back up
      dlg.style.transition = '';
      dlg.style.transform = '';
    };
    dlg.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 320); // reduced motion / no transition
  };
  dlg.addEventListener('touchstart', (e) => {
    const target = e.target as Element;
    if (!sheetMode.matches || e.touches.length !== 1 || target.closest('textarea')) return;
    if (!target.closest('.enquiry-head') && inner.scrollTop > 0) return;
    drag = { y0: e.touches[0].clientY, t0: performance.now(), dy: 0, active: false };
  }, { passive: true });
  dlg.addEventListener('touchmove', (e) => {
    if (!drag) return;
    const dy = e.touches[0].clientY - drag.y0;
    if (!drag.active) {
      if (dy < 6) { if (dy < -6) drag = null; return; } // upward: let the body scroll
      drag.active = true;
      dlg.style.transition = 'none';
    }
    e.preventDefault();
    drag.dy = Math.max(0, dy);
    dlg.style.transform = `translateY(${drag.dy}px)`;
  }, { passive: false });
  const endDrag = () => {
    if (!drag) return;
    const { dy, t0, active } = drag;
    drag = null;
    if (!active) return;
    const fast = dy / (performance.now() - t0) > 0.5;
    if (dy > Math.min(140, dlg.offsetHeight * 0.25) || (fast && dy > 40)) settle('translateY(100%)', close);
    else settle('translateY(0)');
  };
  dlg.addEventListener('touchend', endDrag);
  dlg.addEventListener('touchcancel', endDrag);

  tabs.forEach((t) => t.addEventListener('click', () => setMode(t.dataset.mode!).querySelector('input')!.focus()));
  $$('[data-enquiry]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); open(el.dataset.enquiry!, el); }));

  const check = (input: HTMLInputElement) => {
    const ok = (input.checkValidity() && input.value.trim() !== '') || !input.required;
    input.closest('.field')?.classList.toggle('invalid', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  };
  forms.forEach((form) => {
    $$<HTMLInputElement>('input[required]', form).forEach((i) => {
      i.addEventListener('blur', () => { if (i.value) check(i); });
      i.addEventListener('input', () => { if (i.closest('.field')!.classList.contains('invalid')) check(i); });
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bad = $$<HTMLInputElement>('input[required]', form).filter((i) => !check(i));
      if (bad.length) { bad[0].focus(); return; }
      const mode = form.dataset.mode!;
      const v = Object.fromEntries([...new FormData(form)].map(([k, x]) => [k, String(x).trim()]));
      const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;

      // 1. Send through the site (functions/api/enquiry.ts). Anything but success falls back to the email app, so an
      //    enquiry is never lost: endpoint not configured (503), spam check failed (403), offline, or local dev (404).
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      let sent = false;
      try {
        const res = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ mode, ...v, turnstile: v['cf-turnstile-response'] }),
        });
        sent = res.ok;
      } catch {
        sent = false;
      }
      submit.disabled = false;
      submit.removeAttribute('aria-busy');

      // 2. Fallback: compose the same message in the visitor's email app.
      if (!sent) {
        let subject: string;
        let lines: (string | false | undefined)[];
        if (mode === 'search') {
          subject = `Search enquiry: ${v.role}${v.org ? `, ${v.org}` : ''}`;
          lines = [`Name: ${v.name}`, `Email: ${v.email}`, v.org && `Organisation: ${v.org}`, `Role to fill: ${v.role}`, v.tel && `Phone: ${v.tel}`, v.note && `\n${v.note}`];
        } else {
          subject = `Confidential profile: ${v.name}, ${v.role}`;
          lines = [`Name: ${v.name}`, `Email: ${v.email}`, `Current role: ${v.role}`, v.url && `LinkedIn: ${v.url}`, v.note && `\n${v.note}`];
        }
        const body = lines.filter(Boolean).join('\n');
        lastMessage = `To: ${TO}\nSubject: ${subject}\n\n${body}`;
        const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        $<HTMLAnchorElement>('[data-direct]', done)!.href = href;
        $('[data-copied]', done)!.hidden = true;
        location.href = href;
      }

      const outcome = sent ? 'sent' : 'mailto';
      $$('[data-outcome]', done).forEach((el) => { el.hidden = el.dataset.outcome !== outcome; });
      $$('[data-for]', done).forEach((el) => { el.hidden = el.dataset.for !== mode; });
      forms.forEach((f) => { f.hidden = true; });
      switcher.hidden = true;
      done.hidden = false;
      $(`[data-outcome="${outcome}"] h2`, done)!.focus();
      form.reset();
      window.turnstile?.reset();
    });
  });
  $('[data-copy]', done)!.addEventListener('click', async () => {
    const note = $('[data-copied]', done)!;
    try {
      await navigator.clipboard.writeText(lastMessage);
      note.textContent = `Copied. Paste it into an email to ${TO}.`;
    } catch {
      note.textContent = `Couldn’t copy automatically. Please email ${TO}.`;
    }
    note.hidden = false;
  });
}
