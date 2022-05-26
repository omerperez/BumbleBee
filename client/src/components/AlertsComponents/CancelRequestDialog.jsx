import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { editAlertFunction } from "./AlertFunction";
import Loading from "../Layout/Loading";
import { useAuth } from "../../contexts/AuthContext";

export default function CancelRequestDialog({alert}) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, socket } = useAuth();

  useEffect(() => {
    socket?.emit("newUser", currentUser._id);
  }, [socket, currentUser._id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelRequest = async () => {
    setLoading(true);
     const editAlert = {
       _id: alert._id,
       client: alert.client,
       isCancelRequest: true,
       dealer: currentUser._id,
       step: 5,
     };

     const res = await editAlertFunction(editAlert, socket);
     console.log(res);
     if (res != "Success") {
       setLoading(false);
       return console.log("Filed");
     } else {
       setLoading(false);
       setOpen(false);
       return window.location.reload();
     }
  }

  return (
    <div>
      <Button
        className="capital-letter border-2-black background-cancel"
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
        {loading ? (
          <Loading />
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">Send Request</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span className="f-19 text-center color-black ls-less1">
                  Are you sure that you want to cancel the request of purchase
                  this car ?
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className=" capital-letter f-18" onClick={handleClose}>
                Back
              </Button>
              <Button
                onClick={handleCancelRequest}
                autoFocus
                color="error"
                className=" capital-letter f-18"
              >
                Cancel Request
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
