const service = require("./theaters.service");

async function list(req, res){
    const theaters = await service.list();                           // returns all the theaters and the movies playing at each theatre added to the movies

    for(let theater of theaters){                                          // for loop through theaters
        const movies = await service.listMovies(theater.theater_id);        // pulls the information from listmovies in service. Saves all movies showing at theater with theater_id in "movies" variable.

        theater["movies"] = movies;
    }
    res.json({ data: theaters });                                   // responds with the data from the loop
}

async function listMovie(req, res, next) {                      // returns a list of all the movies.
    if(res.locals.movie) {
        return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
    }
    next();

}

module.exports = {
    list: [listMovie, list],
}