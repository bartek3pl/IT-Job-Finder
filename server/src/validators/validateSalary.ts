const isValidFormat = (value: string) => {
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
    throw new TypeError(`Value is not a string: ${value}`);
  }

  if (!isValidFormat) {
    throw new TypeError(`Value is not a valid Salary: ${value}`);
  }

  return value;
};

export default validateSalary;
