let input = document.getElementById("sol");
const submitButton = document.getElementById("submit");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let imageDiv = document.getElementById("nasa-images");
let pageHeading = document.querySelector(".flex-text h1");
let img = document.createElement("img");
let pageValue = 1;
let solValue = 1;
let inputChanged = false;
let pagesArray = [];

/*Data is only fetched for once after clicking the Submit button.
This is done using the Synchronous AJAX Call which is not advised and is depreciated now.
As it causes the screen to freeze which is a really bad thing.
So, now you know, always use AJAX asynchronous, AJAX asynchronous inside Promise, & the best to use FETCH() API.*/

//--------------------------------------------------------------
//FUNCTION: Updates the Next-Previous Buttons//
const updateButtons = (pagesArraylength, pageValue) => {
	if (pagesArraylength === 0) {
		//If there are no images
		pageHeading.textContent = "";
		inputChanged = false;
		pagesArray = [];
		alert("No images to show...");
		prevButton.setAttribute("disabled", "");
		nextButton.setAttribute("disabled", "");
		return;
	} else if (pagesArraylength === 1) {
		//If there is only one page
		prevButton.setAttribute("disabled", "");
		nextButton.setAttribute("disabled", "");
	} else if (pageValue === 1) {
		//If the page is the first page
		prevButton.setAttribute("disabled", "");
		nextButton.removeAttribute("disabled");
	} else if (pageValue === pagesArraylength) {
		//If the page is the last page
		prevButton.removeAttribute("disabled");
		nextButton.setAttribute("disabled", "");
	} else {
		//If the page is in the middle
		prevButton.removeAttribute("disabled");
		nextButton.removeAttribute("disabled");
	}
};
//--------------------------------------------------------------
//FUNCTION: Shows the images by inserting in the DOM//
const showImages = (pagesArray, pageValue) => {
	// Index will be pageValue - 1, because the array starts from 0
	const photos = pagesArray[pageValue - 1];
	for (let photo of photos) {
		img = document.createElement("img");
		img.src = photo.img_src;
		img.alt = photo.id;
		imageDiv.appendChild(img);
	}
};
//--------------------------------------------------------------
//FUNCTION: XHR AJAX Calls the Data to fetch//
const XHR_AJAX_Call = (solValue, page, end) => {
	/*Page is the page number. It starts from 1. end is a boolean value to check if the page is the last page, as the last page will have 0 photos. If end is true, then the page is the last page. If end is false, then the page is not the last page. The last page will have 0 photos.*/
	const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solValue}&page=${page}&api_key=`;
	const xhr = new XMLHttpRequest();
	//Synchronous request
	xhr.open("GET", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		if (this.status >= 200 && this.status < 300) {
			const data = JSON.parse(this.response);
			const photos = data.photos;
			if (photos.length === 0) {
				end = true;
				return;
			}
			pagesArray.push(photos);
		} else {
			alert("Something went wrong");
			return;
		}
	};
	xhr.onerror = function () {
		alert("Something went wrong");
		return;
	};
	xhr.send();

	if (end) {
		return "END";
	} else {
		return "";
	}
};
//--------------------------------------------------------------
//FUNCTION: Fetches the Data by calling AJAX in Loop//
const fetchImages = (solValue, pageValue) => {
	//If the page is the last page, then the pageValue will be the last page, & result will be "END", & end will be true, then the loop will end.
	let result = "";
	let end = false;
	let page = pageValue;
	while (result === "") {
		result = XHR_AJAX_Call(solValue, page, end);
		page++;
	}
};
//--------------------------------------------------------------
//FUNCTION: Updates on Input Change//
input.onchange = function () {
	inputChanged = true;
};
//--------------------------------------------------------------
//FUNCTION: Deletes the previous images//
const deleteImages = () => {
	imageDiv.querySelectorAll("img").forEach((image) => image.remove());
};
//--------------------------------------------------------------
//FUNCTION: Handles the Click on all Buttons//
document.onclick = function (e) {
	e.preventDefault();
	e.stopPropagation();
	const targetObject = e.target;
	//If the target is the submit button
	if (targetObject.id === "submit") {
		solValue = input.value;
		if (
			solValue === "" ||
			solValue === null ||
			solValue === undefined ||
			solValue === NaN
		) {
			alert("Please fill the field correctly");
			return;
		}
		if (solValue === "0" || solValue === "1001") {
			alert("Sol value should be between 1 and 1000");
			return;
		}
		//If the input is changed
		if (inputChanged) {
			inputChanged = false;
			pageValue = 1;
			pageHeading.textContent = pageValue;
			pagesArray = [];
			//Fetch Data. Data is only fetched for once after clicking the Submit button.
			fetchImages(solValue, pageValue);
			//Update Buttons
			updateButtons(pagesArray.length, pageValue);
			//Delete Images
			deleteImages();
			//Show Images
			showImages(pagesArray, pageValue);
		}
	} else if (targetObject.id === "prev") {
		//If the target is the previous button
		if (!inputChanged) {
			//If the input is not changed
			//Decrement the page value
			pageValue--;
			pageHeading.textContent = pageValue;
			//Update Buttons
			updateButtons(pagesArray.length, pageValue);
			//Delete Images
			deleteImages();
			//Show Images
			showImages(pagesArray, pageValue);
		} else {
			//If the input is changed
			alert("Press the Submit Button to get the images");
			return;
		}
	} else if (targetObject.id === "next") {
		if (!inputChanged) {
			//If the input is not changed
			//Increment the page value
			pageValue++;
			pageHeading.textContent = pageValue;
			//Update Buttons
			updateButtons(pagesArray.length, pageValue);
			//Delete Images
			deleteImages();
			//Show Images
			showImages(pagesArray, pageValue);
		} else {
			//If the input is changed
			alert("Press the Submit Button to get the images");
			return;
		}
	}
};
//--------------------------------------------------------------
