const db = require("../models");
const Book = db.books;

exports.create = (req, res) => {

  if(!req.body.title || !req.body.author) {
    res.status(400).send({ message: "Título e autor do livro não podem ficar vazios!"});
    return;
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    publicationYear: req.body.publicationYear,
    numberOfPages: req.body.numberOfPages
    // published: req.body.published ? req.body.published: false
  });

  book
    .save(book)
    .then(data => {
      res.send(data);
      console.log('Livro de titulo '+book.title+' salvo com sucesso')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao tentar cadastrar um novo livro."
      });
  });

};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Book.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na tentativa de buscar os livros"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado livro com o id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao buscar livro com id:" + id });
    });
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};
