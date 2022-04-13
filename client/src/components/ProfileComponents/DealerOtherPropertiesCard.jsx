import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "../../contexts/AuthContext";
import { Divider } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { fontWeight } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendWhatsAppToDealer } from "../CarComponents/carFunctions";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function DealerOtherPropertiesCard() {
  const { currentUser } = useAuth();

  return (
    <Card sx={{ boxShadow: "none" }}>
      <div className="row">
        <div className="col">
          <h2 className="opc-8" style={{ letterSpacing: 2 }}>
            {currentUser.firstName + " " + currentUser.lastName}
          </h2>
          <b style={{ color: "#42ADFF", fontSize: 18, letterSpacing: 2 }}>
            {currentUser.role === 2
              ? "Dealer"
              : currentUser.role == 3
              ? "Admin"
              : "Client"}
          </b>
        </div>
        <div className="col d-flex justify-content-end">
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
        </div>
      </div>
      {/* <Chip
          className={currentUser.role === 2 ? "dealer-tag" : "client-tag"}
          label={
            currentUser.role === 2
              ? "Dealer"
              : currentUser.role == 3
              ? "Admin"
              : "Client"
          }
        /> */}

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
            <StarIcon style={{ verticalAlign: "baseline" }} />
            <StarIcon style={{ verticalAlign: "baseline" }} />
            <StarIcon style={{ verticalAlign: "baseline" }} />
            <StarIcon style={{ verticalAlign: "baseline" }} />
            <StarIcon style={{ verticalAlign: "baseline" }} />
          </span>
        </Typography>
      </div>
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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={"1"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="lab API tabs example"
                style={{ letterSpacing: "1.5px" }}
              >
                <Tab
                  style={{ padding: "0" }}
                  className="capital-letter"
                  label="More Inforamtion"
                  value="1"
                />
              </TabList>
            </Box>
            <div className="mt-4 opc-8">
              <span
                className="opacity-50"
                style={{ fontSize: 15, fontWeight: 600, letterSpacing: 1 }}
              >
                Contact Information
              </span>
            </div>
            <div className="row mt-4">
              <b className="col-6 col-sm-3" style={{ letterSpacing: 1 }}>
                Phone
              </b>
              <span
                style={{ fontWeight: 100, letterSpacing: 1.2 }}
                className="col-6 col-sm-5"
              >
                +972-52-252-0484
              </span>
            </div>
            <div className="row mt-4">
              <b className="col-6 col-sm-3" style={{ letterSpacing: 1 }}>
                E-mail
              </b>
              <span
                className="col-6 col-sm-4"
                style={{ fontWeight: 100, letterSpacing: 1.2 }}
              >
                omer@gmail.com
              </span>
            </div>
            <div className="row mt-4">
              <b className="col-6 col-sm-3" style={{ letterSpacing: 1 }}>
                Manufacturer Types
              </b>
              <span
                className="col-6 col-sm-4"
                style={{ fontWeight: 100, letterSpacing: 1.2 }}
              >
                Audi, BMW, Nissan, Kia, Mini
              </span>
            </div>
            <div className="row mt-4">
              <b className="col-6 col-sm-3" style={{ letterSpacing: 1 }}>
                Website
              </b>
              <span
                className="col-6 col-sm-4"
                style={{ fontWeight: 100, letterSpacing: 1.2 }}
              >
                <Link className=" cancel-underline" to={"/homepage"}>
                  www.mobile.de.com
                </Link>
              </span>
            </div>
          </TabContext>
        </Box>
      </div>
      {/* cars-grid */}
      {/* <div className="mt-3 mr-25 ml-25 cars-grid">
        <div>
          <h5 style={{ textDecoration: "underline" }}>Address</h5>
          <div className="f-19 mb-2">
            {`${currentUser.street ?? "No"} ${currentUser.city ?? "Address"} ${
              currentUser.country ?? "Valid"
            }`}
          </div>
        </div>
      </div> */}
      {/* <CardContent className="d-flex justify-content-center mt-3">
        <div className="d-flex justify-content-center mb-4 mt-4">
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
        </div>
      </CardContent> */}
    </Card>
  );
}
