const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import * as shortid from "shortid";
import path from "path";
import dayjs from "dayjs";
import { IGame } from "../../routers/qs";

export interface Header {
  id: string;
  title: string;
}

const createGamesCsv = (type: string) => (
  headers: Header[],
  records: IGame[]
) => {
  const name = `${type}-${shortid.generate()}.csv`;

  const csvWriter = createCsvWriter({
    path: path.resolve(__dirname + `/../../csvs/quickscores/${name}`),
    header: headers
  });

  csvWriter
    .writeRecords(records)
    .then(() => {
      console.log("...Done");
    })
    .catch(e => {
      console.log(e);
    });

  return name;
};

export const createNewGamesCsv = createGamesCsv(
  `${dayjs().format("MM-DD-YY")}-new-games`
);
export const createUpdatedGamesCsv = createGamesCsv(
  `${dayjs().format("MM-DD-YY")}-updated-games`
);
