export default {
  URI_MONGO_DEV: process.env.URI_MONGO_DEV || 'mongodb://localhost/ITJobFinder',
  URI_MONGO_PROD:
    process.env.URI_MONGO_PROD || 'mongodb://localhost/ITJobFinder',
  TOKEN_SECRET_JWT:
    process.env.TOKEN_SECRET_JWT ||
    'FCl6ngqdhB1afU97rhVRAPJJGoEznS7lEfKYir6vJR38nfq2oUyty2p283Cb98i',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PAGE_SIZE: 15,
  PORT: process.env.PORT || 8000,
};
