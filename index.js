const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./bookSchema.js'); // Assuming your schema file is named bookSchema.js

const app = express();

// Body-parser middleware
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/bookstore1', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to the database');
});

// POST endpoint to add a new book
app.post('/add-book', async (req, res) => {
    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        console.log(savedBook)
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET endpoint to retrieve all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});