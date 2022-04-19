import React, { useState, useEffect } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import CancelRequestDialog from "./CancelRequestDialog";
import SecondRequestDialog from "./SecondRequestDialog";
import SendDhlAndGovIlDialog from "./SendDhlAndGovIlDialog";
import FilesTabStatus from "./FilesTabStatus";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendWhatsAppToDealer } from "../CarComponents/carFunctions";

export default function AlertLayout({ alert }) {
  
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${alert.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });

      fetch(`${process.env.REACT_APP_SERVER_API}/car/show/${alert.carId}`)
        .then((response) => response.json())
        .then((data) => {
          setCar(data);
        });  
    
  }, []);

  if(loading){
    return (
      <div className="d-flex justify-content-center mt-15">
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Accordion className="mt-4 mb-2 m-4" style={{ border: "solid 1px green" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ width: "70%", flexShrink: 0 }}>
          <div className="row">
            <div className="col-3 col-sm-2 m-auto">
              <Avatar
                alt="Remy Sharp"
                src={process.env.REACT_APP_S3 + user.image}
                sx={{ width: 75, height: 75 }}
              />
            </div>
            <div className="col f-19 mt-2">
              {alert.step === 1
                ? " New Request - "
                : alert.step === 2
                ? "Wait for response from"
                : alert.step === 3
                ? "Wait for docs for delivey to"
                : "End of process with"}
              <b>{" " + user.firstName + " " + user.lastName} </b>
              <br />
              <span className="opc-8" style={{ fontSize: 15 }}>
                {alert.lastUpdateDate}
              </span>
            </div>
          </div>
        </Typography>
        <Typography
          sx={{ width: "30%", textAlign: "end" }}
          className="f-18 opc-8 m-2"
        >
          {alert.step == 1 ? (
            <div className="m-2 row">
              <div className="col">
                <CancelRequestDialog />
              </div>
              <div className="col">
                <SecondRequestDialog />
              </div>
            </div>
          ) : alert.step == 2 ? (
            <div></div>
          ) : alert.step == 3 ? (
            <div></div>
          ) : (
            <div></div>
          )}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails className="days-grid mt-2">
        <div className="mb-2">
          <Link to={`/car-profile/${car._id}`}>
            <img
              style={{ border: "solid 1px #363636 " }}
              src={process.env.REACT_APP_S3 + car.mainImage}
              width={"95%"}
            />
          </Link>
          <div className="days-grid mt-2">
            <div>
              <div className="mt-1">
                <b>Company: </b>
                <span style={{ letterSpacing: 1.3 }}>{car.companyEnglish}</span>
              </div>
              <div className="mt-1">
                <b>Model: </b>
                <span style={{ letterSpacing: 1.3 }}>{car.model}</span>
              </div>
              <div className="mt-1">
                <b>Year: </b>
                <span style={{ letterSpacing: 1.3 }}>{car.year}</span>
              </div>
              <div className="mt-1">
                <b>Price: </b>
                <span style={{ letterSpacing: 1 }}>{car.price}$</span>
              </div>
            </div>
            <div style={{ width: "90%" }}>
              <div>
                <Button
                  className="capital-letter mt-3"
                  color="info"
                  fullWidth
                  variant="contained"
                >
                  <Link
                    className="color-white cancel-underline"
                    to={`/profile/${user._id}`}
                  >
                    Client Details
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  className="capital-letter mt-3"
                  color="success"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    sendWhatsAppToDealer(user.phoneNumber, user.firstName)
                  }
                >
                  Send Whatsapp
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <FilesTabStatus
            step={`${alert.step}`}
            payment={"Omer"}
            licenses={[
              "Application_for_personal_import_brokerage_license.pdf",
              "Application_for_personal_import_brokerage_license.pdf",
              "Application_for_personal_import_brokerage_license.pdf",
              "Application_for_personal_import_brokerage_license.pdf",
            ]}
            govil={"Omer"}
            dhl={"Omer"}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}