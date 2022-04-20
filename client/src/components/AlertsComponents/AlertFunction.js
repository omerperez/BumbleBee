import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelRequestDialog from "./CancelRequestDialog";
import SecondRequestDialog from "./SecondRequestDialog";
import SendDhlAndGovIlDialog from "./SendDhlAndGovIlDialog";

const alertTitle = (step, isDealer, dealer, user) => {
  if (step == 1) {
    if (!isDealer) {
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
    if (!isDealer) {
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
            {dealer.firstName + " " + dealer.lastName}.
          </span>
        </>
      );
    }
  }
  if (step == 3) {
    if (!isDealer) {
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
    if (!isDealer) {
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
            <span className="f-15" style={{ letterSpacing: 1.5 }}>
              Renew!
            </span>
          </span>
        </>
      );
    }
  }
};
const iconToShow = (step, isCancelRequest, isDealer) => {
  if (isCancelRequest) {
    return <CancelIcon color="error" className="m-2" sx={{ fontSize: 50 }} />;
  }
  if (step == 1) {
      if(isDealer){
        return (
          <div className="m-2 row d-flex">
            <div className="col">
              <CancelRequestDialog />
            </div>
            <div className="col">
              <SecondRequestDialog />
            </div>
          </div>
        );
      } else {
          return (
            <AccessTimeFilledIcon
              style={{ color: "#42ADFF" }}
              className="m-2"
              sx={{
                fontSize: 50,
              }}
            />
          );
      }
  }
  if (step == 2) {
    if (isDealer) {
      return (
        <AccessTimeFilledIcon
          className="m-2"
          sx={{
            fontSize: 50,
            color: "#febb3ee0",
          }}
        />
      );
    } else {
      return (
        <AccessTimeFilledIcon
          className="m-2"
          sx={{
            fontSize: 50,
            color: "#febb3ee0",
          }}
        />
      );
    }
  }
  if (step == 3) {
      if(isDealer){
          return (
            <div className="m-2">
              <SecondRequestDialog />
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
  }
  if (step == 4) {
    return (
      <CheckCircleIcon className="m-2" sx={{ fontSize: 50, color: "#3cb371" }} />
    );
  }
};

export { iconToShow, alertTitle };