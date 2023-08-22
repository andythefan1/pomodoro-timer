import './styles.css';

export default function AccordionHeader({ children, isExpanded, onClick }) {
	return (
		<button className='expand-toggle' onClick={onClick}>
			<div>{children}</div>
			{isExpanded ? (
				<span className='material-symbols-rounded expand-toggle-icon'>
					expand_less
				</span>
			) : (
				<span className='material-symbols-rounded expand-toggle-icon'>
					expand_more
				</span>
			)}
		</button>
	);
}
