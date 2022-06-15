function propertyExists(obj, path) {
	var keys = Object.getOwnPropertyNames(obj);
	var object = obj;
	var ans = {
		value: "",
		result: false,
	};
	if (object === null) {
		return ans;
	}
	if (path.length === 1) {
		ans.result = path[0] in object ? true : false;
		if (ans.result === true) {
			ans.value = object[path[0]];
		}
		return ans;
	}
	for (i in path) {
		if (object.hasOwnProperty(path[i])) {
			if (typeof object[path[i]] === "object") {
				object = object[path[i]];
				ans.result = true;
				continue;
			} else {
				if (ans.result === true) {
					ans.value = object[path[i]];
				} else {
					break;
				}
			}
		} else {
			ans.result = false;
			break;
		}
	}
	return ans;
}

var ans = propertyExists(obj, path);
if (ans.result === true) {
	console.log(ans.value);
} else {
	console.log(ans.result);
}
