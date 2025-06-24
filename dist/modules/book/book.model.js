"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_2.model)("Book", bookSchema);
