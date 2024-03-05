const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(403)
      .json({ message: "Please provide username and password." });
  }

  if (!isValid(username)) {
    return res.status(403).json({ message: "Username already exist!" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User register successfully!" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  if (!isbn) {
    return res.status(403).json({ message: "Please provide Isbn" });
  }

  const book = books[isbn];

  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }

  return res.status(403).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const foundBooks = [];

  for (const key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].author === author) {
        foundBooks.push(books[key]);
      }
    }
  }

  return res.status(200).json(foundBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const foundBooks = [];

  for (const key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].title === title) {
        foundBooks.push(books[key]);
      }
    }
  }

  return res.status(200).json(foundBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  if (!isbn) {
    return res.status(403).json({ message: "Please provide Isbn" });
  }

  const book = books[isbn];

  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }

  return res.status(403).json(book.reviews);
});

module.exports.general = public_users;
