import * as movie from "../models/movie";
import * as genre from "../models/genre";
import * as movie_genre from "../models/movie_genre";
import * as emotion from "../models/emotion";
import * as genre_emotion from "../models/genre_emotion";
import * as movie_emotion from "../models/movie_emotion";

import { AbstractDal, SequelizeHooks } from "./abstractDal";
import { DatabaseOptions } from "./databaseOptions";

export default class Dal extends AbstractDal {
  public Movie: movie.movieModel;
  public Genre: genre.genreModel;
  public MovieGenre: movie_genre.movie_genreModel;
  public Emotion: emotion.emotionModel;
  public GenreEmotion: genre_emotion.genre_emotionModel;
  public MovieEmotion: movie_emotion.movie_emotionModel;

  constructor(options: DatabaseOptions, hooks?: SequelizeHooks) {
    super(options, hooks);
    this.Movie = movie.initMovieTable(this.Sequelize);
    this.Genre = genre.initGenreTable(this.Sequelize);
    this.MovieGenre = movie_genre.initMovieGenreTable(this.Sequelize);
    this.Emotion = emotion.initEmotionTable(this.Sequelize);
    this.GenreEmotion = genre_emotion.initGenreEmotionTable(this.Sequelize);
    this.MovieEmotion = movie_emotion.initMovieEmotionTable(this.Sequelize);

    this.Movie.belongsToMany(this.Genre, {
      through: this.MovieGenre,
    });

    this.Genre.belongsToMany(this.Movie, {
      through: this.MovieGenre,
    });

    this.Movie.hasMany(this.MovieEmotion, {
      foreignKey: "movie_id",
      sourceKey: "id",
      as: "emotions",
    });

    this.Genre.hasMany(this.GenreEmotion, {
      foreignKey: "genre_id",
      sourceKey: "id",
      as: "emotions",
    });

    this.Emotion.belongsTo(this.MovieEmotion, {
      foreignKey: "emotion_id",
      targetKey: "id",
      as: "emotion",
    });

    this.Emotion.belongsTo(this.GenreEmotion, {
      foreignKey: "emotion_id",
      targetKey: "id",
      as: "emotion",
    });
  }
}
