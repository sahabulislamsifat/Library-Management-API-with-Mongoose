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
exports.deleteBookService = exports.updateBookService = exports.getBookByIdService = exports.getAllBooksService = exports.createBookService = void 0;
const book_model_1 = require("./book.model");
const createBookService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(payload);
    return newBook;
});
exports.createBookService = createBookService;
const getAllBooksService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = options;
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOption = {};
    sortOption[sortBy] = sort === "asc" ? 1 : -1;
    const books = yield book_model_1.Book.find(query).sort(sortOption).limit(limit);
    return books;
});
exports.getAllBooksService = getAllBooksService;
const getBookByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    return book;
});
exports.getBookByIdService = getBookByIdService;
const updateBookService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findByIdAndUpdate(id, payload, { new: true });
    return book;
});
exports.updateBookService = updateBookService;
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.findByIdAndDelete(id);
});
exports.deleteBookService = deleteBookService;
