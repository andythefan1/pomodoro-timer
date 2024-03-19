import './styles.css';

const DigitalClock = ({ time }) => {
	const digits = time.split('');

	return (
		<div className='digital-clock'>
			<DigitalDigits>{digits[0]}</DigitalDigits>
			<DigitalDigits>{digits[1]}</DigitalDigits>
			<DigitalDigits>{digits[2]}</DigitalDigits>
			<DigitalDigits>{digits[3]}</DigitalDigits>
			<DigitalDigits>{digits[4]}</DigitalDigits>
		</div>
	);
};

export const DigitalDigits = ({ children }) => {
	return <div className='digital-digits'>{children}</div>;
};

export default DigitalClock;
