import express from "express";
import cors from "cors";
import db from "./app/models";
// const db = require("./app/models");
// from "./app/models" import db
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

db.mongoose
  .connect(db.url, {
  })
  .then(() => {
    console.log("Conexão com banco de dados efetuada!");
  })
  .catch(err => {
    console.log("Não foi possível conectar com o banco de dados!", err);
    process.exit();
  });

require("./app/routes/book.routes")(app);
const PORT = process.env.PORT || 3000;
app.use
app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});
