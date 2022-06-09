import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { error403, uploadMultipleSucces } from "../images/projectImages";
import { editAlertFunction } from "./AlertFunction";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";
import { Alert } from "react-bootstrap";

export default function SecondRequestDialog({ alert }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSubmit = async () => {
    if(files.length === 0){
      return setError("Please upload license files");
    }
    setError("")
    setLoading(true);
    const editAlert = {
      _id: alert._id,
      dealer: alert.dealer,
      client: alert.client,
      license: files,
      step: 2,
      isRead: false,
    };
    const res = await editAlertFunction(editAlert);
    if (res.data !== "Success") {
      console.log("Filed");
      setError(res.data);
    } else {
      setLoading(false);
      setOpen(false);
      return window.location.reload();
    }
  };

  return (
    <div>
      <Button
        className="capital-letter border-2-black ls-2 app-background"
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
              <label htmlFor={"license"}>
                <img
                  alt="license_other"
                  className="cur-pointer ml-25"
                  width={"60%"}
                  src={
                    files && files.length > 0
                      ? "/files/check-icon.png"
                      : "/files/licenses.svg"
                  }
                  onError={error403}
                />
              </label>
              <input
                id="license"
                type="file"
                name="license"
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
            disabled={loading}
            onClick={handleClickSubmit}
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
