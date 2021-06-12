import mongoose from 'mongoose';

import { address } from './address';

const company = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  employeesNumber: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
});

const Company = mongoose.model('company', company);

export { company };
export default Company;
