const DATE_TIME_REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9](\.\d{3})?)?$/;

const validateDateTime = (value: string): string => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not a string: ${value}`);
  }

  const isValidFormat = DATE_TIME_REGEX.test(value);

  if (!isValidFormat) {
    throw new TypeError(`Value is not a valid DateTime: ${value}`);
  }

  return value;
};

export default validateDateTime;
