import { useState } from 'react';

import AccordionHeader from '../AccordionHeader';
import './styles.css';

export default function Accordion({ header, children }) {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleExpandToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className='accordion container outline'>
			<AccordionHeader isExpanded={isExpanded} onClick={handleExpandToggle}>
				{header}
			</AccordionHeader>
			{isExpanded && children}
		</div>
	);
}
