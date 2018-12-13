import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
        	return (
				<div className="calculator-button" onClick={() => this.props.onClick(this.props.value)}>
					{this.props.value}
				</div>
        	);
	}
}

export default Button;