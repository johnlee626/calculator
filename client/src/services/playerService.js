import qs from 'qs';
import axios from 'axios';

const PLAYER_SERVICE_ENDPOINT = 'http://localhost:3000';

/*
  The following is an example of how to interact with the json-server library.
  More info about json-server can be found at https://github.com/typicode/json-server.
*/

/*
  Prefixes keys in options objects with "_" to be compatible with json-server queries.
  i.e sort -> _sort
*/
function optionsToQueryString(options = {}) {
  const prefixedOptions = Object.entries(options).reduce((acc, [param, val]) => {
    acc[`_${param}`] = val;
    return acc;
  }, {});

  return qs.stringify(prefixedOptions);
}

/*
  GET Players
*/
export async function getPlayers(options = {}) {
  const query = optionsToQueryString(options);

  const response = await fetch(`${PLAYER_SERVICE_ENDPOINT}/players?${query}`);

  const players = await response.json();

  return players;
}

/*
  UPDATE Player
*/
export async function updatePlayer(username, result) {
  const userData = await axios.get('http://localhost:3000/players?username=' + username);
	  
  // add new user if no user name found
  if (userData.data.length == 0) {
	let games;
	
	if (result == "win") {
	  games = { win: 1, loss: 0, draw: 0 };  
	}
	else if (result == "loss") {
	  games = { win: 0, loss: 1, draw: 0 };            
	}
	else if (result == "draw") {
	  games = { win: 0, loss: 0, draw: 1 };            
	}

	await postPlayer(username, games);
  }
  else {
	// update existing user
	let id = userData.data[0].id;
	let win = userData.data[0].games.win;
	let loss = userData.data[0].games.loss;
	let draw = userData.data[0].games.draw;

	if (result == "win") {
	  await axios.put('http://localhost:3000/players/' + id, {id, username, games: { win: win + 1, loss, draw }});
	}
	else if (result == "loss") {
	  await axios.put('http://localhost:3000/players/' + id, {id, username, games: { win, loss: loss + 1, draw }});		  
	}
	else if (result == "draw") {
	  await axios.put('http://localhost:3000/players/' + id, {id, username, games: { win, loss, draw: draw + 1 }});		  
	}	
  }
  
  let leaderboard = await getPlayers({"sort": "games.win", "order": "desc", "limit": "10"});
  return leaderboard;
}


/*
  POST Players
*/

export async function postPlayer(username, games) {
  await axios.post('http://localhost:3000/players', {username, games})
    .then(function (response) {
      
    })
    .catch(function (error) {			  
      throw error
  });
}