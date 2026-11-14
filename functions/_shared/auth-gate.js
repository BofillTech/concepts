// Shared password gate logic for Cloudflare Pages middleware
// Used by both /training/ and /how-to-videos/
// Needs two encrypted environment variables on the "concepts" Pages project (Production AND Preview):
//   TRAINING_PASSWORD       the shared password you give clients
//   TRAINING_COOKIE_SECRET  any long random string (signs the 30-day login cookie)
// Changing TRAINING_PASSWORD logs everyone out.

const COOKIE = 'qs_training';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const enc = new TextEncoder();
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function sign(env, exp) {
  const key = await crypto.subtle.importKey('raw', enc.encode(env.TRAINING_COOKIE_SECRET + '|' + env.TRAINING_PASSWORD),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode('v1.' + exp)));
}

function safeEqual(a, b) {
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}

async function validCookie(request, env) {
  const m = (request.headers.get('Cookie') || '').match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
  if (!m) return false;
  const [exp, sig] = decodeURIComponent(m[1]).split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(env, exp));
}

function loginPage(title, subtitle, error, status) {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Sign in</title><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/img/quillstay-icon.png">
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600&family=Schibsted+Grotesk:wght@700;800&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#eef5ff,#f6fbff);font-family:'Public Sans',system-ui,sans-serif;color:#0e1f4d;padding:24px}
.card{background:#fff;border:1px solid #dbe6f5;border-radius:18px;padding:34px 30px;width:100%;max-width:400px;box-shadow:0 24px 50px -28px rgba(0,43,132,.45)}
img{height:36px;margin-bottom:22px}h1{font-family:'Schibsted Grotesk',sans-serif;font-size:24px;color:#001d5c}p{color:#4d5b7c;margin:8px 0 20px;font-size:15px}
label{font-weight:600;font-size:14px}input{width:100%;margin-top:6px;padding:13px 14px;border:1.5px solid #dbe6f5;border-radius:11px;font-size:16px}input:focus{outline:none;border-color:#0386f8;box-shadow:0 0 0 3px rgba(3,134,248,.14)}
button{margin-top:16px;width:100%;padding:13px;border:0;border-radius:11px;background:#002b84;color:#fff;font:700 16px 'Schibsted Grotesk',sans-serif;cursor:pointer}button:hover{background:#0267c0}
.err{background:#fdecea;color:#b42318;border-radius:9px;padding:10px 12px;font-size:14px;margin-bottom:14px}.foot{margin-top:18px;font-size:13px;color:#4d5b7c}</style></head>
<body><form class="card" method="POST"><img src="/img/quillstay-logo-dark.png" alt="QuillStay">
<h1>${title}</h1><p>${subtitle}</p>
${error ? '<div class="err">That password didn't work. Please try again.</div>' : ''}
<label for="pw">Password</label><input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
<button type="submit">Continue</button><div class="foot">Need access? Call 203-457-8550.</div></form></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

async function handlePasswordCheck(request, env, cookiePath, redirectPath) {
  if (!env.TRAINING_PASSWORD || !env.TRAINING_COOKIE_SECRET) {
    return new Response('This section is not configured.', { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  const pw = form ? String(form.get('password') || '') : '';
  if (!safeEqual(pw, env.TRAINING_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return null; // signals incorrect password
  }
  
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const token = exp + '.' + (await sign(env, exp));
  return new Response(null, { 
    status: 303, 
    headers: { 
      Location: redirectPath, 
      'Set-Cookie': `${COOKIE}=${token}; Path=${cookiePath}; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` 
    } 
  });
}

async function handleLogout(cookiePath, redirectPath) {
  return new Response(null, { 
    status: 303, 
    headers: { 
      Location: redirectPath, 
      'Set-Cookie': `${COOKIE}=; Path=${cookiePath}; Max-Age=0; HttpOnly; Secure; SameSite=Lax` 
    } 
  });
}

export { validCookie, loginPage, handlePasswordCheck, handleLogout, COOKIE, MAX_AGE };
