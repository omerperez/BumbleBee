import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "../../contexts/AuthContext";
import { Divider } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";


export default function DealerOtherPropertiesCard() {
  const { currentUser } = useAuth();

  return (
    <div className="d-flex justify-content-start">
      <Card sx={{ width: "80%" }}>
        <div className="padding-usercard">
          <h4>Other Properties</h4>
        </div>
        <Divider />
        <div className="mt-3 mr-25 ml-25 cars-grid">
          <div>
            <h5 style={{ textDecoration: "underline" }}>Hours of activity</h5>
            <div className="f-19 mb-2">
              {`${currentUser.closingTime} - ${currentUser.openingTime}`}
            </div>
          </div>
          <div>
            <h5 style={{ textDecoration: "underline" }}>Days of activity</h5>
            <div className="f-19">{currentUser.activityDays}</div>
          </div>
        </div>
        <div className="mt-3 mr-25 ml-25 cars-grid">
          <div>
            <h5 style={{ textDecoration: "underline" }}>Rating</h5>
            <div className="f-19 mb-2">
              {`${currentUser.rating} (${currentUser.ratingCount} voting)`}
            </div>
          </div>
          <div>
            <h5 style={{ textDecoration: "underline" }}>Count Of Cars</h5>
            <div className="f-19">{currentUser.cars.length}</div>
          </div>
        </div>

        <div className="mt-3 mr-25 ml-25 cars-grid">
          <div>
            <h5 style={{ textDecoration: "underline" }}>Address</h5>
            <div className="f-19 mb-2">
              {`${currentUser.street ?? "No"} ${
                currentUser.city ?? "Address"
              } ${currentUser.country ?? "Valid"}`}
            </div>
          </div>
        </div>
        <CardContent className="d-flex justify-content-center mt-3">
          <div className="d-flex justify-content-center mb-4 mt-4">
            <Link
              to={"edit"}
              className="link-in-btn"
              variant="contained"
            >
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
