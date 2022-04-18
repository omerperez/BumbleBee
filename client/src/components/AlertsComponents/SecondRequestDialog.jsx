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
              <FormControl
            fullWidth
            className="mt-3"
            disabled={CheckDisableStatus(values)}
          >
            <TextField
              label="km"
              name="km"
              type="number"
              value={values.km && values.km > -1 ? values.km : ""}
              onChange={(e) => {
                carChange(e);
                if (e.target.value < 0) {
                  setError(
                    error.includes("Please Enter Positive Number ")
                      ? error
                      : "Please Enter Positive Number " + error
                  );
                } else {
                  setError("");
                }
              }}
              required
            />
          </FormControl>
          <label htmlFor={"image"}>
            <img
              alt="other_images"
              className="cur-pointer ml-25"
              width={200}
              src={
                values.image && values.image.length
                  ? uploadMultipleSucces
                  : uploadMultipleEmpty
              }
            />
          </label>
          <input
            id="image"
            type="file"
            // accept="image/png, image/jpeg"
            name="image"
            multiple
            aria-required="true"
            className="display-none"
            onChange={(e) => carChange(e)}
          />
          <div style={{ marginLeft: "auto" }}>
            {loading ? (
              <LoadingButton
                className="creat-car-btn"
                size="large"
                color="secondary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Creating...
              </LoadingButton>
            ) : (
              <Button
                className={
                  checkCarsFields(values)
                    ? "creat-car-btn"
                    : "creat-car-btn-dis"
                }
                variant="contained"
                disabled={!checkCarsFields(values)}
                onClick={handleClickSubmit}
                startIcon={<SaveIcon />}
              >
                Create
              </Button>
            )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus color="success">
            Send Confirmation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
