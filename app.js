const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

// TODO : connection database
require("./db/connection");

// TODO : middleware
app.use(express.json());

// TODO : router page require()
app.use(require("./router/auth"));

app.get("/", async (req, res) => {
  try {
    res.status(200).send({
      message: "Apps are running",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// TODO : listening the app
app.listen(port, async () => {
  console.log(`app listening of port port ${port}`);
});
