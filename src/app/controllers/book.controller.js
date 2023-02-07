const db = require("../models");
const Book = db.books;

function validateNumber(number){
  if (parseInt(number) <= 0 || number.isNaN == true) return false;
  return true;
}

function validateYear(number){
  if (number.toString().length != 4){ return false };
  return true;
}

function returnValidNumber(number){
  number = parseInt(number);

  if (number <= 0){
    number *= -1
  }

  return number;
}

exports.create = (req, res) => {

  // O ano de publicação e número de páginas são automaticamente 
  // convertidos em inteiros positivos mesmo que o usuário digite errado
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    publicationYear: returnValidNumber(req.body.publicationYear),
    numberOfPages: returnValidNumber(req.body.numberOfPages)
  });

  if(!req.body.title || !req.body.author) {
    res.status(400).send({ message: "Título e autor do livro não podem ficar vazios!"});
    return;
  }

  if(validateNumber(book.publicationYear) != true || validateYear(book.publicationYear) != true){
    res.status(400).send({ message: "Erro, parece que o ano de publicação não foi cadastrado corretamente\nSomente são aceitos inteiros positivos de 4 dígitos!"});
    return;
  }

  if(validateNumber(book.numberOfPages) != true){
    res.status(400).send({ message: "Erro, parece que o número de páginas não foi cadastrado corretamente!\nSomente são aceitos inteiros positivos"});
    return;
  }

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
      console.log(data);
      console.log(typeof(data));
      // if (JSON.stringify(data === '[]') && data == null ) { data = { message: "Nenhum Livro cadastrado até o momento"}};
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
  if (!req.body) {
    return res.status(400).send({
      message: "Não pode enviar corpo da mensagem vazio!"
    });
  }
  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossível atualizar livro de id:${id}. O livro não foi encontrado na base de dados!`
        });
      } else res.send({ message: "Livro foi atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar livro de id: " + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossível deletar livro de id:${id}. Não foi encontrado na base de dados!`
        });
      } else {
        res.send({
          message: "Livro não foi encontrado!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro, impossível deletar livro de id:" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Book.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Todos os livros foram excluídos com sucesso!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro no backend, impossível deletar todos os livros."
    });
  });
};
