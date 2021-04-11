import mongoose from 'mongoose';

import { address } from './address';
import { jobOffer } from './jobOffer';

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
    enum: ['man', 'woman', 'other'],
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
  level: {
    type: String,
    required: false,
    enum: ['junior', 'mid', 'senior', 'other'],
  },
  salary: {
    type: Number,
    required: false,
  },
  githubLink: {
    type: String,
    required: false,
    maxLength: 2048,
  },
  linkedinLink: {
    type: String,
    required: false,
    maxLength: 2048,
  },
  favouriteJobOffers: [jobOffer],
  emailNotification: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Users = mongoose.model('user', user);

export default Users;
