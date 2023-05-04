import { useState } from 'react';

import ExpandToggle from '../ExpandToggle';
import './styles.css';

export default function Accordion({ header, children }) {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleExpandToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className='accordion'>
			<ExpandToggle isExpanded={isExpanded} onClick={handleExpandToggle}>
				{header}
			</ExpandToggle>
			{isExpanded && children}
		</div>
	);
}
