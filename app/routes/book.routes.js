module.exports = app => {
    const books = require("../controllers/book.controller.js");
    var router = require("express").Router();
  
    // Cria um novo livro
    router.post("/", books.create);
    router.get("/", books.findAll);
    app.use('/api/books', router);
}  