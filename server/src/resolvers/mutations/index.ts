import userMutations from './user/userMutations';
import jobOfferMutations from './jobOffer/jobOfferMutations';

const mutationResolvers = {
  ...userMutations,
  ...jobOfferMutations,
};

export default mutationResolvers;
