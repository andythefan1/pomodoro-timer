import './styles.css';

export default function ExpandToggle({ children }) {
	return (
		<button className='expand-toggle'>
			<div>{children}</div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-6 h-6 expand-button'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M19.5 8.25l-7.5 7.5-7.5-7.5'
				/>
			</svg>
		</button>
	);
}
