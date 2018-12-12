import React from 'react';
import Board  from './Board';
import Leaderboard  from './Leaderboard';
import { getPlayers, updatePlayer, postPlayer } from '../services/playerService';
import axios from 'axios';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.renderPlayerInput = this.renderPlayerInput.bind(this);
		this.renderPlayerName = this.renderPlayerName.bind(this);
		
		this.state = {
		  board: Array(16).fill(null),
		  xTurn: true,
		  winner: null,
		  winningLine: [],
		  errorMessage: null,
		  inputMode: "edit",
		  playerOne: "",
		  playerTwo: "",
		  leaderboard: [],
		  display: 0,
		  buttons: ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+']
		};
	}

	componentDidMount() {
		getPlayers({"sort": "games.win", "order": "desc", "limit": "10"}).then((data) => {
			this.setState({ leaderboard: data });
		});

	}
	
	handleStart() {
		const newBoard = Array(9).fill(null);		
		
		this.setState({
			board: newBoard,
			xTurn: true,
			winner: null,
			winningLine: null,
			draw: false,
			errorMessage: null,
			inputMode: "edit",
			playerOne: "",
			playerTwo: ""
		});
	}

	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		
		this.setState({ [name]: value });
	}

	handleSave() {
		let errorMessage;
		
		if (this.state.playerOne.trim() == "" || this.state.playerTwo.trim() == "") {
			errorMessage = <div className="alert alert-danger" role="alert">Please enter all players' name</div>
			this.setState({ errorMessage: errorMessage });
			return;
		}

		this.setState({
			errorMessage: null,			
			inputMode: "view",
			playerOne: this.state.playerOne.trim(), 
			playerTwo: this.state.playerTwo.trim()			
		});
	}
	
	handleClick(i) {
		const board = this.state.board.slice();
		let errorMessage, checkWinner, checkDraw;

		if (this.state.playerOne == "" || this.state.playerTwo == "" || this.state.inputMode == "edit") {
			errorMessage = <div className="alert alert-danger" role="alert">Please enter all players' name</div>
			this.setState({ errorMessage: errorMessage });
			return;
		}
		
		if (this.checkWinner(board) || board[i]) {
			return;
		}
		
		board[i] = this.state.xTurn ? "X" : "O";
		checkWinner = this.checkWinner(board);
		checkDraw = board.includes(null) ? false : true;
		
		this.setState({
			board: board,
			xTurn: !this.state.xTurn,
			winner: checkWinner,
			draw: checkDraw
		});

		if (checkWinner == "X") {
			updatePlayer(this.state.playerOne, "win").then((data) => {
				this.setState({ leaderboard: data });
			});
			
			updatePlayer(this.state.playerTwo, "loss").then((data) => {
				this.setState({ leaderboard: data });
			});
		}
		else if (checkWinner == "O") {
			updatePlayer(this.state.playerTwo, "win").then((data) => {
				this.setState({ leaderboard: data });
			});
			
			updatePlayer(this.state.playerOne, "loss").then((data) => {
				this.setState({ leaderboard: data });
			});	  
		}
		else if (checkDraw) {
			updatePlayer(this.state.playerOne, "draw").then((data) => {
				this.setState({ leaderboard: data });
			});
			
			updatePlayer(this.state.playerTwo, "draw").then((data) => {
				this.setState({ leaderboard: data });
			});
		}
		
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
			  this.setState({ winningLine: [a, b, c] });
			  return board[a];
			}
		}
		
		return null;
	}	

	renderPlayerInput() {
		let display;

		if (this.state.inputMode == "edit") {
			display = <>
						<div><b>Enter the name of Player X:</b></div><div><input type="text" name="playerOne" onChange={this.handleChange} value={this.state.playerOne} /></div>
						<div><b>Enter the name of Player O:</b></div><div><input type="text" name="playerTwo" onChange={this.handleChange} value={this.state.playerTwo} /></div>
						<br />
						<button className="btn btn-primary" onClick={() => this.handleSave()}>Save</button>
					  </>;
		}

		return display;
	}

	renderPlayerName() {
		let display;

		if (this.state.inputMode == "view") {
			display = <>
						<div><b>Name of player X:</b></div>
						<div>{this.state.playerOne}</div>
						<div><b>Name of player O:</b></div>
						<div>{this.state.playerTwo}</div>
					  </>;
		}

		return display;
	}
	
	render() {
		const { winner, xTurn, display, buttons, playerOne, playerTwo, errorMessage, draw, leaderboard, winningLine } = this.state;
		let playerInput = this.renderPlayerInput();
		let playerName = this.renderPlayerName();		
		let status;		

		if (winner) {
		  status = "The winner is: " + winner + "!!";		  			  
		}		
		else if (draw) {
		  status = "The game is a draw!!";			  
		}
		else {
		  status = xTurn ? "Player X's move" : "Player O's move";
		}
		
		return(
			<div className="game">
				<div className="section-left">
					<div className="game-info">{display}</div>
					<div className="game-board">
						<Board
							board={buttons}
							winningLine={winningLine}
							onClick={i => this.handleClick(i)}
						/>
					</div>
				</div>				
			</div>
		);
	}
}

export default Calculator;