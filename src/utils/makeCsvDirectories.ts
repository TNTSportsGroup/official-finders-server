import fs from "fs";
import path from "path";

const fsPromises = fs.promises;

export const makeCsvDirectories = async () => {
  await makeCsvDirectory(path.resolve(__dirname + "/../csvs/payroll"));
  await makeCsvDirectory(path.resolve(__dirname + "/../csvs/invoices"));
  await makeCsvDirectory(path.resolve(__dirname + "/../csvs/quickscores"));
};

const makeCsvDirectory = async (path: string) => {
  try {
    // we check if the directory exist
    await fsPromises.access(path);
  } catch (e) {
    // if there was an error such as the directory
    // no existing then we create the directory.
    await fsPromises.mkdir(path, {
      recursive: true
    });
  }
};
