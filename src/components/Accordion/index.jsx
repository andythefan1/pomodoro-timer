import ExpandToggle from '../ExpandToggle';
import AccordionContainer from '../AccordionContainer';
import AccordionRow from '../AccordionRow';
import './styles.css';

export default function Accordion() {
	return (
		<div>
			<ExpandToggle></ExpandToggle>
			<AccordionContainer></AccordionContainer>
			<AccordionRow>ipsem lorem</AccordionRow>
			<AccordionRow>ipsem lorem</AccordionRow>
		</div>
	);
}
