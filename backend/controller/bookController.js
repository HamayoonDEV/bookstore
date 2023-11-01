import Joi from "joi";
import Book from "../models/book.js";

const bookController = {
  //create book method
  async createBook(req, res, next) {
    const bookCreateSchema = Joi.object({
      title: Joi.string().max(30).required(),
      published: Joi.string().required(),
      author: Joi.string().required(),
    });
    const { error } = bookCreateSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { title, published, author } = req.body;
    //handling conflict while user adding two books with same title
    try {
      const exsistingBook = await Book.exists({ title });
      if (exsistingBook) {
        const error = {
          status: 409,
          message: "Title has been taken before!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    //storing the book into database
    let book;
    try {
      const newBook = new Book({
        title,
        published,
        author,
      });
      book = await newBook.save();
    } catch (error) {
      return error;
    }
    //sending response
    res.status(201).json({ book });
  },
  //getAll books method
  async getAll(req, res, next) {
    //getting all books from the database
    try {
      const books = await Book.find({});
      const bookArr = [];
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        bookArr.push(book);
      }
      return res.status(200).json({ books: bookArr });
    } catch (error) {
      return next(error);
    }
  },
  //get book by id
  async getBookById(req, res, next) {
    const getBookIdSchema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = getBookIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    let book;
    try {
      book = await Book.findOne({ _id: id });
      if (!book) {
        const error = {
          status: 404,
          message: "Book not found!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    //sending response
    res.status(200).json({ book });
  },

  //update book method
  async updateBook(req, res, next) {
    const updateBookSchema = Joi.object({
      id: Joi.string().required(),
      title: Joi.string().max(30),
      published: Joi.string(),
      author: Joi.string(),
    });
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { id, title, published, author } = req.body;

    try {
      const book = await Book.findOne({ _id: id });
      if (!book) {
        const error = {
          status: 404,
          message: "Book not found!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    try {
      await Book.updateOne({ _id: id }, { title, published, author });
    } catch (error) {
      return next(error);
    }
    //sending respone
    res.status(200).json({ message: "book has been updated!" });
  },
  //delete book method
  async deleteBook(req, res, next) {
    const deleteBookSchema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = deleteBookSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    try {
      await Book.deleteOne({ _id: id });
    } catch (error) {
      return next(error);
    }
    //sending respose
    res.status(200).json({ message: "Book has been deleted!" });
  },
};

export default bookController;
