import './styles.css';

export default function TabButton({ active, children, onClick, name }) {
	return (
		<button
			className={`tab-button ${active && 'active'}`}
			onClick={() => onClick(name)}
		>
			{children}
		</button>
	);
}
