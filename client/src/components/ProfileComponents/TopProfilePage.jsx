import React from "react";
import { topProfilePageStyles } from "../../styles/UseStylesMui";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { error403 } from "../images/projectImages";



export default function TopProfilePage({fullName, image}) {
  const classes = topProfilePageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          src={image}
          className="border-circle border3-black h-150 w-150"
          onError={error403}
        />
        <Typography variant="h3" className={classes.name}>
          {fullName}
        </Typography>
      </div>
      <Divider style={{ margin: "0.7%", marginRight: "20px" }} />
    </div>
  );
}
