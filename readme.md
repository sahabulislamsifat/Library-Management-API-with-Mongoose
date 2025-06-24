# 📚 Library Management API

A RESTful API backend for a **Library Management System**, built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- Add, view, update, and delete books
- Borrow books with quantity & due date validation
- Real-time book availability updates
- Aggregation summary of borrowed books
- Query filters: genre, sort, limit
- Schema validation & error handling
- Mongoose static methods & middleware
- Strictly follows defined API structure

---

## 🛠️ Tech Stack

- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** or native validation
- **dotenv**, **cors**, **morgan**

---

## 📁 Folder Structure

src/
├── book/
│ ├── book.controller.ts
│ ├── book.model.ts
│ ├── book.route.ts
│ ├── book.service.ts
│ ├── book.interface.ts
│ └── book.validation.ts
├── borrow/
│ ├── borrow.controller.ts
│ ├── borrow.model.ts
│ ├── borrow.route.ts
│ ├── borrow.service.ts
│ └── borrow.interface.ts
├── app.ts
├── server.ts
└── config.ts

📌 API Endpoints
📘 Books
Method Endpoint Description
POST /api/books Create a new book
GET /api/books Get all books (filter)
GET /api/books/:id Get book by ID
PUT /api/books/:id Update book details
DELETE /api/books/:id Delete a book

📗 Borrow
Method Endpoint Description
POST /api/borrow Borrow a book
GET /api/borrow Get summary (aggregation)

🧠 Business Logic
Cannot borrow more than available copies

Automatically sets available: false when stock is 0

Uses MongoDB aggregation pipeline

Static method: Book.updateAvailability(bookId)

Post middleware logs borrow events

📤 Sample Borrow Request
POST /api/borrow
{
"book": "BOOK_OBJECT_ID",
"quantity": 2,
"dueDate": "2025-07-18T00:00:00.000Z"
}
⚠️ Error Response Format
{
"message": "Validation failed",
"success": false,
"error": {
"field": "Field-specific error messages"
}
}
📽️ Demo & Live
🎥 Watch Demo

🌐 Live API :

🙌 Author
Made with ❤️ by Sahabul Islam Sifat

📧 sahabulislamsifat@gmail.com
