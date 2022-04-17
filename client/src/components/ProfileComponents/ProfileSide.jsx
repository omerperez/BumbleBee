
import React from "react";
import Card from "@mui/material/Card";
import DealerAvailability from "./DealerAvailability";

export default function ProfileSide({ currentUser }) {
  
  return (
    <Card sx={{ boxShadow: "none" }}>
      <div className="d-flex justify-content-center">
        <img
          width={"100%"}
          height={445}
          className="cover-back"
          src={process.env.REACT_APP_S3 + currentUser.image}
          alt="Paella dish"
        />
      </div>
      {currentUser.role === 2 ? (
        <>
          {console.log(currentUser)}
          <DealerAvailability
            activityDays={currentUser.activityDays}
            activityDaysTime={currentUser.activityDaysTime}
            // closingTime={currentUser.closingTime}
          />
        </>
      ) : null}
    </Card>
  );
}