import fetch from "node-fetch";

async function fetchPosts() {
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts"
		);
		if (response.ok) {
			console.log("SUCCESS\n");
		} else {
			console.error("FAILURE\n");
			throw new Error("Thrown New Error !!!");
		}
		const data = await response.json();
		const Data = data.slice(0, 10);
		Data.forEach((e) =>
			console.log(`Title: ${e.title}\nBody: ${e.body}\n\n`)
		);
	} catch (err) {
		console.error(err);
	}
}
fetchPosts();
