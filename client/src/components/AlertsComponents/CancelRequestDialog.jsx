import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CancelRequestDialog() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="capital-letter border-2-black"
        style={{
          background: "rgba(125, 125, 125, 0.856)",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Cancel
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
              style={{ letterSpacing: 1.2 }}
            >
              Are you sure that you want to cancel the request of purchase this
              car ?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className=" capital-letter f-18" onClick={handleClose}>
            Back
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color="error"
            className=" capital-letter f-18"
          >
            Cancel Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
