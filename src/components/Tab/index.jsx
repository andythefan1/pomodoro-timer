import './styles.css';

export default function Tab({ active, children, onClick, index }) {
	return (
		<button
			className={`tab-button ${active && 'active'}`}
			onClick={() => onClick(index)}
		>
			{children}
		</button>
	);
}
