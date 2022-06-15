const counter = (function () {
	let value = 0;
	let initialize = (start) => {
		value = start;
	};
	let increase = () => {
		value++;
		return value;
	};
	return {
		initialize,
		increase,
	};
})();

let start = 3;
let end = 9;
let ans = "";

counter.initialize(start);
for (let i = 0; i < end; i++) {
	ans += counter.increase() + "\n";
}
console.log(ans);
