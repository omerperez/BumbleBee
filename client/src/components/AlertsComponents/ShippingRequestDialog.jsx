import React,{useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { uploadMultipleSucces } from "../images/projectImages";
import { Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { editAlertFunction } from "./AlertFunction";

export default function ShippingRequestDialog({ alert }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState();
  const [comment, setComment] = useState("");

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
      car: alert.car,
      shipping: files,
      step: 4,
    };

    const res = editAlertFunction(editAlert);
    if (res != "Success") {
      return console.log("Filed");
    } else {
      return setOpen(false);
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
        <DialogContent>
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
                    ? uploadMultipleSucces
                    : "/files/shipping.svg"
                }
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
            <FormControl
              fullWidth
              className="mt-3"
              // disabled={CheckDisableStatus(values)}
            >
              <TextField
                rows={3}
                label="Comment"
                name="comment"
                type="text"
                value={comment != "" ? comment : ""}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="capital-letter f-18">
            Cancel
          </Button>
          <Button
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
