const express = require('express');
const router = express.Router();

const gyms = require('../controllers/gyms');
const catchAsync = require('../utils/catchAsync');
const Gym = require('../models/gym');
const { isLoggedIn, isAuthor, validateGym } = require('../middleware');


// *** ROUTING ***
router.get('/', catchAsync(gyms.index));

// Create new gym
router.get('/new', isLoggedIn, gyms.renderNewForm);

router.post('/', isLoggedIn, validateGym, catchAsync(gyms.createGym));

// Read gym information
router.get('/:id', catchAsync(gyms.showGym));

// Update gym information
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(gyms.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateGym, catchAsync(gyms.updateGym));

// Delete gym
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(gyms.deleteGym));

module.exports = router;