import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";
import { Types } from "mongoose";

interface IBorrowPayload {
  book: string;
  quantity: number;
  dueDate: Date;
}

export const borrowBookService = async (payload: IBorrowPayload) => {
  const { book: bookId, quantity, dueDate } = payload;

  const objectBookId = new Types.ObjectId(bookId);

  // 1. Check if book exists and enough copies available
  const book = await Book.findById(objectBookId);
  if (!book) {
    throw new Error("Book not found");
  }
  if (book.copies < quantity) {
    throw new Error("Not enough copies available to borrow");
  }

  // 2. Deduct copies
  book.copies -= quantity;

  // 3. Save updated book copies
  await book.save();

  // 4. Update availability with static method
  await Book.updateAvailability(bookId);

  // 5. Create borrow record
  const borrowRecord = await Borrow.create({
    book: objectBookId,
    quantity,
    dueDate,
  });

  return borrowRecord;
};

// Borrow aggregation summary
export const getBorrowSummaryService = async () => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: "$book",
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
      },
    },
  ]);

  return summary;
};
