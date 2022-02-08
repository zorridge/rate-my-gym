// *** SET UP DEPENDENCIES ***
const mongoose = require('mongoose');
const Gym = require('../models/gym');
const cities = require('./cities');
const { firstName, lastName } = require('./seednames');

mongoose.connect('mongodb://localhost:27017/RateMyGym')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log("Connection to MongoDB failed");
        console.log(error);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Gym.deleteMany({}); // DELETES EVERYTHING !!!
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 30) + 80;
        const gym = new Gym({
            title: `${sample(firstName)} ${sample(lastName)}`,
            image: 'https://source.unsplash.com/collection/10552289',
            price: randPrice,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque numquam quas veniam iure itaque odit dolorum impedit incidunt qui dolore. Obcaecati, amet nisi dolorem, quae ullam nulla officiis quaerat fugit voluptate rem, doloremque expedita labore? Facere esse quaerat non quia ipsum recusandae, dolor officia ullam ratione blanditiis eius illum deserunt cupiditate odio eum, fugiat asperiores. Quasi atque animi neque ipsam asperiores. Veniam rem eaque, ullam, minus possimus ratione suscipit rerum libero quod officia labore id debitis deserunt quos? Quisquam tempore fugit rerum possimus, voluptatem quas voluptatibus velit itaque quidem est vitae maiores voluptas quam laudantium alias officia praesentium quis nihil.',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`
        });
        await gym.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});