import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {createAlert} from "./AlertFunction";
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap";
import { error403 } from "../images/projectImages";
import Loading from "../Layout/Loading";

export default function FirstRequestDialog({ car, showReq }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const { currentUser, cookies } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (files && files.length == 0){
      return setError("Please upload payment files");
    } 
    setError("");
    setLoading(true);
    const alert = {
      client: currentUser._id,
      dealer: car.dealer,
      car: car._id,
      payment: files,
    };
    const res = await createAlert(alert);
    if (res.data !== "Success") {
      console.log("Filed");
      setError(res.data);
    } else {
      currentUser.isSendReq = true;
      cookies.remove("connectUser");
      cookies.set("connectUser", currentUser);
      setLoading(false);
      setOpen(false);
      return window.location.reload();
    }
  };
   
  return (
    <div>
      <Button
        disabled={showReq}
        className={
          showReq ? "capital-letter color-black" : "capital-letter bg-col-blue"
        }
        variant="contained"
        fullWidth
        onClick={handleClickOpen}
      >
        Request for
        <br/>
        Docs
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Send Request</DialogTitle>
        <DialogContent>
          <div>{error && <Alert variant="danger">{error}</Alert>}</div>
          <DialogContentText id="alert-dialog-description">
            <span className="f-19 text-center color-black ls-less1">
              Are you sure that you want to send request of purchase
              confirmation for this car ?
            </span>
            {loading ? (
              <Loading />
            ) : (
              <div className="d-flex justify-content-center">
                <label htmlFor={"payment"}>
                  <img
                    alt="payment_files"
                    className="cur-pointer mt-4 mw-300"
                    src={
                      files && files.length !== 0
                        ? "/files/check-icon.png"
                        : "/files/payment.svg"
                    }
                    onError={error403}
                  />
                </label>
                <input
                  id="payment"
                  type="file"
                  name="payment"
                  multiple
                  aria-required="true"
                  className="display-none"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            autoFocus
            color="success"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
