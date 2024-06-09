import React from 'react';

function StarRating({ rate }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(<span key={i} style={{color: "gold"}}>&#9733;</span>);
    } else {
      stars.push(<span key={i} style={{color: "gold"}}>&#9734;</span>); 
    }
  }

  return <div>{stars}</div>;
}

export default StarRating;
