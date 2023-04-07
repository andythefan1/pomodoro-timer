import DigitalDigits from '../DigitalDigits';
import './styles.css';

export default function DigitalClock() {
	return (
		<div className='digital-clock'>
			<DigitalDigits>1</DigitalDigits>
			<DigitalDigits>6</DigitalDigits>
			<DigitalDigits>:</DigitalDigits>
			<DigitalDigits>0</DigitalDigits>
			<DigitalDigits>0</DigitalDigits>
		</div>
	);
}
