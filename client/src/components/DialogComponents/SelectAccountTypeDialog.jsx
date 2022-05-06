import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";

export default function SelectAccountTypeDialog() {

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
        <span className="mr-5">Need an account?</span>
        <span className="cur-pointer color-primary" onClick={handleClickOpen}>
          Sign Up
        </span>
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
        <div className="responsive-size-dialog no-border br-122">
          <DialogTitle
            id="alert-dialog-title"
            onClick={handleClose}
            className="cur-pointer"
          >
              X
          </DialogTitle>
          <DialogContent>
            <div className="d-flex justify-content-center row">
              <div className="col text-center">
                <Link to="/signup" className="cancel-underline">
                  <img src="/regular-user.png" width={170} onError={error403} />
                  <div className="mt-3 font-24 link-dark">
                    <b>Client</b>
                  </div>
                </Link>
              </div>
              <div className="col text-center">
                <Link to="/dealer-login" className="cancel-underline">
                  <img src="/seller-user.png" width={170} onError={error403} />
                  <div className="mt-3 font-24 link-dark">
                    <b>Dealer</b>
                  </div>
                </Link>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
