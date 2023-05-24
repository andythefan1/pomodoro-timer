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
		timerActive: false,
		timeRemaining:
			defaultTimerDurations[timerModes[0]][
				defaultDurationSelection[timerModes[0]]
			],
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
		totalPomoTime: {
			text: 'Total pomodoro time',
			count: secondsToDigits(historicalStats.totalCompletedPomoTime, true),
		},
		totalBreakTime: {
			text: 'Total break time',
			count: secondsToDigits(historicalStats.totalBreakTime, true),
		},
	};

	handleTimerExpiration();

	const timerDurations = timerState.timerDurations[timerModeName].map(
		(duration) => secondsToDigits(duration, true)
	);

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
			<DigitalClock
				time={secondsToDigits(timerState.timeRemaining, true)}
			></DigitalClock>
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
