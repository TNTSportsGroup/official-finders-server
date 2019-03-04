import express from "express";

import { QuickScoreReq } from "../utils/request";

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba"
};

export const QsRouter = express.Router();

QsRouter.get("/", async (req, res) => {
  const demo = new QuickScoreReq(
    QUICKSCOREDIR.GLEN_ELLYN_PARK_DISTRICT,
    process.env.GLEN_ELLYN_PARK_DISTRICT
  );

  const data = await demo.orgInfo();

  console.log(data);
});
