import Tab from '../Tab';
import './styles.css';

export default function TabGroup({ tabs, activeTab, onClick }) {
	return (
		<ul className='tab-group'>
			{tabs.map((tab) => (
				<li>
					<Tab
						active={tab === activeTab}
						key={tab}
						name={tab}
						onClick={onClick}
					>
						{tab}
					</Tab>
				</li>
			))}
		</ul>
	);
}
