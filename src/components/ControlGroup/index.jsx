import './styles.css';

const ControlGroup = ({ controls, onClick }) => {
	const { start, pause, restart } = controls;

	return (
		<div className='control-group'>
			{!start.disabled && (
				<button
					disabled={start.disabled}
					className='play-btn control-button rounded'
					onClick={() => onClick(start.text)}
				>
					<span className='material-symbols-rounded control-button-icon'>
						{start.icon}
					</span>
					{start.text}
				</button>
			)}
			{!pause.disabled && (
				<button
					disabled={pause.disabled}
					className='pause-btn control-button rounded'
					onClick={() => onClick(pause.text)}
				>
					<span className='material-symbols-rounded control-button-icon'>
						{pause.icon}
					</span>
					{pause.text}
				</button>
			)}
			<button
				disabled={restart.disabled}
				className='restart-btn control-button'
				onClick={() => onClick(restart.text)}
			>
				<span className='material-symbols-rounded control-button-icon'>
					{restart.icon}
				</span>
			</button>
		</div>
	);
};

export default ControlGroup;
