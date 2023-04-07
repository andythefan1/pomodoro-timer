import './styles.css';

export default function ExpandToggle({ children, isExpanded }) {
	return (
		<button className='expand-toggle'>
			<div>{children}</div>
			{isExpanded ? (
				<span class='material-symbols-outlined expand-toggle-icon'>
					expand_less
				</span>
			) : (
				<span className='material-symbols-outlined expand-toggle-icon'>
					expand_more
				</span>
			)}
		</button>
	);
}
