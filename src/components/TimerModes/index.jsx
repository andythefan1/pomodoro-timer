import TabButton from '../TabButton';
import './styles.css';

export default function TimerModes() {
	return (
		<div className='timer-modes'>
			<TabButton>Pomodoro</TabButton>
			<TabButton>Short Break</TabButton>
			<TabButton>Long Break</TabButton>
		</div>
	);
}
