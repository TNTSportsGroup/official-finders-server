import * as fs from "fs";
import path from "path";
import util from "util";

export function writeObjectToFile(obj: any) {
  fs.writeFile(
    path.resolve(__dirname, "../../data/quickscoreData.js"),
    `export default data = ` + util.inspect(obj),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}
