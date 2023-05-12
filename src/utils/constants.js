export const timerModes = ['pomodoro', 'short break', 'long break'];

// TODO: implement custom durations
export const defaultTimerDuration = {
	pomodoro: 20 * 60,
	'long break': 10 * 60,
	'short break': 5 * 60,
};

export const defaultHistoricalStats = {
	totalCompletedPomos: 0,
	totalCompletedPomoTime: 0,
	totalBreakTime: 0,
};

export const initialState = {
	timerId: null,
	timerMode: timerModes[0],
	timerActive: false,
	timeRemaining: defaultTimerDuration[timerModes[0]],
	timerDuration: defaultTimerDuration,
};
