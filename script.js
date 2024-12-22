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

// PROJECTS LOAD LOGIC STARTS HERE

// SELECTORS
const dropDownMenu = document.querySelector("#dropdownMenu");
const dropDownBtn = document.querySelector("#dropdownButton");
const dropDownBtnText = document.querySelector("#dropdownButton div");
const projectsContainer = document.querySelector(".projects-container");

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
    if (e === activeCategory) dropDownBtnText.textContent = activeCategory;
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
  }
});

// PROJECTS LOAD LOGIC ENDS HERE

// class Project {
//   constructor({ category, imgSrc, title, text, isGitHub }) {
//     Object.assign(this, { category, imgSrc, title, text, isGitHub });
//   }
// }
