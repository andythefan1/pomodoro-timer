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
			return {
				...timerState,
				timeRemaining: timerState.timeRemaining - 1,
				timerActive: true,
			};
		}
		case 'pauseTimer': {
			return { ...timerState, timerActive: false };
		}
		case 'resetTimer': {
			const timerModeName = timerModes[timerState.timerMode];
			return {
				...timerState,
				timeRemaining:
					timerState.timerDurations[timerModeName][
						timerState.timerDurationSelection[timerModeName]
					],
				timerActive: false,
			};
		}
		case 'changeMode': {
			const timerMode = timerModes[action.mode];
			return {
				...timerState,
				timeRemaining:
					timerState.timerDurations[timerMode][
						timerState.timerDurationSelection[timerMode]
					],
				timerActive: false,
				timerMode: action.mode,
			};
		}
		case 'changeDurationSelection': {
			const timerModeName = timerModes[timerState.timerMode];
			return {
				...timerState,
				timeRemaining: timerState.timerDurations[timerModeName][action.index],
				timerDurationSelection: {
					...timerState.timerDurationSelection,
					[timerModeName]: action.index,
				},
				timerActive: false,
			};
		}
		case 'decrementTimer': {
			return {
				...timerState,
				timerActive: true,
				timeRemaining: timerState.timeRemaining - 1,
			};
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
}
