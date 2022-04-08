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
            images: [
                {
                    url: 'https://res.cloudinary.com/zorridge/image/upload/v1649169118/RateMyGym/l7r2d7xuosy92ypbimed.jpg',
                    filename: 'RateMyGym/l7r2d7xuosy92ypbimed',
                },
                {
                    url: 'https://res.cloudinary.com/zorridge/image/upload/v1649169119/RateMyGym/lym0kxqnyryuy58glt6l.jpg',
                    filename: 'RateMyGym/lym0kxqnyryuy58glt6l',
                }
            ],
            price: randPrice,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque numquam quas veniam iure itaque odit dolorum impedit incidunt qui dolore. Obcaecati, amet nisi dolorem, quae ullam nulla officiis quaerat fugit voluptate rem, doloremque expedita labore? Facere esse quaerat non quia ipsum recusandae, dolor officia ullam ratione blanditiis eius illum deserunt cupiditate odio eum, fugiat asperiores. Quasi atque animi neque ipsam asperiores. Veniam rem eaque, ullam, minus possimus ratione suscipit rerum libero quod officia labore id debitis deserunt quos? Quisquam tempore fugit rerum possimus, voluptatem quas voluptatibus velit itaque quidem est vitae maiores voluptas quam laudantium alias officia praesentium quis nihil.',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            },
            author: '624319fa52a66e4a829f16e9' // username: hubie
        });
        await gym.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});