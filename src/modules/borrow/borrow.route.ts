import { Router } from "express";
import {
  createBorrow,
  getAllBorrowedBooks,
  getBorrowById,
  returnBorrowedBook,
  deleteBorrow,
} from "./borrow.controller";

const router = Router();

router.post("/", createBorrow);
router.get("/", getAllBorrowedBooks);
router.get("/:borrowId", getBorrowById);
router.patch("/:borrowId/return", returnBorrowedBook);
router.delete("/:borrowId", deleteBorrow);

export default router;
