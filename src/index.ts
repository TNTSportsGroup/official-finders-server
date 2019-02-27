import express from "express";
import bodyParser from "body-parser";
import { hwrpRouter } from "./routers/hwrp";
import fileUpload from "express-fileupload";
import { hwriRouter } from "./routers/hwri";

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);

app.use("/hwrp", hwrpRouter);
app.use("/hwri", hwriRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
