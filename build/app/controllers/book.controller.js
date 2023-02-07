"use strict";
var db = require("../models");
var Book = db.books;
function validateNumber(number) {
    if (parseInt(number) <= 0 || number.isNaN == true)
        return false;
    return true;
}
function validateYear(number) {
    if (number.toString().length != 4) {
        return false;
    }
    ;
    return true;
}
function returnValidNumber(number) {
    number = parseInt(number);
    if (number <= 0) {
        number *= -1;
    }
    return number;
}
exports.create = function (req, res) {
    // O ano de publicação e número de páginas são automaticamente 
    // convertidos em inteiros positivos mesmo que o usuário digite errado
    var book = new Book({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publicationYear: returnValidNumber(req.body.publicationYear),
        numberOfPages: returnValidNumber(req.body.numberOfPages)
    });
    if (!req.body.title || !req.body.author) {
        res.status(400).send({ message: "Título e autor do livro não podem ficar vazios!" });
        return;
    }
    if (validateNumber(book.publicationYear) != true || validateYear(book.publicationYear) != true) {
        res.status(400).send({ message: "Erro, parece que o ano de publicação não foi cadastrado corretamente\nSomente são aceitos inteiros positivos de 4 dígitos!" });
        return;
    }
    if (validateNumber(book.numberOfPages) != true) {
        res.status(400).send({ message: "Erro, parece que o número de páginas não foi cadastrado corretamente!\nSomente são aceitos inteiros positivos" });
        return;
    }
    book
        .save(book)
        .then(function (data) {
        res.send(data);
        console.log('Livro de titulo ' + book.title + ' salvo com sucesso');
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao tentar cadastrar um novo livro."
        });
    });
};
exports.findAll = function (req, res) {
    var title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Book.find(condition)
        .then(function (data) {
        console.log(data);
        console.log(typeof (data));
        // if (JSON.stringify(data === '[]') && data == null ) { data = { message: "Nenhum Livro cadastrado até o momento"}};
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Ocorreu um erro na tentativa de buscar os livros"
        });
    });
};
exports.findOne = function (req, res) {
    var id = req.params.id;
    Book.findById(id)
        .then(function (data) {
        if (!data)
            res.status(404).send({ message: "Não foi encontrado livro com o id: " + id });
        else
            res.send(data);
    })
        .catch(function (err) {
        res
            .status(500)
            .send({ message: "Erro ao buscar livro com id:" + id });
    });
};
exports.update = function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Não pode enviar corpo da mensagem vazio!"
        });
    }
    var id = req.params.id;
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Imposs\u00EDvel atualizar livro de id:".concat(id, ". O livro n\u00E3o foi encontrado na base de dados!")
            });
        }
        else
            res.send({ message: "Livro foi atualizado com sucesso." });
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Erro ao atualizar livro de id: " + id
        });
    });
};
exports.delete = function (req, res) {
    var id = req.params.id;
    Book.findByIdAndRemove(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Imposs\u00EDvel deletar livro de id:".concat(id, ". N\u00E3o foi encontrado na base de dados!")
            });
        }
        else {
            res.send({
                message: "Livro não foi encontrado!"
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Erro, impossível deletar livro de id:" + id
        });
    });
};
exports.deleteAll = function (req, res) {
    Book.deleteMany({})
        .then(function (data) {
        res.send({
            message: "".concat(data.deletedCount, " Todos os livros foram exclu\u00EDdos com sucesso!")
        });
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Erro no backend, impossível deletar todos os livros."
        });
    });
};
