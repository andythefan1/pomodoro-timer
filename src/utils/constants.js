export const timerModes = ['pomodoro', 'short break', 'long break'];

export const defaultTimerDuration = {
	pomodoro: 20 * 60,
	'long break': 10,
	'short break': 5,
};

export const defaultTimerDurations = {
	pomodoro: [5 * 60, 10 * 60, 20 * 60],
	'long break': [10, 10 * 60],
	'short break': [5, 5 * 60],
};

export const defaultHistoricalStats = {
	totalCompletedPomos: 0,
	totalCompletedPomoTime: 0,
	totalBreakTime: 0,
};
