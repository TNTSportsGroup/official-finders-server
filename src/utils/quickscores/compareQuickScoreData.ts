import { isEqual } from "lodash";

export const compareQuickScoreData = (previousData: any, currentData: any) => {
  let differentRecords = [];
  let newGames = [];

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
