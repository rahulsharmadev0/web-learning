import './components.css';

export const Counter = ({ counter }) => <h1 id="counter">{counter}</h1>;

export const IncrementButton = ({onClick}) => <button onClick={onClick}>+</button>;

export const DecrementButton = ({onClick}) => <button onClick={onClick}>-</button>;