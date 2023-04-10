import ControlButton from '../ControlButton';
import './styles.css';

export default function ControlGroup({ controls, onClick }) {
	return (
		<div className='control-group'>
			{Object.entries(controls).map(([action, control]) => (
				<ControlButton
					key={action}
					icon={control.icon}
					disabled={control.disabled}
					onClick={() => onClick(action)}
				></ControlButton>
			))}
		</div>
	);
}
