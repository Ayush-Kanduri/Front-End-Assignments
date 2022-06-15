//-------------------------------------------------------------------------------------------------
/* 
Used as a Delay Function which returns a Promise that it will Resolve after the Delay-Interval Time of 1 Second.
Promise has a higher priority than SetTimeout, therefore, setTimeout is put inside a Promise here.
So the await will make the Counter() wait for 1 Second till the setTimeout inside the Promise completes its execution and then the Counter() execution continues further. 
*/
const delay = (delayInterval) => {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Delay of 1 Second");
		}, delayInterval);
	});
	return promise;
};
//-------------------------------------------------------------------------------------------------
/*
Counter Function - returns start() & stop() functionality.
- start() is an async function, in which a loop runs if the pause is false else the loop ends. The loop will print the current time, increment it & then wait for 1 Second using (await) delay(), so that the execution does not move forward for the time being. And then the loop continues. 
- stop() is a function, which will set, pause = true, which means that the loop inside start() which is running in the background will stop its execution since the pause is true now. 
*/
const counter = () => {
	let currentTime = 0;
	let ONE_SECOND_TIME_INTERVAL = 1000;
	let pause = false;
	let obj = {
		start: async () => {
			try {
				while (!pause) {
					console.log(currentTime);
					currentTime++;
					let WAIT_FOR_1_SECOND = await delay(ONE_SECOND_TIME_INTERVAL);
					// console.log(WAIT_FOR_1_SECOND);
				}
			} catch (err) {
				console.error(err);
			}
		},
		stop: () => {
			pause = true;
		},
	};
	return obj;
};
//-------------------------------------------------------------------------------------------------
let stoppingTime = 10000;
let count = counter();
//Calls the start() & sets the timer ON
count.start();
setTimeout(() => {
	//Calls the stop() & sets the timer OFF which is running in the background, after 10 Seconds
	count.stop();
}, stoppingTime);
//-------------------------------------------------------------------------------------------------
