import './styles.css';

export default function TabButton({ active, children }) {
	return (
		<button className={`tab-button ${active && 'active'}`}>{children}</button>
	);
}
