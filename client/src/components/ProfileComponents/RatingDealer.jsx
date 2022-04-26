import React, {useState} from 'react';
import Rating from '@mui/material/Rating';

export default function RatingDealer({readOnly, ratingCount}) {
  const [value, setValue] = useState(readOnly ? ratingCount : 2);

  return (
    <Rating
      name="simple-controlled"
      value={readOnly ? ratingCount : value}
      readOnly={readOnly}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );

}