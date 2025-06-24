"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getAllBooks = exports.createBook = void 0;
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, book_service_1.createBookService)(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create book",
            error,
        });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const data = yield (0, book_service_1.getAllBooksService)({
            filter: filter,
            sortBy: sortBy,
            sort: sort,
            limit: Number(limit),
        });
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get books",
            error,
        });
    }
});
exports.getAllBooks = getAllBooks;
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield (0, book_service_1.getBookByIdService)(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error,
        });
    }
});
exports.getSingleBook = getSingleBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield (0, book_service_1.updateBookService)(bookId, req.body);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error,
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield (0, book_service_1.deleteBookService)(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
            error,
        });
    }
});
exports.deleteBook = deleteBook;
