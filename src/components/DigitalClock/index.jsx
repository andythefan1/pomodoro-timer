import DigitalDigits from '../DigitalDigits';
import './styles.css';

export default function DigitalClock({ time }) {
	const digits = time.split('');

	return (
		<div className='digital-clock outline'>
			<DigitalDigits>{digits[0]}</DigitalDigits>
			<DigitalDigits>{digits[1]}</DigitalDigits>
			<DigitalDigits>{digits[2]}</DigitalDigits>
			<DigitalDigits>{digits[3]}</DigitalDigits>
			<DigitalDigits>{digits[4]}</DigitalDigits>
		</div>
	);
}
