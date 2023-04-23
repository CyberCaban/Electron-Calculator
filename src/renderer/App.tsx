/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <div id="titleBar">
        <p>SMCalc</p>
      </div>
      <Calculator />
    </>
  );
}

export default App;
