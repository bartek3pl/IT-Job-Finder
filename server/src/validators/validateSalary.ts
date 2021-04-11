import { ValidationError, UserInputError } from 'apollo-server-express';

const isValidSalary = (value: string) => {
  const numValue = parseInt(value, 10);
  const minAmount = 0;
  const maxAmount = 50_000;
  const isValueValid =
    Number.isInteger(numValue) &&
    numValue >= minAmount &&
    numValue <= maxAmount;

  return isValueValid;
};

const validateSalary = (value: string): string => {
  if (typeof value !== 'string') {
    throw new UserInputError(`Value is not a string: ${value}`);
  }

  const isValidFormat = isValidSalary(value);

  if (!isValidFormat) {
    throw new ValidationError(`Value is not a valid Salary: ${value}`);
  }

  return value;
};

export default validateSalary;
