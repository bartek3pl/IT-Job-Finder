import { ValidationError, UserInputError } from 'apollo-server-express';

const DATE_TIME_REGEX = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;

const validateDateTime = (value: string): string => {
  if (typeof value !== 'string') {
    throw new UserInputError(`Value is not a string: ${value}`);
  }

  const isValidFormat = DATE_TIME_REGEX.test(value);

  if (!isValidFormat) {
    throw new ValidationError(`Value is not a valid DateTime: ${value}`);
  }

  return value;
};

export default validateDateTime;
