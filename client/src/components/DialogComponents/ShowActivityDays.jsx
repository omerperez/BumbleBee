import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import EditProfile from "../Pages/EditProfile";
import { Button } from "@mui/material";
import DealerAvailability from "../ProfileComponents/DealerAvailability";

export default function ShowActivityDays({ activityDays, activityDaysTime, isCanEdit }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-100">
        <Button
          onClick={() => setOpen(true)}
          className="capital-letter ls-less1"
          variant="contained"
          // endIcon={<StarHalfIcon />}
        >
          Activity Days
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
            className="cur-pointer w-500"
          >
            <h4 className="color-red">X</h4>
          </DialogTitle>
          <DialogContent>
            <DealerAvailability
              isCanEdit={isCanEdit}
              activityDays={activityDays}
              activityDaysTime={activityDaysTime}
            />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
