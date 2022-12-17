import * as movie from "../models/movie";
import * as genre from "../models/genre";
import * as movie_genre from "../models/movie_genre";

import { AbstractDal, SequelizeHooks } from "./abstractDal";
import { DatabaseOptions } from "./databaseOptions";

export default class Dal extends AbstractDal {
  public Movie: movie.movieModel;
  public Genre: genre.genreModel;
  public MovieGenre: movie_genre.movie_genreModel;

  constructor(options: DatabaseOptions, mock = false, hooks?: SequelizeHooks) {
    super(options, mock, hooks);
    this.Movie = movie.initMovieTable(this.Sequelize);
    this.Genre = genre.initGenreTable(this.Sequelize);

    this.Movie.hasMany(this.MovieGenre, {
      foreignKey: "movie_id",
      sourceKey: "id",
      as: "genres",
    });

    this.Genre.hasMany(this.MovieGenre, {
      foreignKey: "genre_id",
      sourceKey: "id",
      as: "movies",
    });

    this.MovieGenre.belongsTo(this.Movie, {
      foreignKey: "movie_id",
      targetKey: "id",
      as: "movie",
    });

    this.MovieGenre.belongsTo(this.Genre, {
      foreignKey: "genre_id",
      targetKey: "id",
      as: "genre",
    });
  }
}
