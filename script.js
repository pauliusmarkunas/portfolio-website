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
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollAnimation();
}

function scrollAnimation() {
  scrollers.forEach((e) => e.setAttribute("data-animated", true));
}

// DROPDOWN MENU PROJECTS
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

// Toggle the dropdown menu visibility on button click
dropdownButton.addEventListener("click", () => {
  const isVisible = dropdownMenu.style.display === "block";
  dropdownMenu.style.display = isVisible ? "none" : "block";
});

// Close the dropdown menu if clicked outside
document.addEventListener("click", (event) => {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.style.display = "none";
  }
});
