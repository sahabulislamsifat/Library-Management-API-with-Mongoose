import { Schema } from "mongoose";
import { BookModel, IBook } from "./book.interface";
import { model } from "mongoose";
import { Borrow } from "../borrow/borrow.model";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required."],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required."],
      trim: true,
    },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "{VALUE} is not a valid genre.",
      },
      required: [true, "Book genre is required."],
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required."],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required."],
      min: [0, "Number of copies cannot be negative."],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// deleteMany ,deleteOne
bookSchema.post(
  ["findOneAndDelete", "deleteMany", "deleteOne"],
  async function (doc) {
    await Borrow.deleteMany({ book: doc._id });
  }
);

// book.model.ts (Add this static method inside bookSchema)
bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);

  if (!book) throw new Error("Book not found");

  book.available = book.copies > 0;
  await book.save();
};

export const Book = model<IBook, BookModel>("Book", bookSchema, "books");
