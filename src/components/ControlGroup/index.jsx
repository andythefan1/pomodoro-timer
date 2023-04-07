import ControlButton from '../ControlButton';
import './styles.css';

export default function ControlGroup({ controls, onClick }) {
	Object.entries(controls).forEach((control) => {
		console.log(control);
	});
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
