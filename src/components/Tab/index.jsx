import './styles.css';

const Tab = ({ active, children, onClick, index }) => {
	return (
		<button
			className={`tab-button ${active && 'active'}`}
			onClick={() => onClick(index)}
		>
			{children}
		</button>
	);
};

export default Tab;
