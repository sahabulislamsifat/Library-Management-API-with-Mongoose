import { Request, Response } from "express";
import {
  createBorrowService,
  getAllBorrowedBooksService,
  getBorrowByIdService,
  updateBorrowReturnStatusService,
  deleteBorrowService,
} from "./borrow.service";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const result = await createBorrowService(req.body);
    res.status(201).json({
      success: true,
      message: "Borrow record created successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to borrow", error });
  }
};

export const getAllBorrowedBooks = async (_req: Request, res: Response) => {
  try {
    const result = await getAllBorrowedBooksService();
    res.status(200).json({
      success: true,
      message: "All borrowed records retrieved",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch", error });
  }
};

export const getBorrowById = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    const result = await getBorrowByIdService(borrowId);
    res.status(200).json({
      success: true,
      message: "Borrow record found",
      data: result,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Borrow not found", error });
  }
};

export const returnBorrowedBook = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    const { returnDate } = req.body;
    const result = await updateBorrowReturnStatusService(
      borrowId,
      new Date(returnDate)
    );
    res.status(200).json({
      success: true,
      message: "Book return status updated",
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update", error });
  }
};

export const deleteBorrow = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;
    await deleteBorrowService(borrowId);
    res.status(200).json({
      success: true,
      message: "Borrow record deleted",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete", error });
  }
};
