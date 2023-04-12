import { useState } from 'react';
import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';
import Table from '../Table';

import { secondsToDigits } from '../../utils/utils';
import './styles.css';

export default function PomodoroTimer() {
	const timerModes = ['pomodoro', 'short break', 'long break'];

	// eventually implement custom durations
	const [timerDuration, setTimerDuration] = useState({
		pomodoro: 20 * 60,
		'long break': 10 * 60,
		'short break': 5 * 60,
	});

	const [timerState, setTimerState] = useState({
		timerMode: 'pomodoro',
		timerActive: false,
		timeRemaining: timerDuration['pomodoro'],
	});

	const [accordionIsOpen, setAccordionIsOpen] = useState(true);

	const [historicalStats, setHistoricalStats] = useState({
		totalCompletedPomos: 0,
		totalCompletedTime: 0,
	});

	const [countDownTimerId, setCountDownTimerId] = useState();

	const handleToggleAccordion = (e) => {
		setAccordionIsOpen(!accordionIsOpen);
	};

	const handleTabClick = (tab) => {
		setTimerState({
			timeRemaining: timerDuration[tab],
			timerActive: false,
			timerMode: tab,
		});
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			setCountDownTimerId(setInterval(decrementTimer, 1000));
		} else if (action === 'restart') {
			clearInterval(countDownTimerId);
			setCountDownTimerId();

			setTimerState({
				...timerState,
				timeRemaining: timerDuration[timerState.timerMode],
				timerActive: false,
			});
		} else if (action === 'pause') {
			clearInterval(countDownTimerId);
			setCountDownTimerId();
			setTimerState({ ...timerState, timerActive: false });
		}
	};

	const decrementTimer = () => {
		setTimerState((newTimerState) => {
			return {
				...newTimerState,
				timerActive: true,
				timeRemaining: newTimerState.timeRemaining - 1,
			};
		});
	};

	// props
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
			count: historicalStats.totalCompletedTime,
		},
	};

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup
				activeTab={timerState.timerMode}
				onClick={handleTabClick}
				tabs={timerModes}
			></TabGroup>
			<DigitalClock
				time={secondsToDigits(timerState.timeRemaining)}
			></DigitalClock>
			<ControlGroup
				controls={controls}
				onClick={handleControlButtonClick}
			></ControlGroup>
			<Accordion
				header={'Your pomodoro stats'}
				isOpen={accordionIsOpen}
				onClick={handleToggleAccordion}
			>
				<Table body={timerStats}></Table>
			</Accordion>
		</div>
	);
}
