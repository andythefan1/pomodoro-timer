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
			console.log('pause timer');
			return { ...timerState, timerId: null, timerActive: false };
		}
		case 'resetTimer': {
			console.log('reset timer');
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
				timeRemaining: timerState.timerDuration[action.mode],
				timerActive: false,
				timerMode: action.mode,
			};
		}
		case 'decrementTimer': {
			console.log('decrement timer tick', timerState);

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
