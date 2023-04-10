import './styles.css';

export default function Table({ body }) {
	const generateRows = (body) => {
		return Object.entries(body).map(([data, value]) => (
			<div className='table-row' key={data}>
				<div className='table-cell'>{value.text}</div>
				<div>{value.count}</div>
			</div>
		));
	};

	const rows = generateRows(body);

	return <div className='table'>{rows}</div>;
}
