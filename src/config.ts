// Config that is common to more than one part of the app.

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { QuickScore } from "./entity/QuickScore";

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  username: "postgres",
  password: "postgres",
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [QuickScore]
};

export { typeOrmConfig };
