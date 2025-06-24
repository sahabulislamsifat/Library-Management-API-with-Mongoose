import { Model } from "mongoose";

export type GenreType =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: GenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

// Static method type
export interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}
