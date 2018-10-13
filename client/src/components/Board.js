import React from 'react';
import PropTypes from 'prop-types';
import Square  from './Square';

class Board extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return (
			<>
				{this.props.board.map((square, index) => 
				<Square
					key={index}
					value={square} 
					onClick={() => this.props.onClick(index)}
				/>				
				)}
			</>
		);
	}
}

Board.propTypes = {
	board: PropTypes.array,
	onClick: PropTypes.func
};

export default Board;