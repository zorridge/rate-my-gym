const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Gym = require('../models/gym');
const { gymSchema } = require('../schemaValidation');
const { isLoggedIn } = require('../middleware');


// *** MIDDLEWARES ***
const validateGym = (req, res, next) => {
    const { error } = gymSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(', ');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};


// *** ROUTING ***
router.get('/', catchAsync(async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
}));

// Create new gym
router.get('/new', isLoggedIn, (req, res) => {
    res.render('gyms/new');
});

router.post('/', isLoggedIn, validateGym, catchAsync(async (req, res) => {
    const gymNew = new Gym(req.body.gym);
    gymNew.author = req.user._id;
    await gymNew.save();
    req.flash('success', 'Successfully added a new gym!');
    res.redirect(`/gyms/${gymNew._id}`);
}));

// Read gym information
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id).populate('reviews').populate('author');
    if (!gym) {
        req.flash('error', 'Gym not found!');
        return res.redirect('/gyms');
    }
    res.render('gyms/show', { gym });
}));

// Update gym information
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) {
        req.flash('error', 'Gym not found!');
        return res.redirect('/gyms');
    }
    if (!gym.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry!');
        return res.redirect(`/gyms/${id}`);
    }
    res.render('gyms/edit', { gym });
}));

router.put('/:id', isLoggedIn, validateGym, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry!');
        return res.redirect(`/gyms/${id}`);
    }
    const gymUpdate = await Gym.findByIdAndUpdate(id, { ...req.body.gym });
    req.flash('success', 'Successfully updated gym!');
    res.redirect(`/gyms/${gymUpdate._id}`);
}));

// Delete gym
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry!');
        return res.redirect(`/gyms/${id}`);
    }
    await Gym.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted gym!');
    res.redirect('/gyms');
}));

module.exports = router;