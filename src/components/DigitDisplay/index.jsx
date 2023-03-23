import React from 'react';

class DigitDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	getSeconds() {
		return Math.floor(this.props.time / 1000);
	}

	render() {
		return <div>{this.getSeconds()}</div>;
	}
}

export default DigitDisplay;
