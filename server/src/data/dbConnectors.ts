import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect(config.URI_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
