import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Button, Divider } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendWhatsAppToDealer } from "./carFunctions";
import { error403 } from "../images/projectImages";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FirstRequestDialog from "../AlertsComponents/FirstRequestDialog";

export default function DealerCard({ dealer, role, car }) {

  const mobile = dealer.phoneNumber ? dealer.phoneNumber : "+972522520484";
  const { currentUser } = useAuth();

  return (
    <div className="mr-10 p-3" style={{ border: "solid 1px black" }}>
      <div className="days-grid">
        <div>
          <Typography component="div" variant="h4">
            {dealer.firstName + " " + dealer.lastName}
          </Typography>
          <div className="color-yellow">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <div className="mt-3">
            <div>
              <AlternateEmailIcon className="mr-5" />
              {dealer.email}
            </div>
            <div className="mt-3 d-flex">
              <LocationOnIcon className="mr-5" />
              Josef-Bautc-Strasse 16
              <br />
              DE-63457 Hanau
            </div>
            <div className="mt-3">
              <PhoneInTalkIcon className="mr-5" />
              {mobile}
            </div>
          </div>
        </div>
        <div
          className="justify-content-center"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <img
            src={process.env.REACT_APP_S3 + dealer.image}
            width={170}
            className="border-circle border3-black"
            onError={error403}
          />
        </div>
      </div>
      <Divider className="mt-4" />
      <div className="time-grid mt-3">
        {role == 1 ? (
          <div className="m-2">
            <FirstRequestDialog car={car} />
          </div>
        ) : null}
        <Button
          className="capital-letter bg-col-green m-2"
          variant="contained"
          onClick={() => sendWhatsAppToDealer(mobile, dealer.firstName)}
        >
          Contact <WhatsAppIcon className="m-2" />
        </Button>
        <Button variant="contained" className="m-2">
          <Link
            className="color-white cancel-underline capital-letter"
            to={
              currentUser._id === dealer._id
                ? "/my-profile"
                : `/profile/${dealer._id}`
            }
          >
            More Info
          </Link>
        </Button>
      </div>
    </div>
  );
}


{/* <Card className="grid-container d-flex" style={{ minHeight: 400 }}>
  <Box className="grid-item">
    <CardContent>
      <Typography component="div" variant="h4">
        {dealer.firstName + " " + dealer.lastName}
      </Typography>
      <Typography variant="subtitle1" color={"#e2a021"} className="mt-1">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </Typography>
      <div className="mt-3">
        <div>
          <AlternateEmailIcon className="mr-5" />
          {dealer.email}
        </div>
        <div className="mt-3 d-flex">
          <LocationOnIcon className="mr-5" />
          Josef-Bautc-Strasse 16
          <br />
          DE-63457 Hanau
        </div>
        <div className="mt-3 d-flex">
          <PhoneInTalkIcon className="mr-5" />
          {mobile}
        </div>
        <div className="mt-4 d-flex justify-content-center row">
          <Button className="col">
            <Link
              to={
                currentUser._id === dealer._id
                  ? "/my-profile"
                  : `/profile/${dealer._id}`
              }
            >
              My Link
            </Link>
          </Button>
          <Button
            className="capital-letter bg-col-green"
            color="success"
            variant="contained"
            onClick={() => sendWhatsAppToDealer(mobile, dealer.firstName)}
          >
            Send <WhatsAppIcon className="m-2" />
            {"to " + dealer.firstName + " " + dealer.lastName}
          </Button>
        </div>
        {role == 1 ? (
          <div className="mt-4 d-flex justify-content-center nowrap">
            <FirstRequestDialog />
          </div>
        ) : null}
      </div>
    </CardContent>
  </Box>
  <div className="auto-margin grid-item">
    <img
      src={process.env.REACT_APP_S3 + dealer.image}
      width={170}
      className="border-circle border3-black"
      onError={error403}
    />
  </div>
</Card>; */}