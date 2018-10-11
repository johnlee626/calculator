import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import Game from '../components/Game'

const App = () => {
  return (
    <div>
      <Game />
    </div>
  );
};

export default hot(module)(App);
