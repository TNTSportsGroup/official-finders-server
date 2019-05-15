import dayjs from "dayjs";
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

export async function isThisFirstTimeWeGetSchedulesToday(
  season: string,
  year: number
) {
  let dataSet = await getLastQuickScoreDataSet(season, year);
  if (dataSet.length === 0) {
    return false;
  }

  const lastDataCreated = dataSet[0];

  return (
    dayjs().format("YYYY-MM-DD") ===
    dayjs(lastDataCreated.createdDate).format("YYYY-MM-DD")
  );
}
