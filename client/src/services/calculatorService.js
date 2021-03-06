import qs from 'qs';
import axios from 'axios';

const PLAYER_SERVICE_ENDPOINT = 'http://localhost:3001';

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

export async function getResult(display = "") {
  const result = await axios.get(`${PLAYER_SERVICE_ENDPOINT}/calculator?display=${display}`);

  return result;
}

