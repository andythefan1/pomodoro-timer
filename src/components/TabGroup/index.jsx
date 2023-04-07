import TabButton from '../TabButton';
import './styles.css';

export default function TabGroup() {
	return (
		<div className='tab-group'>
			<TabButton>Pomodoro</TabButton>
			<TabButton>Short Break</TabButton>
			<TabButton>Long Break</TabButton>
		</div>
	);
}
