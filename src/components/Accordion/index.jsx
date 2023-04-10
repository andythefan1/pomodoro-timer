import ExpandToggle from '../ExpandToggle';
import Table from '../Table';
import './styles.css';

export default function Accordion({ isOpen, header, body, onClick }) {
	return (
		<div className='accordion'>
			<ExpandToggle isExpanded={isOpen} onClick={onClick}>
				{header}
			</ExpandToggle>
			{isOpen && <Table body={body}></Table>}
		</div>
	);
}
