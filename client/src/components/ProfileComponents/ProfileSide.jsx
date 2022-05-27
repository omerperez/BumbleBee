
import React from "react";
import Card from "@mui/material/Card";
import DealerAvailability from "./DealerAvailability";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/AuthContext";
import { error403 } from "../images/projectImages";

export default function ProfileSide({ user }) {

  const { currentUser } = useAuth();
  const matches = useMediaQuery("(max-width:770px)");
  const matches1000 = useMediaQuery("(max-width:1000px)");

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
          height={matches1000 ? "100%" : "vmax"}
          className={matches ? "cover-back col-6" : "cover-back"}
          src={process.env.REACT_APP_S3 + user.image}
          alt="Paella dish"
          onError={error403}
        />
      </div>
      {user.role === 2 ? (
        <>
          <DealerAvailability
            isCanEdit={currentUser._id === user._id}
            activityDays={user.activityDays}
            activityDaysTime={user.activityDaysTime}
          />
        </>
      ) : null}
    </Card>
  );
}