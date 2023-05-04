
export default function timerReducer(timerState, action) {
	switch (action.type) {
		case 'control': {
			return;
		}
		case 'mode': {
			return {...timerState,
				timeRemaing: 
			}
		}
		default: {
			throw Error('Unsupported action type: ', action);
		}
	}
}
