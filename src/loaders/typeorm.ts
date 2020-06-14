import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import { getConnectionOptions, createConnections, createConnection } from "typeorm";
import { success, error } from "log-symbols";

import { env } from "../env";

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const loadedConnectionOptions = await getConnectionOptions();

  // edith database
  const connectionOptions = Object.assign(loadedConnectionOptions, {
    type: env.db.type as any, // See createConnection options for valid types
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: false,
    logging: env.db.logging,
    entities: env.app.dirs.entities,
    migrations: env.app.dirs.migrations,
  });

  try {
    const connection = await createConnection(connectionOptions);

    console.log(success, "[EDITH DB] - Connection was successful!");

    if (settings) {
      settings.setData("connection", connection);
      settings.onShutdown(() => connection.close());
    }
  } catch (err) {
    console.log(error, "[EDITH DB] - Connection has failed: ", err);
  }
};
