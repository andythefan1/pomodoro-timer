import { useState } from 'react';
import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';
import Table from '../Table';

import { secondsToDigits, playAudio } from '../../utils/utils';
import {
	defaultHistoricalStats,
	defaultTimerDuration,
	timerModes,
} from '../../utils/constants';

import './styles.css';
import chime from '../../assets/chime.mp3';

export default function PomodoroTimer() {
	// TODO: implement custom durations
	const [timerState, setTimerState] = useState({
		timerId: null,
		timerMode: timerModes[0],
		timerActive: false,
		timeRemaining: defaultTimerDuration[timerModes[0]],
		timerDuration: defaultTimerDuration,
	});

	const [historicalStats, setHistoricalStats] = useState(
		defaultHistoricalStats
	);

	const handleModeTabClick = (tab) => {
		clearInterval(timerState.timerId);
		setTimerState({
			...timerState,
			timeRemaining: timerState.timerDuration[tab],
			timerActive: false,
			timerMode: tab,
		});
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			console.log('handleControlButton clicked');
			const timerId = setInterval(decrementTimer, 1000);
			setTimerState({
				...timerState,
				timerId: timerId,
			});
			console.log('handleControlButtonClick end');
		} else if (action === 'restart') {
			clearInterval(timerState.timerId);

			setTimerState({
				...timerState,
				timeRemaining: timerState.timerDuration[timerState.timerMode],
				timerActive: false,
				timerId: null,
			});
		} else if (action === 'pause') {
			clearInterval(timerState.timerId);
			setTimerState({
				...timerState,
				timerId: null,
			});
			setTimerState({ ...timerState, timerActive: false });
		}
	};

	const decrementTimer = () => {
		console.log('decrement timer called');
		setTimerState((newTimerState) => {
			console.log('decrement timer tick');
			return {
				...newTimerState,
				timerActive: true,
				timeRemaining: newTimerState.timeRemaining - 1,
			};
		});
		console.log('decrement timer end');
	};

	const handleTimerExpiration = () => {
		if (timerState.timeRemaining <= 0) {
			playAudio(chime);

			clearInterval(timerState.timerId);

			setTimerState({
				...timerState,
				timeRemaining: timerState.timerDuration[timerState.timerMode],
				timerActive: false,
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
	console.log('page rendered');
	handleTimerExpiration();

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup
				activeTab={timerState.timerMode}
				onClick={handleModeTabClick}
				tabs={timerModes}
			></TabGroup>
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
