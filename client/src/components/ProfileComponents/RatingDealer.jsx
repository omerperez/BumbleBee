import React, {useState} from 'react';
import Rating from '@mui/material/Rating';

export default function RatingDealer({ readOnly, ratingCount, setRatingCount }) {
  if(ratingCount === null){
    return <h4 className='fw-100 mt-3'>No Rating Yet</h4>
  }
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