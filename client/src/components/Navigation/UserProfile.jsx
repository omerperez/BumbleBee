import React from "react";
import Typography from "@mui/material/Typography";
import "./Navigation.modules.css";
import { useAuth } from '../../contexts/AuthContext';
import { error403 } from "../images/projectImages";
import {userProfileStyles} from "../../styles/UseStylesMui";

export default function UserProfile() {
  const classes = userProfileStyles();
  const { currentUser } = useAuth();
  
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          className="profileImage"
          src={process.env.REACT_APP_S3 + currentUser.image}
          onError={error403}
        />
        <Typography variant="h6" component={"h2"} className={classes.name}>
          {currentUser.firstName + " " + currentUser.lastName}
        </Typography>
      </div>
    </div>
  );
}
