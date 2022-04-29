import React, {useState} from 'react';
import Rating from '@mui/material/Rating';

export default function RatingDealer({ readOnly, ratingCount, setRatingCount }) {
  return (
    <Rating
      style={readOnly ? null : {fontSize: 60 }}
      name="simple-controlled"
      value={readOnly ? ratingCount : ratingCount}
      readOnly={readOnly}
      onChange={(event, newValue) => {
        setRatingCount(newValue);
      }}
    />
  );
}