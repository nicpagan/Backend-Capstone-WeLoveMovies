const knex = require("../db/connection");

function list() {                       //builds a query that selects all columns from the "movies" table
  return knex("movies").select("*");
}

function isShowingList(isShowing) {         // lists all movies that are currently showing
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*", "movies_theaters.is_showing")
    .groupBy("movies.movie_id")
    .where({ is_showing: isShowing });
}

function read(movieId) {                    // returns movies that match movieId. Selects all columns from the "movies" table where the movie_id column matches the movieId passed in.
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })              
    .first();                               // returns the first row in the table as an object.
}

module.exports = {
  list,
  isShowingList,
  read,
};