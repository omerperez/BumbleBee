import React from "react";
import { topProfilePageStyles } from "../../styles/UseStylesMui";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";



export default function TopProfilePage({fullName, image}) {
  const classes = topProfilePageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img src={image} className="border-circle border3-black h-150 w-150" />
        <Typography variant="h3" className={classes.name}>
          {fullName}
        </Typography>
      </div>
      <Divider style={{ margin: "0.7%", marginRight: "20px" }} />
    </div>
  );
}
