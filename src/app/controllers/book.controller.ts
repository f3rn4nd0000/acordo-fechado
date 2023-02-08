// import Book from 'app/models/book.model';
import db from '../models/index';
import { Request, Response } from 'express';
const Book = db.books;
// const db = require("../models");

function validateNumber(number: number){
  if (parseInt(number.toString(), 10) <= 0 || isNaN(number) == true) return false;
  return true;
}

function validateYear(number: number){
  if (number.toString().length != 4){ return false };
  return true;
}

// Corrige o caso de um usuário digitar número negativo
function moduleOfNumber(number: number){
  // number = parseInt(number);
  // if (number <= 0){
  //   number *= -1
  // }
  return number <= 0? number: -number;
}

export const createBook = (req: Request, res: Response) => {

  // O ano de publicação e número de páginas são automaticamente
  // convertidos em inteiros positivos mesmo que o usuário digite errado
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    publicationYear: moduleOfNumber(req.body.publicationYear),
    numberOfPages: moduleOfNumber(req.body.numberOfPages)
  });

  if(!req.body.title || !req.body.author) {
    res.status(400).send({ message: "Título e autor do livro não podem ficar vazios!"});
    return;
  }
  else{
    book.save();
    res.status(201).send(book)
  }

};

export const findAllBooks = (req: Request, res: Response) => {
  console.log('procurando por livros')
  let title: string | undefined = req.query.title as string;
  if (!title) {
    title = undefined;
  };
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Book.find(condition)
    .then((data: any[]) => {
      console.log(data);
      console.log(typeof(data));
      // if (JSON.stringify(data === '[]') && data == null ) { data = { message: "Nenhum Livro cadastrado até o momento"}};
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na tentativa de buscar os livros"
      });
    });
};

export const findOneBook = (req: Request, res: Response) => {
  const id = req.params.id;

  Book.findById(id)
    .then((data: any) => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado livro com o id: " + id });
      else res.send(data);
    })
    .catch((err: Error) => {
      res
        .status(500)
        .send({ message: "Erro ao buscar livro com id:" + id });
    });
};

export const updateBook = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Não pode enviar corpo da mensagem vazio!"
    });
  }
  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Impossível atualizar livro de id:${id}. O livro não foi encontrado na base de dados!`
        });
      } else res.send({ message: "Livro foi atualizado com sucesso." });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Erro ao atualizar livro de id: " + id
      });
    });
};

export const deleteBook = (req: Request, res: Response) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id)
    .then((data: any) => {
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
    .catch((err: Error) => {
      res.status(500).send({
        message: "Erro, impossível deletar livro de id:" + id
      });
    });
};

export const deleteAll = (req: Request, res: Response) => {
  Book.deleteMany({})
  .then((data: any) => {
    res.send({
      message: `${data.deletedCount} Todos os livros foram excluídos com sucesso!`
    });
  })
  .catch((err: Error) => {
    res.status(500).send({
      message:
        err.message || "Erro no backend, impossível deletar todos os livros."
    });
  });
};

// if(validateNumber(book.publicationYear) != true || validateYear(book.publicationYear) != true){
  //   res.status(400).send({ message: "Erro, parece que o ano de publicação não foi cadastrado corretamente\nSomente são aceitos inteiros positivos de 4 dígitos!"});
  //   return;
  // }

  // if(validateNumber(book.numberOfPages) != true){
  //   res.status(400).send({ message: "Erro, parece que o número de páginas não foi cadastrado corretamente!\nSomente são aceitos inteiros positivos"});
  //   return;
  // }


  //   .save(book)
  //   .then(data => {
  //     res.send(data);
  //     console.log('Livro de titulo '+book.title+' salvo com sucesso')
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Ocorreu um erro ao tentar cadastrar um novo livro."
  //     });
  // });
