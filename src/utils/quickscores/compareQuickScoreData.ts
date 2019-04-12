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
  //console.log(previousData);
  for (let league of currentDataLeagues) {
    currentData[league].forEach(game => {
      //TODO what if the previous data doesn't have that league -fixed
      if (previousData[league]) {
        // get the same game to check if it's been updated
        let [oldGameData] = previousData[league].filter(
          previousGame => previousGame.GameID === game.GameID
        );

        if (!oldGameData) {
          newGames.push(game);
        } else if (!isEqual(game, oldGameData)) {
          updatedGames.push(game);
        }
      }

      if (!previousData[league]) {
        newGames.push(game);
      }
    });
  }

  return { updatedGames, newGames };
};
