import mongoose from 'mongoose';

import { address } from './address';
import { jobOffer } from './jobOffer';
import { levels, genders } from './helpers/enums';
import C from './helpers/constants';

const user = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
    min: 16,
    max: 100,
  },
  gender: {
    type: String,
    enum: genders,
    required: false,
  },
  address: address,
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
  githubLink: {
    type: String,
    required: false,
    maxLength: C.linkMaxLength,
  },
  linkedinLink: {
    type: String,
    required: false,
    maxLength: C.linkMaxLength,
  },
  favouriteJobOffers: [jobOffer],
  emailNotification: {
    type: Boolean,
    default: false,
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

const User = mongoose.model('user', user);

export default User;
