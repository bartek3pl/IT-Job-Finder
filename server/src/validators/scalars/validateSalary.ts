import { ValidationError, UserInputError } from 'apollo-server-express';
import C from '../../models/helpers/constants';

const isValidSalary = (value: number) => {
  const minAmount = C.minSalary;
  const maxAmount = C.maxSalary;
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
