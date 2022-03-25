const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Gym = require('../models/gym');
const Review = require('../models/review');
const { reviewSchema } = require('../schemaValidation');


// *** MIDDLEWARES ***
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};


// Create review
router.post('/', validateReview, catchAsync(async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    const review = new Review(req.body.review);
    gym.reviews.push(review);
    await review.save();
    await gym.save();
    res.redirect(`/gyms/${gym._id}`);
}));

// Delete review
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Gym.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/gyms/${id}`);
}));

module.exports = router;