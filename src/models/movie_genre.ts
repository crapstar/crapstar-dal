import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 *
 * @export
 * @interface movie_genrePojo
 */

export interface movie_genrePojo {
  /**
   * Id of the movie
   *
   * @type {number}
   */
  movie_id: number;

  /**
   * Id of the genre
   *
   * @type {number}
   */
  genre_id: number;
}

export interface movie_genreInstance
  extends Model<movie_genrePojo>,
    movie_genrePojo {}

export type movie_genreModel = ModelStatic<movie_genreInstance>;

export const initMovieGenreTable = (sql: Sequelize): movie_genreModel =>
  sql.define<movie_genreInstance>(
    "movie_genre",
    {
      movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "movie_genre",
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
