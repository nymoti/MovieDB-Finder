class UI {
	constructor(){
		this.moviesDiv = document.getElementById('movie');
		this.imageBaseURL = 'https://image.tmdb.org/t/p/w185/';
	}

	// Show Movies
	showMovies(movies) {
		const movieDB = new Moviedb;
		let output = `
		<div class="row"> 
		`;  
		movies.forEach((movie) => {
			output += `
			<div class="col-md-4">
				<div class="card mb-3">
					<h3 class="card-header">${ movie.title }</h3>
					<div class="card-body">
						<h5 class="card-title"> </h5>
						<h6 class="card-subtitle text-muted"></h6>
					</div>
					<img  class="mx-auto d-block" src="${ this.imageBaseURL + movie.poster_path }" alt="${ movie.title }">
					<div class="card-body">
						<p class="card-text">${ movie.overview.substring(0, 130) } ...</p>
						<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#moreDetails${ movie.id }">						
							More Details <i class="fa fa-info-circle"></i>						
						</a> 
					</div>

					<ul class="list-group list-group-flush">
						<li class="list-group-item d-flex justify-content-between align-items-center">
							Vote Count
							<span class="badge badge-success badge-pill">${ movie.vote_count }</span>
						</li>
						<li class="list-group-item d-flex justify-content-between align-items-center">
							Vote Averagepopularity
							<span class="badge badge-info badge-pill">${ movie.vote_average }</span>
						</li> 
						<li class="list-group-item d-flex justify-content-between align-items-center">
							Popularity
							<span class="badge badge-dark badge-pill">${ movie.popularity }</span>
						</li> 
					</ul>
					 
					<div class="card-footer text-muted">
						<div class="pull-left">
							Release Date 
						</div>
						<div class="pull-right">
							${ movie.release_date }
						</div>
					</div>
				</div> 
			</div> 

			<div class="modal fade" id="moreDetails${ movie.id }">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">${ movie.title }</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body"> 
						<div id="aboutMovie${ movie.id }"></div>
					`;

					movieDB.getSingleMovie(movie.id).then((movieDetails) => {   
							const aboutMovie = document.getElementById('aboutMovie'+ movieDetails.id + '');
							let outputAboutMovie = `
							<div class="row">
								<div class="col-md-4">
									<img  class="mx-auto d-block" src="${ this.imageBaseURL + movieDetails.poster_path }" alt="${ movieDetails.title }">
								</div>
								<div class="col-md-8">
									<div class="card mb-3">
										<h3 class="card-header">Infos</h3> 
										<div class="card-body">
											<ul class="list-group list-group-flush">
												<li class="list-group-item d-flex justify-content-between align-items-center">
													Vote Count
													<span class="badge badge-success badge-pill">${ movie.vote_count }</span>
												</li>
												<li class="list-group-item d-flex justify-content-between align-items-center">
													Vote Averagepopularity
													<span class="badge badge-info badge-pill">${ movie.vote_average }</span>
												</li> 
												<li class="list-group-item d-flex justify-content-between align-items-center">
													Popularity
													<span class="badge badge-dark badge-pill">${ movie.popularity }</span>
												</li> 
											</ul>
									`;
										movieDetails.genres.forEach((genre) => {
											outputAboutMovie += `
											${ genre.name } <br>
											`;
										});
								outputAboutMovie += ` 
									 
										</div> 
										<div class="card-footer text-muted">  
										</div>
									</div> 
								</div>
							</div>
							<br>
							<div class="row">
								<div class="col-md-12">
									<ul class="nav nav-tabs">
										<li class="nav-item">
											<a class="nav-link active" data-toggle="tab" href="#overview">Overview</a>
										</li>  
									</ul>
									<div id="myTabContent" class="tab-content">
										<div class="tab-pane fade show active" id="overview">
										<br>
											<p>${ movieDetails.overview }</p>
										</div> 
									</div>
								</div>
							</div>
							`;

							aboutMovie.innerHTML = outputAboutMovie ; 
					});

			output +=`</div>
					<div class="modal-footer"> 
						<button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
					</div>
					</div>
				</div>
				</div>
			`;
		});
		output += `
		</div>
		`;
		// Output Movies
		this.moviesDiv.innerHTML = output ;
	}
 

	// Show alert message
	showAlert(message,className) {
		// Clear any remaining alerts
		this.clearAlert();
		// Create div
		const div = document.createElement('div');
		// Add classes
		div.className =  className;
		// Add text 
		div.appendChild(document.createTextNode(message));
		//  Get parent
		const container = document.querySelector('.searchContainer');
		// Get search box
		const search = document.querySelector('.search');
		container.insertBefore(div, search); 

		// Timeout after 3 seconds
		setTimeout(()=>{
			this.clearAlert();
		}, 3000);
	}

	// Clear alert message
	clearAlert(){
		const currentAlert = document.querySelector('.alert');
		if(currentAlert) {
			currentAlert.remove();
		}
	}

	// Clear Movie Div
	clearMovieDiv(){
		this.moviesDiv.innerHTML = '';
	}	

}