import createCsvWriter from "csv-writer";
import * as shortid from "shortid";

interface Header {
  id: string;
  title: string;
}

export const createPayrollCsv = (
  fileName: string,
  headers: Header[],
  records: any
) => {
  const csvWriter = createCsvWriter({
    path: `csvs/${fileName}.csv`,
    headers: headers
  });

  csvWriter.writeRecords(records).then(() => {
    console.log("...Done");
  });
};
