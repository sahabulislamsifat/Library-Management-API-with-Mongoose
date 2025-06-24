import { Router } from "express";
import bookRoute from "../modules/book/book.route";
import borrowRoute from "../modules/borrow/borrow.route";
// import borrowRoute from "../modules/borrow/borrow.route"; // future

const routes = Router();

routes.use("/books", bookRoute);
routes.use("/borrow", borrowRoute);

export default routes;
