import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  publicationYear: Number,
  numberOfPages: Number,
  },
  {
    timestamps: true,
  });

const Book = mongoose.model('book', BookSchema);

export default Book;

// module.exports = mongoose => {
//     const Book = mongoose.model(
//       "book",
//       mongoose.Schema(
//         {
//           title: String,
//           author: String,
//           publisher: String,
//           publicationYear: Number,
//           numberOfPages: Number,
//         },
//         // Adiciona data de criação
//         { timestamps: true }
//       )
//     );

//     return Book;
//   };