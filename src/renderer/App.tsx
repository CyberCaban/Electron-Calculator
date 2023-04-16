/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.css';
import { useState, useEffect } from 'react';
import buttons from './buttons';

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
    // очистка
    if (type === 'CE') {
      clear();
      return;
    }

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

  const getFunctionButton = (type: string, value: string): any => {
    if (type === 'operation') {
      return operation(value);
    }
    if (type === 'negate') {
      return negate();
    }
    if (type === 'numberInput') {
      return numberInput(value);
    }
    if (type === 'calculateResult') {
      return calculateResult();
    }
    return null;
  };

  const actions = buttons.map((item) => {
    // eslint-disable-next-line prettier/prettier
    return (
      <div
        className={`action num_pad ${item.classname}`}
        onClick={() => getFunctionButton(item.type, item.value)}
      >
        <p>{item.value}</p>
      </div>
    );
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
        <div id="calc_actions">{actions}</div>
      </div>
    </>
  );
}

export default App;
