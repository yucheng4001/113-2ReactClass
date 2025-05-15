import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateText } from '../redux/textSlice';

export default function MyText() {
  const text = useSelector((state) => state.text.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateText(e.target.value));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <h2 style={{ fontWeight: 'bold' }}>{text}</h2>
    </div>
  );
}
