// *** SET UP DEPENDENCIES ***
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');

const ExpressError = require('./utils/ExpressError');
const gyms = require('./routes/gym');
const reviews = require('./routes/review');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/RateMyGym')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log("Connection to MongoDB failed");
        console.log(error);
    });



// *** ROUTING ***
app.get('/', (req, res) => {
    res.redirect('/gyms');
});

app.use('/gyms', gyms);

app.use('/gyms/:id/reviews', reviews);


// Error handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found...', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong...';
    res.status(statusCode).render('error', { err, statusCode });
});



// *** OPENING SERVER ***
app.listen(3000, () => {
    console.log('App running on http://localhost:3000/');
});