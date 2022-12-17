import * as movie from "../models/movie";

import { AbstractDal, SequelizeHooks } from "./abstractDal";
import { DatabaseOptions } from "./databaseOptions";

export default class Dal extends AbstractDal {
  public Movie: movie.movieModel;

  constructor(options: DatabaseOptions, mock = false, hooks?: SequelizeHooks) {
    super(options, mock, hooks);
    this.Movie = movie.initMovieTable(this.Sequelize);
  }
}
