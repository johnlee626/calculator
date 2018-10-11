import React from 'react';
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

export default Board;