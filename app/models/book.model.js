module.exports = mongoose => {
    const Book = mongoose.model(
      "book",
      mongoose.Schema(
        {
          title: String,
          author: String,
          publisher: String,
          publicationYear: String,
          numberOfPages: Number,
        },
        { timestamps: true }
      )
    );
  
    return Book;
  };