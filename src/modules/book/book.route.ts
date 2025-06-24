import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from "./book.controller";

const router = Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:bookId", getSingleBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
