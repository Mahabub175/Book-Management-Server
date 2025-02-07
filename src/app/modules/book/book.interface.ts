import { Types } from "mongoose";

export interface IBook {
  name: string;
  author: string;
  user: Types.ObjectId;
  publishedAt: string;
  coverImage: string;
  description: string;
  price: number;
  rating: number;
  genre: string;
  language: string;
  status: string;
}
