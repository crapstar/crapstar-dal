import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface emotionPojo
 */

export interface emotionPojo {
  /**
   * Primary key
   *
   * @type {number}
   */
  id: number;

  /**
   * Name of emotion
   *
   * @type {string}
   */
  name: string;
}

export interface emotionInstance extends Model<emotionPojo>, emotionPojo {}

export type emotionModel = ModelStatic<emotionInstance>;

export const initEmotionTable = (sql: Sequelize): emotionModel =>
  sql.define<emotionInstance>(
    "emotion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "emotion",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
