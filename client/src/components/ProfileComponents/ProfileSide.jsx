
import React from "react";
import Card from "@mui/material/Card";
import DealerAvailability from "./DealerAvailability";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileSide({ currentUser }) {

  const { currentUser: myUser } = useAuth();
  const matches = useMediaQuery("(max-width:770px)");

  return (
    <Card sx={{ boxShadow: "none" }}>
      <div
        className={
          matches
            ? "d-flex justify-content-center row"
            : "d-flex justify-content-center"
        }
      >
        <img
          width={"100%"}
          height={445}
          className={matches ? "cover-back col-6" : "cover-back"}
          src={process.env.REACT_APP_S3 + currentUser.image}
          alt="Paella dish"
        />
      </div>
      {currentUser.role === 2 ? (
        <>
          <DealerAvailability
            isCanEdit={myUser._id === currentUser._id}
            activityDays={currentUser.activityDays}
            activityDaysTime={currentUser.activityDaysTime}
          />
        </>
      ) : null}
    </Card>
  );
}