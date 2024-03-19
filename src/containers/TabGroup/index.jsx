import Tab from '../../components/Tab';
import './styles.css';

const TabGroup = ({ tabs, activeTab, onClick }) => {
	return (
		<ul className='tab-group'>
			{tabs.map((tab, index) => (
				<li key={tab}>
					<Tab active={index === activeTab} index={index} onClick={onClick}>
						{tab}
					</Tab>
				</li>
			))}
		</ul>
	);
};

export default TabGroup;
