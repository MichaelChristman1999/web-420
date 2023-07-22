/*
Title: Christman-teams.js
Author: Professor Krasso
Date: July 19th, 2023
Modified By: Michael Christman
Description: Creating a Mongoose player schema and team model for the web 420 Teams Capstone project.
Sources Used: 
WEB 420 GitHub Repository
Assignment 9 Capstone Instructions (under Weekly Resources)
SoapUI Guide
*/

// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the players Schema
const playersSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  salary: { type: Number },
});

// Creating the teams Schema
const teamsSchema = new Schema({
  name: { type: String },
  mascot: { type: String },
  players: [playersSchema],
});

// Exporting the model
module.exports = mongoose.model('Teams', teamsSchema);