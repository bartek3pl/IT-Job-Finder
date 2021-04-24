import { UserInputError, ValidationError } from 'apollo-server-errors';
import { expect } from 'chai';

import validatePostalCode from '../../../validators/scalars/validatePostalCode';

describe('PostalCodeValidator', () => {
  const testCases = [
    {
      value: '54-106,PL',
      postalCode: null,
      country: null,
      expected: '54-106,PL',
      msg: 'valid postal code',
    },
    {
      value: '54-1060,PL',
      postalCode: '54-1060',
      country: null,
      expected: 'ValidationError',
      msg: 'invalid postal code',
    },
    {
      value: '54-106,TEST',
      postalCode: null,
      country: 'TEST',
      expected: 'UserInputError',
      msg: 'not existing country',
    },
  ];

  testCases.forEach(({ value, postalCode, country, expected, msg }) => {
    const message = expected
      ? `returns ${expected} for ${msg}`
      : `throws ${expected} for ${msg}`;

    it(message, () => {
      if (expected === 'ValidationError') {
        expect(() => validatePostalCode(value)).to.throw(
          ValidationError,
          `Value is not a valid Postal Code: ${postalCode}`
        );
      } else if (expected === 'UserInputError') {
        expect(() => validatePostalCode(value)).to.throw(
          UserInputError,
          `No validator for a country: ${country}`
        );
      } else {
        expect(validatePostalCode(value)).to.equal(expected);
      }
    });
  });
});
