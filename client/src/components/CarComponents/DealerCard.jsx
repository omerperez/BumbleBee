import React from "react"; 
import { sendWhatsAppToDealer } from "./carFunctions";
import { error403 } from "../images/projectImages";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FirstRequestDialog from "../AlertsComponents/FirstRequestDialog";
import RatingDealer from "../ProfileComponents/RatingDealer";
import { Button, Divider, Typography, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function DealerCard({ dealer, role, car, showReq }) {
  const mobile = dealer.phoneNumber ? dealer.phoneNumber : "+972522520484";
  const { currentUser } = useAuth();
  const matches1310 = useMediaQuery("(max-width:1310px)");

  return (
    <div className="p-3">
      <div className="row">
        <div className={matches1310 ? "col-12" : "col-12 col-md-7 col-xxl-7"}>
          <div className="row">
            <Typography
              component="div"
              className={matches1310 ? "col-8 nowrap" : "col"}
              variant="h4"
            >
              {dealer.firstName + " " + dealer.lastName}
            </Typography>
            {matches1310 ? (
              <div className="col-4 m-auto p-0">
                <img
                  src={process.env.REACT_APP_S3 + dealer.image}
                  width={"100%"}
                  className="border-circle border3-black"
                  onError={error403}
                />
              </div>
            ) : null}
          </div>
          <div
            className={matches1310 ? "color-yellow" : "color-yellow mt-2"}
            style={matches1310 ? { marginTop: "-15%" } : null}
          >
            <RatingDealer
              readOnly={true}
              ratingCount={
                dealer.rating && dealer.usersRate
                  ? dealer.rating / dealer.usersRate.length
                  : 5
              }
            />
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
        {!matches1310 ? (
          <div className="justify-content-center col-6 col-xl-5 m-auto">
            <img
              src={process.env.REACT_APP_S3 + dealer.image}
              width={"100%"}
              className="border-circle border3-black"
              onError={error403}
            />
          </div>
        ) : null}
      </div>
      <Divider className="mt-4" />
      <div className="time-grid mt-3">
        {role == 1 ? (
          <div className="m-2">
            <FirstRequestDialog car={car} showReq={showReq} />
          </div>
        ) : null}
        {currentUser._id === dealer._id ? null : (
          <Button
            className="capital-letter bg-col-green m-2 h-75"
            variant="contained"
            onClick={() => sendWhatsAppToDealer(mobile, dealer.firstName)}
          >
            Contact <WhatsAppIcon className="m-2" />
          </Button>
        )}
        <Link
          className=""
          to={
            currentUser._id === dealer._id
              ? "/my-profile"
              : `/profile/${dealer._id}`
          }
        >
          <Button
            variant="contained"
            fullWidth
            className="m-2 color-white cancel-underline capital-letter h-75"
          >
            {currentUser._id === dealer._id ? "My Profile" : "More Info"}
          </Button>
        </Link>
      </div>
    </div>
  );
}