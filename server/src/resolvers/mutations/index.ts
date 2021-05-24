import userMutations from './user/userMutations';
import jobOfferMutations from './jobOffer/jobOfferMutations';
import tokenMutations from './token/tokenMutations';

const mutationResolvers = {
  ...userMutations,
  ...jobOfferMutations,
  ...tokenMutations,
};

export default mutationResolvers;
