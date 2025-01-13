// create nav functionallity. mobile main links and container should show up and hide

// MOBILE NAV
const hamburgerBtn = document.querySelector(".nav-icon");
const navSection = document.querySelector("header nav");
const navLinks = document.querySelector("header nav ul");
hamburgerBtn.addEventListener("click", (e) => {
  hamburgerBtn.classList.toggle("fa-bars");
  hamburgerBtn.classList.toggle("fa-xmark");
  navSection.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

navLinks.addEventListener("click", (e) => {
  if (e.target !== navLinks && window.innerWidth < 768) {
    document.body.classList.remove("no-scroll");
    hamburgerBtn.classList.toggle("fa-bars");
    hamburgerBtn.classList.toggle("fa-xmark");
    navSection.classList.toggle("active");
  }
});

// responsive NAV height
document.addEventListener("DOMContentLoaded", () => {
  const navOther = document.querySelector(".nav-other");
  if (window.innerHeight < 630) navOther.classList.add("remove-el");
});

// SCROLLER
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollAnimation();
}

function scrollAnimation() {
  scrollers.forEach((e) => e.setAttribute("data-animated", true));
}

// PROJECTS LOAD LOGIC STARTS HERE

// PROJECTS SECTION SELECTORS
const dropdownBtn = document.getElementById("dropdownButton");
const dropdownBtnIcon = document.querySelector("#dropdownButton i");
const dropDownMenu = document.getElementById("dropdownMenu");
const dropDownBtnText = document.querySelector("#dropdownButton div");
const projectsContainer = document.querySelector(".projects-container");

// Toggle the dropdown menu visibility on button click
dropdownBtn.addEventListener("click", () => {
  const isVisible = dropDownMenu.style.display === "flex";
  if (isVisible) {
    dropDownMenu.style.display = "none";
    dropdownBtnIcon.classList.remove("active");
  } else {
    dropDownMenu.style.display = "flex";
    dropdownBtnIcon.classList.add("active");
  }
});

// Close the dropdown menu if clicked outside
document.addEventListener("click", (event) => {
  if (
    !dropdownBtn.contains(event.target) &&
    !dropDownMenu.contains(event.target)
  ) {
    dropDownMenu.style.display = "none";
    dropdownBtnIcon.classList.remove("active");
  }
});

const categories = [
  "Visi projektai",
  "Internetinės svetainės",
  "JavaScript",
  "HTML ir CSS",
  "Wordpress",
];

let activeCategory = categories[0];

const loadDropDownMenu = () => {
  dropDownMenu.innerHTML = "";
  categories.forEach((e) => {
    if (e === activeCategory)
      dropDownBtnText.textContent = activeCategory.toLocaleUpperCase();
    else {
      const li = document.createElement("li");
      li.textContent = e;
      dropDownMenu.append(li);
    }
  });
};

const LoadProject = (project) => {
  fetch("html_templates/project-template.html")
    .then((response) => response.text())
    .then((template) => {
      const parser = new DOMParser();
      const HTMLTemplate = parser.parseFromString(template, "text/html");

      HTMLTemplate.querySelector(".project-img").src = project.imgSrc;
      HTMLTemplate.querySelector(".project-title").textContent = project.title;
      HTMLTemplate.querySelector(".project-text").textContent = project.text;
      HTMLTemplate.querySelector(".site-btn").href = project.siteLink;

      if (project.gitHubLink) {
        HTMLTemplate.querySelector(".git-btn").href = project.gitHubLink;
      } else {
        HTMLTemplate.querySelector(".git-btn").classList.add("remove-el");
      }

      projectsContainer.append(HTMLTemplate.querySelector(".project-box"));
    });
};

const encodeEmail = () => {
  const form = document.querySelector("form");
  const encodedEmail = atob("cGF1bGl1c21hcmt1bmFzQGdtYWlsLmNvbQ==");
  form.setAttribute("action", `https://formsubmit.co/${encodedEmail}`);
};

const LoadProjects = () => {
  projectsContainer.innerHTML = "";
  fetch("project-data.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredProjects = data.filter((project) =>
        project.category.includes(activeCategory)
      );

      filteredProjects.forEach((project) => {
        LoadProject(project);
      });
    });
};

// INITIAL
loadDropDownMenu();
LoadProjects();

// EVENT LISTENERS
dropDownMenu.addEventListener("click", (e) => {
  if (e.target !== dropDownMenu) {
    activeCategory = e.target.textContent;
    LoadProjects();
    loadDropDownMenu();
    dropdownBtnIcon.classList.remove("active");
  }
});

// hero img hover fx
const videoEl = document.querySelector(".hero-video");
const logoEl = document.querySelector(".logo-link");
logoEl.addEventListener("mouseenter", () => {
  videoEl.play();
});

logoEl.addEventListener("mouseleave", () => {
  videoEl.pause();
  videoEl.currentTime = 0;
});

// FORM email encoding
document.addEventListener("DOMContentLoaded", () => {
  encodeEmail();
});

// INTERSECTION OBSERVER
const sections = document.querySelectorAll(".observe");
const upBtn = document.querySelector(".go-to-top");

// Set up the IntersectionObserver
let lastScrollY = window.scrollY; // Track the last scroll position

// Function to determine the threshold based on scroll direction
function getThreshold() {
  return window.scrollY > lastScrollY ? 0.1 : 0.9; // Scrolling down: 0.1, scrolling up: 0.9
}

// Dynamically update observer options
function createObserver() {
  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: getThreshold(), // Dynamically set threshold based on scroll direction
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionRect = section.getBoundingClientRect();

        // Move the button to the top of the visible section
        upBtn.style.top = `${sectionRect.top + window.scrollY}px`;
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach((section) => observer.observe(section));
  return observer;
}

// Create the observer
let observer = createObserver();

// Recreate the observer when scrolling
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Check if the scroll direction has changed
  if (
    (currentScrollY > lastScrollY && observer.threshold !== 0.1) || // Scroll down
    (currentScrollY < lastScrollY && observer.threshold !== 0.9) // Scroll up
  ) {
    observer.disconnect(); // Disconnect the current observer
    observer = createObserver(); // Recreate the observer with the new threshold
  }

  lastScrollY = currentScrollY; // Update last scroll position
});

// class Project {
//   constructor({ category, imgSrc, title, text, isGitHub }) {
//     Object.assign(this, { category, imgSrc, title, text, isGitHub });
//   }
// }
