import { useState } from 'react';
import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';

import './styles.css';
import Table from '../Table';

export default function PomodoroTimer() {
	// eventually implement custom durations
	const [defaultPomoDuration, setDefaultPomoDuration] = useState(20);
	const [defaultLongBreakDuration, setDefaultLongBreakDuration] = useState(10);
	const [defaultShortBreakDuration, setDefaultShortBreakDuration] = useState(5);

	const [timerDuration, setTimerDuration] = useState(defaultPomoDuration);

	const [timerMode, setTimerMode] = useState('Pomodoro');
	const [timerActive, setTimerActive] = useState(false);
	const [accordionIsOpen, setAccordionIsOpen] = useState(true);
	const [timeRemaining, setTimeRemaining] = useState('16:00');

	const [totalCompletedPomos, setTotalCompletedPomos] = useState(0);
	const [totalCompletedTime, setTotalCompletedTime] = useState(0);

	const timerModes = ['Pomodoro', 'Short Break', 'Long Break'];

	const handleToggleAccordion = (e) => {
		setAccordionIsOpen(!accordionIsOpen);
	};

	const handleTabClick = (tab) => {
		setTimerMode(tab);
	};

	const handleControlButtonClick = (action) => {
		if (action === 'play') {
			setTimerActive(true);
		} else {
			setTimerActive(false);
		}
	};

	const controls = {
		play: { icon: 'play_arrow', disabled: timerActive ? true : false },
		pause: { icon: 'pause', disabled: timerActive ? false : true },
		restart: { icon: 'forward_media', disabled: false },
	};

	const timerStats = {
		completedPomos: { text: 'Completed pomodoros', count: totalCompletedPomos },
		totalPomoTime: { text: 'Total pomodoro time', count: totalCompletedTime },
	};

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup
				activeTab={timerMode}
				onClick={handleTabClick}
				tabs={timerModes}
			></TabGroup>
			<DigitalClock time={timeRemaining}></DigitalClock>
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
