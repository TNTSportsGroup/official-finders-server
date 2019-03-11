const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import * as shortid from "shortid";
import path from "path";

export interface Header {
  id: string;
  title: string;
}

export const createUpdatedGamesCsv = (headers: Header[], records: any) => {
  const name = `${shortid.generate()}.csv`;

  const csvWriter = createCsvWriter({
    path: path.resolve(
      __dirname + `/../../csvs/quickscores/updates-games-${name}`
    ),
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
