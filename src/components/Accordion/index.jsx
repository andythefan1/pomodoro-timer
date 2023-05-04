import ExpandToggle from '../ExpandToggle';
import './styles.css';

export default function Accordion({ isOpen, header, children, onClick }) {
	return (
		<div className='accordion'>
			<ExpandToggle isExpanded={isOpen} onClick={onClick}>
				{header}
			</ExpandToggle>
			{isOpen && children}
		</div>
	);
}
