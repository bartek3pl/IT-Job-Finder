import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;
mongoose
  .connect(config.URI_MONGO, {
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
