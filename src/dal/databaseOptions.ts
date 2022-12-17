import { PoolOptions, ReplicationOptions } from "sequelize";

type DatabaseOptionsBase = {
  password: string;
  user: string;
  host?: string;
  port: number;
  database: string;
  /**
   * This allows you to override the default pool config.
   * The default is set to:
   *  min: 5
   *  max: 20
   *  idle: 10000
   */
  pool?: PoolOptions;
  debug?: boolean;
  ssl?: boolean;
};

type DatabaseOptionsWithReplication = DatabaseOptionsBase & {
  replication: ReplicationOptions;
};

export type DatabaseOptions =
  | DatabaseOptionsBase
  | DatabaseOptionsWithReplication;

export const isDatabaseOptionsWithReplication = (
  options: DatabaseOptions
): options is DatabaseOptionsWithReplication => {
  return !!(<DatabaseOptionsWithReplication>options).replication;
};
