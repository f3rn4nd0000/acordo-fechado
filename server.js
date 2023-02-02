const express = require("express");
const app = express();

app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
