import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface movie_emotionPojo
 */

export interface movie_emotionPojo {
  /**
   * Id of the movie
   *
   * @type {number}
   */
  movie_id: number;

  /**
   * Id of the emotion
   *
   * @type {number}
   */
  emotion_id: number;

  /**
   * Weight of emotion
   * Used while calculating how much emotion emotion is related to movie
   * takes a value between 0 and 1
   *
   * @type {number}
   */
  weight: number;
}

export interface movie_emotionInstance
  extends Model<movie_emotionPojo>,
    movie_emotionPojo {}

export type movie_emotionModel = ModelStatic<movie_emotionInstance>;

export const initMovieEmotionTable = (sql: Sequelize): movie_emotionModel =>
  sql.define<movie_emotionInstance>(
    "movie_emotion",
    {
      emotion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      movie_id: {
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
      tableName: "movie_emotion",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
