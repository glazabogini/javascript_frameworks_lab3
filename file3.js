// constants and requirements:
const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// middleware to parse JSON data from request bodies
app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'data', 'data.json');

// function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

// function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// handle GET request to retrieve all books
app.get('/books', (req, res) => {
    const books = readData();
    res.send(books);
});

// handle POST request to create a new book
app.post('/books', (req, res) => {
    const newBook = req.body; // parsed data is available in req.body
    const books = readData();
    books.push(newBook);
    writeData(books);
    res.status(201).send(newBook); // return status 201 and the new book data
});

// handle PUT request to update an existing book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10); // get the book ID from the request parameters
    const updatedBook = req.body; // updated book data from the request body
    let books = readData();
    books = books.map(book => (book.id === bookId ? updatedBook : book)); // update the book
    writeData(books);
    res.send(updatedBook); // return the updated book data
});

// handle DELETE request to delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10); // get the book ID from the request parameters
    let books = readData();
    books = books.filter(book => book.id !== bookId); // remove the book with the specified ID
    writeData(books);
    res.status(204).send(); // return status 204 (No Content)
});

// log
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
