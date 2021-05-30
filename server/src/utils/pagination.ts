import mongoose from 'mongoose';

const getPageInfo = async (
  model: mongoose.Model<any, any>,
  first: number,
  offset: number
) => {
  const totalCount = await model.count({});
  const hasMore = offset + first < totalCount;

  return {
    totalCount,
    hasMore,
  };
};

export { getPageInfo };
