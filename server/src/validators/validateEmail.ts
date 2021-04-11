import emailValidator from 'email-validator';

const validateEmail = (value: string): string => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not a string: ${value}`);
  }

  const isValidFormat = emailValidator.validate(value);

  if (!isValidFormat) {
    throw new TypeError(`Value is not a valid Email: ${value}`);
  }

  return value;
};

export default validateEmail;
