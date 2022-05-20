import React from "react";
import "./Navigation.modules.css";
import { useAuth } from '../../contexts/AuthContext';
import { error403 } from "../images/projectImages";
import {userProfileStyles} from "../../styles/UseStylesMui";
import { Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const classes = userProfileStyles();
  const { currentUser } = useAuth();

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Link to="/my-profile">
            <img
              className="profileImage"
              src={process.env.REACT_APP_S3 + currentUser.image}
              onError={error403}
            />
          </Link>
          <Typography variant="h6" component={"h2"} className={classes.name}>
            {currentUser.firstName + " " + currentUser.lastName}
            <div className="d-flex justify-content-center">
              <Chip
                size="small"
                label={
                  currentUser.role === 2
                    ? "Dealer"
                    : currentUser.role == 3
                    ? "Admin"
                    : "Client"
                }
                className="client-tag"
              />
            </div>
          </Typography>
        </div>
      </div>
    );
}
