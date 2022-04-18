import React from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function AlertLayout({ fullName, mobile, carId }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2} className="mt-2">
      <Alert variant="outlined" severity="info">
        <AlertTitle>
          New Request From
          <b>{" " + fullName} </b>
        </AlertTitle>
        <span className="f-19 opc-8" style={{ letterSpacing: 1.5 }}>
          client mobile: {mobile}
        </span>
        <br />
        <Link to={`/car-profile/${carId}`}>
          <span className="f-19 opc-8" style={{ letterSpacing: 1.5 }}>
            Go to car profile
          </span>
        </Link>
      </Alert>
    </Stack>
  );
}
