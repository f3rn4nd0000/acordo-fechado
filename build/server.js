"use strict";
var express = require("express");
var cors = require("cors");
var app = express();
var db = require("./app/models");
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
db.mongoose
    .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Conexão com banco de dados efetuada!");
})
    .catch(err, function (any) {
    console.log("Não foi possível conectar com o banco de dados!", err);
    process.exit();
});
require("./app/routes/book.routes")(app);
var PORT = process.env.PORT || 3000;
app.use;
app.listen(PORT, function () {
    console.log("App rodando em http://localhost:".concat(PORT));
});
