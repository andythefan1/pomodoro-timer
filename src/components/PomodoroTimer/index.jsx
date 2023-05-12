import { useReducer, useState } from 'react';

import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';
import Table from '../Table';

import {
	TimerStateProvider,
	useTimerContext,
	useTimerDispatchContext,
} from '../../contexts/TimerContext';

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
	const timerState = useTimerContext();
	const dispatch = useTimerDispatchContext();

	const [historicalStats, setHistoricalStats] = useState(
		defaultHistoricalStats
	);

	const handleModeTabClick = (tab) => {
		clearInterval(timerState.timerId);
		dispatch({
			type: 'changeMode',
			mode: tab,
		});
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			const timerId = setInterval(decrementTimer, 1000);
			playAudio(countdown);
			dispatch({
				type: 'startTimer',
				timerId: timerId,
			});
		} else if (action === 'restart') {
			clearInterval(timerState.timerId);

			dispatch({
				type: 'resetTimer',
			});
		} else if (action === 'pause') {
			clearInterval(timerState.timerId);
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
		if (timerState.timeRemaining === 3 && timerState.timerActive) {
			playAudio(countdown);
			console.log('playing audio');
		} else if (timerState.timeRemaining <= 0) {
			playAudio(chime);

			clearInterval(timerState.timerId);

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

	console.log('page rendered: ', timerState);
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
