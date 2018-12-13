import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Buttons extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return (
			<>
				{this.props.buttons.map((square, index) => 
					<Button
						key={index}
						value={square} 
						onClick={(val) => this.props.onClick(val)}
					/>
						
				)}
			</>
		);
	}
}

Buttons.propTypes = {
	buttons: PropTypes.array,
	onClick: PropTypes.func
};

export default Buttons;