/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [Expression, setExpression] = useState<string>(''); // отвечает за строку выражения сверху
  const [Result, setResult] = useState<string>(''); // результат посередине
  const [Operation, setOperation] = useState<string>(''); // хранит информацию о действии +-*/ и др
  const [ComputedNum, setComputedNum] = useState<number[]>([]); // хранит числа над которыми производится операция

  function clear() {
    setExpression('');
    setResult('');
    setOperation('');
    setComputedNum([]);
  }

  function numCutter(num: string) {
    if (num.length > 9) {
      return num.slice(0, 9);
    }
    return num;
  }

  function numberInput(number: string) {
    if (Result.length > 10) {
      return;
    }
    setResult(Result + number);
  }

  function negate() {
    if (Result[0] === '-') {
      const temp = Result;
      setResult(temp.slice(1));
      return;
    }
    const temp = '-'.concat(Result);
    setResult(temp);
  }

  function operation(type: string) {
    // проверка при повторном выборе знака +-/*
    if (Result === '') {
      setExpression(type);
      setOperation(`${ComputedNum[0]} ${type}`);
      return;
    }

    // при первичном выборе знака
    const temp = ComputedNum.slice(); // запоминает число над которым работаем
    temp[0] = parseFloat(Result);
    console.log('temp', temp);

    // очистка
    if (type === 'CE') {
      clear();
      return;
    }

    setComputedNum(temp);
    setExpression(type);
    setOperation(`${temp[0]} ${type}`);
    setResult('');
  }

  function calculateResult() {
    let temp = ComputedNum.slice();
    temp[1] = parseFloat(Result);
    setComputedNum(temp);
    switch (Expression) {
      case '+':
        setResult(numCutter(`${temp[0] + temp[1]}`));
        break;
      case '-':
        setResult(numCutter(`${temp[0] - temp[1]}`));
        break;
      case '*':
        setResult(numCutter(`${temp[0] * temp[1]}`));
        break;
      case '/':
        setResult(numCutter(`${temp[0] / temp[1]}`));
        break;
      default:
        break;
    }
    setOperation('');
    temp = [];
    setComputedNum(temp);
  }

  useEffect(() => {
    console.log(
      'Expression',
      Expression,
      'Result',
      Result,
      'Operation',
      Operation,
      'ComputedNum',
      ComputedNum
    );

    const keyboardInput = (event: any) => {
      console.log(event.code);

      if (Result.length > 10) {
        return;
      }
      switch (event.code) {
        case 'KeyN':
          negate();
          break;
        case 'Enter':
          calculateResult();
          break;
        case 'NumpadEnter':
          calculateResult();
          break;
        case 'NumpadAdd':
          operation('+');
          break;
        case 'NumpadSubtract':
          operation('-');
          break;
        case 'NumpadMultiply':
          operation('*');
          break;
        case 'NumpadDivide':
          operation('/');
          break;
        case 'KeyC':
          operation('CE');
          break;
        case 'Backspace':
          setResult(Result.slice(0, Result.length - 1));
          break;
        case 'Numpad0':
          setResult(`${Result}0`);
          negate();
          break;
        case 'Numpad1':
          setResult(`${Result}1`);
          break;
        case 'Numpad2':
          setResult(`${Result}2`);
          break;
        case 'Numpad3':
          setResult(`${Result}3`);
          break;
        case 'Numpad4':
          setResult(`${Result}4`);
          break;
        case 'Numpad5':
          setResult(`${Result}5`);
          break;
        case 'Numpad6':
          setResult(`${Result}6`);
          break;
        case 'Numpad7':
          setResult(`${Result}7`);
          break;
        case 'Numpad8':
          setResult(`${Result}8`);
          break;
        case 'Numpad9':
          setResult(`${Result}9`);
          break;
        case 'NumpadDecimal':
          setResult(`${Result}.`);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', keyboardInput);
    return () => {
      window.removeEventListener('keydown', keyboardInput);
    };
  });

  return (
    <>
      <div id="titleBar">
        <p>SMCalc</p>
      </div>
      <div id="calc">
        <div id="calc_window">
          <span id="window_result">{Result}</span>
          <span id="window_operation">{Operation}</span>
        </div>
        <div id="calc_actions">
          <div className="action num_pad CE" onClick={() => operation('CE')}>
            <p>CE</p>
          </div>
          <div className="action num_pad div" onClick={() => operation('/')}>
            <p>/</p>
          </div>
          <div className="action num_pad mult" onClick={() => operation('*')}>
            <p>*</p>
          </div>
          <div className="action num_pad minus" onClick={() => operation('-')}>
            <p>-</p>
          </div>
          <div className="action num_pad 7" onClick={() => numberInput('7')}>
            <p>7</p>
          </div>
          <div className="action num_pad 8" onClick={() => numberInput('8')}>
            <p>8</p>
          </div>
          <div className="action num_pad 9" onClick={() => numberInput('9')}>
            <p>9</p>
          </div>
          <div className="action num_pad plus" onClick={() => operation('+')}>
            <p>+</p>
          </div>
          <div className="action num_pad 4" onClick={() => numberInput('4')}>
            <p>4</p>
          </div>
          <div className="action num_pad 5" onClick={() => numberInput('5')}>
            <p>5</p>
          </div>
          <div className="action num_pad 6" onClick={() => numberInput('6')}>
            <p>6</p>
          </div>
          <div className="action num_pad 1" onClick={() => numberInput('1')}>
            <p>1</p>
          </div>
          <div className="action num_pad 2" onClick={() => numberInput('2')}>
            <p>2</p>
          </div>
          <div className="action num_pad 3" onClick={() => numberInput('3')}>
            <p>3</p>
          </div>
          <div
            className="action num_pad result"
            onClick={() => calculateResult()}
          >
            <p>=</p>
          </div>
          <div className="action num_pad negate" onClick={() => negate()}>
            <p>+/-</p>
          </div>
          <div className="action num_pad zero" onClick={() => numberInput('0')}>
            <p>0</p>
          </div>
          <div className="action num_pad ." onClick={() => numberInput('.')}>
            <p>.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
