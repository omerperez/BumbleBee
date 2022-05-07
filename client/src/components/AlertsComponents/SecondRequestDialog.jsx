import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { error403, uploadMultipleSucces } from "../images/projectImages";
import { Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { editAlertFunction } from "./AlertFunction";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";

export default function SecondRequestDialog({ alert }) {
  const {socket} = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState();
  const [comment, setComment] = useState("");
  
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
    setLoading(true);
    const editAlert = {
      _id: alert._id,
      dealer: alert.dealer,
      client: alert.client,
      license: files,
      step: 2,
      isRead: false,
    };
    const res = await editAlertFunction(editAlert, socket);
    if (res.data !== "Success") {
      console.log("Filed");
      // setError(res.data);
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
                      ? uploadMultipleSucces
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
              <FormControl fullWidth className="mt-3">
                <TextField
                  rows={3}
                  label="Comment"
                  name="comment"
                  type="text"
                  value={comment !== "" ? comment : ""}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </FormControl>
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
