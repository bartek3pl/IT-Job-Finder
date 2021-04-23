import userQueries from './user/userQueries';
import jobOfferQueries from './jobOffer/jobOfferQueries';

const queryResolvers = {
  ...userQueries,
  ...jobOfferQueries,
};

export default queryResolvers;
