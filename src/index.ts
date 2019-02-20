import express from "express";
import bodyParser from "body-parser";
import { hwrpRouter } from "./routers/hwrp";

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use("/hwrp", hwrpRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
