const myKey = "a51a2678a6ebc32710f900cff1862764";
const imgUrl = `https://image.tmdb.org/t/p/w500/`;
const movieId = location.search.slice(4);
const mainDiv = document.querySelector("#main-div");
const SearchInput = document.querySelector("#Search");
const SearchBtn = document.querySelector("#Search-btn");
const loader = document.querySelector("#loader");
// console.log(movieId);

function getApi(url) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      loader.classList.remove("show-loading");
      let temp = "";
      for (let i = 0; i < response.results.length; i++) {
        temp += `
        <div class="all-card col-sm-6 col-lg-4 col-xl-3">
          <a class="ancor" href="../movie.html?id=${response.results[i].id}">
            <div class="cardX">
            <div class="img">
            ${
              response.results[i].poster_path
                ? `<img src="${imgUrl}${response.results[i].poster_path}" class="img-fluid" alt="${response.results[i].title}">`
                : `<h2 class="text-center">${
                    response.results[i].title ||
                    response.results[i].original_title ||
                    response.results[i].name
                  }</h2>`
            }
            </div>
              <div class="text">
                <h5>${
                  response.results[i].title ||
                  response.results[i].original_title ||
                  response.results[i].name
                }</h5>
                <p>${response.results[i].vote_average.toFixed(1)}</p>
              </div>
              <div class="float-div">
                <h5>Overview</h5>
                <p>${response.results[i].overview}</p>
              </div>
            </div>
          </a>
        </div>
        `;
      }
      mainDiv.innerHTML = temp;
    });
}
if (movieId != "") {
  getApi(
    `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&query=${movieId}&page=1&include_adult=false`
  );
  SearchInput.value = movieId;
} else {
  getApi(`https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`);
}

// on search get all movie contain search value
SearchBtn.addEventListener("click", () => {
  mainDiv.innerHTML = "";
  loader.classList.add("show-loading");
  getApi(
    `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&query=${Search.value}&page=1&include_adult=false`
  );
  if (Search.value == "") {
    getApi(`https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`);
  }
});

$(".badge").click(function () {
  loader.classList.add("show-loading");
  mainDiv.innerHTML = "";
  let newTarget = this.dataset.target; // this.dataset.target = e.target.dataset.target
  let newDate = this.dataset.date;
  if (newTarget == "trending") {
    getApi(
      `https://api.themoviedb.org/3/trending/all/${newDate}?api_key=${myKey}`
    );
  } else {
    getApi(
      `https://api.themoviedb.org/3/movie/${newTarget}?api_key=${myKey}&language=en-US&page=1`
    );
  }
});

// add and remove class active
$(".activeMain").click(function () {
  active(".activeMain");
  this.classList.add("active");
});
$(".activeSub").click(function () {
  active(".activeSub");
  this.classList.add("active");
});
function active(e) {
  let activeX = Array.from($(e));
  activeX.forEach((el) => {
    el.classList.remove("active");
  });
}
