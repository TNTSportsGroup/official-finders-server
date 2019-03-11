import { isEqual } from "lodash";
import { getObjWithRedis } from "./usingRedis";
import { ILeagueTable, IGame } from "../../routers/qs";

export const compareQuickScoreData = async (
  season: string,
  currentData: ILeagueTable
) => {
  let updatedGames = [];
  let newGames: IGame[] = [];

  const previousData = await getObjWithRedis(season);
  // TODO transform the currentData to an array of games.
  if (!previousData) {
    newGames = Object.keys(currentData).reduce((prev, key) => {
      return [...prev, ...currentData[key]];
    }, []);
    return {
      newGames,
      differentRecords: []
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
