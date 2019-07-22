class Moviedb {
    constructor(){
        this.apiKey = '594679296e77706870a47b53460c857c'; 
        this.language = 'en-US';
        this.numberOfPage = 1 ;

    }
 
    async getMovies(movieName) {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ this.apiKey }&language=${ this.language }&query=${ movieName }&page=${ this.numberOfPage }&include_adult=false`);
        const movie = await movieResponse.json();
        return movie ;
    }
    
    async getSingleMovie(idMovie) {
        const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${ idMovie }?api_key=${ this.apiKey }&language=${ this.language }`);
        const movieDetails = movieDetailsResponse.json();
        return movieDetails ;
    }
}