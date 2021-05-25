import mongoose from 'mongoose';

import { address } from './address';
import file from './file';

const company = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  employeesNumber: {
    type: Number,
    required: false,
    min: 0,
  },
  logo: file,
});

const Company = mongoose.model('company', company);

export { company };
export default Company;
