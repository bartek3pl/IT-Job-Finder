import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';

import validateSalary from '../../../validators/scalars/validateSalary';

const GraphQLSalary = new GraphQLScalarType({
  name: 'Salary',
  description:
    'A Salary integer representing amount of money earned for a month.',

  serialize: (value) => validateSalary(value),

  parseValue: (value) => validateSalary(value),

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as salary but got a: ${ast.kind}`
      );
    }

    const numValue = parseInt(ast.value, 10);

    return validateSalary(numValue);
  },
});

export default GraphQLSalary;
