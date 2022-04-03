const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const Gym = require('../models/gym');
const Review = require('../models/review');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');


// Create review
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    gym.reviews.push(review);
    await review.save();
    await gym.save();
    req.flash('success', 'Successfully added a review!');
    res.redirect(`/gyms/${gym._id}`);
}));

// Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Gym.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/gyms/${id}`);
}));

module.exports = router;