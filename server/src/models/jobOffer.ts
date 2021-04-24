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
    max: 50_000,
    required: true,
  },
  maxSalary: {
    type: Number,
    min: 0,
    max: 50_000,
    required: true,
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
    enum: ['junior', 'mid', 'senior', 'other'],
  },
  contractType: {
    type: String,
    required: false,
    enum: ['uop', 'b2b', 'uz', 'other'],
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
