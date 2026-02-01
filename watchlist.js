const watchListEl = document.getElementById("watch-list");
const myWatchListEl = document.getElementById("my-watch-list");

let myWatchList = JSON.parse(localStorage.getItem("watchlist"));

function renderMovies(movie) {
    return `
          <div class="movie-card">
                            <img src="${movie.Poster}" alt="" class="poster-image" />
                            <div class="movie-description">
                                <div class="movie-title">
                                    <h2>${movie.Title}</h2>
                                    <span>⭐ ${movie.imdbRating}</span>
                                </div>

                                <div class="movie-details">
                                    <p>${movie.Runtime}</p>
                                    <p>${movie.Genre}</p>
                                    <button class="watchlist-btn" data-remove=${movie.imdbID}><i class="fa-solid fa-xmark"></i>Remove</button>
                                </div>
                                <p class="movie-plot">${movie.Plot}</p>
                            </div>
                        </div>
                        
                        `;
}

myWatchList.forEach(function (movie) {
    myWatchListEl.innerHTML += renderMovies(movie);
});

document.addEventListener("click", function (e) {
    if (e.target.dataset.remove) {
        myWatchList = myWatchList.filter((item) => {
            return item.imdbID !== e.target.dataset.remove;
        });

        localStorage.setItem("watchlist", JSON.stringify(myWatchList));
        const revisedList = myWatchList
            .map(function (movie) {
                return `
          <div class="movie-card">
                            <img src="${movie.Poster}" alt="" class="poster-image" />
                            <div class="movie-description">
                                <div class="movie-title">
                                    <h2>${movie.Title}</h2>
                                    <span>⭐ ${movie.imdbRating}</span>
                                </div>

                                <div class="movie-details">
                                    <p>${movie.Runtime}</p>
                                    <p>${movie.Genre}</p>
                                    <button class="watchlist-btn" data-remove=${movie.imdbID}><i class="fa-solid fa-xmark"></i>Remove</button>
                                </div>
                                <p class="movie-plot">${movie.Plot}</p>
                            </div>
                        </div>
                        
                        `;
            })
            .join(" ");

        myWatchListEl.innerHTML = revisedList;
    }
});
