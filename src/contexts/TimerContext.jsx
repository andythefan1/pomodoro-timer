import { useContext, createContext, useReducer } from 'react';
import { initialState } from '../utils/constants';

const TimerContext = createContext(null);
const TimerDispatchContext = createContext(null);

// Allows components to access context if necessary
export const useTimerContext = () => {
	return useContext(TimerContext);
};

export const useTimerDispatchContext = () => {
	return useContext(TimerDispatchContext);
};

// component that wraps all context and reducer logic in one place
export function TimerStateProvider({ children }) {
	const [timerState, dispatch] = useReducer(timerReducer, initialState);

	return (
		<TimerContext.Provider value={timerState}>
			<TimerDispatchContext.Provider value={dispatch}>
				{children}
			</TimerDispatchContext.Provider>
		</TimerContext.Provider>
	);
}

/**
 *
 * @param timerState
 * @param action
 * @returns
 */
export default function timerReducer(timerState, action) {
	switch (action.type) {
		case 'startTimer': {
			return {
				...timerState,
				timeRemaining: timerState.timeRemaining - 1,
				timerId: action.timerId,
				timerActive: true,
			};
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
				timeRemaining: timerState.timerDuration[action.mode],
				timerActive: false,
				timerMode: action.mode,
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
