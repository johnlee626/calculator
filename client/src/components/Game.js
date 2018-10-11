import React from 'react';
import Start  from './Start';
import Board  from './Board';
import Square  from './Square';


class Game extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	
	render() {
		
		return(
			<div className="game">
				<div className="game-board">
					<Board
						
					/>
				</div>
			</div>
		);
	}
}


