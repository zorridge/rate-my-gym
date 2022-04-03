const Gym = require('../models/gym');

module.exports.index = async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
};

module.exports.renderNewForm = (req, res) => {
    res.render('gyms/new');
};

module.exports.createGym = async (req, res) => {
    const gymNew = new Gym(req.body.gym);
    gymNew.author = req.user._id;
    await gymNew.save();
    req.flash('success', 'Successfully added a new gym!');
    res.redirect(`/gyms/${gymNew._id}`);
};

module.exports.showGym = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author');
    if (!gym) {
        req.flash('error', 'Gym not found!');
        return res.redirect('/gyms');
    }
    res.render('gyms/show', { gym });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) {
        req.flash('error', 'Gym not found!');
        return res.redirect('/gyms');
    }
    res.render('gyms/edit', { gym });
};

module.exports.updateGym = async (req, res) => {
    const { id } = req.params;
    const gymUpdate = await Gym.findByIdAndUpdate(id, { ...req.body.gym });
    req.flash('success', 'Successfully updated gym!');
    res.redirect(`/gyms/${gymUpdate._id}`);
};

module.exports.deleteGym = async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted gym!');
    res.redirect('/gyms');
};