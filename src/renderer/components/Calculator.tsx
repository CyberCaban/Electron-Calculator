/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { HistoryOutlined } from '@ant-design/icons';
import * as math from 'mathjs';
import styles from './Calculator.module.css';
import buttons from '../buttons';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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
      const result = +math.evaluate(expression).toFixed(6);
      if (isNaN(result)) {
        setExpression('Error');
      } else {
        const temp = history.slice();
        temp.push(expression + ' = ' + String(result));
        setHistory(temp);
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

  useEffect(() => {
    const keyboardInput = (event: any) => {
      console.log(event);

      switch (event.code) {
        case 'KeyH':
          showHistory ? setShowHistory(false) : setShowHistory(true);
          break;
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
      <div className={styles.calc}>
        <div
          className={styles.calcHistoryBtn}
          onClick={() =>
            showHistory ? setShowHistory(false) : setShowHistory(true)
          }
        >
          <HistoryOutlined
            style={{
              color: '#f0f5ff',
              fontSize: '35px',
              margin: 'auto',
            }}
          />
        </div>

        <div className={styles.calc_window}>
          <span className={styles.window_result}>{expression}</span>
        </div>
        <div className={styles.calc_actions}>
          {buttons.map((item) => {
            let extraClass = '';
            if (item.classname === 'result' || item.classname === 'plus') {
              extraClass = styles.plus;
            }
            return (
              <button
                className={`${styles.action} ${extraClass}`}
                onClick={() => getFunctionButton(item.type, item.value)}
                key={item.value}
              >
                <p>{item.value}</p>
              </button>
            );
          })}
        </div>
        <div
          className={showHistory ? styles.calcHistory : styles.calcHistoryNone}
        >
          {history.map((item) => {
            return <li>{item}</li>;
          })}
        </div>
      </div>
    </>
  );
};

export default Calculator;
