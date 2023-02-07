"use strict";
module.exports = function (app) {
    var books = require("../controllers/book.controller.js");
    var swaggerUi = require('swagger-ui-express');
    var YAML = require('yamljs');
    var swaggerDocument = YAML.load(process.cwd() + '/swagger/documentation.yaml');
    var router = require("express").Router();
    router.post("/", books.create);
    router.get("/", books.findAll);
    router.get("/:id", books.findOne);
    router.put("/:id", books.update);
    router.delete("/:id", books.delete);
    router.delete("/", books.deleteAll);
    router.get('/api-docs', swaggerUi.setup(swaggerDocument));
    app.use('/api/books', router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
