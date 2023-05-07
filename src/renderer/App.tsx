/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.css';
import { useState, Suspense, lazy, useEffect } from 'react';

type IPages = 'defaultCalc' | 'converterCalc';

const CalculatorComponent = lazy(() => import('./components/Calculator'));
const ConverterComponent = lazy(() => import('./components/Converter'));

function App() {
  const [page, setPage] = useState<IPages>('defaultCalc');
  const [toggleSelect, settoggleSelect] = useState(false);

  function togglePage(page: string) {
    if (toggleSelect) {
      settoggleSelect(false);
    } else {
      settoggleSelect(true);
    }
    if (page === 'defaultCalc') {
      setPage('defaultCalc');
    }
    if (page === 'converterCalc') {
      setPage('converterCalc');
    }
  }

  useEffect(() => {
    const keypress = (event: any) => {
      if (event.altKey && event.code === 'Digit1') {
        setPage('defaultCalc');
      }
      if (event.altKey && event.code === 'Digit2') {
        setPage('converterCalc');
      }
    };

    window.addEventListener('keydown', keypress);
    return () => {
      window.removeEventListener('keydown', keypress);
    };
  });

  return (
    <>
      <div id="titleBar">
        <p>SMCalc</p>
      </div>
      <div id={toggleSelect ? 'calcSelect' : 'calcSelectNone'}>
        <div id="defaultCalc" onClick={() => togglePage('defaultCalc')}>
          Calculator
        </div>
        <div id="converterCalc" onClick={() => togglePage('converterCalc')}>
          Converter
        </div>
      </div>
      <div
        id="calcBurger"
        onClick={() =>
          toggleSelect ? settoggleSelect(false) : settoggleSelect(true)
        }
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <Suspense fallback="Loading...">
        {page === 'defaultCalc' ? <CalculatorComponent /> : null}
        {page === 'converterCalc' ? <ConverterComponent /> : null}
      </Suspense>
    </>
  );
}

export default App;
