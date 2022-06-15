const mainContainer = document.getElementsByTagName("body")[0];
const progressBar = document.getElementsByClassName("scroll-progress-bar")[0];
var mainContainerHeight;

window.onscroll = function () {
	mainContainerHeight = mainContainer.offsetHeight - window.innerHeight;
	mainContainerPos = mainContainer.getBoundingClientRect();
	diff = mainContainerHeight + mainContainerPos.top;
	progressPercentage = (diff / mainContainerHeight) * 100;
	cssWidth = Math.floor(100.5 - progressPercentage);
	progressBar.style.width = cssWidth + "%";
};
