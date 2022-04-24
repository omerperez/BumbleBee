import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {createAlert} from "./AlertFunction";
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap";

export default function FirstRequestDialog({ car, showReq }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState(false);
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setError('');
    const alert = {
      client: currentUser._id,
      dealer: car.dealer,
      car: car._id,
      payment: files,
    };

    const res = await createAlert(alert);
    if (res.data != "Success") {
      console.log("Filed");
      setError(res.data);
    } else {
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
        onClick={handleClickOpen}
      >
        Request for Docs
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
          <div>
            <h1 className="text-left mb-1 bumble-title">BumbleBee</h1>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <DialogContentText id="alert-dialog-description">
            <span className="f-19 text-center color-black ls-less1">
              Are you sure that you want to send request of purchase
              confirmation for this car ?
            </span>
            <div className="d-flex justify-content-center">
              <label htmlFor={"payment"}>
                <img
                  alt="payment_files"
                  className="cur-pointer mt-4 mw-300"
                  src={files ? "/files/check-icon.png" : "/files/payment.svg"}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus color="success">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
