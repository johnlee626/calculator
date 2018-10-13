import React from 'react';
//import Start  from './Start';
import Board  from './Board';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  board: Array(9).fill(null),
		  xTurn: true,
		  winner: null,
		  playerOne: null,
		  playerTwo: null
		};
	}
	
	handleStart() {
		const newBoard = Array(9).fill(null);
		
		this.setState({
			board: newBoard,
			xTurn: true,
			winner: null
		});
	}
	
	handleClick(i) {
		const board = this.state.board.slice();
		
		if (this.checkWinner(board) || board[i]) {
			return;
		}
		
		board[i] = this.state.xTurn ? "X" : "O";
		this.setState({
			board: board,
			xTurn: !this.state.xTurn,
			winner: this.checkWinner(board)
		});
	}

	checkWinner(board) {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		
		for (let i = 0; i < winningLines.length; i++) {
			const [a, b, c] = winningLines[i];
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {			
			  return board[a];
			}
		}
		
		return null;
	}
	
	render() {
		const {winner, xTurn} = this.state;		
		let status;
		
		if (winner) {
		  status = "The winner is: " + winner + "!!";
		} else {
		  status = xTurn ? "Player X's move" : "Player O's move";
		}
		
		return(
			<div className="game">
				<div className="game-start">
					<button className="game-button" onClick={() => this.handleStart()}>New Game</button>
				</div>
				<div className="game-board">
					<Board
						board={this.state.board}
						onClick={i => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
				</div>
			</div>
		);
	}
}

export default Game;