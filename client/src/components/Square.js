import React from 'react';

class Square extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
        	return (
				this.props.color ?
					<div className="game-square color" onClick={() => this.props.onClick()}>
						{this.props.value}
					</div> :
					<div className="game-square" onClick={() => this.props.onClick()}>
						{this.props.value}
					</div>

        	);
	}
}

export default Square;