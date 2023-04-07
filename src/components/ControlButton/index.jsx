import './styles.css';

export default function ControlButton({ disabled, children }) {
	return (
		<button disabled={disabled} className='control-button'>
			{children}
		</button>
	);
}
