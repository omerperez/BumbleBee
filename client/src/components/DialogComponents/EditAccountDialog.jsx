import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import EditProfile from "../Pages/EditProfile";
import { Button } from "react-bootstrap";

export default function EditAccountDialog({ mobileNumber }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-100 text-center mb-3">
        <Button
          onClick={handleClickOpen}
          className={"edit-profile-btn-dealer no-border"}
        >
          Edit Profile
        </Button>
      </div>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "25px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{
            maxHeight: 800,
            maxWidth: 600,
            border: "none",
            borderRadius: "50px",
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            onClick={handleClose}
            className="cur-pointer"
          >
            <h4 className="color-red">X</h4>
          </DialogTitle>
          <DialogContent>
            <EditProfile setOpen={setOpen} mobileNumber={mobileNumber} />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
