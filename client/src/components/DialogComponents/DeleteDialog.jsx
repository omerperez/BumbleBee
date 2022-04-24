import React, {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function DeleteDialog({ id, name, email, role, disabled }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    api
      .delete(`/user/delete/${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
    window.location.reload(true);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} disabled={disabled}>
        <DeleteIcon color={disabled ? "" : "error"}/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You sure that you want to delete this user ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center"
          >
            <div>{"Name: " + name}</div>
            <div>{"Email: " + email}</div>
            <div>{"Role: " + role}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteUser} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
