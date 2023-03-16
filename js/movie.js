const myKey = "a51a2678a6ebc32710f900cff1862764";
const imgUrl = `https://image.tmdb.org/t/p/w500`;
const movieId = location.search.slice(4);
const mainDiv = document.querySelector("#main-div");
//
fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${myKey}&language=en-US`
)
  .then((response) => response.json())
  .then((response) => {
    let arr = [];
    let companies = "company";
    for (var i = 0; i < response.production_companies.length; i++) {
      arr.push(response.production_companies[i].name);
      if (response.production_companies.length > 1) {
        companies = "companies";
      }
    }
    mainDiv.innerHTML = `
          <div class="col-lg-6 left">
            <div class="img">
            ${
              response.poster_path
                ? `<img src="${
                    imgUrl + response.poster_path
                  }" class="img-fluid hide-img" alt="${response.title}">`
                : `<h2 class="text-center">${response.title}</h2>`
            }
            </div>
          </div>
          <div class="col-lg-6 right">
            <div class="img">
            ${
              response.backdrop_path
                ? `<img src="${
                    imgUrl + response.backdrop_path
                  }" class="img-fluid hide-img" alt="${response.title}">`
                : ``
            }
            </div>
            <h2>${response.title || response.original_title}</h2>
            <p>${response.overview}</p>
            <div class="d-flex flex-wrap">
              <p class="me-3">vote average : ${response.vote_average.toFixed(
                1
              )}</p>
              <p>vote count : ${response.vote_count}</p>
            </div>
            <p>production ${companies} : ${arr.join(" | ")}</p>
            <p>release date : ${response.release_date}</p>
              ${
                response.homepage
                  ? `
                  <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                    <a class="button-text" href="${response.homepage}">home page</a>
                  </button>
                  `
                  : ``
              }
          </div>
    `;
  });
// on search get all movie contain search value
const SearchInput = document.querySelector("#Search");
const SearchBtn = document.querySelector("#Search-btn");
SearchBtn.addEventListener("click", () => {
  location.href = `./index.html?id=${SearchInput.value}`;
});
// similar movies
let similar = $("#similar .swiper-wrapper");
fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${myKey}&language=en-US&page=1`
)
  .then((response) => response.json())
  .then((response) => {
    response = response.results;
    for (let i = 0; i < response.length; i++) {
      similar[0].innerHTML += `
      <div class="swiper-slide">
        <div class="all-card">
          <a class="ancor" href="../movie.html?id=${response[i].id}">
            <div class="cardX">
              <div class="img">
              ${
                response[i].poster_path
                  ? `<img src="${
                      imgUrl + response[i].poster_path
                    }" class="img-fluid hide-img" alt="${response.title}">`
                  : ``
              }
              </div>
              <div class="text">
                <h5>${response[i].title || response[i].original_title}</h5>
                <p>8.5</p>
              </div>
            </div>
          </a>
        </div>
      </div>
      `;
    }
  });
