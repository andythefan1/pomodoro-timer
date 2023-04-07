import './styles.css';

export default function ExpandToggle({ children }) {
	return (
		<button className='expand-toggle'>
			<div>{children}</div>
			<span class='material-symbols-outlined expand-toggle-icon'>
				expand_more
			</span>
		</button>
	);
}
