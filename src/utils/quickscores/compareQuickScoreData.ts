import { isEqual } from "lodash";

import { ILeagueTable, IGame } from "./types";
import {
  getLastQuickScoreDataSet,
  insertNewQuickScoresDataSet
} from "./db-controller";

export const compareQuickScoreData = async (
  season: string,
  year: number,
  currentData: ILeagueTable
) => {
  let updatedGames: IGame[] = [];
  let newGames: IGame[] = [];

  let previousData: any = await getLastQuickScoreDataSet(season, year);

  if (previousData.length === 0) {
    newGames = Object.keys(currentData).reduce((prev, key) => {
      return [...prev, ...currentData[key]];
    }, []);

    return {
      newGames,
      updatedGames: []
    };
  }

  const currentDataLeagues = Object.keys(currentData);
  previousData = previousData[0].data;
  console.log(Object.keys(previousData));

  for (let league of currentDataLeagues) {
    currentData[league].forEach(game => {
      let [oldGameData] = previousData[league].filter(
        previousGame => previousGame.GameID === game.GameID
      );

      if (!oldGameData) {
        newGames.push(game);
      } else if (!isEqual(game, oldGameData)) {
        updatedGames.push(game);
      }
    });
  }

  return { updatedGames, newGames };
};
