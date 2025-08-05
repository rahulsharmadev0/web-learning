import React, { useState } from 'react';
import './App.css';
import { Counter, IncrementButton, DecrementButton } from './components/components.js';

const CounterApp = ({ counter, setCounter }) => (
  <div className="App">
    <Counter counter={counter} />
    <div id='buttons-container'>
      <DecrementButton onClick={() => setCounter(counter - 1)} />
      <IncrementButton onClick={() => setCounter(counter + 1)} />
    </div>
  </div>
);


function App() {
  const [counter, setCounter] = useState(0);

  // return <CounterApp counter={counter} setCounter={setCounter}/>;

  return React.createElement(CounterApp, { counter, setCounter });

}

export default App;
