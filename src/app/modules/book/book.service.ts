import mongoose, { ObjectId } from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { IBook } from "./book.interface";
import { bookModel } from "./book.model";

//Create a book into database
const createBookService = async (userData: IBook, filePath?: string) => {
  const dataToSave = { ...userData, filePath };
  const result = await bookModel.create(dataToSave);
  return result;
};

// Get all books with optional pagination
const getAllBookService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[]
) => {
  let results;

  if (page && limit) {
    const query = bookModel.find().populate("user");
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields
    );

    result.results = formatResultImage<IBook>(
      result.results,
      "coverImage"
    ) as IBook[];

    return result;
  } else {
    results = await bookModel.find().populate("user").exec();

    results = formatResultImage(results, "coverImage");

    return {
      results,
    };
  }
};

//Get single book
const getSingleBookService = async (bookId: number | string) => {
  const queryId =
    typeof bookId === "string" ? new mongoose.Types.ObjectId(bookId) : bookId;

  // Find the book by ID
  const result = await bookModel.findById(queryId).populate("user").exec();
  if (!result) {
    throw new Error("Book not found");
  }

  if (typeof result.coverImage === "string") {
    const formattedCoverImage = formatResultImage<IBook>(result.coverImage);
    if (typeof formattedCoverImage === "string") {
      result.coverImage = formattedCoverImage;
    }
  }

  return result;
};

const getBooksByUserService = async (userId: string) => {
  const result = await bookModel.find({ user: userId }).populate("user").exec();

  if (!result || result.length === 0) {
    throw new Error("No books found for this user");
  }

  return result;
};

//Update single book
const updateSingleBookService = async (
  bookId: string | number,
  bookData: IBook
) => {
  const queryId =
    typeof bookId === "string" ? new mongoose.Types.ObjectId(bookId) : bookId;

  const result = await bookModel
    .findByIdAndUpdate(
      queryId,
      { $set: bookData },
      { new: true, runValidators: true }
    )
    .exec();

  if (!result) {
    throw new Error("Book not found");
  }

  return result;
};

//Delete single book
const deleteSingleBookService = async (bookId: string | number) => {
  const queryId =
    typeof bookId === "string" ? new mongoose.Types.ObjectId(bookId) : bookId;

  const result = await bookModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Book not found");
  }

  return result;
};

//Delete many book
const deleteManyBooksService = async (bookIds: (string | number)[]) => {
  const queryIds = bookIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const result = await bookModel.deleteMany({ _id: { $in: queryIds } }).exec();

  return result;
};

export const bookServices = {
  createBookService,
  getAllBookService,
  getSingleBookService,
  getBooksByUserService,
  updateSingleBookService,
  deleteSingleBookService,
  deleteManyBooksService,
};
