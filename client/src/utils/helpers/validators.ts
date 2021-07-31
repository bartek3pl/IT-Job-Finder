import emailValidator from 'email-validator';

export const validateLogin = (login: string) =>
  typeof login === 'string' && login?.length >= 6 && login?.length <= 24;

export const validateEmail = (email: string) => emailValidator.validate(email);

const hasUpperCaseLetter = (str: string) => str.toLowerCase() !== str;

const hasNumber = (str: string) => /\d/.test(str);

export const validatePassword = (password: string) =>
  typeof password === 'string' &&
  password?.length >= 6 &&
  password?.length <= 24 &&
  hasUpperCaseLetter(password) &&
  hasNumber(password);
