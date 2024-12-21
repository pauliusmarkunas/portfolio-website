// create nav functionallity. mobile main links and container should show up and hide

// MOBILE NAV
const hamburgerBtn = document.querySelector(".nav-icon");
const navSection = document.querySelector("header nav");
hamburgerBtn.addEventListener("click", (e) => {
  hamburgerBtn.classList.toggle("fa-bars");
  hamburgerBtn.classList.toggle("fa-xmark");
  navSection.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// SCROLLER
const scroller = document.querySelector(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollAnimation();
}

function scrollAnimation() {
  scroller.setAttribute("data-animated", true);
}
