/*
Title: Christman-composer.js
Author: Richard Krasso
Date: June 17th, 2023
Modified By: Michael Christman
Description: Composers JavaScript file
Sources Used: 
WEB 420 GitHub Repository
Assignment 4 Instructions
SoapUI Guide
*/


// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the composerSchema
const composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});


// Exporting the model
module.exports = mongoose.model("Composer", composerSchema);
