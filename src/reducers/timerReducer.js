/**
 *
 * @param {*} timerState
 * @param {*} action
 * @returns
 */
export default function timerReducer(timerState, action) {
	switch (action.type) {
		case 'startTimer': {
			console.log('start timer');
			return { ...timerState, timerId: action.timerId };
		}
		case 'pauseTimer': {
			return { ...timerState, timerId: null, timerActive: false };
		}
		case 'resetTimer': {
			return {
				...timerState,
				timeRemaining: timerState.timerDuration[timerState.timerMode],
				timerActive: false,
				timerId: null,
			};
		}
		case 'changeMode': {
			return {
				...timerState,
				timeRemaing: timerState.timerDuration[action.mode],
				timerActive: false,
				timerMode: action.mode,
			};
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
}
