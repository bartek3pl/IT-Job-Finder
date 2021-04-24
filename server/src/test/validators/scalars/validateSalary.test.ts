import { ValidationError } from 'apollo-server-errors';
import { expect } from 'chai';

import validateSalary from '../../../validators/scalars/validateSalary';

describe('SalaryValidator', () => {
  const testCases = [
    {
      value: 8000,
      expected: 8000,
      msg: 'valid salary',
    },
    {
      value: -1,
      expected: null,
      msg: 'negative salary',
    },
    {
      value: 50001,
      expected: null,
      msg: 'too much salary',
    },
    {
      value: 5000.42,
      expected: 5000,
      msg: 'float salary',
    },
  ];

  testCases.forEach(({ value, expected, msg }) => {
    const message = expected
      ? `returns ${expected} for ${msg}`
      : `throws ValidatioError for ${msg}`;

    it(message, () => {
      if (expected) {
        expect(validateSalary(value)).to.equal(expected);
      } else {
        expect(() => validateSalary(value)).to.throw(
          ValidationError,
          `Value is not a valid Salary: ${value}`
        );
      }
    });
  });
});
