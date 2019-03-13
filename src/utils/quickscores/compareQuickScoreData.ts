import { isEqual } from "lodash";
import { getObjWithRedis } from "./usingRedis";
import { ILeagueTable, IGame } from "./types";

export const compareQuickScoreData = async (
  season: string,
  currentData: ILeagueTable
) => {
  let updatedGames: IGame[] = [];
  let newGames: IGame[] = [];

  const previousData = await getObjWithRedis(season);

  if (!previousData) {
    newGames = Object.keys(currentData).reduce((prev, key) => {
      return [...prev, ...currentData[key]];
    }, []);
    return {
      newGames,
      updatedGames: []
    };
  }

  const currentDataLeagues = Object.keys(currentData);

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
