import { ValidationError } from 'apollo-server-errors';
import { expect } from 'chai';

import validateDateTime from '../../../validators/scalars/validateDateTime';

describe('DateTimeValidator', () => {
  const testCases = [
    {
      value: '2021-10-12 5:23:3',
      expected: '2021-10-12 5:23:3',
      msg: 'valid DateTime',
    },
    {
      value: '20212-10-12 5:23:3',
      expected: null,
      msg: 'invalid year DateTime',
    },
    {
      value: '2021-101-12 5:23:3',
      expected: null,
      msg: 'invalid month DateTime',
    },
    {
      value: '2021-10-120 5:23:3',
      expected: null,
      msg: 'invalid day DateTime',
    },
    {
      value: '2021-10-12 522:23:3',
      expected: null,
      msg: 'invalid hour DateTime',
    },
    {
      value: '2021-101-12 5:223:3',
      expected: null,
      msg: 'invalid minute DateTime',
    },
    {
      value: '2021-101-12 5:23:322',
      expected: null,
      msg: 'invalid second DateTime',
    },
  ];

  testCases.forEach(({ value, expected, msg }) => {
    const message = expected
      ? `returns ${expected} for ${msg}`
      : `throws ValidatioError for ${msg}`;

    it(message, () => {
      if (expected) {
        expect(validateDateTime(value)).to.equal(expected);
      } else {
        expect(() => validateDateTime(value)).to.throw(
          ValidationError,
          `Value is not a valid DateTime: ${value}`
        );
      }
    });
  });
});
