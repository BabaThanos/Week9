const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published_year: Number,
  genres: [String],
  price: Number,
  stock: Number,
  ratings: [
    {
      user: String,
      rating: Number,
    },
  ],
});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;