import mongoose from 'mongoose';

import { company } from './company';
import { levels, contractTypes } from './helpers/enums';
import C from './helpers/constants';

const jobOffer = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: false,
  },
  employer: company,
  minSalary: {
    type: Number,
    min: C.minSalary,
    max: C.maxSalary,
    required: false,
  },
  maxSalary: {
    type: Number,
    min: C.minSalary,
    max: C.maxSalary,
    required: false,
  },
  skills: [String],
  experienceYears: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  levels: {
    type: [String],
    required: false,
    enum: levels,
  },
  contractType: {
    type: String,
    required: false,
    enum: contractTypes,
  },
  createdDateTime: {
    type: String,
    required: true,
  },
  updatedDateTime: {
    type: String,
    required: true,
  },
});

const JobOffer = mongoose.model('jobOffer', jobOffer);

export { jobOffer };
export default JobOffer;
