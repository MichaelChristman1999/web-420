/*
Title: Christman-persons.js
Author: Professor Richard Krasso
Date: June 23, 2023
Modified By: Michael Christman
Description: Created the Person's API for week 5 of the web-420 course
Sources Used: 
WEB 420 GitHub Repository
Assignment 5 Instructions
SoapUI Guide
*/

// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the roleSchema
const roleSchema = new Schema({
  text: { type: String },
});

// Creating the dependentSchema
const dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// Creating the personSchema
const personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

// Exporting the model
module.exports = mongoose.model('Person', personSchema);
