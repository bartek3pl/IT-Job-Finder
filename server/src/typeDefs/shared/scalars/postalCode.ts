import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';

import validatePostalCode from '../../../validators/scalars/validatePostalCode';

const GraphQLPostalCode = new GraphQLScalarType({
  name: 'PostalCode',
  description:
    'A Postal Code list (pair of country and postal code) representing postal code in specific country.',

  serialize: (value) => validatePostalCode(value),

  parseValue: (value) => validatePostalCode(value),

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate string as postal codes but got a: ${ast.kind}`
      );
    }

    return validatePostalCode(ast.value);
  },
});

export default GraphQLPostalCode;
