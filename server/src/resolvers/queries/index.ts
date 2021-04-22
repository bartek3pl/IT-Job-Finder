import userQueries from './userQueries';
import jobOfferQueries from './jobOfferQueries';

const queryResolvers = {
  ...userQueries,
  ...jobOfferQueries,
};

export default queryResolvers;
