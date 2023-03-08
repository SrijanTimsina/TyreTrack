const trackingArray = ["Trasporto CdRC", "CSS", "MPS"];
const trackingCover = document.getElementById("tracking-cover");
const toggleButton =
	document.getElementsByClassName("toggle-button")[0];
const navbarLinks =
	document.getElementsByClassName("navbar-links")[0];
const navbar = document.getElementById("navbar");

toggleButton.addEventListener("click", () => {
	navbarLinks.classList.toggle("active");
	toggleButton.classList.toggle("active");
	navbar.classList.toggle("active");
});

const trackingElements = trackingArray.map((el) => {
	let div = document.createElement("div");
	div.innerHTML = `<a href="https://www.youtube.com/" target="blank"><div class="tracking-line"></div><div class="circle"></div><p>${el}</p></a>`;
	return div;
});

function loadFunction() {
	trackingCover.classList.add("loading");
}

tracking.append(...trackingElements);
