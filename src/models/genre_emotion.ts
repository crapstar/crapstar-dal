import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface genre_emotionPojo
 */

export interface genre_emotionPojo {
  /**
   * Id of the genre
   *
   * @type {number}
   */
  genre_id: number;

  /**
   * Id of the emotion
   *
   * @type {number}
   */
  emotion_id: number;

  /**
   * Weight of emotion
   * Used while calculating how much emotion emotion is related to genre
   * takes a value between 0 and 1
   *
   * @type {number}
   */
  weight: number;
}

export interface genre_emotionInstance
  extends Model<genre_emotionPojo>,
    genre_emotionPojo {}

export type genre_emotionModel = ModelStatic<genre_emotionInstance>;

export const initGenreEmotionTable = (sql: Sequelize): genre_emotionModel =>
  sql.define<genre_emotionInstance>(
    "genre_emotion",
    {
      emotion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "genre_emotion",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
