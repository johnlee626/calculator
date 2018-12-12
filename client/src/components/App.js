import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import Calculator from './Calculator'

const App = () => {
  return (
    <div>
      <Calculator />
    </div>
  );
};

export default hot(module)(App);
