import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilesTabStatus from "./FilesTabStatus";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Divider } from "@mui/material";
import { sendWhatsAppToDealer } from "../CarComponents/carFunctions";
import axios from "axios";
import { iconToShow, alertTitle, alertDateformat } from "./AlertFunction";
import Loading from "../Layout/Loading";
import { error403 } from "../images/projectImages";

export default function AlertLayout({ alert, isDealer }) {
  
  const [user, setUser] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const userApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${alert.client}`;
    const dealerApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${alert.dealer}`;
    const carApi = `${process.env.REACT_APP_SERVER_API}/car/show/${alert.car}`;
    const getUser = axios.get(userApi);
    const getDealer = axios.get(dealerApi);
    const getCar = axios.get(carApi);
    axios.all([getUser, getDealer, getCar]).then(
      axios.spread((...allData) => {
        const allUserData = allData[0].data;
        const allDealerData = allData[1].data;
        const allCarData = allData[2].data;
        setUser(allUserData);
        setDealer(allDealerData);
        setCar(allCarData);
        setLoading(false);
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  if(loading){
    return <Loading />;
  }

  return (
    <Accordion
      className={`mt-4 mb-2 m-4 alert-bg-${
        alert.isCancelRequest ? 0 : alert.step
      } alert-border-${alert.isCancelRequest ? 0 : alert.step}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ width: "70%", flexShrink: 0 }}>
          <div className="row">
            <div className="col-3 col-sm-2 m-auto d-flex justify-content-center">
              <img
                alt="Remy Sharp"
                src={
                  process.env.REACT_APP_S3 +
                  `${isDealer ? user.image : dealer.image}`
                }
                className="alert-avatar"
                onError={error403}
              />
            </div>
            <div className="col f-19 mt-2">
              {alertTitle(alert.step, isDealer, dealer, user)}
              <br />
              <span className="opc-8 f-15">
                {alertDateformat(alert.lastUpdateDate)}
                {alert.isCancelRequest ? (
                  <b className="color-red">{" - Cancel"}</b>
                ) : null}
                {alert.step === 4 ? (
                  <b className="color-green">{" - Done"}</b>
                ) : null}
              </span>
            </div>
          </div>
        </Typography>
        <Typography
          sx={{
            width: "30%",
            textAlign: "end",
            display: "flex",
            justifyContent: "end",
          }}
          className="f-18 opc-8 m-auto"
        >
          {iconToShow(alert.step, alert.isCancelRequest, isDealer, alert)}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails className="days-grid mt-2">
        <div className="mb-2">
          <Link to={`/car-profile/${car._id}`}>
            <img
              alt="car-main"
              className="border-2-black"
              src={process.env.REACT_APP_S3 + car.mainImage}
              width={"95%"}
              onError={error403}
            />
          </Link>
          <div className="days-grid mt-2">
            <div>
              <div className="mt-1">
                <b>Company: </b>
                <span className="ls-1">{car.companyEnglish}</span>
              </div>
              <div className="mt-1">
                <b>Model: </b>
                <span className="ls-1">{car.model}</span>
              </div>
              <div className="mt-1">
                <b>Year: </b>
                <span className="ls-1">{car.year}</span>
              </div>
              <div className="mt-1">
                <b>Price: </b>
                <span>{car.price}$</span>
              </div>
            </div>
            <div className="w-90">
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
            payment={alert.paymentFiles}
            licenses={alert.carLicenseFile}
            govil={alert.govIlFile}
            dhl={alert.dhlFile}
            shipping={alert.containerFiles}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}