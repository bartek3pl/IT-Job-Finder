import userMutations from './user/userMutations';
import jobOfferMutations from './jobOffer/jobOfferMutations';
import tokenMutations from './token/tokenMutations';
import companyMutations from './company/companyMutations';

const mutationResolvers = {
  ...userMutations,
  ...jobOfferMutations,
  ...tokenMutations,
  ...companyMutations,
};

export default mutationResolvers;
