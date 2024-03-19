import { useState } from 'react';

import './styles.css';

export const Accordion = ({ header, children, isExpanded = true }) => {
	const [showBody, setShowBody] = useState(isExpanded);

	const handleExpandToggle = () => {
		setShowBody(!isExpanded);
	};

	return (
		<div className='accordion'>
			<button className='expand-toggle' onClick={handleExpandToggle}>
				<div>{header}</div>
				{showBody ? (
					<span className='material-symbols-rounded expand-toggle-icon'>
						expand_less
					</span>
				) : (
					<span className='material-symbols-rounded expand-toggle-icon'>
						expand_more
					</span>
				)}
			</button>
			{showBody && children}
		</div>
	);
};
