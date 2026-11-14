// Cloudflare Pages middleware: password-protects everything under /training/ on quillstay.com
// Uses shared auth-gate logic so the same cookie works for /training/ and /how-to-videos/

import { validCookie, loginPage, handlePasswordCheck, handleLogout } from '../_shared/auth-gate.js';

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (url.pathname.replace(/\/+$/, '') === '/training/logout') {
    return handleLogout('/', '/training/');
  }

  if (request.method === 'POST') {
    const result = await handlePasswordCheck(request, env, '/', '/training/');
    if (!result) return loginPage('QuillStay Training', 'Enter the password QuillStay gave you to start your training.', true, 401);
    return result;
  }

  if (!(await validCookie(request, env))) {
    return loginPage('QuillStay Training', 'Enter the password QuillStay gave you to start your training.', false, 401);
  }

  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set('Cache-Control', 'private, no-store');
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return out;
}
