import express from "express";
import fs from "fs";
import path from "path";
import { compareQuickScoreData } from "../utils/quickscores/compareQuickScoreData";
import {
  createNewGamesCsv,
  createUpdatedGamesCsv
} from "../utils/quickscores/createGamesCsv";

import { getUpcomingGames } from "../utils/quickscores/getUpcomingGames";
import {
  insertNewQuickScoresDataSet,
  isThisFirstTimeWeGetSchedulesToday
} from "../utils/quickscores/db-controller";

export const QsRouter = express.Router();

QsRouter.get("/file/:name", async (req, res) => {
  const pathToFile = path.resolve(
    __dirname + `/../csvs/quickscores/${req.params.name}`
  );

  try {
    if (fs.existsSync(pathToFile)) {
      res.sendFile(pathToFile, "payroll.csv", e => {
        if (e) {
          console.log(e);
        }
      });
    }
  } catch (err) {
    res.status(404).send({
      error: "file does not exist"
    });
  }
});

QsRouter.get("/", async (req, res) => {
  const { season, year } = req.query;

  // if (await isThisFirstTimeWeGetSchedulesToday(season, year)) {
  //   res.send({
  //     error: "You already request new and updates games today"
  //   });

  //   return;
  // }

  const upcomingGames = await getUpcomingGames(season, year);

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
