import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";
import { Status } from "../../interface/global/global.interface";

// Define the schema
const bookSchema = new Schema<IBook>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    publishedAt: {
      type: Schema.Types.Mixed,
      required: true,
      trim: true,
      unique: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      trim: true,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

// Create and export the model
export const bookModel = model<IBook>("book", bookSchema);
