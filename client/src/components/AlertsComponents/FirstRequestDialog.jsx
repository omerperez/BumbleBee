import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {createAlert} from "./AlertFunction";
import { useAuth } from '../../contexts/AuthContext';

export default function FirstRequestDialog({car}) {

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(false);
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const alert = {
      client: currentUser._id,
      dealer: car.dealer,
      car: car._id,
      payment: files,
    };

    const res = createAlert(alert); 
    if(res != "Success"){
      return console.log("Filed")
    } else {
      return setOpen(false);
    }

  }

  return (
    <div>
      <Button
        className="capital-letter bg-col-blue"
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
          <DialogContentText id="alert-dialog-description">
            <span
              className="f-19 text-center color-black"
              style={{ letterSpacing: 1.3 }}
            >
              Are you sure that you want to send request of purchase
              confirmation for this car ?
            </span>
            <div className="d-flex justify-content-center">
              <label htmlFor={"payment"}>
                <img
                style={{ maxWidth: 300 }}
                  alt="payment_files"
                  className="cur-pointer mt-4"
                  src={"/files/payment.svg"}
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
