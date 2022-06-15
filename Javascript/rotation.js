var arr = [1, 2, 3, 4];

function rotateLeft(arr) {
	var len = arr.length;
	var x = arr.shift();
	arr[len - 1] = x;
	console.log(arr);
}

rotateLeft(arr);
