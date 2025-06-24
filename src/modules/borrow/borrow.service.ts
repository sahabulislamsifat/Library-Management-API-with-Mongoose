import { Borrow } from "./borrow.model";
import { IBorrow } from "./borrow.interface";

export const createBorrowService = async (payload: IBorrow) => {
  return await Borrow.create(payload);
};

export const getAllBorrowedBooksService = async () => {
  return await Borrow.find().populate("bookId");
};

export const getBorrowByIdService = async (id: string) => {
  return await Borrow.findById(id).populate("bookId");
};

export const updateBorrowReturnStatusService = async (
  id: string,
  returnDate: Date
) => {
  return await Borrow.findByIdAndUpdate(
    id,
    { isReturned: true, returnDate },
    { new: true }
  );
};

export const deleteBorrowService = async (id: string) => {
  return await Borrow.findByIdAndDelete(id);
};
