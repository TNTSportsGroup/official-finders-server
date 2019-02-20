import express from "express";

const port = 3000;

const app = express();

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
