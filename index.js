// *** SET UP DEPENDENCIES ***
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Gym = require('./models/gym');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

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
    res.render('home');
});

app.get('/makegym', async (req, res) => {
    const gym = new Gym({ title: 'Test Gym', description: 'Description for test gym' });
    await gym.save();
    res.send('Made new gym...');
});



// *** OPENING SERVER ***
app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000/');
});