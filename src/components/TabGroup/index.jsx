import TabButton from '../TabButton';
import './styles.css';

export default function TabGroup({ tabs, activeTab, onClick }) {
	return (
		<div className='tab-group'>
			{tabs.map((tab) => (
				<TabButton
					active={tab === activeTab}
					key={tab}
					name={tab}
					onClick={onClick}
				>
					{tab}
				</TabButton>
			))}
		</div>
	);
}
