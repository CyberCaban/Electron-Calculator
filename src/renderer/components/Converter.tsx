/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import './Converter.css';

type IUnit =
  | 'Bit'
  | 'Byte'
  | 'Kilobyte'
  | 'Megabyte'
  | 'Gigabyte'
  | 'Terabyte'
  | 'Petabyte';
const Units: IUnit[] = [
  'Bit',
  'Byte',
  'Kilobyte',
  'Megabyte',
  'Gigabyte',
  'Terabyte',
  'Petabyte',
];
const ConversionRate: Record<IUnit, number> = {
  Bit: 1,
  Byte: 8,
  Kilobyte: 8192,
  Megabyte: 8388608,
  Gigabyte: 8589934592,
  Terabyte: 8796093022208,
  Petabyte: 9007199254740992,
};

console.log(ConversionRate.Gigabyte);

const Converter: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [fromUnit, setFromUnit] = useState<IUnit>('Bit');
  const [toUnit, setToUnit] = useState<IUnit>('Bit');

  const handleClick = (value: string) => {
    setExpression(expression + value);
  };

  useEffect(() => {
    console.log('fromUnit', fromUnit, 'toUnit', toUnit);
  }, [toUnit, fromUnit]);

  useEffect(() => {
    const keyboardInput = (event: any) => {
      switch (event.code) {
        case 'Backspace':
          setExpression(expression.slice(0, expression.length - 1));
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
      <div id="conv">
        <div id="conv_window">
          <span id="window_input">{expression + ' ' + fromUnit}</span>
          <select
            name="fromUnit"
            id="fromUnitAction"
            onChange={(e) => setFromUnit(e.target.value)}
            value={fromUnit}
          >
            {Units.map((unit) => (
              <option value={unit}>{unit}</option>
            ))}
          </select>
          <span id="window_result">{expression + ' ' + toUnit}</span>
          <select
            name="toUnit"
            id="toUnitAction"
            onChange={(e) => setToUnit(e.target.value)}
            value={toUnit}
          >
            {Units.map((unit) => (
              <option value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div id="conv_actions"></div>
      </div>
    </>
  );
};

export default Converter;
