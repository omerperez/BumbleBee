import React, {useState, useEffect } from "react";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelRequestDialog from "./CancelRequestDialog";
import SecondRequestDialog from "./SecondRequestDialog";
import SendDhlAndGovIlDialog from "./SendDhlAndGovIlDialog";
import axios from "axios";
import ShippingRequestDialog from "./ShippingRequestDialog";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

const handleNotification = (socket, senderId, receiverId, step) => {
  socket.emit("sendNotification", {
    senderId: senderId,
    receiverId: receiverId,
    step: step,
  });
};

async function createAlert(alert, socket) {

  var files = alert.payment;
  const now = Date.now();
  const data = new FormData();

 for (let i = 0; i < files.length; i++) {
   const rnd = Math.floor(Math.random() * 1000000) + 1000;
   data.append(`payment`, files[i], now + rnd + files[i].name);
   data.append(`paymentFiles`, now + rnd + files[i].name);
 }

  data.append("alert", JSON.stringify(alert));

  return api
    .post("/notification/create", data)
    .then((response) => {
      handleNotification(socket, alert.client, alert.dealer, 1);
      return response;    
    })
    .catch((err) => {
      console.log(err);
      return err.response.data.message;
    });
}

async function editAlertFunction(alert, socket) {
  console.log(alert);
  console.log(alert.client);
  const now = Date.now();
  const data = new FormData();
  if (alert.step == 2) {
    var files = alert.license;
    for (let i = 0; i < files.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      data.append(`license`, files[i], now + rnd + files[i].name);
      data.append(`carLicenseFile`, now + rnd + files[i].name);
    }
  } else if (alert.step == 3) {
    let dhlFiles = alert.dhl;
    let govFiles = alert.govIl;
    for (let i = 0; i < dhlFiles.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      data.append(`dhl`, dhlFiles[i], now + rnd + dhlFiles[i].name);
      data.append(`dhlFile`, now + rnd + dhlFiles[i].name);
    }
    for (let i = 0; i < govFiles.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      data.append(`govil`, govFiles[i], now + rnd + govFiles[i].name);
      data.append(`govIlFile`, now + rnd + govFiles[i].name);
    }
  } else  if (alert.step == 4) {
    let shipping = alert.shipping;
    for (let i = 0; i < shipping.length; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000;
      data.append(`shipping`, shipping[i], now + rnd + shipping[i].name);
      data.append(`containerFiles`, now + rnd + shipping[i].name);
    }
  }
  
  data.append("alert", JSON.stringify(alert));
  return api
    .put(`/notification/update/${alert._id}`, data)
    .then(() => {
      if(alert.step == 3){
        handleNotification(socket, alert.client, alert.dealer, alert.step);   
      } else {
        handleNotification(socket, alert.dealer, alert.client, alert.step);
      }
      return "Success";
    })
    .catch((err) => {
      console.log(err);
      return err.response.data.message;
    });
}


const notificationTitle = (name, step) => {
  if (step == 1) {
      return "New License Request From" + " " + name;
      }
  if (step == 2) {
    return name + " " + "has confirmed your payment and attach the licenses!";
  }
  if (step == 3) {
     return "Shipping Details Request From" + " " + name;
  }
  if (step == 4) {
    return "Purchase process was completed successfully!";
  }
}

