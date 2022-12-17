import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface genrePojo
 */

export interface genrePojo {
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
}

export interface genreInstance extends Model<genrePojo>, genrePojo {}

export type genreModel = ModelStatic<genreInstance>;

export const initGenreTable = (sql: Sequelize): genreModel =>
  sql.define<genreInstance>(
    "genre",
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
    },
    {
      tableName: "genre",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
