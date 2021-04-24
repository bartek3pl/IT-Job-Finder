import { ValidationError } from 'apollo-server-errors';
import { expect } from 'chai';

import validateEmail from '../../../validators/scalars/validateEmail';

describe('EmailValidator', () => {
  const testCases = [
    {
      value: 'valid@valid.valid',
      expected: 'valid@valid.valid',
      msg: 'valid email address',
    },
    {
      value: 'invalid@@invalid.invalid',
      expected: null,
      msg: 'invalid email address',
    },
  ];

  testCases.forEach(({ value, expected, msg }) => {
    const message = expected
      ? `returns ${expected} for ${msg}`
      : `throws ValidatioError for ${msg}`;

    it(message, () => {
      if (expected) {
        expect(validateEmail(value)).to.equal(expected);
      } else {
        expect(() => validateEmail(value)).to.throw(
          ValidationError,
          `Value is not a valid Email: ${value}`
        );
      }
    });
  });
});
