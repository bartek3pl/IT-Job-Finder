import { expect } from 'chai';

import {
  validateLogin,
  validatePassword,
} from '../../validators/validateInputs';

describe('InputValidators', () => {
  describe('validateLogin', () => {
    const testCases = [
      {
        value: 'validLogin',
        expected: true,
        msg: 'valid login',
      },
      {
        value: 'a'.repeat(6),
        expected: true,
        msg: 'minimum length login',
      },
      {
        value: 'a'.repeat(5),
        expected: false,
        msg: 'too short login',
      },
      {
        value: 'a'.repeat(24),
        expected: true,
        msg: 'maxiumum length login',
      },
      {
        value: 'a'.repeat(25),
        expected: false,
        msg: 'too long login',
      },
    ];

    testCases.forEach(({ value, expected, msg }) => {
      it(`returns ${expected} for ${msg}`, () => {
        const validatedLogin = validateLogin(value);

        expect(validatedLogin).to.equal(expected);
      });
    });
  });

  describe('validatePassword', () => {
    const testCases = [
      {
        value: 'validPassword42',
        expected: true,
        msg: 'valid password',
      },
      {
        value: `${'A'.repeat(5)}1`,
        expected: true,
        msg: 'minimum length password',
      },
      {
        value: `${'A'.repeat(4)}1`,
        expected: false,
        msg: 'too short password',
      },
      {
        value: `${'A'.repeat(23)}1`,
        expected: true,
        msg: 'maxiumum length password',
      },
      {
        value: `${'A'.repeat(24)}1`,
        expected: false,
        msg: 'too long password',
      },
      {
        value: 'nouppercaseletter',
        expected: false,
        msg: 'password without uppercase letter',
      },
      {
        value: 'noNumberPassword',
        expected: false,
        msg: 'password without any number',
      },
    ];

    testCases.forEach(({ value, expected, msg }) => {
      it(`returns ${expected} for ${msg}`, () => {
        const validatedPassword = validatePassword(value);

        expect(validatedPassword).to.equal(expected);
      });
    });
  });
});
