// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });

export default {
  URI_MONGO_DEV: process.env.URI_MONGO_DEV || 'mongodb://localhost/ITJobFinder',
  URI_MONGO_PROD:
    process.env.URI_MONGO_PROD ||
    'mongodb+srv://itJobFinderUser:itJobFinderUser@cluster0.dezds.mongodb.net/Cluster0?retryWrites=true&w=majority',
  TOKEN_SECRET_JWT:
    process.env.TOKEN_SECRET_JWT ||
    'FCl6ngqdhB1afU97rhVRAPJJGoEznS7lEfKYir6vJR38nfq2oUyty2p283Cb98i',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  URL: process.env.URL || 'localhost',
  PAGE_SIZE: 15,
};
