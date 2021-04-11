import queryResolvers from './queries';
import mutationResolvers from './mutations';

import dateTimeScalar from '../typeDefs/shared/scalars/dateTime';
import emailScalar from '../typeDefs/shared/scalars/email';
import postalCodeScalar from '../typeDefs/shared/scalars/postalCode';
import salaryScalar from '../typeDefs/shared/scalars/salary';

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,

  DateTime: dateTimeScalar,
  Email: emailScalar,
  PostalCode: postalCodeScalar,
  Salary: salaryScalar,
};

export default resolvers;
