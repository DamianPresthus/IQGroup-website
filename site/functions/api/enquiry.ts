// POST /api/enquiry: the enquiry dialog's two forms (hiring / open to roles) → spam check → email to the firm.
// Cloudflare Pages Function. Configure in Cloudflare Pages → Settings → Variables and secrets (see site/README.md):
//   RESEND_API_KEY        secret, from resend.com (required; without it the endpoint answers 503 and the form
//                         falls back to opening the visitor's email app)
//   ENQUIRY_TO            recipient, e.g. ashmita@iqgroup.co.in (required)
//   ENQUIRY_FROM          sender; must be on a domain verified in Resend (default: Resend's shared test sender,
//                         which can only deliver to the Resend account owner's own address)
//   TURNSTILE_SECRET_KEY  secret; when set, every submission must carry a valid Cloudflare Turnstile token

interface Env {
  RESEND_API_KEY?: string;
  ENQUIRY_TO?: string;
  ENQUIRY_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Mode = 'search' | 'profile';
const FIELDS: Record<Mode, { required: string[]; optional: string[] }> = {
  search: { required: ['name', 'email', 'role'], optional: ['note', 'org', 'tel'] },
  profile: { required: ['name', 'email', 'role'], optional: ['note', 'url'] },
};
const LIMIT = 4000; // per field; enough for a long note, too little for abuse
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO) return reply(503, { error: 'not-configured' });

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return reply(400, { error: 'bad-json' });
  }

  // Honeypot: real visitors never see the `company` field; bots fill it. Answer as if sent.
  if (typeof input.company === 'string' && input.company !== '') return reply(200, { ok: true });

  const mode = input.mode;
  if (mode !== 'search' && mode !== 'profile') return reply(400, { error: 'bad-mode' });
  const values: Record<string, string> = {};
  for (const key of [...FIELDS[mode].required, ...FIELDS[mode].optional]) {
    const raw = input[key];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (value.length > LIMIT) return reply(400, { error: 'too-long', field: key });
    values[key] = value;
  }
  const missing = FIELDS[mode].required.filter((key) => !values[key]);
  if (missing.length) return reply(400, { error: 'missing', fields: missing });
  if (!EMAIL.test(values.email)) return reply(400, { error: 'bad-email' });

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof input.turnstile === 'string' ? input.turnstile : '';
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    });
    const outcome: { success?: boolean } = await check.json();
    if (!outcome.success) return reply(403, { error: 'spam-check' });
  }

  const v = values;
  const subject = mode === 'search'
    ? `Search enquiry: ${v.role}${v.org ? `, ${v.org}` : ''}`
    : `Confidential profile: ${v.name}, ${v.role}`;
  const lines = mode === 'search'
    ? [`Name: ${v.name}`, `Email: ${v.email}`, v.org && `Organisation: ${v.org}`, `Role to fill: ${v.role}`, v.tel && `Phone: ${v.tel}`, v.note && `\n${v.note}`]
    : [`Name: ${v.name}`, `Email: ${v.email}`, `Current role: ${v.role}`, v.url && `LinkedIn: ${v.url}`, v.note && `\n${v.note}`];
  const text = `${lines.filter(Boolean).join('\n')}\n\n— Sent from the enquiry form on the IQ Group website. Reply to answer ${v.name} directly.`;

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM ?? 'IQ Group website <onboarding@resend.dev>',
      to: [env.ENQUIRY_TO],
      reply_to: v.email,
      subject,
      text,
    }),
  });
  if (!sent.ok) return reply(502, { error: 'send-failed' });
  return reply(200, { ok: true });
};
