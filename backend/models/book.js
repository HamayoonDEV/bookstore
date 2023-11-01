import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    published: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Book", bookSchema, "books");
