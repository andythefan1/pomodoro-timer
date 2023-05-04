export default function timerReducer(timerState, action) {
	switch (action.type) {
		case 'play': {
			return;
		}
		case 'pause': {
			return;
		}
		case 'reset': {
			return;
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
}
