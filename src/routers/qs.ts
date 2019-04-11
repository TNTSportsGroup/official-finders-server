import express from "express";
import { compareQuickScoreData } from "../utils/quickscores/compareQuickScoreData";
import {
  createNewGamesCsv,
  createUpdatedGamesCsv
} from "../utils/quickscores/createGamesCsv";

import { getUpcomingGames } from "../utils/quickscores/getUpcomingGames";
import { insertNewQuickScoresDataSet } from "../utils/quickscores/db-controller";

export const QsRouter = express.Router();

QsRouter.get("/", async (req, res) => {
  const { season, year } = req.query;

  const upcomingGames = await getUpcomingGames(season, year);

  //console.log(upcomingGames);

  const { newGames, updatedGames } = await compareQuickScoreData(
    season,
    year,
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

  await insertNewQuickScoresDataSet(season, year, upcomingGames);

  res.send(responseObject);
});
