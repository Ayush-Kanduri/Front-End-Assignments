{
	function textAnimation() {
		let i = 0;
		const wordElement = document.querySelector("#text-animation-header");
		const words = ["Create.", "Share.", "Connect.", "Win."];
		const speed = 300;

		wordElement.textContent = "";

		const animate = (index) => {
			const word = words[index];
			const wordLength = word.length;

			if (i < wordLength) {
				wordElement.textContent += word.charAt(i);
				i++;
				setTimeout(() => {
					animate(index);
				}, speed);
			} else {
				const lastWord = words[words.length - 1];
				if (word !== lastWord) {
					setTimeout(() => {
						i = 0;
						wordElement.textContent = "";
						animate(words.indexOf(word) + 1);
					}, speed);
				} else {
					setTimeout(() => {
						wordElement.addEventListener("", () => {
							wordElement.textContent = lastWord;
						});
					}, speed);

					setTimeout(() => {
						i = 0;
						wordElement.textContent = "";
						animate(0);
					}, speed);
				}
			}
		};
		animate(0);
	}
	textAnimation();
}
