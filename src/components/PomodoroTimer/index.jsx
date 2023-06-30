import { useRef, useReducer, useState } from 'react';

import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';
import Table from '../Table';

import {
	timerReducer,
	// TIMER_REDUCER_ACTIONS,
} from '../../reducers/timerReducer';

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
		timeElapsed: 0,
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

			timerId.current = setInterval(() => {
				dispatch({
					type: 'tick',
					timerNow: Date.now(),
				});
			}, 1000);

			playAudio(countdown);
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
		if (timeRemaining <= -1) {
			console.warn(`Warn: timer expired past timer duration ${timeRemaining}`);
		}
		console.info(
			`${new Date().toTimeString()}\n timeRemaining: ${timeRemaining} handleTimerExpiration: `,
			timerState
		);
		if (timerState.timerStart) {
			if (timeRemaining < 4 && timeRemaining > 0) {
				playAudio(countdown);
			} else if (timeRemaining <= 0) {
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
			} else if (timeRemaining.toFixed() % 30 === 0) {
				// workaround to prevent throttling of setInterval in background tab
				playAudio(countdown);
			}
		}
	};

	// local state
	const timerModeName = timerModes[timerState.timerMode];
	const timerDuration =
		timerState.timerDurations[timerModeName][
			timerState.timerDurationSelection[timerModeName]
		];

	const timeRemaining =
		timerDuration -
		timerState.timeElapsed -
		(timerState.timerNow - timerState.timerStart) / 1000;

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

	handleTimerExpiration();

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<div className='timer-container container'>
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
					time={secondsToDigits(timeRemaining, true)}
				></DigitalClock>
				<ControlGroup
					controls={controls}
					onClick={handleControlButtonClick}
				></ControlGroup>
			</div>
			<Accordion header={'Your pomodoro stats'}>
				<Table body={timerStats}></Table>
			</Accordion>
		</div>
	);
}
