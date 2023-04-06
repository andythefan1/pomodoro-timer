import ExpandToggle from '../ExpandToggle';
import AccordionContainer from '../AccordionContainer';
import AccordionRow from '../AccordionRow';
import './styles.css';

export default function Accordion() {
	return (
		<div className='accordion'>
			<ExpandToggle>Your pomodoro stats</ExpandToggle>
			<AccordionContainer>
				<AccordionRow>
					<div>ipsem lorem</div>
					<div>ipsem lorem</div>
				</AccordionRow>
				<AccordionRow>
					<div>ipsem lorem</div>
					<div>ipsem lorem</div>
				</AccordionRow>
				<AccordionRow>
					<div>ipsem lorem</div>
					<div>ipsem lorem</div>
				</AccordionRow>
			</AccordionContainer>
		</div>
	);
}
