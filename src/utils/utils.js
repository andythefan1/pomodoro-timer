export const secondsToDigits = (seconds, addColon = false) => {
	const mins = `${Math.floor(seconds / 60)}`.padStart(2, 0);
	const secs = `${seconds % 60}`.padStart(2, 0);

	if (addColon) {
		return `${mins}:${secs}`;
	} else {
		return `${mins}${secs}`;
	}
};

export const playAudio = (sound) => {
	const audio = new Audio(sound);
	audio.play();
};
