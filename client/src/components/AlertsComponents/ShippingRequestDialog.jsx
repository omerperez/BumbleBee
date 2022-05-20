import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { error403 } from "../images/projectImages";
import { editAlertFunction } from "./AlertFunction";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";
import { Alert } from "react-bootstrap";

export default function ShippingRequestDialog({ alert }) {

  const { socket } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    socket?.emit("newUser", alert.dealer);
  }, [socket, alert.dealer]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSubmit = async () => {
    if(files.length === 0){
      return setError("Please upload Shipping files");
    }
    setError("");
    setLoading(true);
    const editAlert = {
      _id: alert._id,
      dealer: alert.dealer,
      car: alert.car,
      client: alert.client,
      shipping: files,
      step: 4,
      isRead: false,
    };
    const res = await editAlertFunction(editAlert, socket);
    if (res !== "Success") {
      return console.log("Filed");
    } else {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        className="capital-letter border-2-black app-background ls-2"
        variant="contained"
        onClick={handleClickOpen}
      >
        Apply
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Attach Licenses Files</DialogTitle>
        {loading ? (
          <Loading />
        ) : (
          <DialogContent>
            <div>{error && <Alert variant="danger">{error}</Alert>}</div>
            <DialogContentText
              id="alert-dialog-description"
              className="text-center mt-2"
            >
              <label htmlFor={"shipping"}>
                <img
                  alt="shipping"
                  className="cur-pointer ml-25"
                  width={"60%"}
                  src={
                    files && files.length > 0
                      ? "/files/check-icon.png"
                      : "/files/shipping.svg"
                  }
                  onError={error403}
                />
              </label>
              <input
                id="shipping"
                type="file"
                name="shipping"
                multiple
                aria-required="true"
                className="display-none"
                onChange={(e) => setFiles(e.target.files)}
              />
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={loading}
            className="capital-letter f-18"
          >
            Cancel
          </Button>
          <Button
            onClick={handleClickSubmit}
            disabled={loading}
            autoFocus
            color="success"
            className="capital-letter f-18"
          >
            Send Confirmation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
