import express from "express";
import bookController from "../controller/bookController.js";

const router = express.Router();

//bookController endPoints
router.post("/createBook", bookController.createBook);
router.get("/bookAll", bookController.getAll);
router.get("/book/:id", bookController.getBookById);
router.put("/book/update", bookController.updateBook);
router.delete("/book/delete/:id", bookController.deleteBook);

export default router;
