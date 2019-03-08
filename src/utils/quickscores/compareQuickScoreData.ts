import { isEqual } from "lodash";

export const compareQuickScoreData = (previousData: any, currentData: any) => {
  let differentRecords = [];

  const currentDataLeagues = Object.keys(currentData);

  for (let league of currentDataLeagues) {
    if (previousData[league]) {
      currentData[league].forEach(game => {
        let [oldGameData] = previousData[league].filter(
          previousGame => previousGame.GameID === game.GameID
        );

        if (!isEqual(game, oldGameData)) {
          differentRecords.push({
            oldData: oldGameData,
            new: game
          });
        }
      });
    }
  }

  return differentRecords;
};
