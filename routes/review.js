const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');


// Create review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;