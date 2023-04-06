import Header from '../Header';
import TimerModes from '../TimerModes';
import CountDownTimer from '../CountDownTimer';
import TimerControls from '../TimerControls';
import Accordion from '../Accordion';

import './styles.css';

export default function PomodoroTimer() {
	return (
		<div className='pomodoro-timer'>
			<Header></Header>
			<TimerModes></TimerModes>
			<CountDownTimer></CountDownTimer>
			<TimerControls></TimerControls>
			<Accordion></Accordion>
		</div>
	);
}
