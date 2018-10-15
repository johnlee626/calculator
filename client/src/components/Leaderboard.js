import React from 'react';
import PropTypes from 'prop-types';

class Leaderboard extends React.Component {
    constructor(props) {
		super(props);
		
	}

	render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Win</th>
                    <th scope="col">Loss</th>
                    <th scope="col">Draw</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.leaderboard.map((player, index) =>  
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{player.username}</td>
                            <td>{player.games.win}</td>
                            <td>{player.games.loss}</td>
                            <td>{player.games.draw}</td>
                        </tr>
                    )}                    
                </tbody>
            </table>
        );
	}	
}

Leaderboard.propTypes = {
	leaderboard: PropTypes.array
};

export default Leaderboard;