import express from "express";
import { bookControllers } from "./book.controller";
import { uploadService } from "../upload/upload";

const router = express.Router();

router.post(
  "/book/",
  uploadService.single("coverImage"),
  bookControllers.createBookController
);

router.get("/book/", bookControllers.getAllBookController);

router.get("/book/:bookId/", bookControllers.getSingleBookController);

router.get("/book/user/:userId/", bookControllers.getBooksByUserController);

router.patch(
  "/book/:bookId/",
  uploadService.single("coverImage"),
  bookControllers.updateSingleBookController
);

router.delete("/book/:bookId/", bookControllers.deleteSingleBookController);

router.post("/book/bulk-delete/", bookControllers.deleteManyBooksController);

export const bookRoutes = router;
