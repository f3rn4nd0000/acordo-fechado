module.exports = app => {
    const books = require("../controllers/book.controller.js");
    var router = require("express").Router();
  
    // Cria um novo livro
    router.post("/", books.create);

    app.use('/api/books', router);
}  