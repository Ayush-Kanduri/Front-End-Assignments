let generateID = (start) => {
	return (closureGenerator = (id) => {
		let number = id + start;
		start++;
		return number;
	});
};

let generate = generateID(5);
for (let i = 1; i <= 9; i++) {
	let registrationNumber = generate("A-2021_");
	console.log(registrationNumber);
}
