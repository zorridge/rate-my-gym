// *** SET UP DEPENDENCIES ***
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Gym = require('./models/gym');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/RateMyGym')
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch(error => {
        console.log("Connection to mongodb failed");
        console.log(error);
    });



// *** ROUTING ***
app.get('/', (req, res) => {
    res.redirect('/gyms');
});

app.get('/gyms', async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
});

// Create new gym
app.get('/gyms/new', (req, res) => {
    res.render('gyms/new');
});

app.post('/gyms', async (req, res) => {
    const gymNew = new Gym(req.body.gym);
    await gymNew.save();
    res.redirect(`/gyms/${gymNew._id}`);
});

// Read gym information
app.get('/gyms/:id', async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    res.render('gyms/show', { gym });
});

// Update gym information
app.get('/gyms/:id/edit', async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    res.render('gyms/edit', { gym });
});

app.put('/gyms/:id', async (req, res) => {
    const { id } = req.params;
    const gymUpdate = await Gym.findByIdAndUpdate(id, { ...req.body.gym });
    // res.send(req.body.gym);
    res.redirect(`/gyms/${gymUpdate._id}`);
});

// Delete gym
app.delete('/gyms/:id', async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    res.redirect('/gyms');
});



// *** OPENING SERVER ***
app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000/');
});