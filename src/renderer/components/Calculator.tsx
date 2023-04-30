/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import './Calculator.css';
import * as math from 'mathjs';
import buttons from '../buttons';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');

  const endsWithOperator = (expression: string) => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(expression.slice(-1));
  };

  const handleClick = (value: string) => {
    if (value === 'CE') {
      setExpression('');
      return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (expression === '' || endsWithOperator(expression)) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
    } else {
      setExpression(expression + value);
    }
  };

  const handleCalculate = () => {
    try {
      const result = +math.evaluate(expression).toFixed(4);
      if (isNaN(result)) {
        setExpression('Error');
      } else {
        setExpression(result.toString());
      }
    } catch (error) {
      setExpression('Error');
    }
  };

  function negate() {
    if (expression[0] === '-') {
      const temp = expression;
      setExpression(temp.slice(1));
      return;
    }
    const temp = '-'.concat(expression);
    setExpression(temp);
  }

  const getFunctionButton = (type: string, value: string): any => {
    if (type === 'handleClick') {
      return handleClick(value);
    }
    if (type === 'handleCalculate') {
      return handleCalculate();
    }
    if (type === 'negate') {
      return negate();
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

  useEffect(() => {
    const keyboardInput = (event: any) => {
      console.log(event.code);

      switch (event.code) {
        case 'KeyN':
          negate();
          break;
        case 'Backspace':
          setExpression(expression.slice(0, expression.length - 1));
          break;
        case 'Enter':
          handleCalculate();
          break;
        case 'NumpadEnter':
          handleCalculate();
          break;
        case 'NumpadAdd':
          handleClick('+');
          break;
        case 'NumpadSubtract':
          handleClick('-');
          break;
        case 'NumpadMultiply':
          handleClick('*');
          break;
        case 'NumpadDivide':
          handleClick('/');
          break;
        case 'KeyC':
          handleClick('CE');
          break;
        case 'Numpad0':
          handleClick('0');
          break;
        case 'Numpad1':
          handleClick('1');
          break;
        case 'Numpad2':
          handleClick('2');
          break;
        case 'Numpad3':
          handleClick('3');
          break;
        case 'Numpad4':
          handleClick('4');
          break;
        case 'Numpad5':
          handleClick('5');
          break;
        case 'Numpad6':
          handleClick('6');
          break;
        case 'Numpad7':
          handleClick('7');
          break;
        case 'Numpad8':
          handleClick('8');
          break;
        case 'Numpad9':
          handleClick('9');
          break;
        case 'NumpadDecimal':
          handleClick('.');
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
      <div id="calc">
        <div id="calc_window">
          <span id="window_result">{expression}</span>
        </div>
        <div id="calc_actions">{actions}</div>
      </div>
    </>
  );
};

export default Calculator;
