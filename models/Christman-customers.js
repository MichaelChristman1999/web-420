/*
Title: Christman-customer.js
Author: Professor Richard Krasso
Date: July 8th, 2023
Modified By: Michael Christman
Description: Created the Customer's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 7 Instructions
SoapUI Guide
*/

// The require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable called Schema
const Schema = mongoose.Schema;

// Creating the lineItemSchema
const lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Created the invoiceSchema and fields
const invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema],
});

// Created the customerSchema and fields
const customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: [invoiceSchema],
});

// Export models statement
module.exports = mongoose.model('Customer', customerSchema);