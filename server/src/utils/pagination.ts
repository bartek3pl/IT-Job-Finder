import mongoose from 'mongoose';

const getPageInfo = async (
  model: mongoose.Model<any, any>,
  query: Record<string, unknown>,
  first: number,
  offset: number
) => {
  const totalCount = await model.count({});
  const currentCount = await model.count(query);
  const hasMore = offset + first < currentCount;

  return {
    totalCount,
    currentCount,
    hasMore,
  };
};

export { getPageInfo };
