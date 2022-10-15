const hamburgerElement = document.querySelector(".hamburger");

const sideDrawer = document.querySelector(".sideDrawer");
const footerParagraph = document.getElementById("footer-paragraph");

footerParagraph.firstElementChild.textContent = new Date().getFullYear();

function openSideDrawer(event) {
  event.preventDefault();
  hamburgerElement.classList.toggle("active");
  sideDrawer.classList.toggle("active");
}

hamburgerElement.addEventListener("click", openSideDrawer);
