/*
    ==================
    Title: app.js
    Author: Michael Christman
    Date: May 25th, 2023
    Description: App.js file for WEB-420 coursework weeks 1-9
*/
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

// Creates a new variable named app and assigns it to  the express library.
const app = express();

// Setting the port to 3000.
const PORT = process.env.PORT || 3000;

// Set the application to use express.json().
app.use(express.json());

// Set the application to use .urlencoded.
app.use(express.urlencoded({ extended: true }));

// Routing for the composer and person /api endpoints
const composersAPI = require('./routes/Christman-composers-routes');
const personsAPI = require('./routes/Christman-persons-routes');
const usersAPI = require('./routes/Christman-sessions-routes');
const nodeShoppersAPI = require('./routes/Christman-node-shoppers-routes');
const teamsAPI = require('./routes/Christman-teams-routes');

// Establish MongoDB connection
const CONN =  'mongodb+srv://web420_user:s3cret2@bellevueuniversity.y9g9tgp.mongodb.net/web420DB';

// Showing Server Connection Messages
mongoose
  .connect(CONN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connection to WEB 420 MongoDB database was successful');
  })
  .catch((err) => {
    console.log('MongoDB Error: ' + err.message);
  });

// Defining an object literal with named options.
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Files containing annotations for the OpenAPI specification.
};

// Creating a new variable name openapiSpecification & calling the swaggerJsdoc library using the options object literal.
const openapiSpecification = swaggerJsdoc(options);

// Wiring openapiSpecification variable to app variable.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composersAPI);
app.use('/api', personsAPI);
app.use('/api', usersAPI);
app.use('/api', nodeShoppersAPI);
app.use('/api', teamsAPI);

// Start the server and make it listen on port 3000.
app.listen(PORT, () => {
  console.log(`Application started and listening on port ${PORT}`);
});