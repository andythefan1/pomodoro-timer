export const secondsToDigits = (seconds) => {
	const mins = `${Math.floor(seconds / 60)}`.padStart(2, 0);
	const secs = `${seconds % 60}`.padStart(2, 0);

	return `${mins}${secs}`;
};
