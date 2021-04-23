const validateLogin = (login: string) =>
  typeof login === 'string' && login?.length >= 6 && login?.length <= 24;

const hasUpperCaseLetter = (str: string) => str.toLowerCase() !== str;

const hasNumber = (str: string) => /\d/.test(str);

const validatePassword = (password: string) =>
  typeof password === 'string' &&
  password?.length >= 6 &&
  password?.length <= 24 &&
  hasUpperCaseLetter(password) &&
  hasNumber(password);

export { validateLogin, validatePassword };
