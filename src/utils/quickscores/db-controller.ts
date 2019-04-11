import { QuickScore } from "../../entity/QuickScore";

export async function getLastQuickScoreDataSet(season: string, year: number) {
  const lastDataSet = await QuickScore.find({
    order: {
      createdDate: "DESC"
    },
    where: {
      season,
      year
    }
  });

  return lastDataSet;
}

export async function insertNewQuickScoresDataSet(
  season: string,
  year: number,
  data: Object
) {
  const newEntry = QuickScore.create({
    season,
    year,
    data
  });

  await newEntry.save();
}
