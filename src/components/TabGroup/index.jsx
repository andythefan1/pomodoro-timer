import TabButton from '../TabButton';
import './styles.css';

export default function TabGroup({ tabs, activeTab, onClick }) {
	return (
		<ul className='tab-group'>
			{tabs.map((tab) => (
				<li>
					<TabButton
						active={tab === activeTab}
						key={tab}
						name={tab}
						onClick={onClick}
					>
						{tab}
					</TabButton>
				</li>
			))}
		</ul>
	);
}
