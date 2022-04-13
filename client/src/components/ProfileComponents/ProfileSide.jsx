
import React from "react";
import Card from "@mui/material/Card";
import { useAuth } from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfileSide({ currentUser }) {
  
  return (
      <Card sx={{ boxShadow: "none" }}>
        {/* {" "} */}
        {/* width: 350, */}
        <div className="d-flex justify-content-center">
          <img
            width={"100%"}
            // height={300}
            className="cover-back" //border-circle
            src={process.env.REACT_APP_S3 + currentUser.image}
            alt="Paella dish"
          />
        </div>
        <div className="mt-3">
          <div className="opc-8 row">
            <div
              style={{ fontWeight: 300, fontSize: 20, letterSpacing: 2 }}
              className="col-3 col-sm-4"
            >
              Availability
            </div>
            <Divider className="col" style={{ margin: "auto" }} />
          </div>
          <div className="d-flex justify-content-center"></div>
        </div>
        <div className="opc-8 days-grid mt-2" style={{ fontWeight: 100 }}>
          <div>Sunday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Monday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Tuesday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Wednesday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Thursday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Friday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>

          <div>Saturday</div>
          <div style={{ textAlign: "end" }}>08:00 - 18:00</div>
        </div>
        {/* <ClearIcon style={{ marginLeft: 30 }} color="error" /> */}
        {/* <CheckIcon style={{ marginLeft: 30 }} color="success" /> */}
        {/* <div className="d-flex justify-content-center mb-4 mt-4">
          <Link to={"edit"} className="link-in-btn" variant="contained">
            <Button
              className={
                currentUser.role !== 1
                  ? "edit-profile-btn-dealer"
                  : "edit-profile-btn"
              }
            >
              Edit Profile
            </Button>
          </Link>
        </div> */}
      </Card>
  );
}
