import { parseCookies } from 'nookies';

export const getTokenFromCookies = (context) => {
  const cookies = parseCookies(context);
  return cookies.token || null;
};