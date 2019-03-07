import express from "express";
import { filterBy } from "../utils/quickscores/filterBy";
<<<<<<< HEAD
import { writeObjectToFile } from "../utils/quickscores/writeObjectToFile";
=======
import { IEvent, IGameData, QuickScoreReq } from "../utils/quickscores/request";
>>>>>>> e5e3a4673d130356d958c1c964d4cea475366063

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba"
};

const filterBySeason = filterBy<IEvent>(
  league => league.Season === "Winter 2019"
);

const filterByDate = filterBy<IGameData>(game => game.Date >= "2019-03-04");

export const QsRouter = express.Router();

QsRouter.get("/", async (req, res) => {
  const demo = new QuickScoreReq(
    QUICKSCOREDIR.GLEN_ELLYN_PARK_DISTRICT,
    process.env.GLEN_ELLYN_PARK_DISTRICT
  );
  // Get event list
  const data = await demo.eventList();
  // filter by the season

  const seasonSchedule = filterBySeason(data);
  let upcomingGames = {};

  for (let league of seasonSchedule) {
    upcomingGames[league.LeagueID] = [];

    let { RegularGameData, LeagueName } = await demo.scheduleInfo(
      league.LeagueID
    );

    let newData = filterByDate(RegularGameData);

    newData.forEach(game => {
      upcomingGames[league.LeagueID].push({
        GameID: game.GameID,
        LeagueName,
        Date: game.Date,
        Time: game.Time,
        LocationName: game.LocationName,
        HomeTeam: game.TeamName1,
        AwayTeam: game.TeamName2
      });
    });
  }

  writeObjectToFile(upcomingGames);

  res.send({
    data: upcomingGames
  });
});
