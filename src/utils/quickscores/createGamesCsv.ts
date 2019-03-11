const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import * as shortid from "shortid";
import path from "path";
import { IGame } from "../../routers/qs";

export interface Header {
  id: string;
  title: string;
}

const createGamesCsv = (type: string) => (
  headers: Header[],
  records: IGame[]
) => {
  const name = `${shortid.generate()}.csv`;

  const csvWriter = createCsvWriter({
    path: path.resolve(__dirname + `/../../csvs/quickscores/${type}-${name}`),
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

export const createNewGamesCsv = createGamesCsv("new-games");
export const createUpdatedGamesCsv = createGamesCsv("updated-games");
