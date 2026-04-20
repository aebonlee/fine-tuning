export const ADMIN_EMAILS = [
  'aebon@kakao.com',
  'radical8566@gmail.com',
  'aebon@kyonggi.ac.kr',
];

export function isAdmin(email) {
  return ADMIN_EMAILS.includes(email?.toLowerCase());
}
