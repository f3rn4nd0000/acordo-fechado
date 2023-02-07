"use strict";
module.exports = function (mongoose) {
    var Book = mongoose.model("book", mongoose.Schema({
        title: String,
        author: String,
        publisher: String,
        publicationYear: Number,
        numberOfPages: Number,
    }, 
    // Adiciona data de criação
    { timestamps: true }));
    return Book;
};
