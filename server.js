const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexão com banco de dados efetuada!");
  })
  .catch(err => {
    console.log("Não foi possível conectar com o banco de dados!", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.get('/', (req, res) => {
  res.json('Hello World!');
});

require("./app/routes/book.routes")(app);

const PORT = process.env.PORT || 3000;
app.use
app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});
