module.exports = mongoose => {
    const Book = mongoose.model(
      "book",
      mongoose.Schema(
        {
          title: String,
          description: String,
          numberOfPages: Number,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Book;
  };