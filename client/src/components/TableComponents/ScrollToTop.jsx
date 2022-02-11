import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  toTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#4679BF",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    padding: "8px 4px 8px 4px",
    marginBottom: "20px",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "white",
      backgroundColor: "#4679BF",
    },
    right: "0.8%",
  },
});

export default function ScrollToTop({ showBelow }){
  const classes = useStyles();
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
          <ExpandLessIcon style={{ fontSize: "1.5rem" }} />
        </div>
      )}
    </div>
  );
};

