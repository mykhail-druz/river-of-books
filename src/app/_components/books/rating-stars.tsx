// components/RatingStars.js
import React from 'react';
import { RatingStar } from './rating-star';

const RatingStars = ({ rating } : {rating: number}) => {
  const maxStars = 5;
  return (
    <div className="flex items-center rating">
      {[...Array(maxStars)].map((_, index) => (
        <div key={index}>
          <RatingStar checked={index + 1 <= rating} />
        </div>
      ))}
    </div>
  );
};

export default RatingStars;