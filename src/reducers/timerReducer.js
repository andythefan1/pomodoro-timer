import { timerModes } from '../utils/constants';

export const TIMER_REDUCER_ACTIONS = {
	START_TIMER: 'START_TIMER',
	PAUSE_TIMER: 'PAUSE_TIMER',
	RESET_TIMER: 'RESET_TIMER',
	CHANGE_TIMER_MODE: 'CHANGE_TIMER_MODE',
	CHANGE_TIMER_DURATION: 'CHANGE_TIMER_DURATION',
	TICK_TIMER: 'TICK_TIMER',
};

/**
 *
 * @param {*} timerState
 * @param {*} action
 * @returns
 */
export const timerReducer = (timerState, action) => {
	switch (action.type) {
		case 'startTimer': {
			return {
				...timerState,
				timerStart: action.startTime,
				timerNow: action.startTime,
			};
		}
		case 'pauseTimer': {
			// record already elapsed time
			const { timerStart, timerNow } = timerState;
			const timeElapsed =
				timerState.timeElapsed + (timerNow - timerStart) / 1000;

			return {
				...timerState,
				timeElapsed: timeElapsed,
				timerStart: null,
				timerNow: null,
			};
		}
		case 'resetTimer': {
			return {
				...timerState,
				timeElapsed: 0,
				timerStart: null,
				timerNow: null,
			};
		}
		case 'changeMode': {
			return {
				...timerState,
				timeElapsed: 0,
				timerStart: null,
				timerNow: null,
				timerMode: action.mode,
			};
		}
		case 'changeDurationSelection': {
			const timerModeName = timerModes[timerState.timerMode];
			return {
				...timerState,
				timerDurationSelection: {
					...timerState.timerDurationSelection,
					[timerModeName]: action.index,
				},
				timerStart: null,
				timerNow: null,
				timeElapsed: 0,
			};
		}
		case 'tick': {
			return {
				...timerState,
				timerNow: action.timerNow,
			};
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
};
