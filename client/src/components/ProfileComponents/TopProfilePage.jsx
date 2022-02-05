import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    color: "#363636",
    justifyContent: "start",
    marginLeft: "2rem",
    alignItems: "center",
  },
  name: {
    fontFamily: "sans-serif",
    marginLeft: "15px !important",
    
  },
}));

export default function TopProfilePage({fullName, image}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          src={image}
          style={{
            border: "solid 3px #363636",
            borderRadius: "50%",
            height: 150,
            width: 150,
          }}
        />
        <Typography variant="h3" className={classes.name}>
          {fullName}
        </Typography>
      </div>
      <Divider style={{ margin: '0.7%', marginRight: '20px'}} />
    </div>
  );
}
