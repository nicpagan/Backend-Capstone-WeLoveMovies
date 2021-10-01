const knex = require("../db/connection");

function list () {                          //returns all theaters
    return knex("theaters").select("*");
}

const listTheaters = (movieId) => {                     //returns theaters where movies are showing
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where({ movie_id: movieId})
    .select("theaters.*", "movies_theaters.is_showing", "movies_theaters.movie_id");
}

const listMovies = (theaterId) => {                     //returns movies showing at theaters
    return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ theater_id: theaterId })
    .select("movies.*", "movies_theaters.created_at", "movies_theaters.updated_at", "movies_theaters.is_showing", "movies_theaters.theater_id");
}

module.exports = {
    list,
    listTheaters,
    listMovies,
}