import mongoose from 'mongoose';

const address = new mongoose.Schema({
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  buildingNumber: {
    type: Number,
    required: false,
    min: 0,
  },
  apartmentNumber: {
    type: Number,
    required: false,
    min: 0,
  },
});

const Address = mongoose.model('address', address);

export { address };
export default Address;
