import ControlButton from '../ControlButton';
import './styles.css';

export default function TimerControls() {
	return (
		<div className='timer-controls'>
			<ControlButton>
				<span class='material-symbols-outlined control-button-icon'>
					play_arrow
				</span>
			</ControlButton>
			<ControlButton>
				<span class='material-symbols-outlined control-button-icon'>pause</span>
			</ControlButton>
			<ControlButton>
				<span class='material-symbols-outlined control-button-icon'>
					forward_media
				</span>
			</ControlButton>
		</div>
	);
}
