import { createConnection, getConnectionOptions } from "typeorm";

export const createDatabaseConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  console.log(connectionOptions);

  return createConnection({
    ...connectionOptions,
    name: "default"
  });
};
