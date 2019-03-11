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

export interface IGame {
  GameID: string;
  LeagueName: string;
  Date: string;
  Time: string;
  LocationName: string;
  HomeTeam: string;
  AwayTeam: string;
}

export interface ILeagueTable {
  [key: string]: IGame[];
}

const QUICKSCOREDIR = {
  GLEN_ELLYN_PARK_DISTRICT: "glenellyn",
  GLEN_ELLYN_YOUTH_BASEBALL: "geyba"
};

const seasonToFilterBy = matchSeasonAndYear("Winter", 2019);

const filterBySeason = filterBy<IEvent>(
  league => !!seasonToFilterBy(league.Season)
);

const filterByDate = filterBy<IGameData>(game => game.Date >= "2019-03-06");

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
  let upcomingGames: ILeagueTable = {};

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

  if (newGames) {
    const newGameFileName = createNewGamesCsv(headers, newGames);
  }

  if (updatedGames) {
    const updatedGamesFileName = createUpdatedGamesCsv(headers, updatedGames);
  }

  writeObjWithRedis("Winter 2019", upcomingGames);

  res.send({
    newGames,
    updatedGames
  });
});
