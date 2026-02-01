const inputBtnEl = document.getElementById("input-btn");
const searchEl = document.getElementById("search-btn");
const apiKey = "8a5e927b";
const movieListEl = document.getElementById("movie-list");

let cardHtml = "";
let tempMovieList = [];
let watchlist = [];

document.addEventListener("click", function (e) {
    if (e.target.dataset.add) {
        fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${e.target.dataset.add}`
        )
            .then((res) => res.json())
            .then((movie) => {
                // Get existing data or start fresh
                watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

                // Add a new item
                watchlist.push(movie);

                // Save it back
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
            });
    }
});

searchEl.addEventListener("click", function () {
    cardHtml = "";

    fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${inputBtnEl.value}&type=movie`
    )
        .then((res) => res.json())
        .then((listOfMovies) => {
            listOfMovies.Search.forEach(function (movie) {
                fetch(
                    `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
                )
                    .then((res) => res.json())
                    .then((item) => {
                        cardHtml += `
                        <div class="movie-card">
                            <img src="${item.Poster}" alt="" class="poster-image" />
                            <div class="movie-description">
                                <div class="movie-title">
                                    <h2>${item.Title}</h2>
                                    <span>⭐ ${item.imdbRating}</span>
                                </div>

                                <div class="movie-details">
                                    <p>${item.Runtime}</p>
                                    <p>${item.Genre}</p>
                                    <button class="watchlist-btn" data-add=${item.imdbID}><i class="fa-solid fa-plus"></i>Add to Watchlist</button>
                                </div>
                                <p class="movie-plot">${item.Plot}</p>
                            </div>
                        </div>
                        
                        
                        `;

                        renderMovies();
                    });
            });
        });
});

// Function to render list of movies
function renderMovies() {
    movieListEl.innerHTML = cardHtml;
}

