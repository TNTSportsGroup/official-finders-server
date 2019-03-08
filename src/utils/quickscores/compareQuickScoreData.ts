import { isEqual } from "lodash";
import { getObjWithRedis } from "./usingRedis";

export const compareQuickScoreData = async (
  season: string,
  currentData: any
) => {
  let differentRecords = [];
  let newGames = [];

  const previousData = await getObjWithRedis(season);
  if (!previousData) {
    return {
      newGames: currentData,
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
        differentRecords.push({
          oldData: oldGameData,
          new: game
        });
      }
    });
  }

  return { differentRecords, newGames };
};
