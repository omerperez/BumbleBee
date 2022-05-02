import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  uploadMultipleSucces,
  uploadMultipleEmpty,
} from "../images/projectImages";
import useForm from "../../utils/useForm";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { editAlertFunction } from "./AlertFunction";
import { io } from "socket.io-client";

export default function SendDhlAndGovIlDialog({ alert }) {
  const [open, setOpen] = useState(false);
  const [dhl, setDhl] = useState();
  const [gov, setGov] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", alert.dealer);
  }, [socket]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSubmit = () => {
    const editAlert = {
      _id: alert._id,
      dealer: alert.dealer,
      dhl: dhl,
      govIl: gov,
      step: 3,
      isRead: false,
    };

    const res = editAlertFunction(editAlert, socket);
    if (res != "Success") {
      return console.log("Filed");
    } else {
      return setOpen(false);
    }
  };

  return (
    <div>
      <Button
        className="capital-letter border-2-black m-2 app-background ls-2"
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
        <DialogTitle id="alert-dialog-title">
          Return request information to the client
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center"
          >
            <div className="d-flex justify-content-center row">
              <div className="col">
                <label htmlFor={"gov"}>
                  <img
                    alt="other_gov"
                    className="cur-pointer ml-25"
                    width={200}
                    src={
                      gov && gov.length > 0
                        ? uploadMultipleSucces
                        : "/files/gov.svg"
                    }
                  />
                </label>
                <input
                  id="gov"
                  type="file"
                  name="gov"
                  multiple
                  aria-required="true"
                  className="display-none"
                  onChange={(e) => setGov(e.target.files)}
                />
              </div>

              <div className="col">
                <label htmlFor={"dhl"}>
                  <img
                    alt="other_dhl"
                    className="cur-pointer ml-25"
                    width={200}
                    src={
                      dhl && dhl.length > 0
                        ? uploadMultipleSucces
                        : "/files/dhl.svg"
                    }
                  />
                </label>
                <input
                  id="dhl"
                  type="file"
                  name="dhl"
                  multiple
                  aria-required="true"
                  className="display-none"
                  onChange={(e) => setDhl(e.target.files)}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickSubmit} autoFocus color="success">
            Send Docs
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
