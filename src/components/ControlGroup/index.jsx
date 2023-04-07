import ControlButton from '../ControlButton';
import './styles.css';

export default function ControlGroup({ allowPlay }) {
	return (
		<div className='control-group'>
			<ControlButton disabled={!allowPlay}>
				<span className='material-symbols-outlined control-button-icon'>
					play_arrow
				</span>
			</ControlButton>
			<ControlButton disabled={allowPlay}>
				<span className='material-symbols-outlined control-button-icon'>
					pause
				</span>
			</ControlButton>
			<ControlButton>
				<span className='material-symbols-outlined control-button-icon'>
					forward_media
				</span>
			</ControlButton>
		</div>
	);
}
