import Tab from '../Tab';
import './styles.css';

export default function TabGroup({ tabs, activeTab, onClick }) {
	return (
		<div>
			<ul className='tab-group'>
				{tabs.map((tab, index) => (
					<li key={tab}>
						<Tab active={index === activeTab} index={index} onClick={onClick}>
							{tab}
						</Tab>
					</li>
				))}
			</ul>
		</div>
	);
}
