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
// mouse move animation
let btn = document.querySelectorAll("#mouse-cursor-gradient-tracking");
for (let j = 0; j < btn.length; j++) {
  btn[j].addEventListener("mousemove", (mouse) => {
    let rect = mouse.target.getBoundingClientRect();
    let x = mouse.clientX - rect.left;
    let y = mouse.clientY - rect.top;
    btn[j].style.setProperty("--x", x + "px");
    btn[j].style.setProperty("--y", y + "px");
  });
}
// enter function
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    SearchBtn.click();
  }
});
