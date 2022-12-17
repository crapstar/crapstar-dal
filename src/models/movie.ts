import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface moviePojo
 */

export interface moviePojo {
  /**
   * Primary key
   *
   * @type {number}
   */
  id: number;

  /**
   * Title
   *
   * @type {string}
   */
  title: string;

  /**
   * Description
   *
   * @type {string}
   */
  description: string;

  /**
   * Year of publish
   *
   * @type {number}
   */
  year: number;
}

export interface movieInstance extends Model<moviePojo>, moviePojo {}

export type movieModel = ModelStatic<movieInstance>;

export const initMovieTable = (sql: Sequelize): movieModel =>
  sql.define<movieInstance>(
    "movie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "movie",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
