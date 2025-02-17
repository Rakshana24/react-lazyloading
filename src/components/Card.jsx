import React from 'react';

const Card = ({ index }) => {
  return (
    <div className="card">
      <h3>Card {index}</h3>
      <p>This is the content for card {index}.</p>
    </div>
  );
};

export default Card;
