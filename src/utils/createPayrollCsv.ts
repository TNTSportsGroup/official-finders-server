import createCsvWriter from "csv-writer";
import * as shortid from "shortid";

interface Header {
  id: string;
  title: string;
}

export const createPayrollCsv = (headers: Header[], records: any) => {
  const name = `${shortid.generate()}.csv`;

  const csvWriter = createCsvWriter({
    path: `csvs/${name}`,
    headers: headers
  });

  csvWriter.writeRecords(records).then(() => {
    console.log("...Done");

    return name;
  });
};
