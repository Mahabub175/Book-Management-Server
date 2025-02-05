import express from "express";
import { bookControllers } from "./book.controller";

const router = express.Router();

router.post("/book/", bookControllers.createBookController);

router.get("/book/", bookControllers.getAllBookController);

router.get("/book/:bookId/", bookControllers.getSingleBookController);

router.patch("/book/:bookId/", bookControllers.updateSingleBookController);

router.delete("/book/:bookId/", bookControllers.deleteSingleBookController);

router.post("/book/bulk-delete/", bookControllers.deleteManyBooksController);

export const bookRoutes = router;
