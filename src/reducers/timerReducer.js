import { timerModes } from '../utils/constants';

/**
 *
 * @param {*} timerState
 * @param {*} action
 * @returns
 */
export default function timerReducer(timerState, action) {
	switch (action.type) {
		case 'startTimer': {
			console.log(`startTime: ${action.startTime}`);
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
}
