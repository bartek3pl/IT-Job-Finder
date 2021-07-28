export const validateLogin = (login: string) =>
  typeof login === 'string' && login?.length >= 6 && login?.length <= 30;

const hasUpperCaseLetter = (str: string) => str.toLowerCase() !== str;

export const validatePassword = (password: string) =>
  typeof password === 'string' &&
  password?.length >= 6 &&
  password?.length <= 30 &&
  hasUpperCaseLetter(password);
