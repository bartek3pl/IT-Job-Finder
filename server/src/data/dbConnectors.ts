import mongoose from 'mongoose';
import config from '../config';

const URI_MONGO =
  config.NODE_ENV === 'development'
    ? config.URI_MONGO_DEV
    : config.URI_MONGO_PROD;

mongoose.Promise = global.Promise;
mongoose
  .connect(URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch(() => {
    console.error('Error while connecting to MongoDB.');
  });
