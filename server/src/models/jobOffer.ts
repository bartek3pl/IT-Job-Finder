import mongoose from 'mongoose';

import { company } from './company';

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
    min: 0,
    max: 100_000,
    required: false,
  },
  maxSalary: {
    type: Number,
    min: 0,
    max: 100_000,
    required: false,
  },
  skills: [String],
  experienceYears: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  level: {
    type: String,
    required: false,
    enum: ['JUNIOR', 'MID', 'SENIOR', 'OTHER'],
  },
  contractType: {
    type: String,
    required: false,
    enum: ['UOP', 'B2B', 'UZ', 'OTHER'],
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
