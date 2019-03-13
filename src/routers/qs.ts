import express from "express";
import { filterBy } from "../utils/quickscores/filterBy";
import { IEvent, IGameData, QuickScoreReq } from "../utils/quickscores/request";
import { compareQuickScoreData } from "../utils/quickscores/compareQuickScoreData";
import {
  createNewGamesCsv,
  createUpdatedGamesCsv
} from "../utils/quickscores/createGamesCsv";
import { matchSeasonAndYear } from "../utils/quickscores/matchSeasonAndYear";
import { writeObjWithRedis } from "../utils/quickscores/usingRedis";
import { getUpcomingGames } from "../utils/quickscores/getUpcomingGames";

export const QsRouter = express.Router();

QsRouter.get("/", async (req, res) => {
  const upcomingGames = await getUpcomingGames();

  const { newGames, updatedGames } = await compareQuickScoreData(
    "Winter 2019",
    upcomingGames
  );

  const headers = [
    {
      id: "Date",
      title: "Game Date"
    },
    {
      id: "Time",
      title: "Game Time"
    },
    {
      id: "HomeTeam",
      title: "Home Team"
    },
    {
      id: "AwayTeam",
      title: "Away Team"
    },
    {
      id: "LocationName",
      title: "Facility"
    }
  ];

  let responseObject = {
    newGames,
    updatedGames,
    newGamesFileName: "",
    updatedGamesFileName: ""
  };

  if (newGames.length > 0) {
    const newGamesFileName = createNewGamesCsv(headers, newGames);

    responseObject.newGamesFileName = newGamesFileName;
  }

  if (updatedGames.length > 0) {
    const updatedGamesFileName = createUpdatedGamesCsv(headers, updatedGames);
    responseObject.updatedGamesFileName = updatedGamesFileName;
  }

  // writeObjWithRedis("Winter 2019", upcomingGames);

  res.send(responseObject);
});
