import { ValidationError, UserInputError } from 'apollo-server-express';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

const validatePostalCode = (value: string): string => {
  if (typeof value !== 'string') {
    throw new UserInputError(`Value is not a string: ${value}`);
  }

  const arrayValue = value.split(',');
  const postalCode = arrayValue?.[0];
  const country = arrayValue?.[1];

  const doesValidatorExistsForCountry = postcodeValidatorExistsForCountry(
    country
  );

  if (!doesValidatorExistsForCountry) {
    throw new UserInputError(`No validator for a country: ${country}`);
  }

  const isValidFormat = postcodeValidator(postalCode, country);

  if (!isValidFormat) {
    throw new ValidationError(
      `Value is not a valid Postal Code: ${postalCode}`
    );
  }

  return value;
};

export default validatePostalCode;
