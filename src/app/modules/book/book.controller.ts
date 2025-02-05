import { NextFunction, Request, Response } from "express";
import { uploadService } from "../upload/upload";
import { bookServices } from "./book.service";

const uploadMiddleware = uploadService.single("coverImage");

const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "File upload failed",
        error: err.message,
      });
    }

    try {
      const data = req.body;

      const filePath = req.file ? req.file.path : undefined;

      const formData = {
        ...data,
        attachment: filePath,
      };

      const result = await bookServices.createBookService(formData);

      res.status(200).json({
        success: true,
        message: "Book Created Successfully",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  });
};

const getAllBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pageSize = limit ? parseInt(limit as string, 10) : undefined;

    const searchText = req.query.searchText as string | undefined;

    const searchFields = [
      "name",
      "author",
      "price",
      "genre",
      "price",
      "language",
    ];

    const result = await bookServices.getAllBookService(
      pageNumber,
      pageSize,
      searchText,
      searchFields
    );

    res.status(200).json({
      success: true,
      message: "Books Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Get single book data
const getSingleBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const result = await bookServices.getSingleBookService(bookId);
    res.status(200).json({
      success: true,
      message: "Single Book Fetched Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Update single book controller
const updateSingleBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "File upload failed",
        error: err.message,
      });
    }
    try {
      const { bookId } = req.params;
      const data = req.body;
      const filePath = req.file ? req.file.path : undefined;

      const bookData = {
        ...data,
        attachment: filePath,
      };

      const result = await bookServices.updateSingleBookService(
        bookId,
        bookData
      );

      res.status(200).json({
        success: true,
        message: "Single Book Updated Successfully!",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  });
};

//Delete single book controller
const deleteSingleBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    await bookServices.deleteSingleBookService(bookId);
    res.status(200).json({
      success: true,
      message: "Single User Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete many book controller
const deleteManyBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookIds } = req.body;

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty book IDs array provided",
        data: null,
      });
    }

    const result = await bookServices.deleteManyBooksService(bookIds);

    res.status(200).json({
      success: true,
      message: `Bulk Books Delete Successful! Deleted ${result.deletedCount} Books.`,
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const bookControllers = {
  createBookController,
  getAllBookController,
  getSingleBookController,
  updateSingleBookController,
  deleteSingleBookController,
  deleteManyBooksController,
};
