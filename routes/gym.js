const express = require('express');
const router = express.Router();

const gyms = require('../controllers/gyms');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateGym } = require('../middleware');


// *** ROUTING ***
router.route('/')
    .get(catchAsync(gyms.index))
    .post(isLoggedIn, validateGym, catchAsync(gyms.createGym));

router.get('/new', isLoggedIn, gyms.renderNewForm);

router.route('/:id')
    .get(catchAsync(gyms.showGym))
    .put(isLoggedIn, isAuthor, validateGym, catchAsync(gyms.updateGym))
    .delete(isLoggedIn, isAuthor, catchAsync(gyms.deleteGym));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(gyms.renderEditForm));

module.exports = router;