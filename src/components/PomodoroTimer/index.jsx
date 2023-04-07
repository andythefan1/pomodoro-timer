import { useState } from 'react';
import Header from '../Header';
import TabGroup from '../TabGroup';
import DigitalClock from '../DigitalClock';
import ControlGroup from '../ControlGroup';
import Accordion from '../Accordion';

import './styles.css';

export default function PomodoroTimer() {
	const [defaultPomoDuration, setDefaultPomoDuration] = useState(20);
	const [defaultLongBreakDuration, setDefaultLongBreakDuration] = useState(10);
	const [defaultShortBreakDuration, setDefaultShortBreakDuration] = useState(5);

	const [timerMode, setTimerMode] = useState('Pomodoro');
	const [timerActive, setTimerActive] = useState(false);
	const [accordionIsOpen, setAccordionIsOpen] = useState(true);
	const [timeRemaining, setTimeRemaining] = useState('16:00');

	const [timerDuration, setTimerDuration] = useState(defaultPomoDuration);
	const [totalCompletedPomos, setTotalCompletedPomos] = useState(0);
	const [totalCompletedTime, setTotalCompletedTime] = useState(0);

	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TabGroup activeTab={timerMode}></TabGroup>
			<DigitalClock time={timeRemaining}></DigitalClock>
			<ControlGroup allowPlay={!timerActive}></ControlGroup>
			<Accordion
				accordionHeader={'Your pomodoro stats'}
				isOpen={accordionIsOpen}
			></Accordion>
		</div>
	);
}
