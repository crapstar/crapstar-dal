import { Sequelize, Config } from "sequelize";
import {
  DatabaseOptions,
  isDatabaseOptionsWithReplication,
} from "./databaseOptions";

import { operatorsAliases } from "../models/common";

export type SequelizeHooks = {
  beforeConnect?: (config: Config) => Promise<void> | void;
  afterConnect?: (connection: unknown, config: Config) => Promise<void> | void;
  beforeDisconnect?: (connection: unknown) => Promise<void> | void;
  afterDisconnect?: (connection: unknown) => Promise<void> | void;
};

export abstract class AbstractDal {
  public Sequelize: Sequelize;
  constructor(options: DatabaseOptions, mock = false, hooks?: SequelizeHooks) {
    let logging: false | ((sql: string, duration: number) => void) = false;
    let benchmark = false;

    if (mock) {
      this.Sequelize = new Sequelize(options.database, "", "", {
        dialect: "sqlite",
        dialectOptions: {
          charset: "utf8mb4",
        },
        define: {
          freezeTableName: true,
        },
        logging,
        operatorsAliases,
      });
    } else {
      this.Sequelize = new Sequelize(
        options.database,
        options.user,
        options.password,
        {
          port: options.port,
          host: options.host,
          dialect: "mysql",
          dialectModule: require("mysql2"),
          hooks,
          pool: {
            max: 20,
            min: 5,
            idle: 10000,
            ...options.pool,
          },
          dialectOptions: {
            charset: "utf8mb4",
            ssl: options.ssl === false ? undefined : "Amazon RDS",
          },
          retry: {
            // https://github.com/sequelize/sequelize/issues/3895
            max: 2,
            match: [
              /**
               * This one sometimes occurs on Lambdas, most likely because an old connection is reused and is already closed.
               */
              "ETIMEDOUT",
              "ECONNRESET",
              /**
               * Thrown because of a deadlock.
               */
              "SequelizeConnectionTimedOutError",
            ],
          },
          benchmark,
          logging,
          ...(isDatabaseOptionsWithReplication(options)
            ? { replication: options.replication }
            : {}),
          operatorsAliases,
        }
      );
    }
  }

  public async SyncModels(): Promise<void> {
    if (
      process.env.NODE_ENV?.toLowerCase() === "test" &&
      this.Sequelize.getDialect() === "sqlite"
    ) {
      await this.Sequelize.sync({ force: true });
    } else {
      throw new Error("trying to sync sequelize on a non-test env");
    }
  }

  /**
   * Executes a lightweight query to verify the connection to the database.
   */
  public async healthCheck() {
    try {
      await this.Sequelize.query("SELECT 1");
    } catch (e) {
      throw new Error("Database health check failed");
    }
  }
}
