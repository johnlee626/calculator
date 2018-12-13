import React from 'react';
import Buttons  from './Buttons';
import { getResult } from '../services/calculatorService';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		
		this.state = {
		  display: "",
		  buttons: ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+']
		};
	}

	componentDidMount() {
		
	}

	isOperator(val) {
		return isNaN(val) || !val === "." || !val === "=";
	}
	
	handleClick(val) {
		let display = this.state.display.slice();
		let lastButton = display.length == 0 ? "" : display[display.length - 1];
		
		switch(val) {
			case "C":
				display = ""
				break;
			case "=":
				getResult(this.state.display).then((data) => {
					display = isNaN(parseInt(data)) ? eval(display).toString() : data;
					this.setState({ display: display });
				});

				break;
			default:
				if (this.isOperator(lastButton) && this.isOperator(val)) {
					display = display.slice(0, -1) + val;
				}
				else {
					display += val
				}
		}

		this.setState({ display: display });		
	}
	
	render() {
		const { display, buttons } = this.state;
		
		return(
			<div className="calculator">
				<div className="section">
					<div className="calculator-info">{ display == "" ? 0 : display }</div>
					<div className="calculator-grid">
						<Buttons
							buttons={buttons}
							onClick={(val) => this.handleClick(val)}
						/>
					</div>
				</div>				
			</div>
		);
	}
}

export default Calculator;