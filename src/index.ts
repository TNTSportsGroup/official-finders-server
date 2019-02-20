import express from "express";
import bodyParser from "body-parser";

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
