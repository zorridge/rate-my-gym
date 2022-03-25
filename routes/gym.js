const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Gym = require('../models/gym');
const { gymSchema } = require('../schemaValidation');


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
router.get('/new', (req, res) => {
    res.render('gyms/new');
});

router.post('/', validateGym, catchAsync(async (req, res) => {
    const gymNew = new Gym(req.body.gym);
    await gymNew.save();
    res.redirect(`/gyms/${gymNew._id}`);
}));

// Read gym information
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id).populate('reviews');
    res.render('gyms/show', { gym });
}));

// Update gym information
router.get('/:id/edit', catchAsync(async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    res.render('gyms/edit', { gym });
}));

router.put('/:id', validateGym, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gymUpdate = await Gym.findByIdAndUpdate(id, { ...req.body.gym });
    res.redirect(`/gyms/${gymUpdate._id}`);
}));

// Delete gym
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    res.redirect('/gyms');
}));

module.exports = router;