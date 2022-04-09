const Gym = require('../models/gym');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const gyms = await Gym.find({}).limit(4); // Return first 4 documents
    res.render('gyms/index', { gyms });
};

module.exports.renderNewForm = (req, res) => {
    res.render('gyms/new');
};

module.exports.createGym = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.gym.location,
        limit: 1
    }).send();
    const gymNew = new Gym(req.body.gym);
    gymNew.geometry = geoData.body.features[0].geometry;
    gymNew.images = req.files.map(f => ({ url: f.path, filename: f.filename })); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#syntax
    gymNew.author = req.user._id;
    await gymNew.save();
    console.log(gymNew); // log
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
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    gymUpdate.images.push(...imgs);
    await gymUpdate.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await gymUpdate.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfully updated gym!');
    res.redirect(`/gyms/${gymUpdate._id}`);
};

module.exports.deleteGym = async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted gym!');
    res.redirect('/gyms');
};

module.exports.randomGym = async (req, res) => {
    Gym.estimatedDocumentCount().exec((err, count) => {
        const random = Math.floor(Math.random() * count);

        Gym.findOne().skip(random).exec((err, result) => {
            res.redirect(`/gyms/${result._id}`);
        });
    });
};

module.exports.searchGym = async (req, res) => {
    const { counter } = req.query;
    if (counter) {
        const gyms = await Gym.find({}).skip(parseInt(counter)).limit(4); // Skip {counter} number of documents and return next 4, {counter} += 4 with every iteration in browser
        res.json(gyms);
    } else {
        res.redirect('/gyms');
    }
};