import { useRef, useReducer, useState } from 'react';

import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';
import Table from '../Table';

import timerReducer from '../../reducers/timerReducer';

import { secondsToDigits, playAudio } from '../../utils/utils';
import {
	defaultHistoricalStats,
	defaultTimerDuration,
	timerModes,
} from '../../utils/constants';

import './styles.css';
import chime from '../../assets/chime.mp3';
import countdown from '../../assets/countdown.mp3';

export default function PomodoroTimer() {
	let timerId = useRef(null);

	// TODO: implement custom durations
	const [timerState, dispatch] = useReducer(timerReducer, {
		timerMode: timerModes[0],
		timerActive: false,
		timeRemaining: defaultTimerDuration[timerModes[0]],
		timerDuration: defaultTimerDuration,
	});

	const [historicalStats, setHistoricalStats] = useState(
		defaultHistoricalStats
	);

	const handleModeTabClick = (tab) => {
		clearInterval(timerId.current);
		dispatch({
			type: 'changeMode',
			mode: tab,
		});
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			timerId.current = setInterval(decrementTimer, 1000);
			playAudio(countdown);
			dispatch({
				type: 'startTimer',
			});
		} else if (action === 'restart') {
			clearInterval(timerId.current);

			dispatch({
				type: 'resetTimer',
			});
		} else if (action === 'pause') {
			clearInterval(timerId.current);
			dispatch({
				type: 'pauseTimer',
			});
		}
	};

	const decrementTimer = () => {
		dispatch({
			type: 'decrementTimer',
		});
	};

	const handleTimerExpiration = () => {
		if (timerState.timerActive) {
			if (timerState.timeRemaining < 4 && timerState.timeRemaining > 0) {
				playAudio(countdown);
			} else if (timerState.timeRemaining === 0) {
				playAudio(chime);

				clearInterval(timerId.current);

				dispatch({
					type: 'resetTimer',
				});

				let { totalCompletedPomos, totalCompletedPomoTime, totalBreakTime } =
					historicalStats;

				if (timerState.timerMode === 'pomodoro') {
					totalCompletedPomos += 1;
					totalCompletedPomoTime +=
						timerState.timerDuration[timerState.timerMode];
				} else {
					totalBreakTime += timerState.timerDuration[timerState.timerMode];
				}

				setHistoricalStats({
					...historicalStats,
					totalCompletedPomos: totalCompletedPomos,
					totalCompletedPomoTime: totalCompletedPomoTime,
					totalBreakTime: totalBreakTime,
				});
			}
		}
	};

	// local state
	const controls = {
		play: {
			icon: 'play_arrow',
			disabled: timerState.timerActive ? true : false,
		},
		pause: { icon: 'pause', disabled: timerState.timerActive ? false : true },
		restart: { icon: 'forward_media', disabled: false },
	};

	const timerStats = {
		completedPomos: {
			text: 'Completed pomodoros',
			count: historicalStats.totalCompletedPomos,
		},
		totalBreakTime: {
			text: 'Total break time',
			count: secondsToDigits(historicalStats.totalBreakTime, true),
		},
		totalPomoTime: {
			text: 'Total pomodoro time',
			count: secondsToDigits(historicalStats.totalCompletedPomoTime, true),
		},
	};

	handleTimerExpiration();

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup
				activeTab={timerState.timerMode}
				dispatch={dispatch}
				onClick={handleModeTabClick}
				tabs={timerModes}
			></TabGroup>
			<DigitalClock
				time={secondsToDigits(timerState.timeRemaining, true)}
			></DigitalClock>
			<ControlGroup
				dispatch={dispatch}
				controls={controls}
				onClick={handleControlButtonClick}
			></ControlGroup>
			<Accordion header={'Your pomodoro stats'}>
				<Table body={timerStats}></Table>
			</Accordion>
		</div>
	);
}
