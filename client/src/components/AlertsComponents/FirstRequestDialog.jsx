import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FirstRequestDialog(car) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <DialogContentText
            id="alert-dialog-description"
          >
            <span className="f-19 text-center color-black" style={{ letterSpacing: 1.3 }}>
              Are you sure that you want to send request of purchase
              confirmation for this car ?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus color="success">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
