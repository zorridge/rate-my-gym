// *** SET UP DEPENDENCIES ***
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// *** ROUTING ***
app.get('/', (req, res) => {
    res.render('home');
});



// *** OPENING SERVER ***
app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000/');
});