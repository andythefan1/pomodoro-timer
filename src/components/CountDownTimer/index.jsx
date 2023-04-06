import CountDownDigits from '../CountDownDigits';
import './styles.css';

export default function CountdownTimer() {
	return (
		<div className='countdown-timer'>
			<CountDownDigits>1</CountDownDigits>
			<CountDownDigits>6</CountDownDigits>
			<CountDownDigits>:</CountDownDigits>
			<CountDownDigits>0</CountDownDigits>
			<CountDownDigits>0</CountDownDigits>
		</div>
	);
}
