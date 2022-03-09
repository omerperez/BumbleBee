import React,{useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import "./Navigation.modules.css";
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    justifyContent: 'start',
    marginLeft: '1.5rem',
    alignItems: "center",
  },
  name: {
    fontSize: "1.4rem",
    fontFamily: 'sans-serif',
    marginLeft: "15px !important",
    marginRight: '15px',
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          src={
            `https://bumblebee-pro.s3.eu-west-1.amazonaws.com/${currentUser.image}`
            // "/profileImage.png"
            // "https://bumblebee-pro.s3.eu-west-1.amazonaws.com/1643565628601WhatsApp+Image+2022-01-14+at+6.16.48+PM.jpeg"
            // currentUser.image
          }
          className="profileImage"
        />
        <Typography variant="h6" component={"h2"} className={classes.name}>
          {currentUser.firstName + " " + currentUser.lastName}
        </Typography>
      </div>
    </div>
  );
}
