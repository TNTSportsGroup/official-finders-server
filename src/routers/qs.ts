import express from "express";
import { QuickScoreReq } from "../utils/quickscores/request";

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

  const data = await demo.eventList();
  const seasonSchedule = data.filter(item => item.Season === "Winter 2019");
  const firstLeague = seasonSchedule[0];

  let gamesForLeague = await demo.scheduleInfo(firstLeague.LeagueID);
  const gameData = gamesForLeague.RegularGameData.filter(
    game => game.Date >= "2019-03-01"
  );

  res.send({
    data: firstLeague
  });
});
