const sol = document.getElementById("sol");
const page = document.getElementById("page");
const button = document.getElementsByTagName("button")[0];
const ImageDiv = document.getElementById("nasa-images");

//--------------------------------------------------------------
//FUNCTION: Handles the Submit Button Click//
button.onclick = function (event) {
	event.stopPropagation();
	event.preventDefault();
	const solValue = sol.value;
	const pageValue = page.value;
	if (
		solValue === "" ||
		pageValue === "" ||
		solValue === null ||
		pageValue === null ||
		solValue === undefined ||
		pageValue === undefined ||
		solValue === NaN ||
		pageValue === NaN
	) {
		alert("Please fill the field correctly");
		return;
	}
	const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solValue}&page=${pageValue}&api_key=`;

	fetchImages(url);
};
//--------------------------------------------------------------
//FUNCTION: Fetches the Images based on the Sol & PageNo. using XHR_AJAX Call//
function fetchImages(url) {
	//XHR AJAX Call
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		if (this.status >= 200 && this.status < 300) {
			//If success, then Display the Images
			const data = JSON.parse(this.responseText);
			console.log(data);
			const photos = data.photos;
			ImageDiv.querySelectorAll("img").forEach((img) => img.remove());
			if (photos.length === 0) {
				alert("No images found");
				return;
			}
			for (let photo of photos) {
				const img = document.createElement("img");
				img.src = photo.img_src;
				img.alt = photo.id;
				ImageDiv.appendChild(img);
			}
		} else {
			//If error, then Display the error
			alert("Something went wrong");
			return;
		}
	};
	xhr.onerror = function () {
		alert("Something went wrong");
		return;
	};
	xhr.send();
}
