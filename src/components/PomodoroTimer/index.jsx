import { useState } from 'react';
import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import TimerControls from '../TimerControls';
import Accordion from '../Accordion';

import './styles.css';

export default function PomodoroTimer() {
	const [defaultPomoDuration, setDefaultPomoDuration] = useState(20);
	const [defaultLongBreakDuration, setDefaultLongBreakDuration] = useState(10);
	const [defaultShortBreakDuration, setDefaultShortBreakDuration] = useState(5);

	const [timerMode, setTimerMode] = useState('pomodoro');
	const [timerActive, setTimerActive] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [timerDuration, setTimerDuration] = useState(defaultPomoDuration);
	const [totalCompletedPomos, setTotalCompletedPomos] = useState(0);
	const [totalCompletedTime, setTotalCompletedTime] = useState(0);
	const [accordionIsOpen, setAccordionIsOpen] = useState(true);

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup activeTab={timerMode}></TabGroup>
			<DigitalClock time={timeRemaining}></DigitalClock>
			<TimerControls timerActive={timerActive}></TimerControls>
			<Accordion isOpen={accordionIsOpen}></Accordion>
		</div>
	);
}
