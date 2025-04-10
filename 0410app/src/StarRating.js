import React, { useState } from 'react';
import { FaStarOfDavid } from 'react-icons/fa';

const createArray = length => [...Array(length)];
const Star = ({ selected = false, onSelect = f => f }) => (
    <FaStarOfDavid color={selected ? "red" : "blue"} onClick={onSelect} />
);

export default function StarRating({ totalStars = 7 }) {
  const [selectedStars, setSelectedStars] = useState(5);

  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
