import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "react-bootstrap";
import DealerCard from "../CarComponents/DealerCard";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DealerPropertiesDialog({ dealer, role, car, showReq }) {
  const [open, setOpen] = useState(false);
  const matches770 = useMediaQuery("(max-width:770px)");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={matches770 ? "text-center mt-2" : "text-end"}>
        <Button
          onClick={handleClickOpen}
          className={"edit-profile-btn-dealer no-border"}
        >
          Seller details
        </Button>
      </div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DealerCard dealer={dealer} role={role} showReq={showReq} car={car} />
      </Dialog>
    </div>
  );
}
