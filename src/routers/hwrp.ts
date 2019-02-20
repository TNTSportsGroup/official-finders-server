import express from "express";

export const hwrpRouter = express.Router();

hwrpRouter.post("/", (req, res) => {
  console.log(req.body);
  res.send("hi");
});
