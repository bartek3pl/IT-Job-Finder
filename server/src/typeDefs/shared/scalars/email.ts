import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';

import validateEmail from '../../../validators/validateEmail';

const GraphQLEmail = new GraphQLScalarType({
  name: 'Email',
  description: 'An Email string.',

  serialize: (value) => validateEmail(value),

  parseValue: (value) => validateEmail(value),

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as emails but got a: ${ast.kind}`
      );
    }

    return validateEmail(ast.value);
  },
});

export default GraphQLEmail;
