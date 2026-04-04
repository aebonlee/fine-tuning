export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = location.protocol === 'https:' ? ';Secure' : '';
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax${secure}`;
}
