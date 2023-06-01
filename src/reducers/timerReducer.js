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
			};
		}
		case 'pauseTimer': {
			return {
				...timerState,
				timerStart: null,
			};
		}
		case 'resetTimer': {
			const timerModeName = timerModes[timerState.timerMode];
			return {
				...timerState,
			};
		}
		case 'changeMode': {
			const timerMode = timerModes[action.mode];
			return {
				...timerState,
				timerStart: null,
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
			};
		}

		case 'updateTimer': {
			console.log(`updateTimer action: `, timerState);
			return {
				...timerState,
			};
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
}
