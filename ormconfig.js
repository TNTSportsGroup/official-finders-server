module.exports = [
  {
    name: "prod",
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: "postgres",
    password: "postgres",
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: ["build/src/entity/**/*.js"],
    migrations: ["build/src/migration/**/*.js"],
    subscribers: ["build/src/subscriber/**/*.js"],
    cli: {
      entitiesDir: "build/src/entity",
      migrationsDir: "build/src/migration",
      subscribersDir: "build/src/subscriber"
    }
  },
  {
    name: "default",
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: "postgres",
    password: "postgres",
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }
];
