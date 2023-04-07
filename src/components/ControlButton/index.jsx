import './styles.css';

export default function ControlButton({ disabled, icon, onClick }) {
	return (
		<button disabled={disabled} className='control-button' onClick={onClick}>
			<span className='material-symbols-outlined control-button-icon'>
				{icon}
			</span>
		</button>
	);
}
