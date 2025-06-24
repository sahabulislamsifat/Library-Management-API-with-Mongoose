import { Request, Response } from "express";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "./book.service";

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = await createBookService(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const data = await getAllBooksService({
      filter: filter as string,
      sortBy: sortBy as string,
      sort: sort as "asc" | "desc",
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error,
    });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await getBookByIdService(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Book not found",
      error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await updateBookService(bookId, req.body);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await deleteBookService(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
};
