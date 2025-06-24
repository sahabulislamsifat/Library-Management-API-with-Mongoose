import { Request, Response } from "express";
import { borrowBookService, getBorrowSummaryService } from "./borrow.service";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const data = await borrowBookService(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to borrow book",
      error,
    });
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const data = await getBorrowSummaryService();
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get borrow summary",
      error,
    });
  }
};
