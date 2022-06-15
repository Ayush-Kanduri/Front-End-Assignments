function modifyArray(arr) {
	return arr
		.filter((e) => e !== undefined && e > 0 && e !== null && e !== NaN)
		.map((e) => e * 2);
}

console.log(modifyArray([1, 2, -1, undefined, 0, 7]));
console.log(modifyArray([1, 2, 3, 4, 43, 6]));
console.log(modifyArray([1, 2, -1, -5, 7, -6, 9, 0, 7]));
