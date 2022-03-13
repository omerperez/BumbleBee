import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { scrollTableTopStyles } from "../../styles/UseStylesMui";

export default function ScrollToTop({ showBelow }){
  const classes = scrollTableTopStyles();
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };
  return (
    <div>
      {show && (
        <div onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </div>
      )}
    </div>
  );
};

