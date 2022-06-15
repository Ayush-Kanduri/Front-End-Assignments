var arr = [1, 2];

function duplicate(arr) {
	var len = arr.length;
	var arr2 = arr;
	arr.forEach((element) => {
		arr2[len] = element;
		len++;
	});
	console.log(arr2);
}

duplicate(arr);
