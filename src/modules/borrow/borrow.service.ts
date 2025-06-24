// borrow.service.ts
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

interface IBorrowPayload {
  book: string;
  quantity: number;
  dueDate: Date;
}

export const borrowBookService = async (payload: IBorrowPayload) => {
  const { book: bookId, quantity, dueDate } = payload;

  // 1. Check if book exists and enough copies available
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  if (book.copies < quantity) {
    throw new Error("Not enough copies available to borrow");
  }

  // 2. Deduct copies
  book.copies -= quantity;

  // 3. Update availability using static method
  await Book.updateAvailability(bookId);

  // 4. Save the updated book copies and availability
  await book.save();

  // 5. Create borrow record
  const borrowRecord = await Borrow.create({
    book: bookId,
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
