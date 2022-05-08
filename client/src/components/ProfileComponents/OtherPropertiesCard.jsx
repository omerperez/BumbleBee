import React from "react";
import Card from "@mui/material/Card";
import { useAuth } from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendWhatsAppToDealer } from "../CarComponents/carFunctions";
import UserMoreInfo from "./UserMoreInfo";
import EditAccountDialog from "../DialogComponents/EditAccountDialog";
import ChangePasswordDialog from "../DialogComponents/ChangePasswordDialog";
import RatingDealer from "./RatingDealer";
import DealerRatingDialog from "../DialogComponents/DealerRatingDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShowActivityDays from "../DialogComponents/ShowActivityDays";
import { error403 } from "../images/projectImages";

export default function OtherPropertiesCard({ currentUser }) {

  const { currentUser: myUser } = useAuth();
  const matches = useMediaQuery("(max-width:1010px)");
  const matches770 = useMediaQuery("(max-width:770px)");
  const matches550 = useMediaQuery("(max-width:770px)");

  return (
    <Card sx={{ boxShadow: "none" }}>
      <div className="row">
        <div className="col-12 col-xl">
          {matches770 ? (
            <div className="row d-flex mt-3">
              <h2 className="col-8 col-sm-6 col-md-3 opc-8 ls-2 nowrap">
                {currentUser.firstName + " " + currentUser.lastName}
              </h2>
              <div className="m-auto col-6 col-sm-4 offset-1 col-md-3 ">
                <img
                  className="border-circle border-2-black p-0"
                  width={"100%"}
                  src={process.env.REACT_APP_S3 + currentUser.image}
                  onError={error403}
                />
              </div>
            </div>
          ) : (
            <h2 className="opc-8 ls-2">
              {currentUser.firstName + " " + currentUser.lastName}
            </h2>
          )}
          <div
            style={
              matches770
                ? currentUser.role === 1
                  ? {
                      marginTop: "-10%",
                    }
                  : {
                      marginTop: "-10%",
                    }
                : null
            }
          >
            <b
              style={
                currentUser.role === 1
                  ? {
                      color: "#3cb371",
                      fontSize: 18,
                      letterSpacing: 2,
                    }
                  : {
                      color: "#42ADFF",
                      fontSize: 18,
                      letterSpacing: 2,
                    }
              }
            >
              {currentUser.role === 2
                ? "Dealer"
                : currentUser.role == 3
                ? "Admin"
                : "Client"}
            </b>
          </div>
        </div>
        {myUser._id === currentUser._id ? (
          <div
            className={
              matches
                ? "col-12 d-flex justify-content-start row mt-4"
                : "col d-flex justify-content-start row mt-4"
            }
          >
            <div className="col-12 col-xl">
              <ChangePasswordDialog />
            </div>
            <div className="col-12 col-xl">
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
                Yeziat Europa, Herzliya, Israel
              </span>
            </Typography>
          </div>
          <div className="mt-4">
            <span
              style={{ fontSize: 14, fontWeight: 100, letterSpacing: 1 }}
              className="opc-8"
            >
              {`Rating (${currentUser.usersRate.length} ratings)`}
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
                {currentUser.rating && currentUser.usersRate
                  ? Math.round(
                      (currentUser.rating / currentUser.usersRate.length) * 100
                    ) / 100
                  : 4}
              </span>
              <span style={{ verticalAlign: "middle" }}>
                <RatingDealer
                  readOnly={true}
                  ratingCount={
                    currentUser.rating && currentUser.usersRate
                      ? currentUser.rating / currentUser.usersRate.length
                      : 4
                  }
                />
              </span>
            </Typography>
          </div>
        </>
      ) : null}
      {currentUser._id === myUser._id || currentUser.role !== 2 ? null : (
        <div
          className={
            matches550 ? "d-flex justify-content-center mt-4" : "mt-4 d-flex"
          }
        >
          <Button
            className="capital-letter ls-less1"
            variant="contained"
            endIcon={<MailOutlineIcon />}
          >
            Send Email
          </Button>
          <Button
            className="ml-10 capital-letter ls-less1"
            variant="contained"
            onClick={() =>
              sendWhatsAppToDealer(
                currentUser.phoneNumber,
                currentUser.firstName
              )
            }
            endIcon={<WhatsAppIcon />}
          >
            Send Whatsapp
          </Button>
          {matches550 ? null : (
            <div className="ml-10">
              <DealerRatingDialog
                dealer={currentUser._id}
                client={myUser._id}
              />
            </div>
          )}
          {matches770 && !matches550 ? (
            <div className="ml-10">
              <ShowActivityDays
                isCanEdit={myUser._id === currentUser._id}
                activityDays={currentUser.activityDays}
                activityDaysTime={currentUser.activityDaysTime}
              />
            </div>
          ) : null}
        </div>
      )}
      {matches550 ? (
        <div className="mt-4 d-flex justify-content-center">
          {currentUser._id === myUser._id || currentUser.role !== 2 ? null : (
            <div>
              <DealerRatingDialog
                dealer={currentUser._id}
                client={myUser._id}
              />
            </div>
          )}
          <div className="ml-10">
            <ShowActivityDays
              isCanEdit={myUser._id === currentUser._id}
              activityDays={currentUser.activityDays}
              activityDaysTime={currentUser.activityDaysTime}
            />
          </div>
        </div>
      ) : null}
      <div className="mt-4">
        <UserMoreInfo
          currentUser={currentUser}
          isUserPtofile={myUser._id === currentUser._id}
        />
      </div>
    </Card>
  );
}
