import userQueries from './user/userQueries';
import jobOfferQueries from './jobOffer/jobOfferQueries';
import companyQueries from './company/companyQueries';

const queryResolvers = {
  ...userQueries,
  ...jobOfferQueries,
  ...companyQueries,
};

export default queryResolvers;
