import express from "express";
import cors from "cors";
import db from "./app/models/index";
// import router from "./app/routes/book.routes";
import appRoutes from "./app/routes/book.routes";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(appRoutes);

db.mongoose
  .connect(db.url, {
  })
  .then(() => {
    console.log("Conexão com banco de dados efetuada!");
  })
  .catch((err: Error) => {
    console.log("Não foi possível conectar com o banco de dados!", err);
    process.exit();
  });


const PORT = process.env.PORT || 3000;
app.use
app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});
