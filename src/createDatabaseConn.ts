import {
  createConnection,
  getConnectionOptions,
  getConnection,
  createConnections
} from "typeorm";
import { typeOrmConfig } from "./config";

export const createDatabaseConn = async () => {
  // let env = "default";
  // if (process.env.NODE_ENV === "production") {
  //   env = "prod";
  // }

  // const connectionOptions = await getConnectionOptions(env);
  // console.log(connectionOptions);

  return await createConnection(typeOrmConfig);

  //return getConnection(env);

  //return await createConnection(env);
};
