const ExpressError = require('./utils/ExpressError');
const { gymSchema, reviewSchema } = require('./schemaValidation');
const Gym = require('./models/gym');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be logged in!");
        return res.redirect('/login');
    }
    next();
};

module.exports.validateGym = (req, res, next) => {
    const { error } = gymSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry!');
        return res.redirect(`/gyms/${id}`);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry!');
        return res.redirect(`/gyms/${id}`);
    }
    next();
};
