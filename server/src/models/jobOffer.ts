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
  salary: {
    type: Number,
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
    enum: ['junior', 'mid', 'senior', 'other'],
  },
  contractType: {
    type: String,
    required: false,
    enum: ['uop', 'b2b', 'other'],
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedDateTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const JobOffer = mongoose.model('jobOffer', jobOffer);

export { jobOffer };
export default JobOffer;
