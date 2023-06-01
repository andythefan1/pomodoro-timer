export const secondsToDigits = (seconds, addColon = false) => {
	const roundedSeconds = seconds.toFixed();
	const mins = `${Math.floor(roundedSeconds / 60)}`.padStart(2, 0);
	const secs = `${roundedSeconds % 60}`.padStart(2, 0);

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
