import React, { useState } from "react";
import EditProfile from "../Pages/EditProfile";
import { Button } from "react-bootstrap";
import { DialogContent, DialogTitle, Dialog } from "@mui/material";

export default function EditAccountDialog({ mobileNumber, setFlag, flag }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-100 mb-3">
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
            className="cur-pointer color-red"
          >
            X
          </DialogTitle>
          <DialogContent>
            <EditProfile
              setOpen={setOpen}
              mobileNumber={mobileNumber}
              setFlag={setFlag}
              flag={flag}
            />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
