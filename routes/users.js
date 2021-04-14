var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Check for username, password, firstName, lastName, and email on request.
router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).json({
      error: 'Please include username, password, first and last name, and email.'
    })
  }
  // Check database for existing user
  const user = await models.User.findOne({
    where: {
      username: req.body.username,
    }
  })
  // If user exists, send error.
  if (user) {
    return res.status(400).json({
      error: 'Username already in use.'
    })
  } 
  // Check database for existing email
  const email = await models.User.findOne({
    where: {
      email: req.body.email,
    }
  })
  // If email exists, send error.
  if (email) {
    return res.status(400).json({
      error: 'Email already in use.'
    })
  } 
  // Hash password through hash variable
  const hash = await bcrypt.hash(req.body.password, 10)
  // Create user
  const newUser = await models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
  // Respond with success message
  return res.status(201).json({})
})

router.post('/login', async (req, res) => {
  // Check for username and password
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: "Please include username and password"
    })
  }
  // Find username from user
  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
  // If no user send error
  if (!user) {
    return res.status(404).json({
      error: "No user with that username found"
    })
  }
  // Compare passwords
  const match = await bcrypt.compare(req.body.password, user.password)
  // If no match send error
  if (!match) {
    return res.status(401).json({
      error: "Password incorrect"
    })
  }

  req.session.user = user

  res.json({
    id: user.id,
    username: user.username,
    updatedAt: user.updatedAt
  })
})

router.get('/logout', (req, res) => {
  req.session.user = null;

  res.json({
    success: 'Logged out successfully'
  })
})

module.exports = router;
