// change theme color by toggle button
let circle = document.querySelector(".circle");
circle.onclick = function () {
  if (document.body.classList.contains("light")) {
    changeClassLight(false);
  } else {
    changeClassLight(true);
  }
};
function changeClassLight(el) {
  if (el) {
    document.body.classList.add("light");
    circle.classList.add("light");
    localStorage.setItem("siteMode", "light");
  } else {
    document.body.classList.remove("light");
    circle.classList.remove("light");
    localStorage.setItem("siteMode", "dark");
  }
}
if (localStorage.getItem("siteMode") == "light") {
  changeClassLight(true);
}
// to top btn
$(window).scroll(function () {
  let scrollYX = $(window).scrollTop();
  if (scrollYX > 200) {
    $("#toUp").fadeIn(1000);
  } else {
    $("#toUp").fadeOut(1000);
  }
});
$("#toUp").click(() => {
  $("html,body").animate({ scrollTop: 0 }, 1000);
});
