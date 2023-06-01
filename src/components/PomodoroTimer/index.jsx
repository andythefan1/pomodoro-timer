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
	defaultDurationSelection,
	defaultTimerDurations,
	timerModes,
} from '../../utils/constants';

import './styles.css';
import chime from '../../assets/chime.mp3';
import countdown from '../../assets/countdown.mp3';

export default function PomodoroTimer() {
	let timerId = useRef(null);

	// TODO: implement custom durations
	const [timerState, dispatch] = useReducer(timerReducer, {
		timerMode: 0,
		timerStart: null,
		timerNow: null,
		timerDurationSelection: defaultDurationSelection,
		timerDurations: defaultTimerDurations,
	});

	const [historicalStats, setHistoricalStats] = useState(
		defaultHistoricalStats
	);

	const [showDurationOptions, setShowDurationOptions] = useState(false);

	const handleModeTabClick = (index) => {
		if (timerState.timerMode === index) {
			setShowDurationOptions(!showDurationOptions);
		} else {
			clearInterval(timerId.current);
			dispatch({
				type: 'changeMode',
				mode: index,
			});
		}
	};

	const handleDurationSelectionClick = (index) => {
		clearInterval(timerId.current);
		dispatch({
			type: 'changeDurationSelection',
			index: index,
		});
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			dispatch({
				type: 'startTimer',
				startTime: Date.now(),
			});
			timerId.current = setInterval(() => {}, 1000);
			setTimeout(() => {
				console.log('5 seconds elapsed');
			}, 5000);
			playAudio(countdown);
			console.log(`playing`);
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

	const handleTimerExpiration = () => {
		console.log(`handleTimerExpiration: `, timerState);
		if (timerState.timerStart) {
			if (timeRemaining > 0) {
			}
			if (timeRemaining < 4 && timeRemaining > 0) {
				playAudio(countdown);
			} else if (timeRemaining <= 0) {
				playAudio(chime);

				// clearInterval(timerId.current);

				dispatch({
					type: 'resetTimer',
				});

				const updatedHistoricalStats = { ...historicalStats };

				if (timerModeName === 'pomodoro') {
					updatedHistoricalStats.totalCompletedPomos += 1;
					updatedHistoricalStats.totalCompletedPomoTime +=
						timerState.timerDurations[timerModeName][
							timerState.timerDurationSelection[timerModeName]
						];
				} else {
					updatedHistoricalStats.totalBreakTime +=
						timerState.timerDurations[timerModeName][
							timerState.timerDurationSelection[timerModeName]
						];
				}

				setHistoricalStats(updatedHistoricalStats);
			}
		}
	};

	// local state
	const timerModeName = timerModes[timerState.timerMode];
	debugger;
	const timeRemaining = 0;

	const controls = {
		play: {
			icon: 'play_arrow',
			disabled: timerState.timerStart ? true : false,
		},
		pause: { icon: 'pause', disabled: timerState.timerStart ? false : true },
		restart: { icon: 'forward_media', disabled: false },
	};

	const timerStats = {
		completedPomos: {
			text: 'Completed pomodoros',
			count: historicalStats.totalCompletedPomos,
		},
		totalPomoTime: {
			text: 'Total pomodoro time',
			count: secondsToDigits(historicalStats.totalCompletedPomoTime, true),
		},
		totalBreakTime: {
			text: 'Total break time',
			count: secondsToDigits(historicalStats.totalBreakTime, true),
		},
	};

	const timerDurations = timerState.timerDurations[timerModeName].map(
		(duration) => secondsToDigits(duration, true)
	);

	// console.log(`${timerState}`);
	handleTimerExpiration();

	return (
		<div className='pomodoro-timer outline'>
			<Header></Header>
			<TabGroup
				activeTab={timerState.timerMode}
				onClick={handleModeTabClick}
				tabs={timerModes}
			></TabGroup>
			{showDurationOptions && (
				<TabGroup
					activeTab={timerState.timerDurationSelection[timerModeName]}
					onClick={handleDurationSelectionClick}
					tabs={timerDurations}
				></TabGroup>
			)}
			<DigitalClock time={secondsToDigits(timeRemaining, true)}></DigitalClock>
			<ControlGroup
				controls={controls}
				onClick={handleControlButtonClick}
			></ControlGroup>
			<Accordion header={'Your pomodoro stats'}>
				<Table body={timerStats}></Table>
			</Accordion>
		</div>
	);
}
