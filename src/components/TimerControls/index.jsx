import ControlButton from '../ControlButton';
import './styles.css';

export default function TimerControls() {
	return (
		<div className='timer-controls'>
			<ControlButton>Play</ControlButton>
			<ControlButton>Pause</ControlButton>
			<ControlButton>Reset</ControlButton>
		</div>
	);
}
