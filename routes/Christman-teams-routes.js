/*
Title: Christman-team-routes.js
Author: Professor Krasso
Date: July 19, 2023
Modified By: Michael Christman
Description: Create an API routes JavaScript file with four different operations for the Team Capstone project.
Sources Used: 
Assignment 9 Capstone Instructions (under Weekly Resources)
SoapUI Guide
*/

// Require statement for Express
const express = require('express');

// Require statement for the router
const router = express.Router();

// Require statement for Team model
const Team = require('../models/Christman-teams');

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create New Team
 *     description: API for creating a new team document in MongoDB.
 *     requestBody:
 *       required: true
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mascot
 *               - players
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     salary:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Team added to MongoDB.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/teams', async (req, res) => {
  try {
    const newTeam = {
      name: req.body.name,
      mascot: req.body.mascot,
      players: req.body.players,
    };
    await Team.create(newTeam, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(team);
        res.json(team);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllTeams
 *     summary: Find All Teams
 *     description: API for returning a list of teams from MongoDB Atlas.
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/teams', async (req, res) => {
  try {
    Team.find({}, function (err, teams) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(teams);
        res.json(teams);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Assign Player to Team
 *     description: API for assigning a player to a team in MongoDB Atlas.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Enter the Team ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Required Player Information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document.
 *       '401':
 *         description: Invalid teamId.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/teams/:id/players', async (req, res) => {
  try {
    const teamId = req.params.id;
    const newPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      salary: req.body.salary,
    };

    await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { players: newPlayer } },
      { new: true },
      function (err, team) {
        if (err) {
          console.log(err);
          res.status(401).send({
            message: `Invalid teamId: ${err}`,
          });
        } else {
          console.log(team);
          res.json(team);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllPlayersByTeamId
 *     summary: Find All Players by TeamID
 *     description:  API for returning a player document from MongoDB Atlas by TeamId.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Enter the Team ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents.
 *       '401':
 *          description: Invalid teamId.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/teams/:id/players', async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else if (!team) {
        res.status(401).send('Invalid teamId');
      } else {
        console.log(team);
        res.json(team);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     summary: Delete Team By ID
 *     description: API for deleting a team document from MongoDB Atlas.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Enter the Team ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document.
 *       '401':
 *          description: Invalid teamId.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 *
 */

router.delete('/teams/:id', async (req, res) => {
  try {
    const teamId = req.params.id;

    Team.findOneAndDelete({ _id: teamId }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else if (!team) {
        res.status(401).send('Invalid teamId');
      } else {
        console.log(team);
        res.json(team);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;