import TabButton from '../TabButton';
import './styles.css';

export default function TabGroup({ activeTab }) {
	const tabs = ['Pomodoro', 'Short Break', 'Long Break'];
	console.log(activeTab);
	return (
		<div className='tab-group'>
			{tabs.map((tab) => (
				<TabButton active={tab === activeTab} key={tab}>
					{tab}
				</TabButton>
			))}
		</div>
	);
}
