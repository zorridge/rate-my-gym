// *** SET UP DEPENDENCIES ***
const mongoose = require('mongoose');
const Gym = require('../models/gym');
const cities = require('./cities');
const { firstName, lastName } = require('./seednames');

mongoose.connect('mongodb://localhost:27017/RateMyGym')
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch(error => {
        console.log("Connection to mongodb failed");
        console.log(error);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Gym.deleteMany({}); // DELETES EVERYTHING !!!
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const gym = new Gym({
            title: `${sample(firstName)} ${sample(lastName)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`
        });
        await gym.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});