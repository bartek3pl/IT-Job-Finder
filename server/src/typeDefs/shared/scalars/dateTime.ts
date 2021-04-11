import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';

import validateDateTime from '../../../validators/validateDateTime';

const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A DateTime string in 24-hr `HH:mm[:ss[.SSS]]` format.',

  serialize: (value) => validateDateTime(value),

  parseValue: (value) => validateDateTime(value),

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as data times but got a: ${ast.kind}`
      );
    }

    return validateDateTime(ast.value);
  },
});

export default GraphQLDateTime;
