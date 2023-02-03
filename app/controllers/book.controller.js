const db = require("../models");
const Book = db.books;

exports.create = (req, res) => {

  if(!req.body.title) {
    res.status(400).send({ message: "Título do livro não pode ficar vazio!"});
    return;
  }

  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    numberOfPages: req.body.numberOfPages,
    published: req.body.published ? req.body.published: false
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
  
};

exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};
