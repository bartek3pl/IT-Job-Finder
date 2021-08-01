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

export const validateUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
};
