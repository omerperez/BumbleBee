import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  error403,
  uploadMultipleSucces,
} from "../images/projectImages";
import { Button } from "@mui/material";
import { editAlertFunction } from "./AlertFunction";
import { useAuth } from "../../contexts/AuthContext";

export default function SendDhlAndGovIlDialog({ alert }) {
  const { socket } = useAuth();
  const [open, setOpen] = useState(false);
  const [dhl, setDhl] = useState();
  const [gov, setGov] = useState();
  
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
    const editAlert = {
      _id: alert._id,
      dealer: alert.dealer,
      client: alert.client,
      dhl: dhl,
      govIl: gov,
      step: 3,
      isRead: false,
    };

    const res = await editAlertFunction(editAlert, socket);
    if (res.data !== "Success") {
      console.log("Filed");
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
                    onError={error403}
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
                    onError={error403}
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
