const burgerMenu = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");

console.log(nav);
burgerMenu.addEventListener("click", () => {
  nav.classList.toggle("center");
  navLinks.classList.toggle("active");
  logo.classList.toggle("hidden");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("active");
});
