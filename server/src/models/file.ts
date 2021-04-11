import mongoose from 'mongoose';

const file = new mongoose.Schema({
  file: {
    type: Buffer,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
});

export default file;
