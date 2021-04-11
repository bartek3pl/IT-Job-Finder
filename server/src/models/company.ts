import mongoose from 'mongoose';

import { address } from './address';
import file from './file';

const company = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: address,
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
