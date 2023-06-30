export const timerModes = ['pomodoro', 'short break', 'long break'];

export const defaultDurationSelection = {
	pomodoro: 2,
	'long break': 2,
	'short break': 2,
};

export const defaultTimerDurations = {
	pomodoro: [5 * 60, 10 * 60, 20 * 60],
	'short break': [5, 30, 5 * 60],
	'long break': [60, 5 * 60, 10 * 60],
};

export const defaultHistoricalStats = {
	totalCompletedPomos: 0,
	totalCompletedPomoTime: 0,
	totalBreakTime: 0,
};
