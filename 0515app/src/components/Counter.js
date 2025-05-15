import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount
} from '../redux/counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(5);

  return (
    <div className="counter-center">
      <div>
        <button onClick={() => dispatch(increment())} className="btn btn-submit">
          Increment
        </button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <button onClick={() => dispatch(decrement())} className="btn btn-submit">
          Decrement
        </button>
      </div>

      <div className="counter-amount-group" style={{ marginTop: 20 }}>
        <button
          className="btn btn-submit"
          onClick={() => dispatch(incrementByAmount(Number(amount)))}
        >
          加
        </button>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="counter-amount-input"
        />

        <button
          className="btn btn-submit"
          onClick={() => dispatch(incrementByAmount(-Number(amount)))}
        >
          減
        </button>
      </div>
    </div>
  );
}
