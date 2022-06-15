function randomAsyncFunction() {
	const time = Math.floor(Math.random * 100);
	const x = setTimeout(() => {
		console.log("Random Async Function Finished!!");
	}, time);
}

async function asyncWithCallback(callback) {
	// let promise = new Promise(randomAsyncFunction); - OPTION 1
	// setTimeout(randomAsyncFunction, 0); - OPTION 2
	// randomAsyncFunction(); - OPTION 3
	randomAsyncFunction();
	setTimeout(callback, 500);
}

asyncWithCallback(() => {
	console.log("Callback Executed");
});
