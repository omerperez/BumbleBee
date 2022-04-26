import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendWhatsAppToDealer } from "../CarComponents/carFunctions";

import UserMoreInfo from "./UserMoreInfo";
import EditAccountDialog from "../DialogComponents/EditAccountDialog";
import ChangePasswordDialog from "../DialogComponents/ChangePasswordDialog";
import RatingDealer from "./RatingDealer";

export default function OtherPropertiesCard({ currentUser }) {
  
  const { currentUser: myUser } = useAuth();

  return (
    <Card sx={{ boxShadow: "none" }}>
      <div className="row">
        <div className="col">
          <h2 className="opc-8 ls-2">
            {currentUser.firstName + " " + currentUser.lastName}
          </h2>
          <b
            style={
              currentUser.role === 1
                ? {
                    color: "#3cb371",
                    fontSize: 18,
                    letterSpacing: 2,
                  }
                : { color: "#42ADFF", fontSize: 18, letterSpacing: 2 }
            }
          >
            {currentUser.role === 2
              ? "Dealer"
              : currentUser.role == 3
              ? "Admin"
              : "Client"}
          </b>
        </div>
        {myUser._id === currentUser._id ? (
          <div className="col d-flex justify-content-end row">
            <div className="col offset-3">
              <ChangePasswordDialog />
            </div>
            <div className="col">
              <EditAccountDialog mobileNumber={currentUser.phoneNumber} />
            </div>
          </div>
        ) : null}
      </div>
      {currentUser.role === 2 ? (
        <>
          <div className="mt-5 opc-8">
            <Typography variant="subtitle1">
              <span
                style={{
                  marginRight: 8,
                  verticalAlign: "middle",
                }}
              >
                <LocationOnIcon
                  className="opc-8"
                  style={{ verticalAlign: "baseline" }}
                />
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: "black",
                  opacity: 0.5,
                  fontWeight: 100,
                  letterSpacing: 0.5,
                }}
              >
                Yeziat Eutopa, Herzliya, Israel
              </span>
            </Typography>
          </div>
          <div className="mt-4">
            <span
              style={{ fontSize: 14, fontWeight: 100, letterSpacing: 1 }}
              className="opc-8"
            >
              Rating
            </span>
            <Typography variant="subtitle1" color={"#e2a021"}>
              <span
                style={{
                  fontSize: 24,
                  color: "black",
                  opacity: 0.5,
                  fontWeight: 600,
                  marginRight: 8,
                }}
              >
                5
              </span>
              <span style={{ verticalAlign: "middle" }}>
                <RatingDealer readOnly={true} ratingCount={5} />
              </span>
            </Typography>
          </div>
        </>
      ) : null}
      <div className="mt-4">
        <Button
          style={{ letterSpacing: 1 }}
          className="capital-letter"
          variant="contained"
          endIcon={<MailOutlineIcon />}
        >
          Send Email
        </Button>
        <Button
          style={{ letterSpacing: 1 }}
          className="ml-10 capital-letter"
          variant="contained"
          onClick={() =>
            sendWhatsAppToDealer(currentUser.phoneNumber, currentUser.firstName)
          }
          endIcon={<WhatsAppIcon />}
        >
          Send Whatsapp
        </Button>
      </div>
      <div className="mt-4">
        <UserMoreInfo
          currentUser={currentUser}
          isUserPtofile={myUser._id === currentUser._id}
        />
      </div>
    </Card>
  );
}
