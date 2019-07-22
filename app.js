// Init MovieDB 
const movieDB = new Moviedb;
// Init UI
const ui = new UI;
// Search Input
const searchMovie = document.getElementById('searchMovie');

// Search Input EventListener
searchMovie.addEventListener('keyup',(e) =>{
    // Get input text 
    const movieName = e.target.value;
    if(movieName !== '') { 
        // Make HTTP call 
        movieDB.getMovies(movieName)
            .then(data => {
                if(data.results.length !== 0) {
                    console.log(data.results);
                    // Shwow Movies + image + infos
                    ui.showMovies(data.results); 
                } else {
                    console.log('No Movie');
                    // Show Alert
                    ui.showAlert('Movie Not Found ! Try With an other name !', 'alert alert-danger');      
                    // Clear Movie Div
                    ui.clearMovieDiv();
                }
                // if(data.movie.message === 'Not Found') {
                // 	// Shwo alert
                // 	ui.showAlert('User not found', 'alert alert-danger');
                // } else {
                // 	// Show profile
                // 	ui.showProfile(data.profile);
                // 	// Show repos
                // 	ui.showRepos(data.repos);
                // }
                
            })
    } else {
    	// Clear Movie Div
    	ui.clearMovieDiv();
    }
});