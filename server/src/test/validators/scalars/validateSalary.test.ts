import { ValidationError } from 'apollo-server-errors';
import { expect } from 'chai';

import validateSalary from '../../../validators/scalars/validateSalary';
import C from '../../../models/helpers/constants';

describe('SalaryValidator', () => {
  const testCases = [
    {
      value: C.maxSalary / 2,
      expected: C.maxSalary / 2,
      msg: 'valid salary',
    },
    {
      value: C.minSalary - 1,
      expected: null,
      msg: 'too less salary',
    },
    {
      value: C.maxSalary + 1,
      expected: null,
      msg: 'too much salary',
    },
    {
      value: C.maxSalary - 0.64,
      expected: C.maxSalary - 1,
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
