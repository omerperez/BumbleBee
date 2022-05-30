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

export default function OtherPropertiesCard({ user, setFlag, flag }) {
  const { currentUser } = useAuth();
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
                {user.firstName + " " + user.lastName}
              </h2>
              <div className="m-auto col-6 col-sm-4 offset-1 col-md-3 ">
                <img
                  className="border-circle border-2-black p-0"
                  width={"100%"}
                  src={process.env.REACT_APP_S3 + user.image}
                  onError={error403}
                />
              </div>
            </div>
          ) : (
            <h2 className="opc-8 ls-2">
              {user.firstName + " " + user.lastName}
            </h2>
          )}
          <div
            style={
              matches770
                ? user.role === 1
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
                user.role === 1
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
              {user.role === 2 ? "Dealer" : user.role == 3 ? "Admin" : "Client"}
            </b>
          </div>
        </div>
        {currentUser._id === user._id ? (
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
              <EditAccountDialog
                mobileNumber={user.phoneNumber}
                setFlag={setFlag}
                flag={flag}
              />
            </div>
          </div>
        ) : null}
      </div>
      {user.role === 2 ? (
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
              {`Rating (${user.usersRate.length} ratings)`}
            </span>
            <Typography
              variant="subtitle1"
              color={user.rating && user.usersRate ? "#e2a021" : null}
            >
              {user.rating && user.usersRate ? (
                <span
                  style={{
                    fontSize: 24,
                    color: "black",
                    opacity: 0.5,
                    fontWeight: 600,
                    marginRight: 8,
                  }}
                >
                  {Math.round((user.rating / user.usersRate.length) * 100) /
                    100}
                </span>
              ) : null}
              <span style={{ verticalAlign: "middle" }}>
                <RatingDealer
                  readOnly={true}
                  ratingCount={
                    user.rating && user.usersRate
                      ? user.rating / user.usersRate.length
                      : null
                  }
                />
              </span>
            </Typography>
          </div>
        </>
      ) : null}
      {user._id === currentUser._id || user.role !== 2 ? null : (
        <div
          className={
            matches550 ? "d-flex justify-content-center mt-4" : "mt-4 d-flex"
          }
        >
          {/* <Button
            className="capital-letter ls-less1"
            variant="contained"
            endIcon={<MailOutlineIcon />}
          >
            Send Email
          </Button> */}
          <Button
            className="ml-10 capital-letter ls-less1"
            variant="contained"
            onClick={() =>
              sendWhatsAppToDealer(user.phoneNumber, user.firstName)
            }
            endIcon={<WhatsAppIcon />}
          >
            Send Whatsapp
          </Button>
          {matches550 ? null : (
            <div className="ml-10">
              <DealerRatingDialog dealer={user._id} client={currentUser._id} />
            </div>
          )}
          {matches770 && !matches550 ? (
            <div className="ml-10">
              <ShowActivityDays
                isCanEdit={currentUser._id === user._id}
                activityDays={user.activityDays}
                activityDaysTime={user.activityDaysTime}
              />
            </div>
          ) : null}
        </div>
      )}
      {matches550 && user.role === 2 ? (
        <div className="mt-4 d-flex justify-content-center">
          {user._id === currentUser._id || user.role !== 2 ? null : (
            <div>
              <DealerRatingDialog dealer={user._id} client={currentUser._id} />
            </div>
          )}
          <div className="ml-10">
            <ShowActivityDays
              isCanEdit={currentUser._id === user._id}
              activityDays={user.activityDays}
              activityDaysTime={user.activityDaysTime}
            />
          </div>
        </div>
      ) : null}
      <div className="mt-4">
        <UserMoreInfo
          user={user}
          isUserPtofile={currentUser._id === user._id}
        />
      </div>
    </Card>
  );
}
