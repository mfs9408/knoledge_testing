import React from 'react';
import { useDispatch } from 'react-redux';
import rollSlice, { ESelects } from './store/slice';
import { useSelector } from './store/useSelector';
import {
  getArrayFromTo,
  getCorrectMod,
  getLocaleDate,
  rolls,
  sum,
} from './helpers';
import './App.css';

const N_TIMES_ITEMS = getArrayFromTo(1, 10);
const MOD = getArrayFromTo(-10, 10);

const App = () => {
  const dispatch = useDispatch();

  const { sides, mod, nTimes, resultList } = useSelector(
    (state) => state.rollReducer
  );

  const onSelectChange = (type: ESelects, value: number) => {
    dispatch(rollSlice.actions.onSelectChange({ type, value }));
  };

  const onRollClick = (value: { id: number; value: string }) => {
    dispatch(rollSlice.actions.onRollChange(value));
  };

  const onSumClick = () => {
    const total = sum(nTimes, mod, sides);
    const time = new Date().toISOString();

    dispatch(
      rollSlice.actions.onResultListAdd({
        total,
        nTimes,
        mod,
        sides,
        time,
      })
    );
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="selectContainer">
          <span>n</span>
          <select
            className="select"
            value={nTimes}
            onChange={(event) =>
              onSelectChange(ESelects.N_TIMES, parseInt(event.target.value))
            }
          >
            {N_TIMES_ITEMS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {rolls.map(({ id, value }) => (
          <div
            tabIndex={-1}
            className="dice"
            style={
              sides.id == id
                ? { background: '#0288d1' }
                : { background: 'none' }
            }
            key={id}
            onClick={() => onRollClick({ id, value })}
          >
            {value}
          </div>
        ))}
        <div className="selectContainer">
          <span>mod</span>
          <select
            className="select"
            value={mod}
            onChange={(event) =>
              onSelectChange(ESelects.MOD, parseInt(event.target.value))
            }
          >
            {MOD.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="buttonContainer">
        <button onClick={onSumClick}>Launch</button>
      </div>
      {resultList.length > 0 && (
        <div className="resultContainer">
          <div className="log">
            <span style={{ fontWeight: 'bold' }}>Roll log</span>
          </div>
          {resultList.map(({ sides, mod, total, nTimes, time }, index) => (
            <div key={index}>
              <div className="text">
                <span>[{getLocaleDate(time)}]</span> <span>Your rolled</span>{' '}
                <span className="side">{sides.value}</span>
                <span>
                  {getCorrectMod(mod)} for {total}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
