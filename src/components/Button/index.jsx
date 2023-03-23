import React from 'react';

class Button extends React.Component {
	componentDidUpdate(props) {}

	render() {
		return (
			<button
				className={this.props.toggled ? 'active' : ''}
				disabled={this.props.toggled}
				onClick={this.props.handleClick}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
