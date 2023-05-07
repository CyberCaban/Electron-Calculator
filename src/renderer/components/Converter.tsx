/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import './Converter.css';
import buttons from '../buttons';

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

const Converter: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromUnit, setFromUnit] = useState<IUnit>('Bit');
  const [toUnit, setToUnit] = useState<IUnit>('Bit');

  const handleClick = (value: string) => {
    if (value === 'CE') {
      setFrom('');
      return;
    }
    setFrom(from + value);
  };

  useEffect(() => {
    console.log('fromUnit', fromUnit, 'toUnit', toUnit);
    setTo(String((+from * ConversionRate[fromUnit]) / ConversionRate[toUnit]));
  }, [toUnit, fromUnit, from]);

  useEffect(() => {
    const keyboardInput = (event: any) => {
      // console.log(event);

      switch (event.code) {
        case 'Backspace':
          setFrom(from.slice(0, from.length - 1));
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
          <span id="window_input">{from + ' ' + fromUnit}</span>
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
          <span id="window_result">{to + ' ' + toUnit}</span>
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
        <div id="conv_actions">
          {buttons.map((item) => {
            return (
              <div
                className={`action num_pad ${item.classname}`}
                onClick={() => handleClick(item.value)}
                key={item.value}
              >
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Converter;
