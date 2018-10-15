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
export function updatePlayer(username, result) {
  axios.get('http://localhost:3000/players?username=' + username)
    .then(function (response) {
      
      // add new user if no user name found
      if (response.data.length == 0) {
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

        postPlayer(username, games);
      }
      else {
        // update existing user
        let id = response.data[0].id;
        let win = response.data[0].games.win;
        let loss = response.data[0].games.loss;
        let draw = response.data[0].games.draw;

        if (result == "win") {
          axios.put('http://localhost:3000/players/' + id, {id, username, games: { win: win + 1, loss, draw }})
            .then(function (response) {

            })
            .catch(function (error) {			  
              throw error
            });

        }
        else if (result == "loss") {
          axios.put('http://localhost:3000/players/' + id, {id, username, games: { win, loss: loss + 1, draw }})
          .then(function (response) {

          })
          .catch(function (error) {			  
            throw error
          });
        }
        else if (result == "draw") {
          axios.put('http://localhost:3000/players/' + id, {id, username, games: { win, loss, draw: draw + 1 }})
          .then(function (response) {

          })
          .catch(function (error) {			  
            throw error
          });
        }

      }
    })
    .catch(function (error) {			  
      throw error
  });
}


/*
  POST Players
*/

export function postPlayer(username, games) {
  axios.post('http://localhost:3000/players', {username, games})
    .then(function (response) {
      
    })
    .catch(function (error) {			  
      throw error
  });
}