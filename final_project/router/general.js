const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
// Task 10/11: Get the book list available in the shop using Async/Await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    
    const bookList = await getBooks;
    return res.status(200).send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});
  if (!isValid(username)) {
    users.push({ "username": username, "password": password });
    return res.status(200).json({ message: "User successfully registered. Now you can login" });
  } else {
    return res.status(404).json({ message: "User already exists!" });
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const matchingBooks = [];

  bookKeys.forEach((key) => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      matchingBooks.push(books[key]);
    }
  });

  if (matchingBooks.length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const matchingBooks = [];

  bookKeys.forEach((key) => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      matchingBooks.push(books[key]);
    }
  });

  if (matchingBooks.length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
