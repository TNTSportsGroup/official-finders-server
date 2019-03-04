import express from "express";
import axios from "axios";
import { QuickScoreReq } from "../utils/request";

export const QsRouter = express.Router();

QsRouter.get("/", async (req, res) => {
  //   const demo = new QuickScoreReq("geyba", "fDo!r3Ia");

  //   const data = demo.orgInfo();

  //   console.log(data);

  try {
    const response = await axios.get(
      "https://www.quickscores.com/API/OrgInfo.php?OrgDir=geyba&APIAuthToken=fDo!r3Ia"
    );

    console.log(response);

    res.send({
      data: response.data
    });
  } catch (error) {
    console.log(error);
  }
});