const alertTitle = (step, isDealer, dealer, user) => {
  if (step == 1) {
    if (isDealer) {
      return (
        <>
          <div className="f-19">
            <b>License Request</b>
          </div>
          <span className="f-15">
            New request for payment from{" "}
            <b>{user.firstName + " " + user.lastName}</b>
            <br />
            Please attach the vehicle licenses
          </span>
        </>
      );
    } else {
      return (
        <>
          <div>
            <b>License Request</b>
          </div>
          <span className="f-15">
            Your payment confirmation has been sent successfully!
            <br />
            Please wait for <b>{dealer.firstName + " " + dealer.lastName}</b> to
            confirm.
          </span>
        </>
      );
    }
  }
  if (step == 2) {
    if (isDealer) {
      return (
        <>
          <div>
            <b>Gov IL {"&"} DHL Docs</b>
          </div>
          <span className="f-15">
            Your license docs has been sent successfully!
            <br />
            Waiting for{" "}
            <b>{" " + user.firstName + " " + user.lastName + " "}</b>
            to sending DHL {"&"} Gov IL docs
          </span>
        </>
      );
    } else {
      return (
        <>
          <div>
            <b>Gov IL {"&"} DHL Docs</b>
          </div>
          <span className="f-15">
            <b>{dealer.firstName + " " + dealer.lastName} </b>has confirmed your
            payment and attach the licenses!
            <br />
            Please fill Gov IL {"&"} DHL forms and send them back to the{" "}
            {dealer.firstName + " " + dealer.lastName}
          </span>
        </>
      );
    }
  }
  if (step == 3) {
    if (isDealer) {
      return (
        <>
          <div>
            <b>Shipping Details Request</b>
          </div>
          <span className="f-15">
            <b>{user.firstName + " " + user.lastName} </b> has attached Gov IL{" "}
            {"&"} DHL docs!
            <br />
            Please fill the shipping details and attach the docs to finish the
            process
          </span>
        </>
      );
    } else {
      return (
        <>
          <div>
            <b>Shipping Details Request</b>
          </div>
          <span className="f-15">
            Your DHL {"&"} Gov IL docs has been sent successfully!
            <br />
            Waiting for shipping details and docs from
            <b>{" " + dealer.firstName + " " + dealer.lastName + " "}</b>
          </span>
        </>
      );
    }
  }
  if (step == 4) {
    if (isDealer) {
      return (
        <>
          <div>
            <b>Purchase process was completed successfully!</b>
          </div>
          <span className="f-15">
            Your shipping details and docs has been sent successfully!
          </span>
        </>
      );
    } else {
      return (
        <>
          <div>
            <b>Purchase process was completed successfully!</b>
          </div>
          <span className="f-15">
            <b>{dealer.firstName + " " + dealer.lastName} </b> has attached
            shipping docs and details.
            <br />
            <span className="f-15 ls-1">Renew!</span>
          </span>
        </>
      );
    }
  }
};

const iconToShow = (step, isCancelRequest, isDealer, alert) => {
  if (isCancelRequest) {
    return <CancelIcon color="error" className="m-2" sx={{ fontSize: 50 }} />;
  }
  else if (step == 1) {
    if (isDealer) {
      return (
        <div className="m-2 row d-flex">
          <div className="col">
            <CancelRequestDialog alert={alert} />
          </div>
          <div className="col">
            <SecondRequestDialog alert={alert} />
          </div>
        </div>
      );
    } else {
      return (
        <AccessTimeFilledIcon
          className="m-2 req-color-step-one"
          sx={{
            fontSize: 50,
          }}
        />
      );
    }
  } else if (step == 2) {
    if (isDealer) {
      return (
        <AccessTimeFilledIcon
          className="m-2 req-color-step-two"
          sx={{ fontSize: 50 }}
        />
      );
    } else {
      return (
        <SendDhlAndGovIlDialog
          alert={alert}
          className="m-2 req-color-step-two"
          sx={{ fontSize: 50 }}
        />
      );
    }
  } else if (step == 3) {
    if (isDealer) {
      return (
        <div className="m-2">
          <ShippingRequestDialog alert={alert} />
        </div>
      );
    } else {
      return (
        <AccessTimeFilledIcon
          color="warning"
          className="m-2"
          sx={{
            fontSize: 50,
            color: "#7200707e",
          }}
        />
      );
    }
  } else if (step == 4) {
    return (
      <CheckCircleIcon
        className="m-2"
        sx={{ fontSize: 50, color: "#3cb371" }}
      />
    );
  }
};

export {
  iconToShow,
  alertTitle,
  createAlert,
  editAlertFunction,
  notificationTitle,
};