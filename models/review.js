const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rating: Number,
    body: String
});

module.exports = mongoose.model('Review', reviewSchema);