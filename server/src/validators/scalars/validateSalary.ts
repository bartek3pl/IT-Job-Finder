import { ValidationError, UserInputError } from 'apollo-server-express';

const isValidSalary = (value: number) => {
  const minAmount = 0;
  const maxAmount = 50_000;
  const isValueValid =
    Number.isInteger(value) && value >= minAmount && value <= maxAmount;

  return isValueValid;
};

const validateSalary = (value: number): number => {
  if (typeof value !== 'number') {
    throw new UserInputError(`Value is not a number: ${value}`);
  }

  const intValue = Math.floor(value);

  const isValidFormat = isValidSalary(intValue);

  if (!isValidFormat) {
    throw new ValidationError(`Value is not a valid Salary: ${intValue}`);
  }

  return intValue;
};

export default validateSalary;
