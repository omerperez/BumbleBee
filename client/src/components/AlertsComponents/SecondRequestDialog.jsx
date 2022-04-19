import React,{useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  uploadMultipleSucces,
  uploadMultipleEmpty
} from "../images/projectImages";
import useForm from "../../utils/useForm";
import { Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { checkCarsFields, CheckDisableStatus } from "../CarComponents/carFunctions";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function SecondRequestDialog() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, carChange] = useForm();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSubmit = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="success"
        style={{ letterSpacing: 2 }}
        className="capital-letter"
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
            <label htmlFor={"image"}>
              <img
                alt="other_images"
                className="cur-pointer ml-25"
                width={"60%"}
                src={
                  values.image && values.image.length
                    ? uploadMultipleSucces
                    : "/files/licenses.svg"
                }
              />
            </label>
            <input
              id="image"
              type="file"
              name="image"
              multiple
              aria-required="true"
              className="display-none"
              onChange={(e) => carChange(e)}
            />
            <FormControl
              fullWidth
              className="mt-3"
              disabled={CheckDisableStatus(values)}
            >
              <TextField
                rows={3}
                label="Comment"
                name="comment"
                type="text"
                value={
                  values.comment && values.comment > -1 ? values.comment : ""
                }
                onChange={(e) => {
                  carChange(e);
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
            onClick={handleClose}
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
