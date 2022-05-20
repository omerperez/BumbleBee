import React, { useState } from "react";
import DealerAvailability from "../ProfileComponents/DealerAvailability";
import { DialogContent, DialogTitle, Dialog, Button } from "@mui/material";

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
          onClick={handleClickOpen}
          className="capital-letter ls-less1"
          variant="contained"
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
