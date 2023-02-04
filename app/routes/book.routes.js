module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const swaggerDocument = YAML.load(process.cwd()+'/swagger/documentation.yaml');
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
}  