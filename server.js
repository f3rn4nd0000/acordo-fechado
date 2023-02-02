const express = require("express");
const cors = require("cors");
const { mongoose } = require("./app");
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.post('/newbook', (req,res) => {
  
})

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
